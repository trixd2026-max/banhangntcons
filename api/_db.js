// Shared Postgres connection helper for api/backup-cron.js and api/backups.js.
// Kept separate from api/storage.js (which has its own copy) so that file's
// hot request path is untouched — this one only serves the backup endpoints.
//
// A filename starting with "_" is not treated as a route by Vercel, so this
// module is safe to import from other files under api/ without exposing it
// as its own HTTP endpoint.

import { Pool } from "pg";

let pool;
export function getPool() {
  if (!pool) {
    const connStr =
      process.env.POSTGRES_URL ||
      process.env.DATABASE_URL ||
      process.env.POSTGRES_PRISMA_URL ||
      process.env.POSTGRES_URL_NON_POOLING;
    if (!connStr) {
      throw new Error(
        "No database connection string found. Create a Postgres database from the Vercel project's Storage tab first."
      );
    }
    pool = new Pool({ connectionString: connStr, ssl: { rejectUnauthorized: false } });
  }
  return pool;
}

export async function ensureBackupsTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS ntcons_backups (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      record_count INTEGER NOT NULL DEFAULT 0,
      payload JSONB NOT NULL
    );
  `);
}

/** Authorized either as the Vercel Cron job (Bearer CRON_SECRET, sent
    automatically by Vercel when that env var is set) or as this app's own
    frontend using the same X-Storage-Secret already required by
    api/storage.js. If neither secret is configured, requests are allowed —
    matching api/storage.js's own default-open behavior for quick setup. */
export function isAuthorized(req) {
  const cronSecret = process.env.CRON_SECRET;
  const storageSecret = process.env.STORAGE_API_SECRET;
  if (!cronSecret && !storageSecret) return true;
  const authHeader = req.headers["authorization"] || "";
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) return true;
  if (storageSecret && req.headers["x-storage-secret"] === storageSecret) return true;
  return false;
}
