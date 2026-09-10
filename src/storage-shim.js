// Polyfill for the Claude.ai Artifact `window.storage` API using the browser's
// localStorage, so this app also runs as a normal standalone web app (e.g. via
// `npm run dev` or any static host) — not only inside a Claude.ai artifact.
//
// If this app is ever embedded back into a Claude.ai artifact, `window.storage`
// is already provided by that host and this shim does nothing (see the guard
// below), so the app automatically uses Claude's real persistent storage there.
//
// NOTE: in this standalone shim, storage is local to each browser (like any
// normal web app's localStorage) — it is NOT synced across different devices
// or users the way Claude.ai's "shared" storage is. If you need real
// multi-device / multi-user shared storage, you'll need to swap this shim for
// a real backend (see README.md).

if (typeof window !== "undefined" && !window.storage) {
  const scopeKey = (key, shared) => `ntcons::${shared ? "shared" : "personal"}::${key}`;

  window.storage = {
    async get(key, shared) {
      const raw = window.localStorage.getItem(scopeKey(key, shared));
      if (raw === null) {
        // Matches the real API: accessing a non-existent key throws.
        throw new Error(`Key not found: ${key}`);
      }
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

    async list(keyPrefix, shared) {
      const scope = shared ? "shared" : "personal";
      const fullPrefix = `ntcons::${scope}::${keyPrefix || ""}`;
      const marker = `ntcons::${scope}::`;
      const keys = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && k.startsWith(fullPrefix)) {
          keys.push(k.slice(marker.length));
        }
      }
      return { keys, prefix: keyPrefix, shared: !!shared };
    },
  };
}
