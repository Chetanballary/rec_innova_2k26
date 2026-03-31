import { Router, type IRouter } from "express";
import { db, registrationsTable, insertRegistrationSchema } from "@workspace/db";
import { eq, count, sql } from "drizzle-orm";

const router: IRouter = Router();

router.post("/registrations", async (req, res) => {
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
});

router.get("/registrations/all", async (req, res) => {
  const { event, page = "1", limit = "20" } = req.query as {
    event?: string;
    page?: string;
    limit?: string;
  };

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
  const offset = (pageNum - 1) * limitNum;

  let query = db.select().from(registrationsTable);

  if (event) {
    const registrations = await db
      .select()
      .from(registrationsTable)
      .where(eq(registrationsTable.event, event))
      .limit(limitNum)
      .offset(offset);

    const [totalRow] = await db
      .select({ count: count() })
      .from(registrationsTable)
      .where(eq(registrationsTable.event, event));

    res.json({ registrations, total: totalRow?.count ?? 0 });
    return;
  }

  const registrations = await db
    .select()
    .from(registrationsTable)
    .limit(limitNum)
    .offset(offset);

  const [totalRow] = await db.select({ count: count() }).from(registrationsTable);

  res.json({ registrations, total: totalRow?.count ?? 0 });
});

router.get("/registrations/stats", async (req, res) => {
  const [totalRow] = await db.select({ count: count() }).from(registrationsTable);
  const total = totalRow?.count ?? 0;

  const byEventRaw = await db
    .select({
      event: registrationsTable.event,
      count: count(),
    })
    .from(registrationsTable)
    .groupBy(registrationsTable.event);

  const byEvent = byEventRaw.map((row) => ({ event: row.event, count: row.count }));

  const byParticipationRaw = await db
    .select({
      participationType: registrationsTable.participationType,
      count: count(),
    })
    .from(registrationsTable)
    .groupBy(registrationsTable.participationType);

  const individual = byParticipationRaw.find((r) => r.participationType === "individual")?.count ?? 0;
  const team = byParticipationRaw.find((r) => r.participationType === "team")?.count ?? 0;

  res.json({
    total,
    byEvent,
    byParticipationType: { individual, team },
  });
});

export default router;
