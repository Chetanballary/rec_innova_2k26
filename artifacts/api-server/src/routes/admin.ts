import { Router, type IRouter } from "express";
import { z } from "zod";
import { getAdminSession, getCompetitionCredentials } from "../lib/adminAuth";

const router: IRouter = Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "innova2k26";
const SUPER_ADMIN_USERNAME = process.env.SUPER_ADMIN_USERNAME || "onlyadmin";
const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD || "onlyadmin";
const COMPETITION_EVENTS = [
  "all",
  "singing",
  "dance",
  "mehandi",
  "hair_and_makeover",
  "rangoli",
  "cooking_without_fire",
  "nail_art",
  "reels",
  "debate",
] as const;

const loginSchema = z.object({
  event: z.enum(COMPETITION_EVENTS).default("singing"),
  username: z.string().min(1),
  password: z.string().min(1),
});

router.post("/admin/login", (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({ error: "Validation failed" });
    return;
  }

  const { event, username, password } = parsed.data;
  const isSuperAdmin =
    username === SUPER_ADMIN_USERNAME && password === SUPER_ADMIN_PASSWORD;

  if (isSuperAdmin) {
    (req.session as any).admin = { username, event: "all", isSuperAdmin: true };
    res.json({ success: true, username, event: "all", isSuperAdmin: true });
    return;
  }

  if (event === "all") {
    res.status(401).json({
      error: "Invalid credentials",
      message: "Only the super admin can access all competitions.",
    });
    return;
  }

  const competitionCreds = getCompetitionCredentials();
  if (competitionCreds) {
    const expected = competitionCreds[event];
    if (!expected || username !== expected.username || password !== expected.password) {
      res.status(401).json({ error: "Invalid credentials", message: "Invalid username or password" });
      return;
    }
  } else if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid credentials", message: "Invalid username or password" });
    return;
  }

  (req.session as any).admin = { username, event, isSuperAdmin: false };
  res.json({ success: true, username, event, isSuperAdmin: false });
});

router.post("/admin/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

router.get("/admin/me", (req, res) => {
  const admin = getAdminSession(req);
  if (admin) {
    res.json({
      isAuthenticated: true,
      username: admin.username,
      event: admin.event,
      isSuperAdmin: admin.isSuperAdmin === true,
    });
  } else {
    res.json({
      isAuthenticated: false,
      username: null,
      event: null,
      isSuperAdmin: false,
    });
  }
});

export default router;
