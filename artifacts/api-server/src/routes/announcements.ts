import { Router, type IRouter } from "express";
import { getDb, announcementsTable, insertAnnouncementSchema } from "@workspace/db";
import { eq } from "drizzle-orm";
import { requireAdmin } from "../lib/adminAuth";

const router: IRouter = Router();

router.get("/announcements", async (req, res) => {
  const db = getDb();
  const announcements = await db
    .select()
    .from(announcementsTable)
    .where(eq(announcementsTable.isActive, true))
    .orderBy(announcementsTable.createdAt);

  res.json(announcements.map((a) => ({
    id: a.id,
    title: a.title,
    content: a.content,
    category: a.category,
    isActive: a.isActive,
    createdAt: a.createdAt,
    updatedAt: a.updatedAt,
  })));
});

router.post("/announcements", async (req, res) => {
  const db = getDb();
  // Admin only
  let ok = false;
  requireAdmin(req, res, () => {
    ok = true;
  });
  if (!ok) return;

  const parsed = insertAnnouncementSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({ error: "Validation failed", message: parsed.error.message });
    return;
  }

  const [announcement] = await db
    .insert(announcementsTable)
    .values(parsed.data)
    .returning();

  res.status(201).json({
    id: announcement.id,
    title: announcement.title,
    content: announcement.content,
    category: announcement.category,
    isActive: announcement.isActive,
    createdAt: announcement.createdAt,
    updatedAt: announcement.updatedAt,
  });
});

router.put("/announcements/:id", async (req, res) => {
  const db = getDb();
  let ok = false;
  requireAdmin(req, res, () => {
    ok = true;
  });
  if (!ok) return;

  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const parsed = insertAnnouncementSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({ error: "Validation failed", message: parsed.error.message });
    return;
  }

  const [announcement] = await db
    .update(announcementsTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(announcementsTable.id, id))
    .returning();

  if (!announcement) {
    res.status(404).json({ error: "Not found", message: "Announcement not found" });
    return;
  }

  res.json({
    id: announcement.id,
    title: announcement.title,
    content: announcement.content,
    category: announcement.category,
    isActive: announcement.isActive,
    createdAt: announcement.createdAt,
    updatedAt: announcement.updatedAt,
  });
});

router.delete("/announcements/:id", async (req, res) => {
  const db = getDb();
  let ok = false;
  requireAdmin(req, res, () => {
    ok = true;
  });
  if (!ok) return;

  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const [deleted] = await db
    .delete(announcementsTable)
    .where(eq(announcementsTable.id, id))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.json({ success: true });
});

export default router;
