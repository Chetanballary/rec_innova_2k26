import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

let _pool: pg.Pool | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

export function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provision a database?",
    );
  }
  return url;
}

export function getPool(): pg.Pool {
  if (_pool) return _pool;
  const connectionString = getDatabaseUrl();
  const needsSsl =
    connectionString.includes("sslmode=require") ||
    connectionString.includes("supabase.com");

  _pool = new Pool(
    needsSsl
      ? {
          connectionString,
          ssl: { rejectUnauthorized: false },
        }
      : { connectionString },
  );
  return _pool;
}

export function getDb(): ReturnType<typeof drizzle> {
  if (_db) return _db;
  _db = drizzle(getPool(), { schema });
  return _db;
}

export * from "./schema";
