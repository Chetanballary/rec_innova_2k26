import type { NextFunction, Request, Response } from "express";

export type AdminSession = {
  username: string;
  event: string;
  isSuperAdmin?: boolean;
};

export function getAdminSession(req: Request): AdminSession | null {
  const admin = (req.session as any)?.admin;
  if (!admin || typeof admin !== "object") return null;
  if (typeof admin.username !== "string" || typeof admin.event !== "string") return null;
  return {
    username: admin.username,
    event: admin.event,
    isSuperAdmin: admin.isSuperAdmin === true,
  };
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const admin = getAdminSession(req);
  if (!admin) {
    res.status(401).json({ error: "Not authenticated", message: "Admin login required" });
    return;
  }
  next();
}

export function getCompetitionCredentials(): Record<string, { username: string; password: string }> | null {
  const raw = process.env.ADMIN_COMPETITION_CREDENTIALS;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;

    const out: Record<string, { username: string; password: string }> = {};
    for (const [event, v] of Object.entries(parsed as Record<string, any>)) {
      if (!v || typeof v !== "object") continue;
      const username = v.username;
      const password = v.password;
      if (typeof username === "string" && username.length > 0 && typeof password === "string" && password.length > 0) {
        out[event] = { username, password };
      }
    }
    return Object.keys(out).length ? out : null;
  } catch {
    return null;
  }
}
