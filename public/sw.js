/*
 * Service worker cho banhang.ntcons.
 *
 * Mục đích DUY NHẤT: cho phép ứng dụng MỞ ĐƯỢC khi hoàn toàn mất mạng
 * (cache "vỏ" ứng dụng — index.html, JS/CSS đã build, icon). Dữ liệu
 * nghiệp vụ (khách hàng, hóa đơn, tồn kho...) KHÔNG đi qua service worker
 * này — mọi request tới /api/ luôn ra thẳng mạng, để lớp hàng đợi đồng bộ
 * trong bản thân ứng dụng (xem storageSet/storageGet) xử lý đúng khi mất
 * mạng, thay vì bị che giấu bởi dữ liệu cache cũ.
 */

const CACHE_VERSION = "ntcons-shell-v1";

const NEVER_CACHE_PREFIXES = ["/api/"];

function shouldBypass(url) {
  return NEVER_CACHE_PREFIXES.some((p) => url.pathname.startsWith(p));
}

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.filter((n) => n !== CACHE_VERSION).map((n) => caches.delete(n))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return; // không cache ghi dữ liệu
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // chỉ cache tài nguyên cùng gốc
  if (shouldBypass(url)) return; // /api/* luôn ra mạng thật

  // Điều hướng trang (mở app / reload): network trước, cache dự phòng khi mất mạng.
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(CACHE_VERSION);
          cache.put(req, fresh.clone());
          return fresh;
        } catch {
          const cache = await caches.open(CACHE_VERSION);
          return (await cache.match(req)) || (await cache.match("/index.html")) || Response.error();
        }
      })()
    );
    return;
  }

  // Tài nguyên tĩnh (JS/CSS/ảnh/font đã build): cache trước, làm mới ngầm.
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      const cached = await cache.match(req);
      const networkFetch = fetch(req)
        .then((res) => {
          if (res && res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => null);
      return cached || (await networkFetch) || Response.error();
    })()
  );
});
