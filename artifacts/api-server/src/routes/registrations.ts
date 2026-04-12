import { Router, type IRouter } from "express";
import { getDb, registrationsTable, insertRegistrationSchema } from "@workspace/db";
import { eq, count } from "drizzle-orm";
import { getAdminSession } from "../lib/adminAuth";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.post("/registrations", async (req, res) => {
  try {
    const db = getDb();
    const parsed = insertRegistrationSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(422).json({ error: "Validation failed", message: parsed.error.message });
      return;
    }

    const data = parsed.data;

    const existing = await db
      .select()
      .from(registrationsTable)
      .where(eq(registrationsTable.email, data.email))
      .limit(1);

    const alreadyRegisteredForEvent = existing.find((r) => r.event === data.event);
    if (alreadyRegisteredForEvent) {
      res.status(409).json({
        error: "Duplicate registration",
        message: "You have already registered for this event with this email address.",
      });
      return;
    }

    const [registration] = await db
      .insert(registrationsTable)
      .values(data)
      .returning();

    res.status(201).json({
      id: registration.id,
      fullName: registration.fullName,
      email: registration.email,
      phone: registration.phone,
      collegeDepartment: registration.collegeDepartment,
      event: registration.event,
      participationType: registration.participationType,
      teamName: registration.teamName,
      teamSize: registration.teamSize,
      registeredAt: registration.registeredAt,
    });
  } catch (err) {
    logger.error({ err }, "Registration failed");
    res.status(500).json({ error: "Internal server error", message: "Failed to process registration" });
  }
});

router.get("/registrations/all", async (req, res) => {
  try {
    const db = getDb();
    // Admin only; competition-scoped.
    const admin = getAdminSession(req);
    if (!admin) {
      res.status(401).json({ error: "Not authenticated", message: "Admin login required" });
      return;
    }

    const { event, page = "1", limit = "20" } = req.query as {
      event?: string;
      page?: string;
      limit?: string;
    };

    if (event && !admin.isSuperAdmin && event !== admin.event) {
      res.status(403).json({ error: "Forbidden", message: "Not allowed for this competition" });
      return;
    }

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
    const offset = (pageNum - 1) * limitNum;

    const effectiveEvent = admin.isSuperAdmin ? event : (event ?? admin.event);

    const registrations = effectiveEvent
      ? await db
          .select()
          .from(registrationsTable)
          .where(eq(registrationsTable.event, effectiveEvent))
          .limit(limitNum)
          .offset(offset)
      : await db
          .select()
          .from(registrationsTable)
          .limit(limitNum)
          .offset(offset);

    const [totalRow] = effectiveEvent
      ? await db
          .select({ count: count() })
          .from(registrationsTable)
          .where(eq(registrationsTable.event, effectiveEvent))
      : await db.select({ count: count() }).from(registrationsTable);

    res.json({ registrations, total: totalRow?.count ?? 0 });
  } catch (err) {
    logger.error({ err }, "Failed to fetch registrations");
    res.status(500).json({ error: "Internal server error", message: "Failed to fetch registrations" });
  }
});

router.get("/registrations/stats", async (req, res) => {
  const db = getDb();
  const admin = getAdminSession(req);
  if (!admin) {
    res.status(401).json({ error: "Not authenticated", message: "Admin login required" });
    return;
  }

  const selectedEvent = typeof req.query.event === "string" ? req.query.event : undefined;
  if (selectedEvent && !admin.isSuperAdmin && selectedEvent !== admin.event) {
    res.status(403).json({ error: "Forbidden", message: "Not allowed for this competition" });
    return;
  }

  const effectiveEvent = admin.isSuperAdmin ? selectedEvent : admin.event;

  const totalRowForEvent = effectiveEvent
    ? await db
        .select({ count: count() })
        .from(registrationsTable)
        .where(eq(registrationsTable.event, effectiveEvent))
    : await db.select({ count: count() }).from(registrationsTable);

  const total = totalRowForEvent[0]?.count ?? 0;

  const byParticipationRaw = effectiveEvent
    ? await db
        .select({
          participationType: registrationsTable.participationType,
          count: count(),
        })
        .from(registrationsTable)
        .where(eq(registrationsTable.event, effectiveEvent))
        .groupBy(registrationsTable.participationType)
    : await db
        .select({
          participationType: registrationsTable.participationType,
          count: count(),
        })
        .from(registrationsTable)
        .groupBy(registrationsTable.participationType);

  const byEvent = effectiveEvent
    ? [{ event: effectiveEvent, count: total }]
    : await db
        .select({
          event: registrationsTable.event,
          count: count(),
        })
        .from(registrationsTable)
        .groupBy(registrationsTable.event);

  const individual = byParticipationRaw.find((r) => r.participationType === "individual")?.count ?? 0;
  const team = byParticipationRaw.find((r) => r.participationType === "team")?.count ?? 0;

  res.json({
    total,
    byEvent,
    byParticipationType: { individual, team },
  });
});

export default router;
