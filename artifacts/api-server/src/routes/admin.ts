import { Router, type IRouter } from "express";
import { z } from "zod";

const router: IRouter = Router();

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "innova2k26";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

router.post("/admin/login", (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(422).json({ error: "Validation failed" });
    return;
  }

  const { username, password } = parsed.data;

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid credentials", message: "Invalid username or password" });
    return;
  }

  (req.session as any).admin = { username };
  res.json({ success: true, username });
});

router.post("/admin/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

router.get("/admin/me", (req, res) => {
  const admin = (req.session as any).admin;
  if (admin) {
    res.json({ isAuthenticated: true, username: admin.username });
  } else {
    res.json({ isAuthenticated: false, username: null });
  }
});

export default router;
