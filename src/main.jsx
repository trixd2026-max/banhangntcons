import "./storage-shim.js";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./BanHangApp.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Đăng ký service worker để cache "vỏ" ứng dụng — cho phép mở app khi mất
// mạng hoàn toàn. Không chặn lần render đầu tiên; chạy sau khi trang đã tải.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Môi trường không hỗ trợ (vd. xem trước trong iframe) — bỏ qua, app vẫn chạy bình thường.
    });
  });
}
