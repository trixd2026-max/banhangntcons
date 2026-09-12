// Storage backend for `window.storage`, used when this app runs OUTSIDE a
// Claude.ai artifact (i.e. as this standalone deployment). Two situations:
//
//  1. A real database is connected (api/storage.js + a Postgres database
//     provisioned from the Vercel project's "Storage" tab): every read/write
//     goes through that API, so all devices/users share one real dataset.
//  2. No database yet, or the API is temporarily unreachable: falls back to
//     this browser's localStorage so the app still works, just without
//     cross-device sync until the API is reachable again.
//
// If `window.storage` already exists (running inside a Claude.ai artifact),
// this file does nothing and that host's real implementation is used as-is.

if (typeof window !== "undefined" && !window.storage) {
  const API_URL = "/api/storage";
  const API_SECRET = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_STORAGE_API_SECRET) || "";

  const scopeKey = (key, shared) => `ntcons::${shared ? "shared" : "personal"}::${key}`;

  const localImpl = {
    async get(key, shared) {
      const raw = window.localStorage.getItem(scopeKey(key, shared));
      if (raw === null) throw new Error(`Key not found: ${key}`);
      return { key, value: raw, shared: !!shared };
    },
    async set(key, value, shared) {
      window.localStorage.setItem(scopeKey(key, shared), value);
      return { key, value, shared: !!shared };
    },
    async delete(key, shared) {
      const k = scopeKey(key, shared);
      const existed = window.localStorage.getItem(k) !== null;
      window.localStorage.removeItem(k);
      return { key, deleted: existed, shared: !!shared };
    },
    async list(prefix, shared) {
      const scope = shared ? "shared" : "personal";
      const fullPrefix = `ntcons::${scope}::${prefix || ""}`;
      const marker = `ntcons::${scope}::`;
      const keys = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && k.startsWith(fullPrefix)) keys.push(k.slice(marker.length));
      }
      return { keys, prefix: keyPrefixSafe(prefix), shared: !!shared };
    },
  };
  function keyPrefixSafe(p) { return p || ""; }

  async function apiCall(method, params, body) {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params || {}).filter(([, v]) => v !== undefined && v !== null))
    ).toString();
    const headers = { "Content-Type": "application/json" };
    if (API_SECRET) headers["X-Storage-Secret"] = API_SECRET;
    return fetch(`${API_URL}${qs ? "?" + qs : ""}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  const cloudImpl = {
    async get(key, shared) {
      const res = await apiCall("GET", { key, shared: !!shared });
      if (res.status === 404) throw new Error(`Key not found: ${key}`);
      if (!res.ok) throw new Error(`cloud storage get failed: ${res.status}`);
      return res.json();
    },
    async set(key, value, shared) {
      const res = await apiCall("POST", {}, { key, value, shared: !!shared });
      if (!res.ok) throw new Error(`cloud storage set failed: ${res.status}`);
      return res.json();
    },
    async delete(key, shared) {
      const res = await apiCall("DELETE", { key, shared: !!shared });
      if (!res.ok) throw new Error(`cloud storage delete failed: ${res.status}`);
      return res.json();
    },
    async list(prefix, shared) {
      const res = await apiCall("GET", { action: "list", prefix: prefix || "", shared: !!shared });
      if (!res.ok) throw new Error(`cloud storage list failed: ${res.status}`);
      return res.json();
    },
  };

  // A "not found" response from the cloud API is a real, meaningful result —
  // only actual network/API failures should fall back to localStorage.
  function isRealNotFound(e) {
    return e && typeof e.message === "string" && e.message.startsWith("Key not found");
  }

  window.storage = {
    async get(key, shared) {
      try {
        return await cloudImpl.get(key, shared);
      } catch (e) {
        if (isRealNotFound(e)) throw e;
        return localImpl.get(key, shared);
      }
    },
    async set(key, value, shared) {
      try {
        return await cloudImpl.set(key, value, shared);
      } catch (e) {
        return localImpl.set(key, value, shared);
      }
    },
    async delete(key, shared) {
      try {
        return await cloudImpl.delete(key, shared);
      } catch (e) {
        return localImpl.delete(key, shared);
      }
    },
    async list(prefix, shared) {
      try {
        return await cloudImpl.list(prefix, shared);
      } catch (e) {
        return localImpl.list(prefix, shared);
      }
    },
  };
}
