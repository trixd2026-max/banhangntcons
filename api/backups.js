// Lists automatic backup snapshots, or returns one snapshot's full payload
// (for download / restore) when called with ?id=. Read access follows the
// same X-Storage-Secret convention as api/storage.js, since a full snapshot
// is exactly as sensitive as the live business data it's a copy of.

import { getPool, ensureBackupsTable } from "./_db.js";

function isAuthorized(req) {
  const secret = process.env.STORAGE_API_SECRET;
  if (!secret) return true;
  return req.headers["x-storage-secret"] === secret;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Storage-Secret");
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  if (req.method !== "GET") {
    res.status(405).json({ error: "method_not_allowed" });
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
    console.error("Backups API: DB connection failed:", e);
    res.status(500).json({ error: "database_unavailable", message: String(e.message || e) });
    return;
  }

  try {
    await ensureBackupsTable(client);
    const { id } = req.query;

    if (id) {
      const r = await client.query("SELECT id, created_at, record_count, payload FROM ntcons_backups WHERE id = $1", [id]);
      if (r.rows.length === 0) {
        res.status(404).json({ error: "not_found" });
        return;
      }
      res.status(200).json(r.rows[0]);
      return;
    }

    const r = await client.query("SELECT id, created_at, record_count FROM ntcons_backups ORDER BY created_at DESC LIMIT 30");
    res.status(200).json({ backups: r.rows });
  } catch (e) {
    console.error("Backups API error:", e);
    res.status(500).json({ error: "internal_error", message: String(e.message || e) });
  } finally {
    client.release();
  }
}
