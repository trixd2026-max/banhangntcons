// Vercel serverless function: a tiny key/value storage API backed by Postgres.
//
// This mirrors the shape of Claude.ai's Artifact `window.storage` API
// (get/set/delete/list, each scoped by a `shared` boolean) so the rest of the
// app (src/BanHangApp.jsx) doesn't need to know or care whether it's running
// inside a Claude.ai artifact or as this standalone deployment.
//
// Requires one of these environment variables to be set (Vercel's Postgres /
// Neon marketplace integration sets these automatically once you create a
// database from the project's "Storage" tab):
//   POSTGRES_URL, DATABASE_URL, POSTGRES_PRISMA_URL, or POSTGRES_URL_NON_POOLING
//
// Optional: set STORAGE_API_SECRET (server-side) and VITE_STORAGE_API_SECRET
// (same value, so the built frontend can send it) to require a shared secret
// header on every request. This is a basic deterrent against random internet
// traffic hitting this endpoint directly — NOT real authentication, since the
// secret ships inside the public frontend bundle. See README.md.

import { Pool } from "pg";

let pool;
function getPool() {
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

async function ensureTable(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS ntcons_kv (
      key TEXT NOT NULL,
      shared BOOLEAN NOT NULL,
      value TEXT NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      PRIMARY KEY (key, shared)
    );
  `);
}

function isAuthorized(req) {
  const secret = process.env.STORAGE_API_SECRET;
  if (!secret) return true; // no secret configured: open access (fine for quick setup / low-risk data)
  return req.headers["x-storage-secret"] === secret;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Storage-Secret");
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (!isAuthorized(req)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  let client;
  try {
    client = await getPool().connect();
  } catch (e) {
    console.error("DB connection failed:", e);
    res.status(500).json({ error: "database_unavailable", message: String(e.message || e) });
    return;
  }

  try {
    await ensureTable(client);

    if (req.method === "GET") {
      const { key, shared, action, prefix } = req.query;
      const isShared = shared === "true" || shared === "1";

      if (action === "list") {
        const r = await client.query(
          "SELECT key FROM ntcons_kv WHERE shared = $1 AND key LIKE $2 ORDER BY key",
          [isShared, (prefix || "") + "%"]
        );
        res.status(200).json({ keys: r.rows.map((row) => row.key), prefix: prefix || "", shared: isShared });
        return;
      }

      if (!key) {
        res.status(400).json({ error: "missing_key" });
        return;
      }
      const r = await client.query("SELECT value FROM ntcons_kv WHERE key = $1 AND shared = $2", [key, isShared]);
      if (r.rows.length === 0) {
        res.status(404).json({ error: "not_found", key });
        return;
      }
      res.status(200).json({ key, value: r.rows[0].value, shared: isShared });
      return;
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
      const { key, value, shared } = body;
      if (!key) {
        res.status(400).json({ error: "missing_key" });
        return;
      }
      const isShared = !!shared;
      await client.query(
        `INSERT INTO ntcons_kv (key, shared, value, updated_at) VALUES ($1, $2, $3, now())
         ON CONFLICT (key, shared) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
        [key, isShared, String(value)]
      );
      res.status(200).json({ key, value, shared: isShared });
      return;
    }

    if (req.method === "DELETE") {
      const { key, shared } = req.query;
      if (!key) {
        res.status(400).json({ error: "missing_key" });
        return;
      }
      const isShared = shared === "true" || shared === "1";
      const r = await client.query("DELETE FROM ntcons_kv WHERE key = $1 AND shared = $2 RETURNING key", [key, isShared]);
      res.status(200).json({ key, deleted: r.rows.length > 0, shared: isShared });
      return;
    }

    res.status(405).json({ error: "method_not_allowed" });
  } catch (e) {
    console.error("Storage API error:", e);
    res.status(500).json({ error: "internal_error", message: String(e.message || e) });
  } finally {
    client.release();
  }
}
