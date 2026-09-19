// Vercel Cron calls this on a schedule (see vercel.json) to snapshot every
// shared business-data key from ntcons_kv into ntcons_backups. The app's own
// "Sao lưu ngay" button in Sao lưu & Phục hồi hits this same endpoint on
// demand, using the same X-Storage-Secret header it already sends to
// api/storage.js.
//
// Retention: keeps the most recent 30 snapshots (about a month at the
// default once-daily schedule) and deletes older ones automatically, so the
// table never grows without bound.

import { getPool, ensureBackupsTable, isAuthorized } from "./_db.js";

const RETENTION = 30;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Storage-Secret, Authorization");
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
    console.error("Backup cron: DB connection failed:", e);
    res.status(500).json({ error: "database_unavailable", message: String(e.message || e) });
    return;
  }

  try {
    await ensureBackupsTable(client);

    const rows = await client.query("SELECT key, value FROM ntcons_kv WHERE shared = true");
    const payload = {};
    let recordCount = 0;
    for (const row of rows.rows) {
      try {
        const parsed = JSON.parse(row.value);
        // Bỏ tiền tố "ntcons:" để khớp với tên khóa ngắn mà trang Sao lưu &
        // Phục hồi dùng cho cả file xuất thủ công lẫn khôi phục (xem
        // BACKUP_STORE_LABELS / doExport / doRestore trong BanHangApp.jsx).
        const shortKey = row.key.startsWith("ntcons:") ? row.key.slice("ntcons:".length) : row.key;
        payload[shortKey] = parsed;
        if (Array.isArray(parsed)) recordCount += parsed.length;
      } catch {
        // giá trị không phải JSON hợp lệ (không nên xảy ra) — bỏ qua khóa đó, không làm hỏng cả bản sao lưu
      }
    }

    const inserted = await client.query(
      "INSERT INTO ntcons_backups (record_count, payload) VALUES ($1, $2) RETURNING id, created_at",
      [recordCount, JSON.stringify(payload)]
    );

    await client.query(
      `DELETE FROM ntcons_backups WHERE id NOT IN (
         SELECT id FROM ntcons_backups ORDER BY created_at DESC LIMIT $1
       )`,
      [RETENTION]
    );

    res.status(200).json({
      ok: true,
      id: inserted.rows[0].id,
      created_at: inserted.rows[0].created_at,
      keys: Object.keys(payload).length,
      record_count: recordCount,
    });
  } catch (e) {
    console.error("Backup cron error:", e);
    res.status(500).json({ error: "internal_error", message: String(e.message || e) });
  } finally {
    client.release();
  }
}
