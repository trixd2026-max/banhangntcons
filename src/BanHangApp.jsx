import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  LayoutDashboard, Package, Users, Truck, ShoppingCart, ShoppingBag,
  ArrowDownToLine, ArrowUpFromLine, Wallet, HandCoins, Boxes, FileBarChart,
  Plus, Pencil, Trash2, X, Search, ChevronRight, AlertTriangle, Menu,
  TrendingUp, TrendingDown, CircleDollarSign, PackageSearch, Undo2,
  Printer, LogOut, UserCog, ShieldCheck, Eye, EyeOff,
  Tag, ClipboardList, Contact, Banknote, Landmark, FileSpreadsheet, Store, Percent,
  CreditCard, BookOpen, Database, Bell, Upload, History, ScanLine,
  Building2, CheckCircle2, ChevronLeft, ChevronsUpDown, ChevronUp, ChevronDown, Loader2,
  ArrowUpRight, ArrowDownRight, CalendarDays, Download
} from "lucide-react";
import bcrypt from "bcryptjs";

/* ------------------------------------------------------------------ */
/* Brand asset (NTCONS logo)                                           */
/* ------------------------------------------------------------------ */
const LOGO_SRC = "data:image/png;base64,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";

/* ------------------------------------------------------------------ */
/* Tokens & helpers — palette derived from the NTCONS logo             */
/* ------------------------------------------------------------------ */
const COLORS = {
  navyDark: "#3B2311",   // sidebar background — deep roast brown from the logo roofline
  navy: "#7A3B0C",       // primary brand brown (buildings)
  navyLight: "#8C4A16",
  bg: "#F6F2E9",         // warm cream tint echoing the logo backdrop
  surface: "#FFFFFF",
  border: "#E4DBC8",
  text: "#2B1B10",
  textMuted: "#7C6F5C",
  gold: "#DC9422",       // brand accent (logo gold tower)
  goldBg: "#FBF0DA",
  green: "#1E8E5A",
  greenBg: "#E5F5EC",
  red: "#B23A2C",
  redBg: "#FBEAE6",
  amber: "#C97F17",
  amberBg: "#FCF1DD",
};

const fmtVND = (n) =>
  (Number(n) || 0).toLocaleString("vi-VN", { maximumFractionDigits: 0 }) + "đ";

const todayStr = () => new Date().toISOString().slice(0, 10);
const fmtDate = (d) => {
  if (!d) return "";
  const p = d.split("-");
  return p.length === 3 ? `${p[2]}/${p[1]}/${p[0]}` : d;
};
const uid = (prefix) =>
  prefix + Date.now().toString(36).slice(-6) + Math.random().toString(36).slice(2, 5);

function monthKey(d) {
  return (d || "").slice(0, 7);
}

/* ------------------------------------------------------------------ */
/* Đọc số tiền thành chữ (bắt buộc trên chứng từ kế toán Việt Nam)      */
/* ------------------------------------------------------------------ */
const DIGIT_WORDS = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];

/** Đọc một nhóm 3 chữ số. `full` = true khi đây không phải nhóm đầu tiên. */
function readTriple(n, full) {
  const tram = Math.floor(n / 100);
  const chuc = Math.floor((n % 100) / 10);
  const donvi = n % 10;
  const parts = [];
  if (tram > 0 || full) {
    parts.push(DIGIT_WORDS[tram], "trăm");
  }
  if (chuc > 1) {
    parts.push(DIGIT_WORDS[chuc], "mươi");
    if (donvi === 1) parts.push("mốt");
    else if (donvi === 5) parts.push("lăm");
    else if (donvi > 0) parts.push(DIGIT_WORDS[donvi]);
  } else if (chuc === 1) {
    parts.push("mười");
    if (donvi === 1) parts.push("một");
    else if (donvi === 5) parts.push("lăm");
    else if (donvi > 0) parts.push(DIGIT_WORDS[donvi]);
  } else {
    if (donvi > 0) {
      if (tram > 0 || full) parts.push("lẻ");
      parts.push(DIGIT_WORDS[donvi]);
    }
  }
  return parts.join(" ").trim();
}

const SCALE_WORDS = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];

/** docTienBangChu(1250000) -> "Một triệu hai trăm năm mươi nghìn đồng" */
function docTienBangChu(amount) {
  let n = Math.round(Math.abs(Number(amount) || 0));
  const negative = (Number(amount) || 0) < 0;
  if (n === 0) return "Không đồng";

  const triples = [];
  while (n > 0) {
    triples.push(n % 1000);
    n = Math.floor(n / 1000);
  }

  const chunks = [];
  for (let i = triples.length - 1; i >= 0; i--) {
    if (triples[i] === 0) continue;
    const words = readTriple(triples[i], i !== triples.length - 1);
    chunks.push(words + (SCALE_WORDS[i] ? " " + SCALE_WORDS[i] : ""));
  }

  let text = chunks.join(" ").replace(/\s+/g, " ").trim() + " đồng";
  if (negative) text = "Âm " + text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/* Export one or more tables to a single .xlsx file, downloaded via the browser. */
/* xlsx chỉ ~700KB nhưng chỉ dùng khi xuất Excel — tải theo yêu cầu thay vì
   gộp vào gói chính, giúp màn hình đăng nhập và các trang không xuất Excel
   tải nhanh hơn. */
async function exportExcel(filename, sheets) {
  try {
    const XLSX = await import("xlsx");
    const wb = XLSX.utils.book_new();
    sheets.forEach(({ name, rows }) => {
      const ws = XLSX.utils.json_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, (name || "Sheet").slice(0, 31));
    });
    XLSX.writeFile(wb, filename.endsWith(".xlsx") ? filename : filename + ".xlsx");
  } catch (e) {
    console.error("export excel failed", e);
    toast("Không xuất được file Excel.", "error");
  }
}

function ExcelButton({ onClick, label = "Xuất Excel" }) {
  return (
    <Btn size="sm" variant="outline" onClick={onClick}>
      <FileSpreadsheet size={13.5} /> {label}
    </Btn>
  );
}

/* ------------------------------------------------------------------ */
/* Recharts — thư viện biểu đồ khá nặng, chỉ dùng ở Bảng điều khiển và  */
/* Báo cáo, nên tải theo yêu cầu (dynamic import) thay vì gộp sẵn.      */
/* ------------------------------------------------------------------ */
let RECHARTS_CACHE = null;
function useRecharts() {
  const [mod, setMod] = useState(RECHARTS_CACHE);
  useEffect(() => {
    if (RECHARTS_CACHE) { setMod(RECHARTS_CACHE); return; }
    let alive = true;
    import("recharts").then((m) => {
      RECHARTS_CACHE = m;
      if (alive) setMod(m);
    });
    return () => { alive = false; };
  }, []);
  return mod;
}

function ChartSkeleton({ height = 220 }) {
  return <div className="rounded-md animate-pulse" style={{ height, background: COLORS.bg }} />;
}

/* ------------------------------------------------------------------ */
/* Storage layer                                                       */
/* ------------------------------------------------------------------ */
const STORE_KEYS = {
  products: "ntcons:products",
  customers: "ntcons:customers",
  suppliers: "ntcons:suppliers",
  sales: "ntcons:sales",
  purchases: "ntcons:purchases",
  receipts: "ntcons:receipts",
  payments: "ntcons:payments",
  vouchers: "ntcons:stockvouchers",
  salereturns: "ntcons:salereturns",
  purchasereturns: "ntcons:purchasereturns",
  users: "ntcons:users",
  pricelists: "ntcons:pricelists",
  salesorders: "ntcons:salesorders",
  purchaseorders: "ntcons:purchaseorders",
  lots: "ntcons:lots",
  employees: "ntcons:employees",
  payroll: "ntcons:payroll",
  channels: "ntcons:channels",
  paymentmethods: "ntcons:paymentmethods",
  auditlog: "ntcons:auditlog",
  warehouses: "ntcons:warehouses",
  einvoiceconfig: "ntcons:einvoiceconfig",
  company: "ntcons:company",
  stocktakes: "ntcons:stocktakes",
  counters: "ntcons:counters",
};

// Business data + accounts are stored as SHARED data so every teammate who
// opens this same app sees the same shop data and can log in with the same
// account list. See the in-app notice on the login screen for what this
// does and does not protect against.
const SHARED = true;

/* ------------------------------------------------------------------ */
/* Đồng bộ offline — khi mất mạng, ghi dữ liệu vẫn lưu tạm trên máy      */
/* (localStorage) và tự động gửi lên máy chủ khi có mạng trở lại.       */
/* Mỗi khóa lưu trữ là MỘT snapshot toàn bộ danh sách, nên hàng đợi chỉ  */
/* cần giữ giá trị mới nhất theo từng khóa — ghi sau luôn thay ghi trước.*/
/* ------------------------------------------------------------------ */
const LS_CACHE_PREFIX = "ntcons:cache:";
const LS_QUEUE_KEY = "ntcons:sync-queue";

function lsGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, val); } catch { /* dung lượng đầy hoặc bị chặn — bỏ qua */ }
}

function loadQueue() {
  try { return JSON.parse(lsGet(LS_QUEUE_KEY) || "{}"); } catch { return {}; }
}
let SYNC_QUEUE = loadQueue(); // { [storageKey]: { value, shared, ts } }
function persistQueue() {
  lsSet(LS_QUEUE_KEY, JSON.stringify(SYNC_QUEUE));
}

const SYNC_LISTENERS = new Set();
function notifySync() {
  const count = Object.keys(SYNC_QUEUE).length;
  SYNC_LISTENERS.forEach((fn) => fn(count));
}
/** Số lượng thay đổi đang chờ đồng bộ + hàm để yêu cầu đồng bộ lại ngay. */
function useSyncQueueStatus() {
  const [count, setCount] = useState(Object.keys(SYNC_QUEUE).length);
  useEffect(() => {
    SYNC_LISTENERS.add(setCount);
    return () => SYNC_LISTENERS.delete(setCount);
  }, []);
  return { pending: count, syncNow: flushQueue };
}

let flushTimer = null;
let flushing = false;
async function flushQueue() {
  if (flushing) return;
  const keys = Object.keys(SYNC_QUEUE);
  if (keys.length === 0) return;
  flushing = true;
  let okCount = 0;
  for (const key of keys) {
    const entry = SYNC_QUEUE[key];
    if (!entry) continue;
    try {
      await window.storage.set(key, JSON.stringify(entry.value), entry.shared);
      delete SYNC_QUEUE[key];
      okCount++;
    } catch (e) {
      // vẫn chưa có mạng / máy chủ chưa phản hồi — giữ lại trong hàng đợi
    }
  }
  persistQueue();
  notifySync();
  flushing = false;
  if (okCount > 0) {
    toast(Object.keys(SYNC_QUEUE).length === 0 ? `Đã đồng bộ xong ${okCount} thay đổi bị trễ.` : `Đã đồng bộ ${okCount} thay đổi, còn ${Object.keys(SYNC_QUEUE).length} đang chờ.`);
  }
  scheduleFlush();
}
function scheduleFlush() {
  clearTimeout(flushTimer);
  if (Object.keys(SYNC_QUEUE).length === 0) return;
  flushTimer = setTimeout(flushQueue, 15000); // thử lại định kỳ mỗi 15 giây khi còn hàng đợi
}
if (typeof window !== "undefined") {
  window.addEventListener("online", () => flushQueue());
  if (Object.keys(SYNC_QUEUE).length > 0) setTimeout(flushQueue, 1500);
}

function SyncQueueBanner() {
  const { pending, syncNow } = useSyncQueueStatus();
  if (pending === 0) return null;
  return (
    <div className="flex items-center gap-1.5 text-[12.5px] px-2 py-1 rounded-md no-print" style={{ background: COLORS.goldBg, color: "#5C4109" }} aria-live="polite">
      <AlertTriangle size={13} />
      <span className="hidden sm:inline">{pending} thay đổi chưa đồng bộ</span>
      <span className="sm:hidden">{pending} chưa đồng bộ</span>
      <button onClick={syncNow} className="underline font-medium">Đồng bộ ngay</button>
    </div>
  );
}

async function storageGet(key, shared = SHARED) {
  try {
    const res = await window.storage.get(key, shared);
    const value = res ? JSON.parse(res.value) : null;
    if (res) lsSet(LS_CACHE_PREFIX + key, res.value);
    // Nếu có thay đổi chưa kịp đồng bộ cho khóa này, ưu tiên hiển thị bản đó
    // (mới hơn những gì vừa tải từ máy chủ) thay vì để mất khi tải lại trang.
    if (SYNC_QUEUE[key]) return SYNC_QUEUE[key].value;
    return value;
  } catch (e) {
    if (SYNC_QUEUE[key]) return SYNC_QUEUE[key].value;
    const cached = lsGet(LS_CACHE_PREFIX + key);
    if (cached) {
      try { return JSON.parse(cached); } catch { return null; }
    }
    return null;
  }
}
/* ------------------------------------------------------------------ */
/* Toast — thông báo ngắn ở góc màn hình                                */
/* ------------------------------------------------------------------ */
let TOAST_PUSH = null;
function registerToastHost(fn) {
  TOAST_PUSH = fn;
}
/** toast("Đã lưu hàng hóa")  |  toast("Không lưu được", "error") */
function toast(text, tone = "success") {
  if (!text) return;
  TOAST_PUSH?.({ id: uid("T"), text, tone });
}

function ToastHost() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    registerToastHost((t) => {
      setItems((cur) => [...cur.slice(-3), t]);
      setTimeout(() => setItems((cur) => cur.filter((x) => x.id !== t.id)), 3200);
    });
    return () => registerToastHost(null);
  }, []);
  if (items.length === 0) return null;
  const tones = {
    success: { bg: COLORS.greenBg, fg: COLORS.green, Icon: CheckCircle2 },
    error: { bg: COLORS.redBg, fg: COLORS.red, Icon: AlertTriangle },
    info: { bg: COLORS.goldBg, fg: COLORS.amber, Icon: Bell },
  };
  return (
    <div className="fixed z-[200] bottom-4 right-4 left-4 sm:left-auto flex flex-col gap-2 items-stretch sm:items-end no-print" aria-live="polite">
      {items.map((t) => {
        const tone = tones[t.tone] || tones.success;
        const Icon = tone.Icon;
        return (
          <div
            key={t.id}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg shadow-lg text-[13px] sm:max-w-sm"
            style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
          >
            <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: tone.bg }}>
              <Icon size={14} color={tone.fg} />
            </span>
            <span>{t.text}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Trạng thái đang ghi dữ liệu (hiển thị "Đang lưu..." trên thanh trên) */
/* ------------------------------------------------------------------ */
let SAVING_COUNT = 0;
const SAVING_LISTENERS = new Set();
function notifySaving() {
  SAVING_LISTENERS.forEach((fn) => fn(SAVING_COUNT > 0));
}
function useSavingIndicator() {
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    SAVING_LISTENERS.add(setSaving);
    return () => SAVING_LISTENERS.delete(setSaving);
  }, []);
  return saving;
}

let wasOffline = false;
async function storageSet(key, value, shared = SHARED) {
  SAVING_COUNT += 1;
  notifySaving();
  // Ghi cache local ngay lập tức để lần đọc kế tiếp (kể cả khi mất mạng) thấy đúng dữ liệu mới nhất.
  lsSet(LS_CACHE_PREFIX + key, JSON.stringify(value));
  try {
    await window.storage.set(key, JSON.stringify(value), shared);
    delete SYNC_QUEUE[key];
    persistQueue();
    notifySync();
    if (wasOffline) {
      wasOffline = false;
      toast("Đã có mạng trở lại — dữ liệu đang được đồng bộ.");
    }
  } catch (e) {
    console.error("storage set failed", key, e);
    SYNC_QUEUE[key] = { value, shared, ts: Date.now() };
    persistQueue();
    notifySync();
    if (!wasOffline) {
      wasOffline = true;
      toast("Mất kết nối máy chủ — thay đổi đang được giữ trên máy và sẽ tự đồng bộ khi có mạng lại.", "error");
    }
    scheduleFlush();
  } finally {
    SAVING_COUNT = Math.max(0, SAVING_COUNT - 1);
    notifySaving();
  }
}

/* ------------------------------------------------------------------ */
/* Nhật ký hoạt động — ghi tự động cho MỌI thay đổi qua useCollection   */
/* ------------------------------------------------------------------ */
const STORE_LABELS = {
  products: "Hàng hóa", customers: "Khách hàng", suppliers: "Nhà cung cấp",
  sales: "Bán hàng", purchases: "Mua hàng", receipts: "Phiếu thu", payments: "Phiếu chi",
  vouchers: "Phiếu kho (Nhập/Xuất)", salereturns: "Trả hàng bán", purchasereturns: "Trả hàng mua",
  pricelists: "Bảng giá", salesorders: "Đơn đặt hàng", purchaseorders: "Đơn đặt hàng mua", employees: "Nhân viên", payroll: "Bảng lương",
  channels: "Kênh bán hàng", paymentmethods: "Phương thức thanh toán", users: "Người dùng (tài khoản)",
  warehouses: "Kho / Chi nhánh",
  einvoiceconfig: "Cấu hình hóa đơn điện tử",
  company: "Thông tin công ty",
  stocktakes: "Kiểm kê kho",
  lots: "Lô hàng / Serial",
};
const STORE_KEY_TO_LABEL = Object.fromEntries(
  Object.entries(STORE_KEYS).map(([short, full]) => [full, STORE_LABELS[short] || short])
);
const ACTION_LABELS = { create: "Tạo mới", update: "Cập nhật", delete: "Xóa", restore: "Khôi phục / nhập lại" };

let CURRENT_ACTOR = "?";
function setCurrentActor(user) {
  CURRENT_ACTOR = user ? (user.ten || user.username || "?") : "?";
}

/* Thông tin công ty dùng chung cho mọi mẫu in. App() nạp từ store vào đây,
   giống cách CURRENT_ACTOR hoạt động, để PrintDocument không phải nhận prop
   xuyên qua hàng chục trang. */
const COMPANY_DEFAULT = {
  ten: "NTCONS",
  ma_so_thue: "",
  dia_chi: "",
  dien_thoai: "",
  email: "",
  website: "",
  ngan_hang: "",
  so_tai_khoan: "",
  chu_tai_khoan: "",
  chan_trang: "",
  kho_giay: "A4",
  in_thue_gtgt: false,
};
let CURRENT_COMPANY = { ...COMPANY_DEFAULT };
function setCurrentCompany(c) {
  CURRENT_COMPANY = { ...COMPANY_DEFAULT, ...(c || {}) };
}

function describeRow(row) {
  if (!row) return "";
  return row.ten || row.ma || row.username || (row.id ? String(row.id) : "");
}

// The audit-log page reads from a React-state-backed useCollection instance
// (so it can render live), but logAudit() is called from deep inside other
// stores' add/update/remove and has no hook context of its own. We solve
// this by having App() register a ref to the live audit-log store here, so
// logAudit can push through the SAME store (updating its React state, which
// also persists to storage) instead of writing to storage directly and
// leaving the on-screen log stale until a full reload.
let AUDIT_STORE_REF = null;
function registerAuditStore(ref) {
  AUDIT_STORE_REF = ref;
}

async function logAudit(storeKey, action, row) {
  if (storeKey === STORE_KEYS.auditlog) return; // never log writes to the log itself
  const entry = {
    id: uid("LOG"),
    ts: new Date().toISOString(),
    actor: CURRENT_ACTOR,
    action,
    module: STORE_KEY_TO_LABEL[storeKey] || storeKey,
    description: describeRow(row),
  };
  const liveStore = AUDIT_STORE_REF?.current;
  if (liveStore) {
    // Route through the live store so the Nhật ký hoạt động page updates
    // immediately, not just after the next full page load.
    const next = [...(liveStore.items || []), entry].slice(-2000); // keep the log bounded
    liveStore.persist(next);
    return;
  }
  // Fallback (store not mounted yet): write straight to storage, best-effort.
  try {
    const existing = (await storageGet(STORE_KEYS.auditlog)) || [];
    const next = [...existing, entry].slice(-2000);
    await storageSet(STORE_KEYS.auditlog, next);
  } catch (e) {
    console.error("audit log failed", e);
  }
}

function useCollection(storeKey) {
  const [items, setItems] = useState(null); // null = loading
  useEffect(() => {
    let mounted = true;
    storageGet(storeKey).then((v) => {
      if (mounted) setItems(v || []);
    });
    return () => {
      mounted = false;
    };
  }, [storeKey]);

  // Nhãn dùng cho thông báo: "Đã lưu hàng hóa", "Đã xóa khách hàng", ...
  const label = (STORE_KEY_TO_LABEL[storeKey] || "").toLowerCase();

  const persist = useCallback(
    (next, action = "update", opts = {}) => {
      setItems(next);
      storageSet(storeKey, next);
      logAudit(storeKey, action, { ten: `${action === "restore" ? "Khôi phục / nhập lại" : "Cập nhật hàng loạt"} ${(next || []).length} bản ghi` });
      if (!opts.silent) toast(action === "restore" ? "Đã khôi phục dữ liệu." : "Đã lưu thay đổi.");
    },
    [storeKey, label]
  );

  const add = useCallback(
    (row, opts = {}) => {
      setItems((cur) => {
        const next = [...(cur || []), row];
        storageSet(storeKey, next);
        return next;
      });
      logAudit(storeKey, "create", row);
      if (!opts.silent) toast(`Đã thêm ${label || "bản ghi"}${describeRow(row) ? ` "${describeRow(row)}"` : ""}.`);
    },
    [storeKey, label]
  );

  const update = useCallback(
    (id, patch, opts = {}) => {
      let updatedRow = null;
      setItems((cur) => {
        const next = (cur || []).map((r) => {
          if (r.id !== id) return r;
          updatedRow = { ...r, ...patch };
          return updatedRow;
        });
        storageSet(storeKey, next);
        return next;
      });
      logAudit(storeKey, "update", updatedRow);
      if (!opts.silent) toast(`Đã cập nhật ${label || "bản ghi"}${describeRow(updatedRow) ? ` "${describeRow(updatedRow)}"` : ""}.`);
    },
    [storeKey, label]
  );

  const remove = useCallback(
    (id, opts = {}) => {
      let removedRow = null;
      setItems((cur) => {
        removedRow = (cur || []).find((r) => r.id === id) || null;
        const next = (cur || []).filter((r) => r.id !== id);
        storageSet(storeKey, next);
        return next;
      });
      logAudit(storeKey, "delete", removedRow);
      if (!opts.silent) toast(`Đã xóa ${label || "bản ghi"}${describeRow(removedRow) ? ` "${describeRow(removedRow)}"` : ""}.`);
    },
    [storeKey, label]
  );

  return { items: items || [], loading: items === null, add, update, remove, persist, setItems };
}

/* ------------------------------------------------------------------ */
/* Generic UI atoms                                                    */
/* ------------------------------------------------------------------ */
function Btn({ children, variant = "primary", size = "md", className = "", busy = false, disabled, ...props }) {
  const base =
    "inline-flex items-center gap-1.5 font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm: "px-2.5 py-1.5 text-[13px]", md: "px-3.5 py-2 text-sm" };
  const variants = {
    primary: "text-white shadow-sm",
    ghost: "bg-transparent hover:bg-black/5",
    outline: "border bg-white hover:bg-slate-50",
    danger: "text-white",
  };
  const style =
    variant === "primary"
      ? { background: COLORS.navy }
      : variant === "danger"
      ? { background: COLORS.red }
      : variant === "outline"
      ? { borderColor: COLORS.border, color: COLORS.text }
      : { color: COLORS.text };
  // Chặn bấm 2 lần trên nút gửi biểu mẫu: lần bấm thứ 2 trong vòng 900ms bị bỏ qua,
  // tránh tạo trùng chứng từ khi máy chủ phản hồi chậm.
  const lastSubmitRef = useRef(0);
  function handleClick(e) {
    if (props.type === "submit") {
      const now = Date.now();
      if (now - lastSubmitRef.current < 900) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      lastSubmitRef.current = now;
    }
    props.onClick?.(e);
  }

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      style={style}
      disabled={disabled || busy}
      aria-busy={busy || undefined}
      {...props}
      onClick={handleClick}
    >
      {busy && <Loader2 size={14} className="animate-spin" />}
      {children}
    </button>
  );
}

/**
 * Bọc một hàm lưu để chặn bấm 2 lần: trả về [hàm đã bọc, đang chạy].
 * Nút Lưu dùng `busy` sẽ tự khóa trong lúc hàm chạy.
 */
function useSubmitGuard(fn) {
  const [busy, setBusy] = useState(false);
  const running = useRef(false);
  const wrapped = useCallback(
    async (...args) => {
      if (running.current) return;
      running.current = true;
      setBusy(true);
      try {
        return await fn(...args);
      } finally {
        running.current = false;
        setBusy(false);
      }
    },
    [fn]
  );
  return [wrapped, busy];
}

function Badge({ tone = "muted", children }) {
  const tones = {
    green: { color: COLORS.green, background: COLORS.greenBg },
    red: { color: COLORS.red, background: COLORS.redBg },
    amber: { color: COLORS.amber, background: COLORS.amberBg },
    muted: { color: COLORS.textMuted, background: "#EEF1F5" },
  };
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[12px] font-medium"
      style={tones[tone]}
    >
      {children}
    </span>
  );
}

function Modal({ title, onClose, children, width = "max-w-2xl" }) {
  const panelRef = useRef(null);

  // Esc để đóng + khóa cuộn nền + đưa focus vào hộp thoại.
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose?.();
      }
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4"
      style={{ background: "rgba(14,36,56,0.45)" }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        className={`w-full ${width} bg-white rounded-lg shadow-xl outline-none`}
        style={{ border: `1px solid ${COLORS.border}` }}
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: COLORS.border }}>
          <h3 className="text-[15px] font-semibold" style={{ color: COLORS.text }}>{title}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100" aria-label="Đóng" title="Đóng (Esc)">
            <X size={18} color={COLORS.textMuted} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children, required }) {
  return (
    <label className="block mb-3">
      <span className="block text-[12.5px] font-medium mb-1" style={{ color: COLORS.textMuted }}>
        {label} {required && <span style={{ color: COLORS.red }}>*</span>}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-md border px-2.5 py-1.5 text-[13.5px] outline-none focus:ring-2";
const inputStyle = { borderColor: COLORS.border, color: COLORS.text };

function ConfirmBar({ text, onConfirm, onCancel }) {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-white shadow-xl rounded-lg px-4 py-3 flex items-center gap-3" style={{ border: `1px solid ${COLORS.border}` }}>
      <AlertTriangle size={16} color={COLORS.red} />
      <span className="text-[13.5px]" style={{ color: COLORS.text }}>{text}</span>
      <Btn size="sm" variant="danger" onClick={onConfirm}>Xóa</Btn>
      <Btn size="sm" variant="outline" onClick={onCancel}>Hủy</Btn>
    </div>
  );
}

function EmptyState({ icon: Icon, title, hint, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: COLORS.bg }}>
        <Icon size={22} color={COLORS.textMuted} />
      </div>
      <div className="text-[14px] font-medium" style={{ color: COLORS.text }}>{title}</div>
      <div className="text-[13px] mt-1 mb-4" style={{ color: COLORS.textMuted }}>{hint}</div>
      {action}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sidebar                                                             */
/* ------------------------------------------------------------------ */
const NAV_GROUPS = [
  {
    label: "Tổng quan",
    items: [{ key: "dashboard", label: "Bảng điều khiển", icon: LayoutDashboard }],
  },
  {
    label: "Danh mục",
    items: [
      { key: "products", label: "Hàng hóa", icon: Package },
      { key: "customers", label: "Khách hàng", icon: Users },
      { key: "suppliers", label: "Nhà cung cấp", icon: Truck },
      { key: "paymentmethods", label: "Phương thức thanh toán", icon: CreditCard },
      { key: "warehouses", label: "Kho / Chi nhánh", icon: Store },
    ],
  },
  {
    label: "Giao dịch",
    items: [
      { key: "pos", label: "Bán hàng nhanh (POS)", icon: ScanLine },
      { key: "salesorders", label: "Đơn đặt hàng", icon: ClipboardList },
      { key: "sales", label: "Bán hàng", icon: ShoppingCart },
      { key: "salereturns", label: "Trả hàng bán", icon: Undo2 },
      { key: "purchases", label: "Mua hàng", icon: ShoppingBag },
      { key: "purchaseorders", label: "Đơn đặt hàng mua", icon: ClipboardList },
      { key: "purchasereturns", label: "Trả hàng mua", icon: Undo2 },
      { key: "stockin", label: "Nhập kho", icon: ArrowDownToLine },
      { key: "stockout", label: "Xuất kho", icon: ArrowUpFromLine },
      { key: "stocktransfer", label: "Chuyển kho", icon: Truck },
    ],
  },
  {
    label: "Bán hàng nâng cao",
    items: [
      { key: "pricelists", label: "Bảng giá", icon: Tag },
      { key: "channels", label: "Kênh bán hàng", icon: Store },
    ],
  },
  {
    label: "Sổ quỹ & Công nợ",
    items: [
      { key: "receipts", label: "Phiếu thu", icon: Wallet },
      { key: "payments", label: "Phiếu chi", icon: HandCoins },
      { key: "soquy", label: "Sổ quỹ", icon: BookOpen },
      { key: "debt", label: "Công nợ", icon: CircleDollarSign },
    ],
  },
  {
    label: "Kho & Báo cáo",
    items: [
      { key: "stock", label: "Tồn kho", icon: Boxes },
      { key: "stocktake", label: "Kiểm kê kho", icon: ClipboardList },
      { key: "lots", label: "Lô hàng / Serial", icon: Tag },
      { key: "nxt", label: "Nhập - Xuất - Tồn", icon: Boxes },
      { key: "reports", label: "Báo cáo", icon: FileBarChart },
      { key: "taxreport", label: "Báo cáo thuế", icon: Landmark },
    ],
  },
  {
    label: "Nhân sự",
    items: [
      { key: "employees", label: "Nhân viên", icon: Contact },
      { key: "payroll", label: "Bảng lương", icon: Banknote },
    ],
  },
  {
    label: "Quản trị",
    items: [
      { key: "company", label: "Thông tin công ty", icon: Building2 },
      { key: "users", label: "Người dùng", icon: UserCog },
      { key: "backup", label: "Sao lưu & Phục hồi", icon: Database },
      { key: "auditlog", label: "Nhật ký hoạt động", icon: History },
      { key: "einvoice", label: "Hóa đơn điện tử", icon: FileSpreadsheet },
    ],
  },
];

/* Role -> allowed page keys. "admin" always sees everything. */
const ROLE_LABELS = {
  admin: "Quản trị viên",
  sales: "Nhân viên bán hàng",
  accountant: "Kế toán",
  warehouse: "Thủ kho",
};
const ROLE_PAGES = {
  admin: null, // null = all pages
  sales: ["dashboard", "products", "customers", "pos", "salesorders", "sales", "salereturns", "stock", "pricelists", "channels"],
  accountant: ["dashboard", "customers", "suppliers", "receipts", "payments", "soquy", "debt", "reports", "taxreport", "employees", "payroll", "pricelists", "paymentmethods", "nxt"],
  warehouse: ["dashboard", "products", "stockin", "stockout", "stocktransfer", "stock", "stocktake", "lots", "nxt", "warehouses"],
};

/* ------------------------------------------------------------------ */
/* Cài đặt ứng dụng ra màn hình chính (PWA)                             */
/* ------------------------------------------------------------------ */
let DEFERRED_INSTALL_PROMPT = null;
const INSTALL_LISTENERS = new Set();
if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault(); // tự hiển thị nút của mình thay vì banner mặc định của trình duyệt
    DEFERRED_INSTALL_PROMPT = e;
    INSTALL_LISTENERS.forEach((fn) => fn());
  });
  window.addEventListener("appinstalled", () => {
    DEFERRED_INSTALL_PROMPT = null;
    INSTALL_LISTENERS.forEach((fn) => fn());
  });
}

function useInstallPrompt() {
  const [, force] = useState(0);
  useEffect(() => {
    const fn = () => force((x) => x + 1);
    INSTALL_LISTENERS.add(fn);
    return () => INSTALL_LISTENERS.delete(fn);
  }, []);

  const isStandalone =
    typeof window !== "undefined" &&
    (window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator?.standalone === true);
  const isIOS = typeof navigator !== "undefined" && /iphone|ipad|ipod/i.test(navigator.userAgent || "");

  async function promptInstall() {
    if (!DEFERRED_INSTALL_PROMPT) return;
    DEFERRED_INSTALL_PROMPT.prompt();
    await DEFERRED_INSTALL_PROMPT.userChoice;
    DEFERRED_INSTALL_PROMPT = null;
    force((x) => x + 1);
  }

  return { canInstall: !!DEFERRED_INSTALL_PROMPT, promptInstall, isIOS, isStandalone };
}

function IOSInstallHelpModal({ onClose }) {
  return (
    <Modal title="Cài đặt ứng dụng trên iPhone/iPad" onClose={onClose} width="max-w-sm">
      <ol className="space-y-2.5 text-[13.5px]" style={{ color: COLORS.text }}>
        <li>1. Nhấn biểu tượng <b>Chia sẻ</b> (hình vuông có mũi tên đi lên) ở thanh công cụ Safari.</li>
        <li>2. Kéo xuống và chọn <b>"Thêm vào MH chính"</b> (Add to Home Screen).</li>
        <li>3. Nhấn <b>Thêm</b> ở góc trên bên phải.</li>
      </ol>
      <div className="text-[12px] mt-3" style={{ color: COLORS.textMuted }}>
        Sau khi thêm, mở app từ màn hình chính sẽ chạy toàn màn hình như một ứng dụng thật, không cần mở trình duyệt.
      </div>
      <div className="flex justify-end mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
        <Btn onClick={onClose}>Đã hiểu</Btn>
      </div>
    </Modal>
  );
}

function Sidebar({ page, setPage, collapsed, setCollapsed, allowedPages, user, onLogout, mobileOpen, onCloseMobile }) {
  function goTo(key) {
    setPage(key);
    onCloseMobile?.();
  }
  const { canInstall, promptInstall, isIOS, isStandalone } = useInstallPrompt();
  const [showIOSHelp, setShowIOSHelp] = useState(false);
  const showInstallBtn = !isStandalone && (canInstall || isIOS);
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-30 sm:hidden" style={{ background: "rgba(14,36,56,0.5)" }} onClick={onCloseMobile} />
      )}
      <div
        className={`h-screen flex flex-col shrink-0 z-40 fixed inset-y-0 left-0 transition-transform duration-200 sm:sticky sm:top-0 sm:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ width: collapsed ? 64 : 232, background: COLORS.navyDark }}
      >
        <div className="flex items-center gap-2 px-4 h-14 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <img src={LOGO_SRC} alt="NTCONS" className="w-8 h-8 rounded shrink-0 object-contain" style={{ background: "#F6F2E9" }} />
          {!collapsed && (
            <div className="leading-tight overflow-hidden">
              <div className="text-white text-[13.5px] font-semibold whitespace-nowrap">banhang.ntcons</div>
              <div className="text-[11px] whitespace-nowrap" style={{ color: "rgba(255,255,255,0.45)" }}>Quản lý bán hàng</div>
            </div>
          )}
          <button className="ml-auto p-1 rounded hover:bg-white/10 hidden sm:block" onClick={() => setCollapsed(!collapsed)}>
            <Menu size={16} color="rgba(255,255,255,0.7)" />
          </button>
          <button className="ml-auto p-1 rounded hover:bg-white/10 sm:hidden" onClick={onCloseMobile}>
            <X size={18} color="rgba(255,255,255,0.7)" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          {NAV_GROUPS.map((g) => {
            const visibleItems = g.items.filter((it) => allowedPages === null || allowedPages.includes(it.key));
            if (visibleItems.length === 0) return null;
            return (
              <div key={g.label} className="mb-1">
                {!collapsed && (
                  <div className="px-4 pt-3 pb-1 text-[10.5px] font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {g.label}
                  </div>
                )}
                {visibleItems.map((it) => {
                  const active = page === it.key;
                  const Icon = it.icon;
                  return (
                    <button
                      key={it.key}
                      onClick={() => goTo(it.key)}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-[13.5px] transition-colors"
                      style={{
                        background: active ? "rgba(255,255,255,0.08)" : "transparent",
                        color: active ? "#fff" : "rgba(255,255,255,0.65)",
                        borderLeft: active ? `2.5px solid ${COLORS.gold}` : "2.5px solid transparent",
                      }}
                    >
                      <Icon size={16} className="shrink-0" />
                      {!collapsed && <span className="whitespace-nowrap">{it.label}</span>}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="px-3 py-3 shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {showInstallBtn && (
            <button
              onClick={canInstall ? promptInstall : () => setShowIOSHelp(true)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-[12.5px] mb-2"
              style={{ color: "#fff", background: "rgba(255,255,255,0.08)" }}
              title="Cài đặt ứng dụng"
            >
              <Download size={14} className="shrink-0" />
              {!collapsed && "Cài đặt ứng dụng"}
            </button>
          )}
          <div className="flex items-center gap-2 px-1 mb-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0" style={{ background: COLORS.gold, color: COLORS.navyDark }}>
              {(user?.ten || "?").slice(0, 1).toUpperCase()}
            </div>
            {!collapsed && (
              <div className="leading-tight overflow-hidden">
                <div className="text-white text-[12.5px] font-medium truncate">{user?.ten}</div>
                <div className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.45)" }}>{ROLE_LABELS[user?.role] || user?.role}</div>
              </div>
            )}
          </div>
          <button onClick={onLogout} className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-[12.5px]" style={{ color: "rgba(255,255,255,0.65)" }}>
            <LogOut size={14} />
            {!collapsed && "Đăng xuất"}
          </button>
        </div>
      </div>
      {showIOSHelp && <IOSInstallHelpModal onClose={() => setShowIOSHelp(false)} />}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Page header + table shell                                           */
/* ------------------------------------------------------------------ */
function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between mb-4">
      <div>
        <h1 className="text-[18px] font-semibold" style={{ color: COLORS.text }}>{title}</h1>
        {subtitle && <p className="text-[13px] mt-0.5" style={{ color: COLORS.textMuted }}>{subtitle}</p>}
      </div>
      {action && <div className="sm:shrink-0">{action}</div>}
    </div>
  );
}

function Toolbar({ query, setQuery, placeholder, right }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2.5">
      <div className="relative w-full sm:w-72">
        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" color={COLORS.textMuted} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-md border pl-8 pr-3 py-1.5 text-[13px] outline-none"
          style={{ borderColor: COLORS.border }}
        />
      </div>
      {right}
    </div>
  );
}

const PAGE_SIZE_OPTIONS = [20, 50, 100];

/** Giá trị dùng để sắp xếp một ô: ưu tiên c.sortValue, sau đó r[c.key]. */
function sortValueOf(col, row) {
  if (typeof col.sortValue === "function") return col.sortValue(row);
  return row?.[col.key];
}

function compareValues(a, b) {
  const aEmpty = a === null || a === undefined || a === "";
  const bEmpty = b === null || b === undefined || b === "";
  if (aEmpty && bEmpty) return 0;
  if (aEmpty) return 1;   // ô trống luôn xuống cuối
  if (bEmpty) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  const an = Number(a), bn = Number(b);
  if (!Number.isNaN(an) && !Number.isNaN(bn) && String(a).trim() !== "" && String(b).trim() !== "") return an - bn;
  return String(a).localeCompare(String(b), "vi");
}

function Table({
  columns,
  rows,
  onEdit,
  onDelete,
  onPrint,
  rowKey = "id",
  sortable = true,
  paginate = true,
  pageSize: initialPageSize = 20,
}) {
  const hasActions = !!(onEdit || onDelete || onPrint);
  const [sort, setSort] = useState(null); // { key, dir: 'asc' | 'desc' }
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const sortedRows = useMemo(() => {
    if (!sort) return rows;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return rows;
    const dir = sort.dir === "desc" ? -1 : 1;
    return [...rows].sort((a, b) => dir * compareValues(sortValueOf(col, a), sortValueOf(col, b)));
  }, [rows, sort, columns]);

  const total = sortedRows.length;
  const usePaging = paginate && pageSize !== "all" && total > pageSize;
  const totalPages = usePaging ? Math.ceil(total / pageSize) : 1;

  // Khi dữ liệu hoặc cách sắp xếp đổi, quay về trang hợp lệ.
  useEffect(() => { setPage(1); }, [total, sort?.key, sort?.dir, pageSize]);
  const safePage = Math.min(page, totalPages) || 1;

  const pagedRows = usePaging
    ? sortedRows.slice((safePage - 1) * pageSize, safePage * pageSize)
    : sortedRows;

  function toggleSort(col) {
    if (!sortable || col.sortable === false) return;
    setSort((cur) => {
      if (!cur || cur.key !== col.key) return { key: col.key, dir: "asc" };
      if (cur.dir === "asc") return { key: col.key, dir: "desc" };
      return null; // lần bấm thứ 3 trả về thứ tự gốc
    });
  }

  function SortIcon({ col }) {
    if (!sortable || col.sortable === false) return null;
    if (sort?.key !== col.key) return <ChevronsUpDown size={12} className="inline-block ml-1 opacity-40" />;
    return sort.dir === "asc"
      ? <ChevronUp size={12} className="inline-block ml-1" color={COLORS.navy} />
      : <ChevronDown size={12} className="inline-block ml-1" color={COLORS.navy} />;
  }

  const firstShown = total === 0 ? 0 : (usePaging ? (safePage - 1) * pageSize + 1 : 1);
  const lastShown = usePaging ? Math.min(safePage * pageSize, total) : total;

  return (
    <>
      {/* Desktop / tablet: full data table */}
      <div className="hidden sm:block rounded-lg overflow-x-auto" style={{ border: `1px solid ${COLORS.border}` }}>
        <table className="w-full text-[13px]">
          <thead>
            <tr style={{ background: COLORS.bg }}>
              {columns.map((c) => {
                const canSort = sortable && c.sortable !== false;
                return (
                  <th
                    key={c.key}
                    className={`px-3 py-2 font-semibold whitespace-nowrap ${canSort ? "cursor-pointer select-none hover:text-slate-900" : ""}`}
                    style={{ color: COLORS.textMuted, textAlign: c.align || "left", borderBottom: `1px solid ${COLORS.border}` }}
                    onClick={() => toggleSort(c)}
                    aria-sort={sort?.key === c.key ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}
                    title={canSort ? "Bấm để sắp xếp" : undefined}
                  >
                    {c.label}
                    <SortIcon col={c} />
                  </th>
                );
              })}
              {hasActions && <th className="px-3 py-2 w-24"></th>}
            </tr>
          </thead>
          <tbody>
            {pagedRows.map((r, i) => (
              <tr key={r[rowKey]} style={{ background: i % 2 ? "#FAFBFC" : "#fff", borderBottom: `1px solid ${COLORS.border}` }}>
                {columns.map((c) => (
                  <td key={c.key} className="px-3 py-2 align-middle" style={{ textAlign: c.align || "left", color: COLORS.text, fontVariantNumeric: "tabular-nums" }}>
                    {c.render ? c.render(r) : r[c.key]}
                  </td>
                ))}
                {hasActions && (
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1 justify-end">
                      {onPrint && (
                        <button onClick={() => onPrint(r)} className="p-1.5 rounded hover:bg-slate-100" aria-label="In chứng từ" title="In / Xuất PDF">
                          <Printer size={13.5} color={COLORS.textMuted} />
                        </button>
                      )}
                      {onEdit && (
                        <button onClick={() => onEdit(r)} className="p-1.5 rounded hover:bg-slate-100" aria-label="Sửa" title="Sửa">
                          <Pencil size={13.5} color={COLORS.textMuted} />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(r)} className="p-1.5 rounded hover:bg-slate-100" aria-label="Xóa" title="Xóa">
                          <Trash2 size={13.5} color={COLORS.red} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards — same data, one card per row */}
      <div className="sm:hidden space-y-2">
        {pagedRows.map((r) => (
          <div key={r[rowKey]} className="rounded-lg p-3" style={{ border: `1px solid ${COLORS.border}`, background: COLORS.surface }}>
            <div className="text-[14px] font-semibold mb-1.5" style={{ color: COLORS.text }}>
              {columns[0].render ? columns[0].render(r) : r[columns[0].key]}
            </div>
            {columns.slice(1).map((c) => {
              const val = c.render ? c.render(r) : r[c.key];
              if (val === "" || val === null || val === undefined) return null;
              return (
                <div key={c.key} className="flex items-center justify-between py-0.5 gap-3">
                  <span className="text-[11.5px] shrink-0" style={{ color: COLORS.textMuted }}>{c.label}</span>
                  <span className="text-[13px] text-right" style={{ color: COLORS.text, fontVariantNumeric: "tabular-nums" }}>{val}</span>
                </div>
              );
            })}
            {hasActions && (
              <div className="flex items-center gap-1 justify-end mt-2 pt-2" style={{ borderTop: `1px solid ${COLORS.border}` }}>
                {onPrint && (
                  <button onClick={() => onPrint(r)} className="p-1.5 rounded hover:bg-slate-100" aria-label="In chứng từ">
                    <Printer size={15} color={COLORS.textMuted} />
                  </button>
                )}
                {onEdit && (
                  <button onClick={() => onEdit(r)} className="p-1.5 rounded hover:bg-slate-100" aria-label="Sửa">
                    <Pencil size={15} color={COLORS.textMuted} />
                  </button>
                )}
                {onDelete && (
                  <button onClick={() => onDelete(r)} className="p-1.5 rounded hover:bg-slate-100" aria-label="Xóa">
                    <Trash2 size={15} color={COLORS.red} />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Phân trang — chỉ hiện khi dữ liệu vượt quá một trang */}
      {paginate && total > PAGE_SIZE_OPTIONS[0] && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2.5 text-[12.5px]" style={{ color: COLORS.textMuted }}>
          <div className="flex items-center gap-2">
            <span>Hiển thị {firstShown}–{lastShown} / {total} dòng</span>
            <select
              className="rounded border px-1.5 py-1 text-[12.5px] outline-none"
              style={{ borderColor: COLORS.border, color: COLORS.text }}
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value === "all" ? "all" : Number(e.target.value))}
              aria-label="Số dòng mỗi trang"
            >
              {PAGE_SIZE_OPTIONS.map((n) => <option key={n} value={n}>{n} dòng/trang</option>)}
              <option value="all">Tất cả</option>
            </select>
          </div>
          {usePaging && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage(safePage - 1)}
                disabled={safePage <= 1}
                className="p-1.5 rounded border disabled:opacity-40 hover:bg-slate-50"
                style={{ borderColor: COLORS.border }}
                aria-label="Trang trước"
              >
                <ChevronLeft size={14} color={COLORS.text} />
              </button>
              <span style={{ color: COLORS.text }}>Trang {safePage} / {totalPages}</span>
              <button
                onClick={() => setPage(safePage + 1)}
                disabled={safePage >= totalPages}
                className="p-1.5 rounded border disabled:opacity-40 hover:bg-slate-50"
                style={{ borderColor: COLORS.border }}
                aria-label="Trang sau"
              >
                <ChevronRight size={14} color={COLORS.text} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Danh mục: Products / Customers / Suppliers (generic CRUD)           */
/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/* Nhập liệu hàng loạt từ Excel — dùng chung cho Hàng hóa, Khách hàng,  */
/* Nhà cung cấp. Đọc file, ánh xạ theo tên cột tiếng Việt, xem trước,   */
/* báo lỗi từng dòng (thiếu dữ liệu / trùng mã), rồi ghi một lần.       */
/* ------------------------------------------------------------------ */
/**
 * @param {Object} cfg
 * @param {string} cfg.title
 * @param {{ header: string, key: string, required?: boolean, type?: "number" }[]} cfg.columns
 * @param {string} cfg.templateName
 * @param {any[]} cfg.templateSample - 1 dòng mẫu cho file tải về
 * @param {(row:any)=>string|null} cfg.validateRow - trả về thông báo lỗi hoặc null
 * @param {(row:any)=>Object} cfg.toRecord - map dòng đã đọc thành bản ghi lưu trữ
 * @param {()=>void} cfg.onClose
 * @param {(rows:Object[])=>void} cfg.onImport - nhận danh sách bản ghi hợp lệ
 */
function ImportExcelModal({ title, columns, templateName, templateSample, validateRow, toRecord, onClose, onImport }) {
  const [rows, setRows] = useState(null); // null = chưa chọn file
  const [fileName, setFileName] = useState("");
  const [parsing, setParsing] = useState(false);
  const [importBusy, setImportBusy] = useState(false);
  const fileInputRef = useRef(null);

  async function downloadTemplate() {
    const XLSX = await import("xlsx");
    const ws = XLSX.utils.json_to_sheet([templateSample]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Mẫu nhập liệu");
    XLSX.writeFile(wb, `${templateName}.xlsx`);
  }

  async function onFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setParsing(true);
    try {
      const XLSX = await import("xlsx");
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const raw = XLSX.utils.sheet_to_json(sheet, { defval: "" });
      const parsed = raw.map((r, idx) => {
        const record = {};
        columns.forEach((c) => {
          let v = r[c.header];
          if (v === undefined) {
            // thử khớp không phân biệt hoa thường / khoảng trắng nếu tên cột lệch nhẹ
            const foundKey = Object.keys(r).find((k) => k.trim().toLowerCase() === c.header.trim().toLowerCase());
            v = foundKey ? r[foundKey] : "";
          }
          if (c.type === "number") v = v === "" ? 0 : Number(v) || 0;
          else v = String(v ?? "").trim();
          record[c.key] = v;
        });
        const err = validateRow(record, idx);
        return { ...record, __row: idx + 2, __error: err }; // +2: dòng 1 là tiêu đề trong Excel
      });
      setRows(parsed);
    } catch (err) {
      console.error(err);
      toast("Không đọc được file — kiểm tra định dạng .xlsx/.csv và thử lại.", "error");
      setRows(null);
    } finally {
      setParsing(false);
    }
  }

  const validRows = (rows || []).filter((r) => !r.__error);
  const invalidRows = (rows || []).filter((r) => r.__error);

  async function doImport() {
    if (validRows.length === 0) return;
    setImportBusy(true);
    try {
      await onImport(validRows.map(toRecord));
      onClose();
    } finally {
      setImportBusy(false);
    }
  }

  return (
    <Modal title={title} onClose={onClose} width="max-w-3xl">
      {!rows ? (
        <div>
          <div className="rounded-md p-3 mb-3 text-[12.5px]" style={{ background: COLORS.bg, color: COLORS.textMuted }}>
            Tải file mẫu, điền dữ liệu theo đúng tên cột, rồi tải file lên. Các cột bắt buộc: {columns.filter((c) => c.required).map((c) => c.header).join(", ")}.
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Btn variant="outline" onClick={downloadTemplate}><FileSpreadsheet size={14} /> Tải file mẫu</Btn>
            <Btn variant="outline" onClick={() => fileInputRef.current?.click()} busy={parsing}><Upload size={14} /> Chọn file Excel/CSV</Btn>
            <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={onFile} />
            {fileName && <span className="text-[12px]" style={{ color: COLORS.textMuted }}>{fileName}</span>}
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t" style={{ borderColor: COLORS.border }}>
            <Btn type="button" variant="outline" onClick={onClose}>Hủy</Btn>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-3 mb-3 text-[12.5px]">
            <span style={{ color: COLORS.green }}>{validRows.length} dòng hợp lệ</span>
            {invalidRows.length > 0 && <span style={{ color: COLORS.red }}>{invalidRows.length} dòng lỗi (sẽ bỏ qua)</span>}
            <button onClick={() => { setRows(null); setFileName(""); }} className="ml-auto text-[12px] underline" style={{ color: COLORS.textMuted }}>Chọn file khác</button>
          </div>
          <div className="rounded-md border overflow-hidden mb-3" style={{ borderColor: COLORS.border }}>
            <Table
              columns={[
                { key: "__row", label: "Dòng", align: "right", sortable: false },
                ...columns.map((c) => ({ key: c.key, label: c.header, sortable: false })),
                { key: "__error", label: "Trạng thái", sortable: false, render: (r) => (r.__error ? <span style={{ color: COLORS.red }}>{r.__error}</span> : <span style={{ color: COLORS.green }}>Hợp lệ</span>) },
              ]}
              rows={rows}
              rowKey="__row"
              pageSize={20}
            />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t" style={{ borderColor: COLORS.border }}>
            <Btn type="button" variant="outline" onClick={onClose}>Hủy</Btn>
            <Btn onClick={doImport} busy={importBusy} disabled={validRows.length === 0}>Nhập {validRows.length} dòng hợp lệ</Btn>
          </div>
        </div>
      )}
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* In tem mã vạch — dùng jsbarcode (tải theo yêu cầu) để vẽ mã vạch vào  */
/* các thẻ <svg>, rồi in như một chứng từ bình thường.                  */
/* ------------------------------------------------------------------ */
const LABEL_PAPER = [
  { key: "A4", label: "A4 — nhiều tem mỗi trang" },
  { key: "ROLL", label: "Cuộn nhiệt 40×30mm" },
];

function BarcodeLabelModal({ products, initialProductId, onClose }) {
  const [lines, setLines] = useState(
    initialProductId ? [{ hang_hoa_id: initialProductId, so_luong: 1 }] : [{ hang_hoa_id: products[0]?.id || "", so_luong: 1 }]
  );
  const [paper, setPaper] = useState("A4");
  const [printJob, setPrintJob] = useState(null);

  function updateLine(i, patch) {
    setLines(lines.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  }
  function addLine() {
    setLines([...lines, { hang_hoa_id: "", so_luong: 1 }]);
  }
  function removeLine(i) {
    setLines(lines.filter((_, idx) => idx !== i));
  }

  const totalLabels = lines.reduce((s, l) => s + (Number(l.so_luong) || 0), 0);

  function buildAndPrint() {
    const labels = [];
    lines.forEach((l) => {
      const p = products.find((x) => x.id === l.hang_hoa_id);
      if (!p) return;
      const qty = Math.max(0, Number(l.so_luong) || 0);
      for (let i = 0; i < qty; i++) {
        labels.push({ ten: p.ten, gia_ban: p.gia_ban, code: p.ma_vach || p.ma });
      }
    });
    if (labels.length === 0) return;
    setPrintJob({ labels, paper });
  }

  if (printJob) {
    return <BarcodePrintView job={printJob} onClose={() => { setPrintJob(null); onClose(); }} />;
  }

  return (
    <Modal title="In tem mã vạch" onClose={onClose} width="max-w-2xl">
      <div className="space-y-2 mb-3">
        {lines.map((l, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <select className={inputCls} style={{ ...inputStyle, flex: 1 }} value={l.hang_hoa_id} onChange={(e) => updateLine(i, { hang_hoa_id: e.target.value })}>
              <option value="">-- Chọn hàng hóa --</option>
              {products.map((p) => <option key={p.id} value={p.id}>{p.ten} {p.ma_vach ? `(${p.ma_vach})` : `(${p.ma})`}</option>)}
            </select>
            <input type="number" min="1" className={inputCls} style={{ ...inputStyle, width: 90 }} value={l.so_luong} onChange={(e) => updateLine(i, { so_luong: e.target.value })} />
            {lines.length > 1 && (
              <button type="button" onClick={() => removeLine(i)} className="p-1.5 rounded hover:bg-slate-100 shrink-0" aria-label="Bỏ dòng này">
                <X size={14} color={COLORS.red} />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addLine} className="text-[12px] font-medium underline" style={{ color: COLORS.navy }}>+ Thêm hàng hóa</button>
      </div>
      <Field label="Khổ giấy">
        <select className={inputCls} style={inputStyle} value={paper} onChange={(e) => setPaper(e.target.value)}>
          {LABEL_PAPER.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
        </select>
      </Field>
      <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
        <Btn type="button" variant="outline" onClick={onClose}>Hủy</Btn>
        <Btn onClick={buildAndPrint} disabled={totalLabels === 0}>In {totalLabels} tem</Btn>
      </div>
    </Modal>
  );
}

function BarcodePrintView({ job, onClose }) {
  const { labels, paper } = job;
  const svgRefs = useRef([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    import("jsbarcode").then((mod) => {
      if (!alive) return;
      const JsBarcode = mod.default || mod;
      svgRefs.current.forEach((el, i) => {
        if (!el || !labels[i]) return;
        try {
          JsBarcode(el, labels[i].code || "000000", {
            format: "CODE128",
            displayValue: true,
            fontSize: paper === "ROLL" ? 11 : 10,
            height: paper === "ROLL" ? 34 : 28,
            width: paper === "ROLL" ? 1.8 : 1.4,
            margin: 0,
          });
        } catch {
          // mã trống hoặc ký tự không hợp lệ — bỏ qua, ô tem sẽ trống phần mã vạch
        }
      });
      setReady(true);
    });
    return () => { alive = false; };
  }, [labels, paper]);

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose?.(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isRoll = paper === "ROLL";

  return (
    <div id="ntcons-barcode-print">
      <style>{`
        ${isRoll ? "@page { size: 40mm 30mm; margin: 1mm; }" : "@page { size: A4 portrait; margin: 8mm; }"}
        @media print {
          body * { visibility: hidden; }
          #ntcons-barcode-print, #ntcons-barcode-print * { visibility: visible; }
          #ntcons-barcode-print { position: absolute; top: 0; left: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>
      <div className="fixed inset-0 z-[100] overflow-y-auto py-6 px-3" style={{ background: "#F1EEE7" }}>
        <div className="no-print flex items-center justify-center gap-2 mb-4">
          <button onClick={() => window.print()} disabled={!ready} className="px-3 py-1.5 rounded-md text-[13px] font-medium inline-flex items-center gap-1.5 disabled:opacity-50" style={{ background: COLORS.navy, color: "#fff" }}>
            <Printer size={14} /> {ready ? "In tem" : "Đang dựng mã vạch..."}
          </button>
          <button onClick={onClose} className="px-3 py-1.5 rounded-md text-[13px] font-medium bg-white border" style={{ borderColor: COLORS.border, color: COLORS.text }}>Đóng (Esc)</button>
        </div>
        <div
          className={isRoll ? "flex flex-col gap-2 mx-auto" : "grid gap-2 mx-auto"}
          style={isRoll ? { width: 200 } : { gridTemplateColumns: "repeat(3, 1fr)", maxWidth: 760 }}
        >
          {labels.map((l, i) => (
            <div
              key={i}
              className="bg-white flex flex-col items-center justify-center text-center overflow-hidden"
              style={{ border: "1px solid #ccc", padding: isRoll ? 4 : 6, minHeight: isRoll ? 110 : 90 }}
            >
              <div className="text-[11px] font-medium leading-tight line-clamp-2" style={{ color: "#1a1a1a" }}>{l.ten}</div>
              <svg ref={(el) => (svgRefs.current[i] = el)} />
              <div className="text-[11px] font-semibold" style={{ color: "#1a1a1a" }}>{fmtVND(l.gia_ban)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductsPage({ store, warehouses }) {
  const { items, add, update, remove, persist } = store;
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null); // null | {} | row
  const [toDelete, setToDelete] = useState(null);
  const [importing, setImporting] = useState(false);
  const [labeling, setLabeling] = useState(null); // null | { productId } | true (danh sách trống)

  const q = query.trim().toLowerCase();
  const filtered = items.filter(
    (p) =>
      !q ||
      p.ten?.toLowerCase().includes(q) ||
      p.ma?.toLowerCase().includes(q) ||
      p.ma_vach?.toLowerCase().includes(q)
  );

  function save(form) {
    if (form.id) update(form.id, form);
    else add({ ...form, id: uid("SP") });
    setEditing(null);
  }

  const importColumns = [
    { header: "Mã hàng", key: "ma", required: true },
    { header: "Tên hàng", key: "ten", required: true },
    { header: "Mã vạch", key: "ma_vach" },
    { header: "ĐVT", key: "dvt" },
    { header: "Giá vốn", key: "gia_von", type: "number" },
    { header: "Giá bán", key: "gia_ban", type: "number" },
    { header: "Tồn kho", key: "ton_kho", type: "number" },
    { header: "Tồn tối thiểu", key: "ton_toi_thieu", type: "number" },
    { header: "Thuế suất VAT (%)", key: "thue_suat_vat", type: "number" },
  ];

  function validateImportRow(r) {
    if (!r.ma) return "Thiếu mã hàng";
    if (!r.ten) return "Thiếu tên hàng";
    const dupExisting = items.find((p) => p.ma?.trim().toLowerCase() === r.ma.toLowerCase());
    if (dupExisting) return `Mã "${r.ma}" đã tồn tại (${dupExisting.ten})`;
    return null;
  }

  function doImport(records) {
    // Trong file có thể có nhiều dòng cùng mã — chỉ giữ dòng đầu, các dòng sau coi như trùng trong-file.
    const seen = new Set();
    const toAdd = [];
    for (const r of records) {
      const key = r.ma.trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      toAdd.push({ ...r, id: uid("SP"), dvt: r.dvt || "Cái", thue_suat_vat: r.thue_suat_vat || 0 });
    }
    persist([...items, ...toAdd], "create", { silent: true });
    toast(`Đã nhập ${toAdd.length} hàng hóa từ Excel.`);
  }

  return (
    <div>
      <PageHeader
        title="Hàng hóa"
        subtitle={`${items.length} mặt hàng`}
        action={
          <div className="flex items-center gap-2">
            <Btn variant="outline" onClick={() => setLabeling({})}><Tag size={14} /> In tem mã vạch</Btn>
            <Btn variant="outline" onClick={() => setImporting(true)}><Upload size={14} /> Nhập từ Excel</Btn>
            <Btn onClick={() => setEditing({})}><Plus size={15} /> Thêm hàng hóa</Btn>
          </div>
        }
      />
      <Toolbar query={query} setQuery={setQuery} placeholder="Tìm theo mã, tên hoặc mã vạch..." />
      {items.length === 0 ? (
        <EmptyState icon={Package} title="Chưa có hàng hóa" hint="Thêm mặt hàng đầu tiên để bắt đầu bán hàng." action={<Btn onClick={() => setEditing({})}><Plus size={15} /> Thêm hàng hóa</Btn>} />
      ) : (
        <Table
          columns={[
            { key: "ma", label: "Mã hàng" },
            { key: "ten", label: "Tên hàng" },
            { key: "ma_vach", label: "Mã vạch", render: (r) => r.ma_vach || "—" },
            { key: "dvt", label: "ĐVT" },
            { key: "gia_von", label: "Giá vốn", align: "right", render: (r) => fmtVND(r.gia_von) },
            { key: "gia_ban", label: "Giá bán", align: "right", render: (r) => fmtVND(r.gia_ban) },
            {
              key: "ton_kho",
              label: "Tồn kho",
              align: "right",
              render: (r) => (
                <span className={r.ton_kho <= (r.ton_toi_thieu || 0) ? "font-semibold" : ""} style={r.ton_kho <= (r.ton_toi_thieu || 0) ? { color: COLORS.red } : {}}>
                  {r.ton_kho ?? 0}
                </span>
              ),
            },
          ]}
          rows={filtered}
          onEdit={setEditing}
          onDelete={setToDelete}
          onPrint={(r) => setLabeling({ productId: r.id })}
        />
      )}
      {editing && (
        <Modal title={editing.id ? "Sửa hàng hóa" : "Thêm hàng hóa"} onClose={() => setEditing(null)}>
          <ProductForm initial={editing} warehouses={warehouses} allProducts={items} onCancel={() => setEditing(null)} onSave={save} />
        </Modal>
      )}
      {toDelete && (
        <ConfirmBar text={`Xóa hàng hóa "${toDelete.ten}"?`} onConfirm={() => { remove(toDelete.id); setToDelete(null); }} onCancel={() => setToDelete(null)} />
      )}
      {importing && (
        <ImportExcelModal
          title="Nhập hàng hóa từ Excel"
          columns={importColumns}
          templateName="mau-nhap-hang-hoa"
          templateSample={{ "Mã hàng": "SP001", "Tên hàng": "Xi măng bao 50kg", "Mã vạch": "8938501234567", "ĐVT": "Bao", "Giá vốn": 100000, "Giá bán": 130000, "Tồn kho": 0, "Tồn tối thiểu": 5, "Thuế suất VAT (%)": 10 }}
          validateRow={validateImportRow}
          toRecord={(r) => r}
          onClose={() => setImporting(false)}
          onImport={doImport}
        />
      )}
      {labeling && (
        <BarcodeLabelModal products={items} initialProductId={labeling.productId} onClose={() => setLabeling(null)} />
      )}
    </div>
  );
}

function ProductForm({ initial, warehouses, allProducts, onSave, onCancel }) {
  const [f, setF] = useState({
    ma: initial.ma || "",
    ten: initial.ten || "",
    dvt: initial.dvt || "Cái",
    ma_vach: initial.ma_vach || "",
    gia_von: initial.gia_von || 0,
    gia_ban: initial.gia_ban || 0,
    ton_kho: initial.ton_kho ?? 0,
    ton_toi_thieu: initial.ton_toi_thieu ?? 0,
    thue_suat_vat: initial.thue_suat_vat ?? 10,
    quan_ly_ton_kho: initial.quan_ly_ton_kho || "thuong",
    id: initial.id,
  });
  const [donViQuyDoi, setDonViQuyDoi] = useState(initial.don_vi_quy_doi || []);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [tonKhoTheoKho, setTonKhoTheoKho] = useState(initial.ton_kho_theo_kho || {});
  const [error, setError] = useState("");
  const useWarehouseBreakdown = warehouses && warehouses.length > 1;

  function addUnit() { setDonViQuyDoi((cur) => [...cur, { ten: "", ty_le: 1 }]); }
  function updateUnit(idx, patch) { setDonViQuyDoi((cur) => cur.map((u, i) => (i === idx ? { ...u, ...patch } : u))); }
  function removeUnit(idx) { setDonViQuyDoi((cur) => cur.filter((_, i) => i !== idx)); }

  function submit(e) {
    e.preventDefault();
    const others = (allProducts || []).filter((p) => p.id !== f.id);
    const maTrim = f.ma.trim();
    const vachTrim = f.ma_vach.trim();
    const dupMa = others.find((p) => p.ma?.trim().toLowerCase() === maTrim.toLowerCase());
    if (dupMa) { setError(`Mã hàng "${maTrim}" đã được dùng cho "${dupMa.ten}" — vui lòng đặt mã khác.`); return; }
    if (vachTrim) {
      const dupVach = others.find((p) => p.ma_vach?.trim() === vachTrim);
      if (dupVach) { setError(`Mã vạch "${vachTrim}" đã được dùng cho "${dupVach.ten}" — vui lòng kiểm tra lại.`); return; }
    }
    setError("");
    const payload = { ...f, don_vi_quy_doi: donViQuyDoi.filter((u) => u.ten && u.ty_le > 0) };
    if (useWarehouseBreakdown) {
      payload.ton_kho_theo_kho = tonKhoTheoKho;
      payload.ton_kho = warehouses.reduce((s, w) => s + (Number(tonKhoTheoKho[w.id]) || 0), 0);
    }
    onSave(payload);
  }

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
        <Field label="Mã hàng" required><input required className={inputCls} style={inputStyle} value={f.ma} onChange={(e) => setF({ ...f, ma: e.target.value })} /></Field>
        <Field label="Đơn vị tính cơ bản"><input className={inputCls} style={inputStyle} value={f.dvt} onChange={(e) => setF({ ...f, dvt: e.target.value })} /></Field>
      </div>
      <Field label="Tên hàng hóa" required><input required className={inputCls} style={inputStyle} value={f.ten} onChange={(e) => setF({ ...f, ten: e.target.value })} /></Field>
      <Field label="Mã vạch">
        <div className="flex items-center gap-2">
          <input className={inputCls} style={inputStyle} value={f.ma_vach} onChange={(e) => setF({ ...f, ma_vach: e.target.value })} placeholder="Gõ tay hoặc quét bằng camera..." />
          <Btn type="button" size="sm" variant="outline" onClick={() => setScannerOpen(true)}><ScanLine size={13.5} /> Quét</Btn>
        </div>
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
        <Field label="Giá vốn"><input type="number" className={inputCls} style={inputStyle} value={f.gia_von} onChange={(e) => setF({ ...f, gia_von: +e.target.value })} /></Field>
        <Field label="Giá bán"><input type="number" className={inputCls} style={inputStyle} value={f.gia_ban} onChange={(e) => setF({ ...f, gia_ban: +e.target.value })} /></Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
        {useWarehouseBreakdown ? (
          <div className="sm:col-span-2">
            <span className="block text-[12.5px] font-medium mb-1" style={{ color: COLORS.textMuted }}>Tồn kho hiện tại theo từng kho</span>
            <div className="rounded-md border mb-1" style={{ borderColor: COLORS.border }}>
              {warehouses.map((w) => (
                <div key={w.id} className="flex items-center justify-between gap-2 px-2.5 py-1.5 border-b last:border-b-0" style={{ borderColor: COLORS.border }}>
                  <span className="text-[13px]" style={{ color: COLORS.text }}>{w.ten}</span>
                  <input type="number" className={inputCls} style={{ ...inputStyle, width: 100 }} value={tonKhoTheoKho[w.id] ?? 0} onChange={(e) => setTonKhoTheoKho((cur) => ({ ...cur, [w.id]: +e.target.value }))} />
                </div>
              ))}
            </div>
            <div className="text-[12px] mb-2" style={{ color: COLORS.textMuted }}>Tổng tồn kho: {warehouses.reduce((s, w) => s + (Number(tonKhoTheoKho[w.id]) || 0), 0)} {f.dvt}</div>
          </div>
        ) : (
          <Field label="Tồn kho hiện tại"><input type="number" className={inputCls} style={inputStyle} value={f.ton_kho} onChange={(e) => setF({ ...f, ton_kho: +e.target.value })} /></Field>
        )}
        <Field label="Tồn tối thiểu (cảnh báo)"><input type="number" className={inputCls} style={inputStyle} value={f.ton_toi_thieu} onChange={(e) => setF({ ...f, ton_toi_thieu: +e.target.value })} /></Field>
      </div>
      <Field label="Thuế suất GTGT (%)"><input type="number" min="0" max="100" className={inputCls} style={{ ...inputStyle, width: 120 }} value={f.thue_suat_vat} onChange={(e) => setF({ ...f, thue_suat_vat: +e.target.value })} /></Field>

      <Field label="Quản lý tồn kho theo">
        <select className={inputCls} style={inputStyle} value={f.quan_ly_ton_kho} onChange={(e) => setF({ ...f, quan_ly_ton_kho: e.target.value })}>
          <option value="thuong">Hàng thường (không theo lô)</option>
          <option value="lo_han_dung">Lô + Hạn sử dụng</option>
          <option value="serial">Số serial / IMEI (từng cái riêng)</option>
        </select>
        {f.quan_ly_ton_kho !== "thuong" && (
          <div className="text-[11.5px] mt-1" style={{ color: COLORS.textMuted }}>
            Khi nhập/xuất hàng này, hệ thống sẽ yêu cầu {f.quan_ly_ton_kho === "serial" ? "nhập số serial/IMEI" : "khai số lô và hạn sử dụng"}.
          </div>
        )}
      </Field>

      <div className="mt-2 mb-2 text-[12.5px] font-medium" style={{ color: COLORS.textMuted }}>Đơn vị tính quy đổi (tùy chọn — VD: 1 Thùng = 12 {f.dvt || "Cái"})</div>
      {donViQuyDoi.length > 0 && (
        <div className="rounded-md border mb-2" style={{ borderColor: COLORS.border }}>
          {donViQuyDoi.map((u, idx) => (
            <div key={idx} className="flex items-center gap-2 px-2.5 py-1.5 border-b last:border-b-0" style={{ borderColor: COLORS.border }}>
              <input className={inputCls + " flex-1"} style={inputStyle} placeholder="Tên đơn vị (VD: Thùng)" value={u.ten} onChange={(e) => updateUnit(idx, { ten: e.target.value })} />
              <span className="text-[12px] shrink-0" style={{ color: COLORS.textMuted }}>=</span>
              <input type="number" min="1" className={inputCls} style={{ ...inputStyle, width: 80 }} value={u.ty_le} onChange={(e) => updateUnit(idx, { ty_le: +e.target.value })} />
              <span className="text-[12px] shrink-0" style={{ color: COLORS.textMuted }}>{f.dvt || "Cái"}</span>
              <button type="button" onClick={() => removeUnit(idx)} className="p-1 rounded hover:bg-slate-100"><X size={14} color={COLORS.textMuted} /></button>
            </div>
          ))}
        </div>
      )}
      <button type="button" onClick={addUnit} className="mb-3 text-[12.5px] font-medium flex items-center gap-1" style={{ color: COLORS.navy }}>
        <Plus size={13} /> Thêm đơn vị quy đổi
      </button>

      {error && (
        <div className="mb-3 px-3 py-2 rounded-md text-[12.5px] flex items-start gap-2" style={{ background: COLORS.redBg, color: COLORS.red }}>
          <AlertTriangle size={13} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
        <Btn type="button" variant="outline" onClick={onCancel}>Hủy</Btn>
        <Btn type="submit">Lưu</Btn>
      </div>
      {scannerOpen && (
        <BarcodeScannerModal
          onClose={() => setScannerOpen(false)}
          onDetected={(code) => { setF((cur) => ({ ...cur, ma_vach: code })); setScannerOpen(false); }}
        />
      )}
    </form>
  );
}

function PartnerPage({ store, kind, priceLists }) {
  // kind: 'customer' | 'supplier'
  const { items, add, update, remove, persist } = store;
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [importing, setImporting] = useState(false);
  const label = kind === "customer" ? "khách hàng" : "nhà cung cấp";
  const prefix = kind === "customer" ? "KH" : "NCC";
  const priceListName = (id) => (priceLists || []).find((p) => p.id === id)?.ten;

  const q = query.trim().toLowerCase();
  const filtered = items.filter(
    (p) =>
      !q ||
      p.ten?.toLowerCase().includes(q) ||
      p.dien_thoai?.includes(q) ||
      p.dia_chi?.toLowerCase().includes(q) ||
      p.ma_so_thue?.toLowerCase().includes(q)
  );

  function save(form) {
    if (form.id) update(form.id, form);
    else add({ ...form, id: uid(prefix) });
    setEditing(null);
  }

  const importColumns = [
    { header: "Tên", key: "ten", required: true },
    { header: "Điện thoại", key: "dien_thoai" },
    { header: "Địa chỉ", key: "dia_chi" },
    { header: "Mã số thuế", key: "ma_so_thue" },
    { header: "Nợ đầu kỳ", key: "no_dau", type: "number" },
    ...(kind === "customer" ? [{ header: "Hạn mức công nợ", key: "han_muc_cong_no", type: "number" }] : []),
  ];

  function validateImportRow(r) {
    if (!r.ten) return "Thiếu tên";
    return null;
  }

  function doImport(records) {
    const toAdd = records.map((r) => ({ ...r, id: uid(prefix) }));
    persist([...items, ...toAdd], "create", { silent: true });
    toast(`Đã nhập ${toAdd.length} ${label} từ Excel.`);
  }

  return (
    <div>
      <PageHeader
        title={kind === "customer" ? "Khách hàng" : "Nhà cung cấp"}
        subtitle={`${items.length} ${label}`}
        action={
          <div className="flex items-center gap-2">
            <Btn variant="outline" onClick={() => setImporting(true)}><Upload size={14} /> Nhập từ Excel</Btn>
            <Btn onClick={() => setEditing({})}><Plus size={15} /> Thêm {label}</Btn>
          </div>
        }
      />
      <Toolbar query={query} setQuery={setQuery} placeholder={`Tìm tên, SĐT, địa chỉ hoặc MST ${label}...`} />
      {items.length === 0 ? (
        <EmptyState icon={kind === "customer" ? Users : Truck} title={`Chưa có ${label}`} hint={`Thêm ${label} đầu tiên để bắt đầu ghi nhận giao dịch.`} action={<Btn onClick={() => setEditing({})}><Plus size={15} /> Thêm {label}</Btn>} />
      ) : (
        <Table
          columns={[
            { key: "ten", label: "Tên" },
            { key: "dien_thoai", label: "Điện thoại" },
            { key: "dia_chi", label: "Địa chỉ" },
            ...(kind === "customer" ? [
              { key: "bang_gia_id", label: "Bảng giá", render: (r) => priceListName(r.bang_gia_id) ? <Badge tone="muted">{priceListName(r.bang_gia_id)}</Badge> : "—" },
              { key: "chiet_khau_pct", label: "Chiết khấu", align: "right", render: (r) => (r.chiet_khau_pct ? `${r.chiet_khau_pct}%` : "—") },
            ] : []),
            { key: "no_dau", label: "Nợ đầu kỳ", align: "right", render: (r) => fmtVND(r.no_dau) },
            ...(kind === "customer" ? [{ key: "han_muc_cong_no", label: "Hạn mức nợ", align: "right", render: (r) => (r.han_muc_cong_no > 0 ? fmtVND(r.han_muc_cong_no) : "Không giới hạn") }] : []),
          ]}
          rows={filtered}
          onEdit={setEditing}
          onDelete={setToDelete}
        />
      )}
      {editing && (
        <Modal title={editing.id ? `Sửa ${label}` : `Thêm ${label}`} onClose={() => setEditing(null)}>
          <PartnerForm initial={editing} kind={kind} priceLists={priceLists} onCancel={() => setEditing(null)} onSave={save} />
        </Modal>
      )}
      {toDelete && (
        <ConfirmBar text={`Xóa "${toDelete.ten}"?`} onConfirm={() => { remove(toDelete.id); setToDelete(null); }} onCancel={() => setToDelete(null)} />
      )}
      {importing && (
        <ImportExcelModal
          title={`Nhập ${label} từ Excel`}
          columns={importColumns}
          templateName={`mau-nhap-${kind === "customer" ? "khach-hang" : "nha-cung-cap"}`}
          templateSample={{
            "Tên": kind === "customer" ? "Nguyễn Văn A" : "Công ty TNHH ABC",
            "Điện thoại": "0901234567",
            "Địa chỉ": "123 Đường ABC, Quy Nhơn",
            "Mã số thuế": "",
            "Nợ đầu kỳ": 0,
            ...(kind === "customer" ? { "Hạn mức công nợ": 0 } : {}),
          }}
          validateRow={validateImportRow}
          toRecord={(r) => r}
          onClose={() => setImporting(false)}
          onImport={doImport}
        />
      )}
    </div>
  );
}

function PartnerForm({ initial, onSave, onCancel, kind, priceLists }) {
  const [f, setF] = useState({
    ten: initial.ten || "",
    dien_thoai: initial.dien_thoai || "",
    dia_chi: initial.dia_chi || "",
    ma_so_thue: initial.ma_so_thue || "",
    no_dau: initial.no_dau || 0,
    han_muc_cong_no: initial.han_muc_cong_no || 0,
    bang_gia_id: initial.bang_gia_id || "",
    chiet_khau_pct: initial.chiet_khau_pct || 0,
    id: initial.id,
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(f); }}>
      <Field label="Tên" required><input required className={inputCls} style={inputStyle} value={f.ten} onChange={(e) => setF({ ...f, ten: e.target.value })} /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
        <Field label="Điện thoại"><input className={inputCls} style={inputStyle} value={f.dien_thoai} onChange={(e) => setF({ ...f, dien_thoai: e.target.value })} /></Field>
        <Field label="Nợ đầu kỳ"><input type="number" className={inputCls} style={inputStyle} value={f.no_dau} onChange={(e) => setF({ ...f, no_dau: +e.target.value })} /></Field>
      </div>
      <Field label="Địa chỉ"><input className={inputCls} style={inputStyle} value={f.dia_chi} onChange={(e) => setF({ ...f, dia_chi: e.target.value })} /></Field>
      <Field label="Mã số thuế"><input className={inputCls} style={inputStyle} value={f.ma_so_thue} onChange={(e) => setF({ ...f, ma_so_thue: e.target.value })} placeholder="Để in lên hóa đơn (nếu có)" /></Field>
      {kind === "customer" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
          <Field label="Bảng giá áp dụng">
            <select className={inputCls} style={inputStyle} value={f.bang_gia_id} onChange={(e) => setF({ ...f, bang_gia_id: e.target.value })}>
              <option value="">-- Giá bán mặc định --</option>
              {(priceLists || []).map((p) => <option key={p.id} value={p.id}>{p.ten}</option>)}
            </select>
          </Field>
          <Field label="Chiết khấu mặc định (%)"><input type="number" min="0" max="100" className={inputCls} style={inputStyle} value={f.chiet_khau_pct} onChange={(e) => setF({ ...f, chiet_khau_pct: +e.target.value })} /></Field>
        </div>
      )}
      {kind === "customer" && (
        <Field label="Hạn mức công nợ">
          <input type="number" min="0" className={inputCls} style={inputStyle} value={f.han_muc_cong_no} onChange={(e) => setF({ ...f, han_muc_cong_no: +e.target.value })} placeholder="Để trống hoặc 0 = không giới hạn" />
        </Field>
      )}
      <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
        <Btn type="button" variant="outline" onClick={onCancel}>Hủy</Btn>
        <Btn type="submit">Lưu</Btn>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Bảng giá (customer-specific price lists)                            */
/* ------------------------------------------------------------------ */
function PriceListsPage({ store, products }) {
  const { items, add, update, remove } = store;
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  function save(form) {
    if (form.id) update(form.id, form);
    else add({ ...form, id: uid("BG") });
    setEditing(null);
  }

  return (
    <div>
      <PageHeader
        title="Bảng giá"
        subtitle="Thiết lập giá bán riêng theo từng nhóm khách hàng"
        action={<Btn onClick={() => setEditing({})}><Plus size={15} /> Thêm bảng giá</Btn>}
      />
      {items.length === 0 ? (
        <EmptyState icon={Tag} title="Chưa có bảng giá" hint="Tạo bảng giá riêng (VD: Giá đại lý, Giá VIP) rồi gán cho khách hàng trong mục Khách hàng." action={<Btn onClick={() => setEditing({})}><Plus size={15} /> Thêm bảng giá</Btn>} />
      ) : (
        <Table
          columns={[
            { key: "ten", label: "Tên bảng giá" },
            { key: "ghi_chu", label: "Ghi chú" },
            { key: "so_mat_hang", label: "Số mặt hàng có giá riêng", align: "right", render: (r) => Object.keys(r.gia || {}).length },
          ]}
          rows={items}
          onEdit={setEditing}
          onDelete={setToDelete}
        />
      )}
      {editing && (
        <Modal title={editing.id ? "Sửa bảng giá" : "Thêm bảng giá"} onClose={() => setEditing(null)} width="max-w-2xl">
          <PriceListForm initial={editing} products={products} onCancel={() => setEditing(null)} onSave={save} />
        </Modal>
      )}
      {toDelete && (
        <ConfirmBar text={`Xóa bảng giá "${toDelete.ten}"?`} onConfirm={() => { remove(toDelete.id); setToDelete(null); }} onCancel={() => setToDelete(null)} />
      )}
    </div>
  );
}

function PriceListForm({ initial, products, onSave, onCancel }) {
  const [ten, setTen] = useState(initial.ten || "");
  const [ghiChu, setGhiChu] = useState(initial.ghi_chu || "");
  const [gia, setGia] = useState(initial.gia || {});

  function setPrice(productId, value) {
    setGia((cur) => {
      const next = { ...cur };
      if (!value) delete next[productId];
      else next[productId] = +value;
      return next;
    });
  }

  function submit(e) {
    e.preventDefault();
    onSave({ ten, ghi_chu: ghiChu, gia, id: initial.id });
  }

  return (
    <form onSubmit={submit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
        <Field label="Tên bảng giá" required><input required className={inputCls} style={inputStyle} value={ten} onChange={(e) => setTen(e.target.value)} /></Field>
        <Field label="Ghi chú"><input className={inputCls} style={inputStyle} value={ghiChu} onChange={(e) => setGhiChu(e.target.value)} /></Field>
      </div>
      <div className="mt-1 mb-2 text-[12.5px] font-medium" style={{ color: COLORS.textMuted }}>
        Giá riêng theo hàng hóa — để trống nếu áp dụng giá bán mặc định
      </div>
      <div className="rounded-md border max-h-72 overflow-y-auto" style={{ borderColor: COLORS.border }}>
        {products.length === 0 ? (
          <div className="p-3 text-[13px]" style={{ color: COLORS.textMuted }}>Chưa có hàng hóa nào.</div>
        ) : (
          products.map((p) => (
            <div key={p.id} className="flex items-center gap-2 px-2.5 py-1.5 border-b last:border-b-0" style={{ borderColor: COLORS.border }}>
              <div className="flex-1 text-[13px]" style={{ color: COLORS.text }}>{p.ten}</div>
              <div className="text-[12px] w-24 text-right" style={{ color: COLORS.textMuted }}>{fmtVND(p.gia_ban)}</div>
              <input
                type="number"
                min="0"
                placeholder="Giá riêng"
                className={inputCls}
                style={{ ...inputStyle, width: 120 }}
                value={gia[p.id] ?? ""}
                onChange={(e) => setPrice(p.id, e.target.value)}
              />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
        <Btn type="button" variant="outline" onClick={onCancel}>Hủy</Btn>
        <Btn type="submit">Lưu bảng giá</Btn>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Kênh bán hàng / Chi nhánh                                            */
/* ------------------------------------------------------------------ */
function ChannelsPage({ store }) {
  const { items, add, update, remove } = store;
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  function save(form) {
    if (form.id) update(form.id, form);
    else add({ ...form, id: uid("KENH") });
    setEditing(null);
  }

  return (
    <div>
      <PageHeader
        title="Kênh bán hàng"
        subtitle="Cửa hàng, chi nhánh, sàn online... để theo dõi doanh thu theo từng kênh"
        action={<Btn onClick={() => setEditing({})}><Plus size={15} /> Thêm kênh</Btn>}
      />
      {items.length === 0 ? (
        <EmptyState icon={Store} title="Chưa có kênh bán hàng" hint="Thêm cửa hàng/chi nhánh/kênh online để gắn vào đơn bán hàng." action={<Btn onClick={() => setEditing({})}><Plus size={15} /> Thêm kênh</Btn>} />
      ) : (
        <Table
          columns={[
            { key: "ten", label: "Tên kênh" },
            { key: "loai", label: "Loại" },
            { key: "dia_chi", label: "Địa chỉ / Ghi chú" },
          ]}
          rows={items}
          onEdit={setEditing}
          onDelete={setToDelete}
        />
      )}
      {editing && (
        <Modal title={editing.id ? "Sửa kênh bán hàng" : "Thêm kênh bán hàng"} onClose={() => setEditing(null)}>
          <ChannelForm initial={editing} onCancel={() => setEditing(null)} onSave={save} />
        </Modal>
      )}
      {toDelete && (
        <ConfirmBar text={`Xóa kênh "${toDelete.ten}"?`} onConfirm={() => { remove(toDelete.id); setToDelete(null); }} onCancel={() => setToDelete(null)} />
      )}
    </div>
  );
}

function ChannelForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState({ ten: initial.ten || "", loai: initial.loai || "Cửa hàng", dia_chi: initial.dia_chi || "", id: initial.id });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(f); }}>
      <Field label="Tên kênh" required><input required className={inputCls} style={inputStyle} value={f.ten} onChange={(e) => setF({ ...f, ten: e.target.value })} /></Field>
      <Field label="Loại">
        <select className={inputCls} style={inputStyle} value={f.loai} onChange={(e) => setF({ ...f, loai: e.target.value })}>
          <option>Cửa hàng</option>
          <option>Chi nhánh</option>
          <option>Online</option>
          <option>Đại lý</option>
          <option>Khác</option>
        </select>
      </Field>
      <Field label="Địa chỉ / Ghi chú"><input className={inputCls} style={inputStyle} value={f.dia_chi} onChange={(e) => setF({ ...f, dia_chi: e.target.value })} /></Field>
      <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
        <Btn type="button" variant="outline" onClick={onCancel}>Hủy</Btn>
        <Btn type="submit">Lưu</Btn>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Kho / Chi nhánh                                                     */
/* ------------------------------------------------------------------ */
function WarehousesPage({ store }) {
  const { items, add, update, remove } = store;
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  function save(form) {
    if (form.id) update(form.id, form);
    else add({ ...form, id: uid("KHO") });
    setEditing(null);
  }

  return (
    <div>
      <PageHeader
        title="Kho / Chi nhánh"
        subtitle="Các địa điểm lưu trữ hàng hóa — tồn kho sẽ được theo dõi riêng theo từng kho"
        action={<Btn onClick={() => setEditing({})}><Plus size={15} /> Thêm kho</Btn>}
      />
      {items.length === 0 ? (
        <EmptyState
          icon={Store}
          title="Chưa có kho / chi nhánh nào"
          hint="Nếu shop chỉ có 1 địa điểm, bạn không cần tạo kho — hệ thống mặc định coi như 1 kho chung. Chỉ tạo khi có từ 2 địa điểm trở lên."
          action={<Btn onClick={() => setEditing({})}><Plus size={15} /> Thêm kho</Btn>}
        />
      ) : (
        <Table
          columns={[
            { key: "ten", label: "Tên kho / chi nhánh" },
            { key: "dia_chi", label: "Địa chỉ" },
          ]}
          rows={items}
          onEdit={setEditing}
          onDelete={setToDelete}
        />
      )}
      {items.length === 1 && (
        <div className="mt-3 px-3 py-2 rounded-md text-[12px]" style={{ background: COLORS.goldBg, color: "#5C4109" }}>
          Bạn mới có 1 kho nên các form giao dịch sẽ không hiện ô chọn kho (mặc định dùng kho này). Thêm kho thứ 2 để bắt đầu chọn kho khi giao dịch.
        </div>
      )}
      {editing && (
        <Modal title={editing.id ? "Sửa kho" : "Thêm kho"} onClose={() => setEditing(null)}>
          <WarehouseForm initial={editing} onCancel={() => setEditing(null)} onSave={save} />
        </Modal>
      )}
      {toDelete && (
        <ConfirmBar text={`Xóa "${toDelete.ten}"? Lưu ý: tồn kho đã ghi nhận cho kho này sẽ không tự động chuyển sang kho khác.`} onConfirm={() => { remove(toDelete.id); setToDelete(null); }} onCancel={() => setToDelete(null)} />
      )}
    </div>
  );
}

function WarehouseForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState({ ten: initial.ten || "", dia_chi: initial.dia_chi || "", id: initial.id });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(f); }}>
      <Field label="Tên kho / chi nhánh" required><input required className={inputCls} style={inputStyle} value={f.ten} onChange={(e) => setF({ ...f, ten: e.target.value })} placeholder="VD: Kho chính, Chi nhánh Quận 1..." /></Field>
      <Field label="Địa chỉ"><input className={inputCls} style={inputStyle} value={f.dia_chi} onChange={(e) => setF({ ...f, dia_chi: e.target.value })} /></Field>
      <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
        <Btn type="button" variant="outline" onClick={onCancel}>Hủy</Btn>
        <Btn type="submit">Lưu</Btn>
      </div>
    </form>
  );
}

/* Helper: apply a stock delta to a product, updating both the total ton_kho
   (used everywhere else in the app — reports, NXT, low-stock alerts...) and,
   when a warehouse is specified, the per-warehouse breakdown too. This keeps
   every existing calculation working unchanged while adding location detail
   on top for shops that use it. */
function adjustProductStock(product, delta, whId) {
  const next = { ...product, ton_kho: (product.ton_kho || 0) + delta };
  if (whId) {
    const breakdown = { ...(product.ton_kho_theo_kho || {}) };
    breakdown[whId] = (breakdown[whId] || 0) + delta;
    next.ton_kho_theo_kho = breakdown;
  }
  return next;
}

/* Giá vốn bình quân gia quyền: mỗi lần nhập thêm hàng với giá khác, giá vốn
   của mặt hàng được cập nhật thành bình quân theo số lượng đang có + số lượng
   mới nhập. Không hoàn tác khi xóa phiếu nhập (giá vốn không "gỡ" lại được
   một cách đáng tin cậy nếu đã có lượt bán xảy ra sau đó). */
function weightedAvgCost(oldQty, oldCost, addQty, addCost) {
  const q0 = Number(oldQty) || 0;
  const q1 = Number(addQty) || 0;
  const newQty = q0 + q1;
  if (newQty <= 0) return Number(oldCost) || 0;
  if (q0 <= 0) return Number(addCost) || 0;
  return Math.round((q0 * (Number(oldCost) || 0) + q1 * (Number(addCost) || 0)) / newQty);
}

/* ------------------------------------------------------------------ */
/* Lô hàng / Serial — phân bổ khi bán ra theo nguyên tắc hết hạn trước   */
/* xuất trước (FEFO) cho hàng theo lô, hoặc nhập trước xuất trước cho    */
/* hàng theo serial (vì serial không có hạn dùng để so sánh).           */
/* ------------------------------------------------------------------ */
function availableLotsFor(lots, productId, khoId) {
  return (lots || [])
    .filter((l) => l.hang_hoa_id === productId && (l.so_luong || 0) > 0 && (!khoId || !l.kho_id || l.kho_id === khoId))
    .sort((a, b) => {
      // Có hạn dùng: hết hạn trước lên trước (FEFO). Không có hạn dùng: nhập trước lên trước (FIFO).
      if (a.han_su_dung && b.han_su_dung) return a.han_su_dung.localeCompare(b.han_su_dung);
      if (a.han_su_dung) return -1;
      if (b.han_su_dung) return 1;
      return (a.ngay_nhap || "").localeCompare(b.ngay_nhap || "");
    });
}

/** Trả về { allocations: [{lot_id, ma_lo, so_luong}], shortfall } — shortfall > 0 nếu không đủ lô để xuất. */
function phanBoLoHang(lots, productId, khoId, soLuongCan) {
  const avail = availableLotsFor(lots, productId, khoId);
  let remaining = soLuongCan;
  const allocations = [];
  for (const lot of avail) {
    if (remaining <= 0) break;
    const take = Math.min(lot.so_luong, remaining);
    if (take > 0) {
      allocations.push({ lot_id: lot.id, ma_lo: lot.ma_lo, han_su_dung: lot.han_su_dung, so_luong: take });
      remaining -= take;
    }
  }
  return { allocations, shortfall: Math.max(0, remaining) };
}

function tongTonTheoLo(lots, productId, khoId) {
  return availableLotsFor(lots, productId, khoId).reduce((s, l) => s + (l.so_luong || 0), 0);
}

/** Áp dụng thay đổi lô khi lưu một chứng từ mua/bán — trả về mảng lots mới.
    Mua: tạo bản ghi lô mới (1 bản ghi cho lô có hạn dùng, hoặc 1 bản ghi/serial).
    Bán: trừ dần vào các lô đã chốt phân bổ (lo_phan_bo) lúc lập chứng từ, dọn lô về 0. */
function applyLotChanges(lots, isSale, items, khoId) {
  let next = [...(lots || [])];
  items.forEach((it) => {
    if (!isSale) {
      if (it.serials?.length) {
        it.serials.forEach((sn) => {
          next.push({ id: uid("LOT"), hang_hoa_id: it.hang_hoa_id, ma_lo: sn, han_su_dung: undefined, so_luong: 1, kho_id: khoId, ngay_nhap: todayStr() });
        });
      } else if (it.ma_lo) {
        next.push({ id: uid("LOT"), hang_hoa_id: it.hang_hoa_id, ma_lo: it.ma_lo, han_su_dung: it.han_su_dung || undefined, so_luong: it.so_luong, kho_id: khoId, ngay_nhap: todayStr() });
      }
    } else {
      (it.lo_phan_bo || []).forEach((alloc) => {
        next = next.map((l) => (l.id === alloc.lot_id ? { ...l, so_luong: Math.max(0, (l.so_luong || 0) - alloc.so_luong) } : l));
      });
    }
  });
  return next.filter((l) => (l.so_luong || 0) > 0);
}
/** Tổng tiền phải thu/trả của MỘT chứng từ, đã gồm thuế GTGT nếu có. */
function invoiceGrandTotal(inv) {
  return (inv?.tong_tien || 0) + (inv?.thue_gtgt || 0);
}

function tinhConNoKhachHang(customer, sales, receipts, salereturns) {
  const banHang = (sales || []).filter((s) => s.doi_tac_id === customer.id).reduce((s, i) => s + invoiceGrandTotal(i), 0);
  const daThuTrenHD = (sales || []).filter((s) => s.doi_tac_id === customer.id).reduce((s, i) => s + (i.da_thanh_toan || 0), 0);
  const thuThem = (receipts || []).filter((r) => r.doi_tac_id === customer.id).reduce((s, i) => s + (i.so_tien || 0), 0);
  const traHang = (salereturns || []).filter((r) => r.doi_tac_id === customer.id).reduce((s, i) => s + (i.tong_tien || 0), 0);
  return (customer.no_dau || 0) + banHang - daThuTrenHD - thuThem - traHang;
}

function tinhConNoNCC(supplier, purchases, payments, purchasereturns) {
  const muaHang = (purchases || []).filter((s) => s.doi_tac_id === supplier.id).reduce((s, i) => s + invoiceGrandTotal(i), 0);
  const daTraTrenHD = (purchases || []).filter((s) => s.doi_tac_id === supplier.id).reduce((s, i) => s + (i.da_thanh_toan || 0), 0);
  const traThem = (payments || []).filter((r) => r.doi_tac_id === supplier.id).reduce((s, i) => s + (i.so_tien || 0), 0);
  const traHang = (purchasereturns || []).filter((r) => r.doi_tac_id === supplier.id).reduce((s, i) => s + (i.tong_tien || 0), 0);
  return (supplier.no_dau || 0) + muaHang - daTraTrenHD - traThem - traHang;
}

/** Tuổi nợ theo từng chứng từ chưa thu/trả hết, phân bổ các khoản thu/trả
    thêm và trả hàng theo nguyên tắc "hóa đơn cũ nhất trước" (FIFO). */
function tinhTuoiNo(partnerId, noDauKy, invoices, extraPayments, returns) {
  const rows = (invoices || [])
    .filter((s) => s.doi_tac_id === partnerId)
    .map((s) => ({ ngay: s.ngay, con: invoiceGrandTotal(s) - (s.da_thanh_toan || 0) }))
    .filter((x) => x.con > 0.5)
    .sort((a, b) => (a.ngay || "").localeCompare(b.ngay || ""));

  if ((noDauKy || 0) > 0.5) rows.unshift({ ngay: "2000-01-01", con: noDauKy });

  let extra =
    (extraPayments || []).filter((r) => r.doi_tac_id === partnerId).reduce((s, i) => s + (i.so_tien || 0), 0) +
    (returns || []).filter((r) => r.doi_tac_id === partnerId).reduce((s, i) => s + (i.tong_tien || 0), 0);

  const today = todayStr();
  const buckets = { d0_30: 0, d31_60: 0, d61_90: 0, d90: 0 };
  for (const row of rows) {
    let con = row.con;
    if (extra > 0) {
      const apply = Math.min(extra, con);
      con -= apply;
      extra -= apply;
    }
    if (con <= 0.5) continue;
    const age = Math.floor((new Date(today) - new Date(row.ngay)) / 86400000);
    if (age <= 30) buckets.d0_30 += con;
    else if (age <= 60) buckets.d31_60 += con;
    else if (age <= 90) buckets.d61_90 += con;
    else buckets.d90 += con;
  }
  return buckets;
}

/* ------------------------------------------------------------------ */
/* Hóa đơn điện tử — cấu hình đánh số (chưa nộp thuế điện tử thật)      */
/* ------------------------------------------------------------------ */
const EINVOICE_PROVIDERS = ["Viettel S-Invoice", "MISA meInvoice", "VNPT Invoice", "Khác / chưa chọn"];

const PAPER_SIZES = [
  { key: "A4", label: "A4 — khổ dọc (mặc định)" },
  { key: "A5", label: "A5 — khổ ngang, nửa tờ A4" },
  { key: "K80", label: "K80 — máy in nhiệt 80mm (POS)" },
];

function CompanySettingsPage({ store }) {
  const { items, persist } = store;
  const saved = items[0] || null;
  const [f, setF] = useState({ ...COMPANY_DEFAULT, ...(saved || {}) });

  const [submit, busy] = useSubmitGuard(async (e) => {
    e.preventDefault();
    const row = { ...f, id: "COMPANY" };
    persist([row], "update", { silent: true });
    setCurrentCompany(row);
    toast("Đã lưu thông tin công ty — các mẫu in sẽ dùng thông tin này.");
  });

  return (
    <div>
      <PageHeader
        title="Thông tin công ty"
        subtitle="Dùng chung cho tất cả mẫu in: hóa đơn, phiếu thu/chi, phiếu kho, phiếu trả hàng"
      />

      <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
        <div className="lg:col-span-2 space-y-3">
          <div className="rounded-lg p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
            <div className="text-[13.5px] font-semibold mb-3" style={{ color: COLORS.text }}>Pháp nhân</div>
            <Field label="Tên công ty / hộ kinh doanh" required>
              <input required className={inputCls} style={inputStyle} value={f.ten} onChange={(e) => setF({ ...f, ten: e.target.value })} placeholder="VD: CÔNG TY TNHH XÂY DỰNG NTCONS" />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
              <Field label="Mã số thuế">
                <input className={inputCls} style={inputStyle} value={f.ma_so_thue} onChange={(e) => setF({ ...f, ma_so_thue: e.target.value })} placeholder="VD: 0123456789" />
              </Field>
              <Field label="Điện thoại">
                <input className={inputCls} style={inputStyle} value={f.dien_thoai} onChange={(e) => setF({ ...f, dien_thoai: e.target.value })} />
              </Field>
            </div>
            <Field label="Địa chỉ">
              <input className={inputCls} style={inputStyle} value={f.dia_chi} onChange={(e) => setF({ ...f, dia_chi: e.target.value })} placeholder="Số nhà, đường, phường/xã, tỉnh/thành" />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
              <Field label="Email"><input type="email" className={inputCls} style={inputStyle} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
              <Field label="Website"><input className={inputCls} style={inputStyle} value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} /></Field>
            </div>
          </div>

          <div className="rounded-lg p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
            <div className="text-[13.5px] font-semibold mb-3" style={{ color: COLORS.text }}>Tài khoản ngân hàng (in trên hóa đơn)</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
              <Field label="Ngân hàng"><input className={inputCls} style={inputStyle} value={f.ngan_hang} onChange={(e) => setF({ ...f, ngan_hang: e.target.value })} placeholder="VD: Vietcombank — CN Quy Nhơn" /></Field>
              <Field label="Số tài khoản"><input className={inputCls} style={inputStyle} value={f.so_tai_khoan} onChange={(e) => setF({ ...f, so_tai_khoan: e.target.value })} /></Field>
            </div>
            <Field label="Chủ tài khoản"><input className={inputCls} style={inputStyle} value={f.chu_tai_khoan} onChange={(e) => setF({ ...f, chu_tai_khoan: e.target.value })} /></Field>
          </div>

          <div className="rounded-lg p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
            <div className="text-[13.5px] font-semibold mb-3" style={{ color: COLORS.text }}>Tùy chọn in</div>
            <Field label="Khổ giấy mặc định">
              <select className={inputCls} style={inputStyle} value={f.kho_giay} onChange={(e) => setF({ ...f, kho_giay: e.target.value })}>
                {PAPER_SIZES.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
              </select>
            </Field>
            <label className="flex items-start gap-2 mb-3 cursor-pointer">
              <input type="checkbox" className="mt-0.5" checked={!!f.in_thue_gtgt} onChange={(e) => setF({ ...f, in_thue_gtgt: e.target.checked })} />
              <span className="text-[12.5px]" style={{ color: COLORS.text }}>
                In thêm dòng <b>Thuế GTGT</b> và <b>Tổng thanh toán</b> trên hóa đơn bán hàng
                <span className="block text-[11.5px] mt-0.5" style={{ color: COLORS.textMuted }}>
                  Thuế được tính từ thuế suất khai trên từng mặt hàng. Giá bán đang nhập là giá <b>chưa gồm thuế</b>.
                </span>
              </span>
            </label>
            <Field label="Chân trang chứng từ">
              <input className={inputCls} style={inputStyle} value={f.chan_trang} onChange={(e) => setF({ ...f, chan_trang: e.target.value })} placeholder="VD: Cảm ơn quý khách — hàng đã mua vui lòng đổi trong 7 ngày" />
            </Field>
          </div>

          <div className="flex items-center gap-2">
            <Btn type="submit" busy={busy}>Lưu thông tin công ty</Btn>
          </div>
        </div>

        {/* Xem trước phần đầu chứng từ */}
        <div className="rounded-lg p-4 lg:sticky lg:top-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
          <div className="text-[13.5px] font-semibold mb-3" style={{ color: COLORS.text }}>Xem trước đầu chứng từ</div>
          <div className="rounded-md p-3 text-[11.5px] leading-relaxed" style={{ background: "#fff", border: `1px dashed ${COLORS.border}`, color: "#1a1a1a" }}>
            <div className="flex items-start gap-2">
              <img src={LOGO_SRC} alt="" className="w-10 h-10 object-contain shrink-0" />
              <div className="min-w-0">
                <div className="font-bold uppercase">{f.ten || "Tên công ty"}</div>
                {f.ma_so_thue && <div>MST: {f.ma_so_thue}</div>}
                {f.dia_chi && <div>{f.dia_chi}</div>}
                {(f.dien_thoai || f.email) && <div>{[f.dien_thoai && `ĐT: ${f.dien_thoai}`, f.email].filter(Boolean).join(" · ")}</div>}
                {f.so_tai_khoan && <div>STK: {f.so_tai_khoan}{f.ngan_hang ? ` — ${f.ngan_hang}` : ""}</div>}
              </div>
            </div>
            <div className="mt-3 pt-2" style={{ borderTop: "1px solid #ddd" }}>
              <div className="text-center font-bold uppercase text-[13px]">Hóa đơn bán hàng</div>
              <div className="text-center">Số: HD000123 · Ngày {fmtDate(todayStr())}</div>
            </div>
            <div className="mt-3 pt-2 text-right" style={{ borderTop: "1px solid #ddd" }}>
              <div>Cộng tiền hàng: 1.250.000đ</div>
              {f.in_thue_gtgt && <div>Thuế GTGT: 125.000đ</div>}
              <div className="font-bold">Tổng thanh toán: {f.in_thue_gtgt ? "1.375.000đ" : "1.250.000đ"}</div>
              <div className="italic text-left mt-1">
                Bằng chữ: {docTienBangChu(f.in_thue_gtgt ? 1375000 : 1250000)}
              </div>
            </div>
            {f.chan_trang && <div className="mt-3 text-center italic">{f.chan_trang}</div>}
          </div>
          <div className="text-[11.5px] mt-3" style={{ color: COLORS.textMuted }}>
            Khổ giấy mặc định: <b style={{ color: COLORS.text }}>{f.kho_giay}</b>. Khi in vẫn có thể đổi khổ ngay trên màn hình in.
          </div>
        </div>
      </form>
    </div>
  );
}

function EInvoiceSettingsPage({ store }) {
  const { items, persist } = store;
  const config = items[0] || null;
  const [f, setF] = useState({
    nha_cung_cap: config?.nha_cung_cap || EINVOICE_PROVIDERS[3],
    mau_so: config?.mau_so || "1",
    ky_hieu: config?.ky_hieu || "",
    so_hien_tai: config?.so_hien_tai ?? 1,
  });
  const [saved, setSaved] = useState(false);

  function submit(e) {
    e.preventDefault();
    persist([{ id: "EINV_CONFIG", ...f, so_hien_tai: Number(f.so_hien_tai) || 1 }]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <PageHeader title="Hóa đơn điện tử" subtitle="Cấu hình đánh số hóa đơn theo đúng quy cách pháp lý (mẫu số, ký hiệu, số hóa đơn tuần tự)" />

      <div className="mb-4 px-3 py-2.5 rounded-md text-[12.5px] flex items-start gap-2" style={{ background: COLORS.amberBg, color: "#5C4109" }}>
        <AlertTriangle size={14} className="mt-0.5 shrink-0" />
        <span>
          Mục này chỉ giúp <b>đánh số hóa đơn đúng chuẩn</b> (mẫu số, ký hiệu, số tuần tự) để in ra chứng từ hợp lệ về mặt hình thức.
          Đây <b>không phải</b> kết nối thật với Viettel/MISA/VNPT để phát hành hóa đơn điện tử hợp pháp và nộp cho cơ quan thuế — việc đó cần bạn đăng ký tài khoản merchant với 1 trong 3 nhà cung cấp và cung cấp API key cho mình để nối tiếp.
        </span>
      </div>

      <div className="rounded-lg p-4 max-w-xl" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
        <form onSubmit={submit}>
          <Field label="Nhà cung cấp hóa đơn điện tử dự kiến">
            <select className={inputCls} style={inputStyle} value={f.nha_cung_cap} onChange={(e) => setF({ ...f, nha_cung_cap: e.target.value })}>
              {EINVOICE_PROVIDERS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
            <Field label="Mẫu số" required><input required className={inputCls} style={inputStyle} value={f.mau_so} onChange={(e) => setF({ ...f, mau_so: e.target.value })} placeholder="VD: 1" /></Field>
            <Field label="Ký hiệu" required><input required className={inputCls} style={inputStyle} value={f.ky_hieu} onChange={(e) => setF({ ...f, ky_hieu: e.target.value.toUpperCase() })} placeholder="VD: 1C25TAA" /></Field>
          </div>
          <Field label="Số hóa đơn tiếp theo sẽ dùng">
            <input type="number" min="1" className={inputCls} style={{ ...inputStyle, width: 160 }} value={f.so_hien_tai} onChange={(e) => setF({ ...f, so_hien_tai: e.target.value })} />
          </Field>
          <div className="mt-2 mb-3 text-[12.5px]" style={{ color: COLORS.textMuted }}>
            Xem trước: <b style={{ color: COLORS.text }}>Mẫu số {f.mau_so || "?"} — Ký hiệu {f.ky_hieu || "?"} — Số {String(f.so_hien_tai || 1).padStart(7, "0")}</b>
          </div>
          <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: COLORS.border }}>
            <Btn type="submit">Lưu cấu hình</Btn>
            {saved && <span className="text-[12.5px]" style={{ color: COLORS.green }}>Đã lưu.</span>}
          </div>
        </form>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Invoices: Bán hàng / Mua hàng                                       */
/* ------------------------------------------------------------------ */
function InvoicePage({ mode, invStore, partnerStore, productStore, priceLists, channels, soStore, warehouses, einvoiceStore, receiptsData, salereturnsData, paymentMethods, lotStore }) {
  // mode: 'sale' | 'purchase'
  const isSale = mode === "sale";
  const { items: invoices, add: addInv, remove: removeInv } = invStore;
  const { items: partners } = partnerStore;
  const { items: products, setItems: setProducts } = productStore;
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [printing, setPrinting] = useState(null);

  const partnerName = (id) => partners.find((p) => p.id === id)?.ten || "—";
  const channelName = (id) => (channels || []).find((c) => c.id === id)?.ten;

  /* Thuế GTGT: dùng số đã lưu trên chứng từ; chứng từ cũ (trước khi có tính
     năng này) không có trường thue_gtgt nên ước tính lại từ thuế suất từng
     mặt hàng, chỉ khi tùy chọn in thuế đang bật. */
  function vatOf(inv) {
    if (inv.thue_gtgt != null) return inv.thue_gtgt;
    if (!CURRENT_COMPANY.in_thue_gtgt) return 0;
    const ratio = inv.tam_tinh > 0 ? (inv.tong_tien || 0) / inv.tam_tinh : 1; // phân bổ chiết khấu
    return Math.round(
      (inv.items || []).reduce((s, it) => {
        const rate = products.find((p) => p.id === it.hang_hoa_id)?.thue_suat_vat ?? 0;
        return s + (it.so_luong || 0) * (it.don_gia || 0) * ratio * (rate / 100);
      }, 0)
    );
  }

  /** Tổng tiền phải thu/trả của chứng từ, gồm cả thuế GTGT. */
  function totalOf(inv) {
    return (inv.tong_tien || 0) + vatOf(inv);
  }

  function openPrint(inv) {
    const config = einvoiceStore?.items?.[0];
    if (isSale && config && !inv.so_hddt) {
      const soHddt = String(config.so_hien_tai).padStart(7, "0");
      invStore.update(inv.id, { so_hddt: soHddt, mau_so_hddt: config.mau_so, ky_hieu_hddt: config.ky_hieu }, { silent: true });
      einvoiceStore.persist([{ ...config, so_hien_tai: (Number(config.so_hien_tai) || 1) + 1 }], "update", { silent: true });
      setPrinting({ ...inv, so_hddt: soHddt, mau_so_hddt: config.mau_so, ky_hieu_hddt: config.ky_hieu });
    } else {
      setPrinting(inv);
    }
  }

  const filtered = invoices
    .filter((inv) => !query || inv.ma?.toLowerCase().includes(query.toLowerCase()) || partnerName(inv.doi_tac_id).toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (b.ngay || "").localeCompare(a.ngay || ""));

  function createInvoice(form) {
    addInv({ ...form, id: uid(isSale ? "HD" : "PN") });
    // adjust stock
    const delta = isSale ? -1 : 1;
    setProducts((cur) => {
      const next = cur.map((p) => {
        const line = form.items.find((it) => it.hang_hoa_id === p.id);
        if (!line) return p;
        let updated = adjustProductStock(p, delta * line.so_luong, form.kho_id);
        if (!isSale) {
          // Mua hàng: giá vốn cập nhật theo bình quân gia quyền của giá nhập mới.
          updated = { ...updated, gia_von: weightedAvgCost(p.ton_kho || 0, p.gia_von || 0, line.so_luong, line.don_gia) };
        }
        return updated;
      });
      storageSet(STORE_KEYS.products, next);
      return next;
    });
    if (lotStore) {
      const nextLots = applyLotChanges(lotStore.items, isSale, form.items, form.kho_id);
      lotStore.persist(nextLots, "update", { silent: true });
    }
    // mark the source sales order as invoiced, if converted from one
    if (form.don_dat_hang_id && soStore) {
      soStore.update(form.don_dat_hang_id, { trang_thai: "invoiced" });
    }
    setCreating(false);
  }

  function deleteInvoice(inv) {
    // restore stock
    const delta = isSale ? 1 : -1;
    setProducts((cur) => {
      const next = cur.map((p) => {
        const line = inv.items.find((it) => it.hang_hoa_id === p.id);
        if (!line) return p;
        return adjustProductStock(p, delta * line.so_luong, inv.kho_id);
      });
      storageSet(STORE_KEYS.products, next);
      return next;
    });
    removeInv(inv.id);
    setToDelete(null);
  }

  return (
    <div>
      <PageHeader
        title={isSale ? "Bán hàng" : "Mua hàng"}
        subtitle={`${invoices.length} chứng từ`}
        action={<Btn onClick={() => setCreating(true)}><Plus size={15} /> {isSale ? "Tạo đơn bán" : "Tạo đơn mua"}</Btn>}
      />
      <Toolbar query={query} setQuery={setQuery} placeholder="Tìm theo mã chứng từ hoặc đối tác..." />
      {invoices.length === 0 ? (
        <EmptyState
          icon={isSale ? ShoppingCart : ShoppingBag}
          title={isSale ? "Chưa có đơn bán hàng" : "Chưa có đơn mua hàng"}
          hint="Tạo chứng từ đầu tiên để bắt đầu theo dõi doanh thu và tồn kho."
          action={<Btn onClick={() => setCreating(true)}><Plus size={15} /> {isSale ? "Tạo đơn bán" : "Tạo đơn mua"}</Btn>}
        />
      ) : (
        <Table
          columns={[
            { key: "ma", label: "Số chứng từ" },
            { key: "ngay", label: "Ngày", render: (r) => fmtDate(r.ngay) },
            { key: "doi_tac", label: isSale ? "Khách hàng" : "Nhà cung cấp", render: (r) => partnerName(r.doi_tac_id) },
            ...(isSale && channels?.length ? [{ key: "kenh_id", label: "Kênh", render: (r) => channelName(r.kenh_id) ? <Badge tone="muted">{channelName(r.kenh_id)}</Badge> : "—" }] : []),
            { key: "so_luong", label: "Số mặt hàng", align: "right", render: (r) => r.items.length, sortable: false },
            { key: "tong_tien", label: "Thành tiền", align: "right", render: (r) => fmtVND(totalOf(r)), sortValue: (r) => totalOf(r) },
            {
              key: "trang_thai",
              label: "Trạng thái",
              sortable: false,
              render: (r) => (r.da_thanh_toan >= totalOf(r) ? <Badge tone="green">Đã thanh toán</Badge> : r.da_thanh_toan > 0 ? <Badge tone="amber">Thanh toán 1 phần</Badge> : <Badge tone="red">Chưa thanh toán</Badge>),
            },
          ]}
          rows={filtered}
          onEdit={setViewing}
          onDelete={setToDelete}
        />
      )}
      {creating && (
        <InvoiceForm
          mode={mode}
          partners={partners}
          products={products}
          priceLists={priceLists}
          channels={channels}
          warehouses={warehouses}
          onCancel={() => setCreating(false)}
          onSave={createInvoice}
          existingInvoices={invoices}
          receiptsData={receiptsData}
          salereturnsData={salereturnsData}
          paymentMethods={paymentMethods}
          lots={lotStore?.items}
        />
      )}
      {viewing && (
        <Modal title={`Chi tiết ${viewing.ma}`} onClose={() => setViewing(null)} width="max-w-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[13.5px]" style={{ color: COLORS.textMuted }}>
              {isSale ? "Khách hàng" : "Nhà cung cấp"}: <span style={{ color: COLORS.text }}>{partnerName(viewing.doi_tac_id)}</span> · Ngày: {fmtDate(viewing.ngay)}
              {viewing.kenh_id && <> · Kênh: <span style={{ color: COLORS.text }}>{channelName(viewing.kenh_id)}</span></>}
            </div>
            <PrintButton onClick={() => openPrint(viewing)} />
          </div>
          <Table
            columns={[
              { key: "ten", label: "Hàng hóa" },
              { key: "so_luong", label: "SL", align: "right" },
              { key: "don_gia", label: "Đơn giá", align: "right", render: (r) => fmtVND(r.don_gia) },
              { key: "thanh_tien", label: "Thành tiền", align: "right", render: (r) => fmtVND(r.so_luong * r.don_gia) },
            ]}
            rows={viewing.items}
            rowKey="hang_hoa_id"
            paginate={false}
          />
          <div className="flex flex-col items-end mt-3 gap-0.5">
            {viewing.chiet_khau_pct > 0 && (
              <>
                <div className="text-[13px]" style={{ color: COLORS.textMuted }}>Tạm tính: {fmtVND(viewing.tam_tinh ?? viewing.tong_tien)}</div>
                <div className="text-[13px]" style={{ color: COLORS.red }}>Chiết khấu ({viewing.chiet_khau_pct}%): -{fmtVND((viewing.tam_tinh ?? viewing.tong_tien) - viewing.tong_tien)}</div>
              </>
            )}
            {vatOf(viewing) > 0 && (
              <div className="text-[13px]" style={{ color: COLORS.textMuted }}>Thuế GTGT: {fmtVND(vatOf(viewing))}</div>
            )}
            <div className="text-[14px] font-semibold" style={{ color: COLORS.text }}>Tổng thanh toán: {fmtVND(totalOf(viewing))}</div>
            {viewing.thanh_toan_chi_tiet?.length > 0 && (
              <div className="text-[12px] mt-1" style={{ color: COLORS.textMuted }}>
                Đã thu: {viewing.thanh_toan_chi_tiet.map((r) => `${r.ten} ${fmtVND(r.so_tien)}`).join(" · ")}
              </div>
            )}
          </div>
        </Modal>
      )}
      {toDelete && (
        <ConfirmBar text={`Xóa chứng từ "${toDelete.ma}"? Tồn kho sẽ được hoàn lại.`} onConfirm={() => deleteInvoice(toDelete)} onCancel={() => setToDelete(null)} />
      )}
      {printing && (
        <PrintDocument
          onClose={() => setPrinting(null)}
          doc={{
            title: isSale ? "Hóa đơn bán hàng" : "Phiếu mua hàng",
            ma: printing.ma,
            ngay: printing.ngay,
            partnerLabel: isSale ? "Khách hàng" : "Nhà cung cấp",
            partnerName: partnerName(printing.doi_tac_id),
            partnerAddress: partners.find((p) => p.id === printing.doi_tac_id)?.dia_chi,
            partnerTax: partners.find((p) => p.id === printing.doi_tac_id)?.ma_so_thue,
            items: printing.items,
            subtotal: printing.tam_tinh ?? printing.tong_tien,
            discount: (printing.tam_tinh ?? 0) - (printing.tong_tien ?? 0) > 0 ? printing.tam_tinh - printing.tong_tien : 0,
            vat: vatOf(printing),
            total: printing.tong_tien,
            soHddt: printing.so_hddt,
            mauSoHddt: printing.mau_so_hddt,
            kyHieuHddt: printing.ky_hieu_hddt,
            signers: ["Người mua hàng", "Người bán hàng", "Thủ trưởng đơn vị"],
          }}
        />
      )}
    </div>
  );
}

/**
 * Khối khai báo lô/serial cho một dòng hàng hóa trong đơn mua/bán.
 * Mua hàng: nhập tay số lô + hạn dùng, hoặc danh sách serial (mỗi dòng một serial).
 * Bán hàng: chỉ hiển thị xem trước lô sẽ được xuất (tự động chọn theo FEFO/FIFO).
 */
function LotLineFields({ mode, product, line, baseQty, khoId, lots, onChange }) {
  const isSale = mode === "sale";
  const isSerial = product.quan_ly_ton_kho === "serial";

  if (!isSale) {
    if (isSerial) {
      const serials = (line.serials || "").split("\n").map((s) => s.trim()).filter(Boolean);
      const mismatch = serials.length !== baseQty;
      return (
        <div className="mt-1.5 pl-1">
          <div className="text-[11.5px] font-medium mb-1" style={{ color: COLORS.textMuted }}>
            Danh sách serial/IMEI (mỗi dòng một mã — cần đúng {baseQty} mã)
          </div>
          <textarea
            rows={Math.min(5, Math.max(2, baseQty))}
            className={inputCls}
            style={{ ...inputStyle, width: "100%", fontFamily: "monospace", fontSize: 12.5, ...(mismatch ? { borderColor: COLORS.red } : {}) }}
            value={line.serials || ""}
            onChange={(e) => onChange({ serials: e.target.value })}
            placeholder={"VD:\n356789123456780\n356789123456781"}
          />
          <div className="text-[11px] mt-0.5" style={{ color: mismatch ? COLORS.red : COLORS.textMuted }}>
            Đã nhập {serials.length}/{baseQty} serial
          </div>
        </div>
      );
    }
    return (
      <div className="mt-1.5 pl-1 flex items-center gap-2">
        <input
          className={inputCls}
          style={{ ...inputStyle, width: 160, ...(!line.ma_lo?.trim() ? { borderColor: COLORS.amber } : {}) }}
          placeholder="Số lô"
          value={line.ma_lo || ""}
          onChange={(e) => onChange({ ma_lo: e.target.value })}
        />
        <input
          type="date"
          className={inputCls}
          style={{ ...inputStyle, width: 160 }}
          value={line.han_su_dung || ""}
          onChange={(e) => onChange({ han_su_dung: e.target.value })}
        />
        <span className="text-[11px]" style={{ color: COLORS.textMuted }}>Số lô + hạn sử dụng (hạn dùng có thể để trống)</span>
      </div>
    );
  }

  // Bán hàng: xem trước lô sẽ xuất, tự động chọn theo hết-hạn-trước / nhập-trước.
  if (!product.id || !baseQty) return null;
  const { allocations, shortfall } = phanBoLoHang(lots, product.id, khoId, baseQty);
  return (
    <div className="mt-1.5 pl-1 text-[11.5px]" style={{ color: COLORS.textMuted }}>
      {allocations.length === 0 && shortfall > 0 ? (
        <span style={{ color: COLORS.red }}>Không còn lô/serial nào tồn cho mặt hàng này.</span>
      ) : (
        <span>
          Xuất từ: {allocations.map((a) => `${a.ma_lo}${a.han_su_dung ? ` (HSD ${fmtDate(a.han_su_dung)})` : ""} ×${a.so_luong}`).join(", ")}
          {shortfall > 0 && <span style={{ color: COLORS.red }}> — thiếu {shortfall} {product.dvt}</span>}
        </span>
      )}
    </div>
  );
}

function InvoiceForm({ mode, partners, products, priceLists, channels, warehouses, onCancel, onSave, initialDoc, existingInvoices, receiptsData, salereturnsData, paymentMethods, lots }) {
  const isSale = mode === "sale";
  const [doiTacId, setDoiTacId] = useState(initialDoc?.doi_tac_id || partners[0]?.id || "");
  const [kenhId, setKenhId] = useState(initialDoc?.kenh_id || "");
  const [khoId, setKhoId] = useState(initialDoc?.kho_id || warehouses?.[0]?.id || "");
  const [ngay, setNgay] = useState(todayStr());
  const [lines, setLines] = useState(initialDoc?.items?.length ? initialDoc.items.map((l) => ({ ...l })) : [{ hang_hoa_id: "", so_luong: 1, don_gia: 0 }]);
  const [paymentRows, setPaymentRows] = useState([{ phuong_thuc_id: paymentMethods?.[0]?.id || "", so_tien: 0 }]);
  const daThanhToan = paymentRows.reduce((s, r) => s + (Number(r.so_tien) || 0), 0);

  const customer = isSale ? partners.find((p) => p.id === doiTacId) : null;
  const chietKhauPct = customer?.chiet_khau_pct || 0;
  const priceList = isSale && customer?.bang_gia_id ? (priceLists || []).find((pl) => pl.id === customer.bang_gia_id) : null;

  const subtotal = lines.reduce((s, l) => s + (Number(l.so_luong) || 0) * (Number(l.don_gia) || 0), 0);
  const discountAmount = isSale ? subtotal * (chietKhauPct / 100) : 0;
  const total = subtotal - discountAmount;

  // Thuế GTGT: tính từ thuế suất khai trên từng mặt hàng, chỉ khi công ty bật tùy chọn in thuế.
  const vatEnabled = !!CURRENT_COMPANY.in_thue_gtgt;
  const vatAmount = vatEnabled
    ? Math.round(
        lines.reduce((s, l) => {
          const rate = products.find((p) => p.id === l.hang_hoa_id)?.thue_suat_vat ?? 0;
          const lineAmt = (Number(l.so_luong) || 0) * (Number(l.don_gia) || 0);
          const afterDiscount = isSale ? lineAmt * (1 - chietKhauPct / 100) : lineAmt;
          return s + afterDiscount * (rate / 100);
        }, 0)
      )
    : 0;
  const grandTotal = total + vatAmount;

  const hasOversell = isSale && lines.some((l) => {
    const product = products.find((p) => p.id === l.hang_hoa_id);
    if (!product) return false;
    const tyLe = unitsFor(l.hang_hoa_id)[l.don_vi_idx || 0]?.ty_le || 1;
    const available = khoId && product.ton_kho_theo_kho ? (product.ton_kho_theo_kho[khoId] || 0) : (product.ton_kho || 0);
    return (Number(l.so_luong) || 0) * tyLe > available;
  });

  // Hàng theo lô/serial: khi bán, kiểm tra đủ lô để phân bổ (FEFO/FIFO); khi mua, cần khai số lô/serial.
  const hasLotShortage = isSale && lines.some((l) => {
    const product = products.find((p) => p.id === l.hang_hoa_id);
    if (!product || product.quan_ly_ton_kho === "thuong" || !product.quan_ly_ton_kho) return false;
    const tyLe = unitsFor(l.hang_hoa_id)[l.don_vi_idx || 0]?.ty_le || 1;
    const baseQty = (Number(l.so_luong) || 0) * tyLe;
    return phanBoLoHang(lots, l.hang_hoa_id, khoId, baseQty).shortfall > 0;
  });
  const missingLotInfo = !isSale && lines.some((l) => {
    const product = products.find((p) => p.id === l.hang_hoa_id);
    if (!product || product.quan_ly_ton_kho === "thuong" || !product.quan_ly_ton_kho) return false;
    if (product.quan_ly_ton_kho === "serial") {
      const tyLe = unitsFor(l.hang_hoa_id)[l.don_vi_idx || 0]?.ty_le || 1;
      const baseQty = (Number(l.so_luong) || 0) * tyLe;
      const serials = (l.serials || "").split("\n").map((s) => s.trim()).filter(Boolean);
      return serials.length !== baseQty;
    }
    return !l.ma_lo?.trim();
  });

  // Hạn mức công nợ: cảnh báo nếu chứng từ này sẽ đẩy công nợ khách hàng vượt hạn mức đã khai.
  const customerDebtNow = isSale && customer ? tinhConNoKhachHang(customer, existingInvoices || [], receiptsData || [], salereturnsData || []) : 0;
  const projectedDebt = customerDebtNow + grandTotal - (Number(daThanhToan) || 0);
  const overCreditLimit = isSale && customer?.han_muc_cong_no > 0 && projectedDebt > customer.han_muc_cong_no;

  function priceFor(productId) {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return 0;
    if (isSale && priceList?.gia?.[productId] != null) return priceList.gia[productId];
    return isSale ? prod.gia_ban : prod.gia_von;
  }

  function unitsFor(productId) {
    const prod = products.find((p) => p.id === productId);
    return [{ ten: prod?.dvt || "Cái", ty_le: 1 }, ...((prod?.don_vi_quy_doi) || [])];
  }

  function setLine(idx, patch) {
    setLines((cur) => {
      const next = [...cur];
      next[idx] = { ...next[idx], ...patch };
      if (patch.hang_hoa_id) {
        next[idx].don_vi_idx = 0;
        next[idx].don_gia = priceFor(patch.hang_hoa_id);
      }
      if (patch.don_vi_idx !== undefined) {
        const units = unitsFor(next[idx].hang_hoa_id);
        const tyLe = units[patch.don_vi_idx]?.ty_le || 1;
        next[idx].don_gia = Math.round(priceFor(next[idx].hang_hoa_id) * tyLe);
      }
      return next;
    });
  }
  function addLine() {
    setLines((cur) => [...cur, { hang_hoa_id: "", so_luong: 1, don_gia: 0, don_vi_idx: 0 }]);
  }
  function removeLine(idx) {
    setLines((cur) => cur.filter((_, i) => i !== idx));
  }

  function submit(e) {
    e.preventDefault();
    const validLines = lines.filter((l) => l.hang_hoa_id && l.so_luong > 0);
    if (!doiTacId || validLines.length === 0) return;
    const withNames = validLines.map((l) => {
      const units = unitsFor(l.hang_hoa_id);
      const tyLe = units[l.don_vi_idx || 0]?.ty_le || 1;
      const baseQty = (Number(l.so_luong) || 0) * tyLe;
      const product = products.find((p) => p.id === l.hang_hoa_id);
      const item = {
        hang_hoa_id: l.hang_hoa_id,
        ten: product?.ten || "",
        so_luong: baseQty, // converted to base units
        don_gia: tyLe > 1 ? Math.round((Number(l.don_gia) || 0) / tyLe) : (Number(l.don_gia) || 0), // converted to per-base-unit price
      };
      if (product && product.quan_ly_ton_kho && product.quan_ly_ton_kho !== "thuong") {
        if (!isSale) {
          // Mua hàng: ghi lại số lô/HSD hoặc danh sách serial vừa khai để tạo bản ghi lô mới.
          if (product.quan_ly_ton_kho === "serial") {
            item.serials = (l.serials || "").split("\n").map((s) => s.trim()).filter(Boolean);
          } else {
            item.ma_lo = l.ma_lo?.trim();
            item.han_su_dung = l.han_su_dung || undefined;
          }
        } else {
          // Bán hàng: chốt lại phương án phân bổ lô tại thời điểm lưu (FEFO/FIFO).
          item.lo_phan_bo = phanBoLoHang(lots, l.hang_hoa_id, khoId, baseQty).allocations;
        }
      }
      return item;
    });
    onSave({
      ma: uid(isSale ? "HD" : "PN").toUpperCase(),
      ngay,
      doi_tac_id: doiTacId,
      kenh_id: isSale ? kenhId : undefined,
      kho_id: khoId || undefined,
      items: withNames,
      tam_tinh: subtotal,
      chiet_khau_pct: isSale ? chietKhauPct : 0,
      thue_gtgt: vatAmount,
      tong_tien: total,
      da_thanh_toan: daThanhToan,
      thanh_toan_chi_tiet: paymentRows
        .filter((r) => (Number(r.so_tien) || 0) > 0)
        .map((r) => ({ phuong_thuc_id: r.phuong_thuc_id, ten: (paymentMethods || []).find((m) => m.id === r.phuong_thuc_id)?.ten || "Tiền mặt", so_tien: Number(r.so_tien) || 0 })),
      don_dat_hang_id: initialDoc?.id,
    });
  }

  return (
    <Modal title={isSale ? "Tạo đơn bán hàng" : "Tạo đơn mua hàng"} onClose={onCancel} width="max-w-3xl">
      <form onSubmit={submit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
          <Field label={isSale ? "Khách hàng" : "Nhà cung cấp"} required>
            <select required className={inputCls} style={inputStyle} value={doiTacId} onChange={(e) => setDoiTacId(e.target.value)}>
              <option value="">-- Chọn --</option>
              {partners.map((p) => <option key={p.id} value={p.id}>{p.ten}</option>)}
            </select>
          </Field>
          <Field label="Ngày chứng từ"><input type="date" className={inputCls} style={inputStyle} value={ngay} onChange={(e) => setNgay(e.target.value)} /></Field>
        </div>
        {isSale && (priceList || chietKhauPct > 0) && (
          <div className="mb-3 px-3 py-2 rounded-md text-[12.5px] flex items-center gap-2" style={{ background: COLORS.goldBg, color: "#5C4109" }}>
            <Tag size={13} />
            {priceList && <span>Áp dụng bảng giá: <b>{priceList.ten}</b></span>}
            {chietKhauPct > 0 && <span>{priceList ? " · " : ""}Chiết khấu khách hàng: <b>{chietKhauPct}%</b></span>}
          </div>
        )}
        {hasOversell && (
          <div className="mb-3 px-3 py-2 rounded-md text-[12.5px] flex items-center gap-2" style={{ background: COLORS.redBg, color: COLORS.red }}>
            <AlertTriangle size={13} /> Có hàng hóa đang bán vượt tồn kho hiện có — tồn kho sẽ về số âm nếu vẫn lưu chứng từ này.
          </div>
        )}
        {overCreditLimit && (
          <div className="mb-3 px-3 py-2 rounded-md text-[12.5px] flex items-center gap-2" style={{ background: COLORS.redBg, color: COLORS.red }}>
            <AlertTriangle size={13} /> Khách hàng sẽ nợ {fmtVND(projectedDebt)} sau chứng từ này — vượt hạn mức công nợ {fmtVND(customer.han_muc_cong_no)}.
          </div>
        )}
        {hasLotShortage && (
          <div className="mb-3 px-3 py-2 rounded-md text-[12.5px] flex items-center gap-2" style={{ background: COLORS.redBg, color: COLORS.red }}>
            <AlertTriangle size={13} /> Không đủ lô/serial còn tồn cho một số mặt hàng — kiểm tra lại số lượng.
          </div>
        )}
        {missingLotInfo && (
          <div className="mb-3 px-3 py-2 rounded-md text-[12.5px] flex items-center gap-2" style={{ background: COLORS.goldBg, color: "#5C4109" }}>
            <AlertTriangle size={13} /> Còn hàng hóa quản lý theo lô/serial chưa khai đủ thông tin bên dưới.
          </div>
        )}
        {isSale && channels?.length > 0 && (
          <Field label="Kênh bán hàng">
            <select className={inputCls} style={inputStyle} value={kenhId} onChange={(e) => setKenhId(e.target.value)}>
              <option value="">-- Không chọn --</option>
              {channels.map((c) => <option key={c.id} value={c.id}>{c.ten}</option>)}
            </select>
          </Field>
        )}
        {warehouses?.length > 1 && (
          <Field label="Kho / Chi nhánh" required>
            <select required className={inputCls} style={inputStyle} value={khoId} onChange={(e) => setKhoId(e.target.value)}>
              {warehouses.map((w) => <option key={w.id} value={w.id}>{w.ten}</option>)}
            </select>
          </Field>
        )}

        <div className="mt-1 mb-2 text-[12.5px] font-medium" style={{ color: COLORS.textMuted }}>Chi tiết hàng hóa</div>
        <div className="rounded-md border overflow-x-auto" style={{ borderColor: COLORS.border }}>
          {lines.map((l, idx) => {
            const lineUnits = unitsFor(l.hang_hoa_id);
            const product = products.find((p) => p.id === l.hang_hoa_id);
            const tyLe = lineUnits[l.don_vi_idx || 0]?.ty_le || 1;
            const baseQty = (Number(l.so_luong) || 0) * tyLe;
            const availableQty = product ? (khoId && product.ton_kho_theo_kho ? (product.ton_kho_theo_kho[khoId] || 0) : (product.ton_kho || 0)) : 0;
            const overselling = isSale && product && baseQty > availableQty;
            return (
              <div key={idx} className="px-2.5 py-2 border-b last:border-b-0 min-w-[680px]" style={{ borderColor: COLORS.border }}>
                <div className="flex items-center gap-2">
                  <select className={inputCls + " flex-1"} style={inputStyle} value={l.hang_hoa_id} onChange={(e) => setLine(idx, { hang_hoa_id: e.target.value })}>
                    <option value="">-- Chọn hàng hóa --</option>
                    {products.map((p) => <option key={p.id} value={p.id}>{p.ten} ({p.ton_kho ?? 0} {p.dvt})</option>)}
                  </select>
                  <input type="number" min="1" className={inputCls} style={{ ...inputStyle, width: 65, ...(overselling ? { borderColor: COLORS.red } : {}) }} value={l.so_luong} onChange={(e) => setLine(idx, { so_luong: +e.target.value })} />
                  {lineUnits.length > 1 ? (
                    <select className={inputCls} style={{ ...inputStyle, width: 95 }} value={l.don_vi_idx || 0} onChange={(e) => setLine(idx, { don_vi_idx: +e.target.value })}>
                      {lineUnits.map((u, i) => <option key={i} value={i}>{u.ten}</option>)}
                    </select>
                  ) : (
                    <span className="text-[12px] w-16 shrink-0" style={{ color: COLORS.textMuted }}>{lineUnits[0]?.ten}</span>
                  )}
                  <input type="number" min="0" className={inputCls} style={{ ...inputStyle, width: 110 }} value={l.don_gia} onChange={(e) => setLine(idx, { don_gia: +e.target.value })} />
                  <div className="w-28 text-right text-[13px]" style={{ color: COLORS.text }}>{fmtVND((l.so_luong || 0) * (l.don_gia || 0))}</div>
                  <button type="button" onClick={() => removeLine(idx)} className="p-1 rounded hover:bg-slate-100">
                    <X size={14} color={COLORS.textMuted} />
                  </button>
                </div>
                {overselling && (
                  <div className="mt-1 text-[11.5px] flex items-center gap-1" style={{ color: COLORS.red }}>
                    <AlertTriangle size={12} /> Vượt tồn kho — chỉ còn {availableQty} {product.dvt}, đang bán {baseQty} {product.dvt}
                  </div>
                )}
                {product && product.quan_ly_ton_kho && product.quan_ly_ton_kho !== "thuong" && (
                  <LotLineFields
                    mode={mode}
                    product={product}
                    line={l}
                    baseQty={baseQty}
                    khoId={khoId}
                    lots={lots}
                    onChange={(patch) => setLine(idx, patch)}
                  />
                )}
              </div>
            );
          })}
        </div>
        <button type="button" onClick={addLine} className="mt-2 text-[12.5px] font-medium flex items-center gap-1" style={{ color: COLORS.navy }}>
          <Plus size={13} /> Thêm dòng hàng
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 mt-4">
          <Field label="Đã thanh toán ngay">
            <SplitPaymentEditor methods={paymentMethods} rows={paymentRows} setRows={setPaymentRows} autoTotal={grandTotal} />
          </Field>
          <div className="flex flex-col items-end justify-center pt-2">
            {isSale && discountAmount > 0 && (
              <>
                <span className="text-[12px]" style={{ color: COLORS.textMuted }}>Tạm tính: {fmtVND(subtotal)}</span>
                <span className="text-[12px]" style={{ color: COLORS.red }}>Chiết khấu: -{fmtVND(discountAmount)}</span>
              </>
            )}
            {vatAmount > 0 && (
              <span className="text-[12px]" style={{ color: COLORS.textMuted }}>Thuế GTGT: {fmtVND(vatAmount)}</span>
            )}
            <span className="text-[12.5px]" style={{ color: COLORS.textMuted }}>{vatAmount > 0 ? "Tổng thanh toán" : "Tổng cộng"}</span>
            <span className="text-[18px] font-semibold" style={{ color: COLORS.navy }}>{fmtVND(grandTotal)}</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
          <Btn type="button" variant="outline" onClick={onCancel}>Hủy</Btn>
          <Btn type="submit">Lưu chứng từ</Btn>
        </div>
      </form>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Đơn đặt hàng (Sales Orders) — trước khi xuất hóa đơn                 */
/* ------------------------------------------------------------------ */
const SO_STATUS = {
  new: { label: "Mới", tone: "muted" },
  confirmed: { label: "Đã xác nhận", tone: "amber" },
  invoiced: { label: "Đã xuất hóa đơn", tone: "green" },
  cancelled: { label: "Đã hủy", tone: "red" },
};

function SalesOrdersPage({ store, salesStore, productStore, partnerStore, priceLists, channels, warehouses }) {
  const { items: orders, add, update, remove } = store;
  const { items: partners } = partnerStore;
  const { items: products, setItems: setProducts } = productStore;
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [converting, setConverting] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [printing, setPrinting] = useState(null);

  const partnerName = (id) => partners.find((p) => p.id === id)?.ten || "—";
  const list = orders
    .filter((o) => !query || o.ma?.toLowerCase().includes(query.toLowerCase()) || partnerName(o.doi_tac_id).toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (b.ngay || "").localeCompare(a.ngay || ""));

  function createOrder(form) {
    add({ ...form, id: uid("DH"), trang_thai: "new" });
    setCreating(false);
  }

  function convertToInvoice(order, invoiceForm) {
    salesStore.add({ ...invoiceForm, id: uid("HD") });
    setProducts((cur) => {
      const next = cur.map((p) => {
        const line = invoiceForm.items.find((it) => it.hang_hoa_id === p.id);
        if (!line) return p;
        return adjustProductStock(p, -line.so_luong, invoiceForm.kho_id);
      });
      storageSet(STORE_KEYS.products, next);
      return next;
    });
    update(order.id, { trang_thai: "invoiced" });
    setConverting(null);
  }

  return (
    <div>
      <PageHeader
        title="Đơn đặt hàng"
        subtitle="Ghi nhận đơn khách đặt trước, xuất hóa đơn khi giao hàng"
        action={<Btn onClick={() => setCreating(true)}><Plus size={15} /> Tạo đơn đặt hàng</Btn>}
      />
      <Toolbar query={query} setQuery={setQuery} placeholder="Tìm theo mã đơn hoặc khách hàng..." />
      {list.length === 0 ? (
        <EmptyState icon={ClipboardList} title="Chưa có đơn đặt hàng" hint="Tạo đơn đặt trước cho khách, sau đó xuất hóa đơn khi giao hàng." action={<Btn onClick={() => setCreating(true)}><Plus size={15} /> Tạo đơn đặt hàng</Btn>} />
      ) : (
        <Table
          columns={[
            { key: "ma", label: "Số đơn" },
            { key: "ngay", label: "Ngày đặt", render: (r) => fmtDate(r.ngay) },
            { key: "ngay_giao", label: "Ngày giao dự kiến", render: (r) => fmtDate(r.ngay_giao) || "—" },
            { key: "doi_tac_id", label: "Khách hàng", render: (r) => partnerName(r.doi_tac_id) },
            { key: "tong_tien", label: "Tổng tiền", align: "right", render: (r) => fmtVND(r.tong_tien) },
            { key: "trang_thai", label: "Trạng thái", render: (r) => <Badge tone={SO_STATUS[r.trang_thai]?.tone}>{SO_STATUS[r.trang_thai]?.label}</Badge> },
            {
              key: "action", label: "", render: (r) => (
                r.trang_thai === "new" || r.trang_thai === "confirmed" ? (
                  <Btn size="sm" onClick={() => setConverting(r)}>Xuất hóa đơn</Btn>
                ) : null
              ),
            },
          ]}
          rows={list}
          onPrint={setPrinting}
          onDelete={setToDelete}
        />
      )}
      {creating && <SalesOrderForm partners={partners} products={products} priceLists={priceLists} channels={channels} onCancel={() => setCreating(false)} onSave={createOrder} />}
      {converting && (
        <InvoiceForm
          mode="sale"
          partners={partners}
          products={products}
          priceLists={priceLists}
          channels={channels}
          warehouses={warehouses}
          initialDoc={converting}
          onCancel={() => setConverting(null)}
          onSave={(invForm) => convertToInvoice(converting, invForm)}
        />
      )}
      {toDelete && <ConfirmBar text={`Xóa đơn đặt hàng "${toDelete.ma}"?`} onConfirm={() => { remove(toDelete.id); setToDelete(null); }} onCancel={() => setToDelete(null)} />}
      {printing && (
        <PrintDocument
          onClose={() => setPrinting(null)}
          doc={{ title: "Đơn đặt hàng", ma: printing.ma, ngay: printing.ngay, partnerLabel: "Khách hàng", partnerName: partnerName(printing.doi_tac_id), items: printing.items, total: printing.tong_tien, note: printing.ghi_chu }}
        />
      )}
    </div>
  );
}

function SalesOrderForm({ partners, products, priceLists, channels, onSave, onCancel }) {
  const [doiTacId, setDoiTacId] = useState(partners[0]?.id || "");
  const [ngay, setNgay] = useState(todayStr());
  const [ngayGiao, setNgayGiao] = useState("");
  const [ghiChu, setGhiChu] = useState("");
  const [lines, setLines] = useState([{ hang_hoa_id: "", so_luong: 1, don_gia: 0, don_vi_idx: 0 }]);

  const customer = partners.find((p) => p.id === doiTacId);
  const priceList = customer?.bang_gia_id ? (priceLists || []).find((pl) => pl.id === customer.bang_gia_id) : null;
  const total = lines.reduce((s, l) => s + (Number(l.so_luong) || 0) * (Number(l.don_gia) || 0), 0);

  function unitsFor(productId) {
    const prod = products.find((p) => p.id === productId);
    return [{ ten: prod?.dvt || "Cái", ty_le: 1 }, ...((prod?.don_vi_quy_doi) || [])];
  }
  function basePriceFor(productId) {
    const prod = products.find((p) => p.id === productId);
    return priceList?.gia?.[productId] ?? prod?.gia_ban ?? 0;
  }

  function setLine(idx, patch) {
    setLines((cur) => {
      const next = [...cur];
      next[idx] = { ...next[idx], ...patch };
      if (patch.hang_hoa_id) {
        next[idx].don_vi_idx = 0;
        next[idx].don_gia = basePriceFor(patch.hang_hoa_id);
      }
      if (patch.don_vi_idx !== undefined) {
        const units = unitsFor(next[idx].hang_hoa_id);
        const tyLe = units[patch.don_vi_idx]?.ty_le || 1;
        next[idx].don_gia = Math.round(basePriceFor(next[idx].hang_hoa_id) * tyLe);
      }
      return next;
    });
  }
  function addLine() { setLines((cur) => [...cur, { hang_hoa_id: "", so_luong: 1, don_gia: 0, don_vi_idx: 0 }]); }
  function removeLine(idx) { setLines((cur) => cur.filter((_, i) => i !== idx)); }

  function submit(e) {
    e.preventDefault();
    const validLines = lines.filter((l) => l.hang_hoa_id && l.so_luong > 0);
    if (!doiTacId || validLines.length === 0) return;
    const withNames = validLines.map((l) => {
      const units = unitsFor(l.hang_hoa_id);
      const tyLe = units[l.don_vi_idx || 0]?.ty_le || 1;
      return {
        hang_hoa_id: l.hang_hoa_id,
        ten: products.find((p) => p.id === l.hang_hoa_id)?.ten || "",
        so_luong: (Number(l.so_luong) || 0) * tyLe,
        don_gia: tyLe > 1 ? Math.round((Number(l.don_gia) || 0) / tyLe) : (Number(l.don_gia) || 0),
      };
    });
    onSave({ ma: uid("DH").toUpperCase(), ngay, ngay_giao: ngayGiao, doi_tac_id: doiTacId, items: withNames, tong_tien: total, ghi_chu: ghiChu });
  }

  return (
    <Modal title="Tạo đơn đặt hàng" onClose={onCancel} width="max-w-3xl">
      <form onSubmit={submit}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-3">
          <Field label="Khách hàng" required>
            <select required className={inputCls} style={inputStyle} value={doiTacId} onChange={(e) => setDoiTacId(e.target.value)}>
              <option value="">-- Chọn --</option>
              {partners.map((p) => <option key={p.id} value={p.id}>{p.ten}</option>)}
            </select>
          </Field>
          <Field label="Ngày đặt"><input type="date" className={inputCls} style={inputStyle} value={ngay} onChange={(e) => setNgay(e.target.value)} /></Field>
          <Field label="Ngày giao dự kiến"><input type="date" className={inputCls} style={inputStyle} value={ngayGiao} onChange={(e) => setNgayGiao(e.target.value)} /></Field>
        </div>
        <div className="mt-1 mb-2 text-[12.5px] font-medium" style={{ color: COLORS.textMuted }}>Chi tiết hàng hóa</div>
        <div className="rounded-md border overflow-x-auto" style={{ borderColor: COLORS.border }}>
          {lines.map((l, idx) => {
            const lineUnits = unitsFor(l.hang_hoa_id);
            return (
              <div key={idx} className="flex items-center gap-2 px-2.5 py-2 border-b last:border-b-0 min-w-[680px]" style={{ borderColor: COLORS.border }}>
                <select className={inputCls + " flex-1"} style={inputStyle} value={l.hang_hoa_id} onChange={(e) => setLine(idx, { hang_hoa_id: e.target.value })}>
                  <option value="">-- Chọn hàng hóa --</option>
                  {products.map((p) => <option key={p.id} value={p.id}>{p.ten}</option>)}
                </select>
                <input type="number" min="1" className={inputCls} style={{ ...inputStyle, width: 65 }} value={l.so_luong} onChange={(e) => setLine(idx, { so_luong: +e.target.value })} />
                {lineUnits.length > 1 ? (
                  <select className={inputCls} style={{ ...inputStyle, width: 95 }} value={l.don_vi_idx || 0} onChange={(e) => setLine(idx, { don_vi_idx: +e.target.value })}>
                    {lineUnits.map((u, i) => <option key={i} value={i}>{u.ten}</option>)}
                  </select>
                ) : (
                  <span className="text-[12px] w-16 shrink-0" style={{ color: COLORS.textMuted }}>{lineUnits[0]?.ten}</span>
                )}
                <input type="number" min="0" className={inputCls} style={{ ...inputStyle, width: 110 }} value={l.don_gia} onChange={(e) => setLine(idx, { don_gia: +e.target.value })} />
                <div className="w-28 text-right text-[13px]" style={{ color: COLORS.text }}>{fmtVND((l.so_luong || 0) * (l.don_gia || 0))}</div>
                <button type="button" onClick={() => removeLine(idx)} className="p-1 rounded hover:bg-slate-100"><X size={14} color={COLORS.textMuted} /></button>
              </div>
            );
          })}
        </div>
        <button type="button" onClick={addLine} className="mt-2 text-[12.5px] font-medium flex items-center gap-1" style={{ color: COLORS.navy }}>
          <Plus size={13} /> Thêm dòng hàng
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 mt-4">
          <Field label="Ghi chú"><input className={inputCls} style={inputStyle} value={ghiChu} onChange={(e) => setGhiChu(e.target.value)} /></Field>
          <div className="flex flex-col items-end justify-center pt-4">
            <span className="text-[12.5px]" style={{ color: COLORS.textMuted }}>Tổng cộng</span>
            <span className="text-[18px] font-semibold" style={{ color: COLORS.navy }}>{fmtVND(total)}</span>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
          <Btn type="button" variant="outline" onClick={onCancel}>Hủy</Btn>
          <Btn type="submit">Lưu đơn đặt hàng</Btn>
        </div>
      </form>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Đơn đặt hàng mua — đặt trước với nhà cung cấp, xuất phiếu mua khi     */
/* nhận hàng. Gương của Đơn đặt hàng (bán) ở trên.                      */
/* ------------------------------------------------------------------ */
function PurchaseOrdersPage({ store, purchaseStore, productStore, partnerStore, warehouses, lotStore }) {
  const { items: orders, add, update, remove } = store;
  const { items: suppliers } = partnerStore;
  const { items: products, setItems: setProducts } = productStore;
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [converting, setConverting] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [printing, setPrinting] = useState(null);

  const partnerName = (id) => suppliers.find((p) => p.id === id)?.ten || "—";
  const list = orders
    .filter((o) => !query || o.ma?.toLowerCase().includes(query.toLowerCase()) || partnerName(o.doi_tac_id).toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (b.ngay || "").localeCompare(a.ngay || ""));

  function createOrder(form) {
    add({ ...form, id: uid("DHM"), trang_thai: "new" });
    setCreating(false);
  }

  function convertToInvoice(order, invoiceForm) {
    purchaseStore.add({ ...invoiceForm, id: uid("PN") });
    setProducts((cur) => {
      const next = cur.map((p) => {
        const line = invoiceForm.items.find((it) => it.hang_hoa_id === p.id);
        if (!line) return p;
        // Mua hàng: giá vốn cập nhật theo bình quân gia quyền, giống InvoicePage.createInvoice.
        const updated = adjustProductStock(p, line.so_luong, invoiceForm.kho_id);
        return { ...updated, gia_von: weightedAvgCost(p.ton_kho || 0, p.gia_von || 0, line.so_luong, line.don_gia) };
      });
      storageSet(STORE_KEYS.products, next);
      return next;
    });
    if (lotStore) {
      const nextLots = applyLotChanges(lotStore.items, false, invoiceForm.items, invoiceForm.kho_id);
      lotStore.persist(nextLots, "update", { silent: true });
    }
    update(order.id, { trang_thai: "invoiced" });
    setConverting(null);
  }

  return (
    <div>
      <PageHeader
        title="Đơn đặt hàng mua"
        subtitle="Ghi nhận đơn đặt trước với nhà cung cấp, nhập kho khi hàng về"
        action={<Btn onClick={() => setCreating(true)}><Plus size={15} /> Tạo đơn đặt hàng mua</Btn>}
      />
      <Toolbar query={query} setQuery={setQuery} placeholder="Tìm theo mã đơn hoặc nhà cung cấp..." />
      {list.length === 0 ? (
        <EmptyState icon={ClipboardList} title="Chưa có đơn đặt hàng mua" hint="Tạo đơn đặt trước với nhà cung cấp, sau đó nhập phiếu mua khi hàng về." action={<Btn onClick={() => setCreating(true)}><Plus size={15} /> Tạo đơn đặt hàng mua</Btn>} />
      ) : (
        <Table
          columns={[
            { key: "ma", label: "Số đơn" },
            { key: "ngay", label: "Ngày đặt", render: (r) => fmtDate(r.ngay) },
            { key: "ngay_giao", label: "Ngày nhận dự kiến", render: (r) => fmtDate(r.ngay_giao) || "—" },
            { key: "doi_tac_id", label: "Nhà cung cấp", render: (r) => partnerName(r.doi_tac_id) },
            { key: "tong_tien", label: "Tổng tiền", align: "right", render: (r) => fmtVND(r.tong_tien) },
            { key: "trang_thai", label: "Trạng thái", render: (r) => <Badge tone={SO_STATUS[r.trang_thai]?.tone}>{SO_STATUS[r.trang_thai]?.label}</Badge> },
            {
              key: "action", label: "", sortable: false, render: (r) => (
                r.trang_thai === "new" || r.trang_thai === "confirmed" ? (
                  <Btn size="sm" onClick={() => setConverting(r)}>Nhập kho</Btn>
                ) : null
              ),
            },
          ]}
          rows={list}
          onPrint={setPrinting}
          onDelete={setToDelete}
        />
      )}
      {creating && <PurchaseOrderForm suppliers={suppliers} products={products} onCancel={() => setCreating(false)} onSave={createOrder} />}
      {converting && (
        <InvoiceForm
          mode="purchase"
          partners={suppliers}
          products={products}
          warehouses={warehouses}
          initialDoc={converting}
          onCancel={() => setConverting(null)}
          onSave={(invForm) => convertToInvoice(converting, invForm)}
          lots={lotStore?.items}
        />
      )}
      {toDelete && <ConfirmBar text={`Xóa đơn đặt hàng "${toDelete.ma}"?`} onConfirm={() => { remove(toDelete.id); setToDelete(null); }} onCancel={() => setToDelete(null)} />}
      {printing && (
        <PrintDocument
          onClose={() => setPrinting(null)}
          doc={{ title: "Đơn đặt hàng mua", ma: printing.ma, ngay: printing.ngay, partnerLabel: "Nhà cung cấp", partnerName: partnerName(printing.doi_tac_id), items: printing.items, total: printing.tong_tien, note: printing.ghi_chu }}
        />
      )}
    </div>
  );
}

function PurchaseOrderForm({ suppliers, products, onSave, onCancel }) {
  const [doiTacId, setDoiTacId] = useState(suppliers[0]?.id || "");
  const [ngay, setNgay] = useState(todayStr());
  const [ngayGiao, setNgayGiao] = useState("");
  const [ghiChu, setGhiChu] = useState("");
  const [lines, setLines] = useState([{ hang_hoa_id: "", so_luong: 1, don_gia: 0 }]);

  const total = lines.reduce((s, l) => s + (Number(l.so_luong) || 0) * (Number(l.don_gia) || 0), 0);

  function setLine(idx, patch) {
    setLines((cur) => {
      const next = [...cur];
      next[idx] = { ...next[idx], ...patch };
      if (patch.hang_hoa_id) {
        next[idx].don_gia = products.find((p) => p.id === patch.hang_hoa_id)?.gia_von || 0;
      }
      return next;
    });
  }
  function addLine() { setLines((cur) => [...cur, { hang_hoa_id: "", so_luong: 1, don_gia: 0 }]); }
  function removeLine(idx) { setLines((cur) => cur.filter((_, i) => i !== idx)); }

  function submit(e) {
    e.preventDefault();
    const validLines = lines.filter((l) => l.hang_hoa_id && l.so_luong > 0);
    if (!doiTacId || validLines.length === 0) return;
    const withNames = validLines.map((l) => ({
      hang_hoa_id: l.hang_hoa_id,
      ten: products.find((p) => p.id === l.hang_hoa_id)?.ten || "",
      so_luong: Number(l.so_luong) || 0,
      don_gia: Number(l.don_gia) || 0,
    }));
    onSave({ ma: uid("DHM").toUpperCase(), ngay, ngay_giao: ngayGiao, doi_tac_id: doiTacId, items: withNames, tong_tien: total, ghi_chu: ghiChu });
  }

  return (
    <Modal title="Tạo đơn đặt hàng mua" onClose={onCancel} width="max-w-3xl">
      <form onSubmit={submit}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-3">
          <Field label="Nhà cung cấp" required>
            <select required className={inputCls} style={inputStyle} value={doiTacId} onChange={(e) => setDoiTacId(e.target.value)}>
              <option value="">-- Chọn --</option>
              {suppliers.map((p) => <option key={p.id} value={p.id}>{p.ten}</option>)}
            </select>
          </Field>
          <Field label="Ngày đặt"><input type="date" className={inputCls} style={inputStyle} value={ngay} onChange={(e) => setNgay(e.target.value)} /></Field>
          <Field label="Ngày nhận dự kiến"><input type="date" className={inputCls} style={inputStyle} value={ngayGiao} onChange={(e) => setNgayGiao(e.target.value)} /></Field>
        </div>
        <div className="mt-1 mb-2 text-[12.5px] font-medium" style={{ color: COLORS.textMuted }}>Chi tiết hàng hóa</div>
        <div className="rounded-md border overflow-x-auto" style={{ borderColor: COLORS.border }}>
          {lines.map((l, idx) => (
            <div key={idx} className="flex items-center gap-2 px-2.5 py-2 border-b last:border-b-0 min-w-[600px]" style={{ borderColor: COLORS.border }}>
              <select className={inputCls + " flex-1"} style={inputStyle} value={l.hang_hoa_id} onChange={(e) => setLine(idx, { hang_hoa_id: e.target.value })}>
                <option value="">-- Chọn hàng hóa --</option>
                {products.map((p) => <option key={p.id} value={p.id}>{p.ten}</option>)}
              </select>
              <input type="number" min="1" className={inputCls} style={{ ...inputStyle, width: 65 }} value={l.so_luong} onChange={(e) => setLine(idx, { so_luong: +e.target.value })} />
              <span className="text-[12px] w-16 shrink-0" style={{ color: COLORS.textMuted }}>{products.find((p) => p.id === l.hang_hoa_id)?.dvt || "—"}</span>
              <input type="number" min="0" className={inputCls} style={{ ...inputStyle, width: 110 }} value={l.don_gia} onChange={(e) => setLine(idx, { don_gia: +e.target.value })} />
              <div className="w-28 text-right text-[13px]" style={{ color: COLORS.text }}>{fmtVND((l.so_luong || 0) * (l.don_gia || 0))}</div>
              <button type="button" onClick={() => removeLine(idx)} className="p-1 rounded hover:bg-slate-100"><X size={14} color={COLORS.textMuted} /></button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addLine} className="mt-2 text-[12.5px] font-medium flex items-center gap-1" style={{ color: COLORS.navy }}>
          <Plus size={13} /> Thêm dòng hàng
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 mt-4">
          <Field label="Ghi chú"><input className={inputCls} style={inputStyle} value={ghiChu} onChange={(e) => setGhiChu(e.target.value)} /></Field>
          <div className="flex flex-col items-end justify-center pt-4">
            <span className="text-[12.5px]" style={{ color: COLORS.textMuted }}>Tổng cộng</span>
            <span className="text-[18px] font-semibold" style={{ color: COLORS.navy }}>{fmtVND(total)}</span>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
          <Btn type="button" variant="outline" onClick={onCancel}>Hủy</Btn>
          <Btn type="submit">Lưu đơn đặt hàng mua</Btn>
        </div>
      </form>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Bán hàng nhanh (POS)                                                */
/* ------------------------------------------------------------------ */
function POSPage({ products, customers, priceLists, channels, warehouses, salesStore, productStore, paymentMethods, lotStore }) {
  const { add: addSale } = salesStore;
  const { setItems: setProducts } = productStore;
  const [cart, setCart] = useState([]); // [{ hang_hoa_id, ten, so_luong, don_gia, dvt }]
  const [customerId, setCustomerId] = useState("");
  const [khoId, setKhoId] = useState(warehouses?.[0]?.id || "");
  const [search, setSearch] = useState("");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [paymentRows, setPaymentRows] = useState([{ phuong_thuc_id: paymentMethods?.[0]?.id || "", so_tien: 0 }]);
  const [lastReceipt, setLastReceipt] = useState(null);
  const [scanError, setScanError] = useState("");
  const searchRef = useRef(null);

  const customer = customers.find((c) => c.id === customerId);
  const priceList = customer?.bang_gia_id ? (priceLists || []).find((pl) => pl.id === customer.bang_gia_id) : null;
  const chietKhauPct = customer?.chiet_khau_pct || 0;

  function priceFor(product) {
    if (priceList?.gia?.[product.id] != null) return priceList.gia[product.id];
    return product.gia_ban;
  }

  function addToCart(product) {
    if (!product) return;
    setScanError("");
    setCart((cur) => {
      const idx = cur.findIndex((l) => l.hang_hoa_id === product.id);
      if (idx >= 0) {
        const next = [...cur];
        next[idx] = { ...next[idx], so_luong: next[idx].so_luong + 1 };
        return next;
      }
      return [...cur, { hang_hoa_id: product.id, ten: product.ten, dvt: product.dvt, so_luong: 1, don_gia: priceFor(product) }];
    });
  }

  function setQty(id, qty) {
    if (qty < 1) return;
    setCart((cur) => cur.map((l) => (l.hang_hoa_id === id ? { ...l, so_luong: qty } : l)));
  }
  function removeLine(id) {
    setCart((cur) => cur.filter((l) => l.hang_hoa_id !== id));
  }

  const subtotal = cart.reduce((s, l) => s + l.so_luong * l.don_gia, 0);
  const discountAmount = subtotal * (chietKhauPct / 100);
  const total = subtotal - discountAmount;
  const sumPaid = paymentRows.reduce((s, r) => s + (Number(r.so_tien) || 0), 0);
  const tienThua = Math.max(0, sumPaid - total);

  function findByCode(code) {
    const c = (code || "").trim();
    if (!c) return null;
    return products.find((p) => p.ma_vach === c) || products.find((p) => p.ma?.toLowerCase() === c.toLowerCase());
  }

  function handleSearchEnter(e) {
    if (e.key !== "Enter") return;
    const p = findByCode(search);
    if (p) {
      addToCart(p);
      setSearch("");
    } else {
      setScanError(`Không tìm thấy hàng hóa khớp với "${search}".`);
    }
  }

  function handleScanned(code) {
    setScannerOpen(false);
    const p = findByCode(code);
    if (p) addToCart(p);
    else setScanError(`Không tìm thấy hàng hóa với mã vạch "${code}".`);
  }

  function checkout() {
    if (cart.length === 0) return;
    const items = cart.map((l) => {
      const item = { hang_hoa_id: l.hang_hoa_id, ten: l.ten, so_luong: l.so_luong, don_gia: l.don_gia };
      const product = products.find((p) => p.id === l.hang_hoa_id);
      // Hàng theo lô/serial: POS không có màn hình chọn lô thủ công, tự động
      // phân bổ theo hết-hạn-trước / nhập-trước (giống ưu tiên trên đơn bán thường).
      if (product?.quan_ly_ton_kho && product.quan_ly_ton_kho !== "thuong" && lotStore) {
        item.lo_phan_bo = phanBoLoHang(lotStore.items, l.hang_hoa_id, khoId, l.so_luong).allocations;
      }
      return item;
    });
    // POS luôn coi là thanh toán đủ ngay lúc bán; nếu khách đưa dư (để lấy tiền
    // thối), phần dư đó không tính vào doanh thu/tiền mặt thực nhận — trừ bớt
    // vào dòng cuối cùng trước khi lưu.
    let remainingToStrip = tienThua;
    const normalizedRows = [...paymentRows].reverse().map((r) => {
      let amt = Number(r.so_tien) || 0;
      if (remainingToStrip > 0) {
        const cut = Math.min(remainingToStrip, amt);
        amt -= cut;
        remainingToStrip -= cut;
      }
      return { ...r, so_tien: amt };
    }).reverse().filter((r) => r.so_tien > 0);

    const invoice = {
      id: uid("HD"),
      ma: uid("HD").toUpperCase(),
      ngay: todayStr(),
      doi_tac_id: customerId || undefined,
      kho_id: khoId || undefined,
      items,
      tam_tinh: subtotal,
      chiet_khau_pct: chietKhauPct,
      tong_tien: total,
      da_thanh_toan: total, // POS = thanh toán ngay khi checkout
      thanh_toan_chi_tiet: normalizedRows.map((r) => ({ phuong_thuc_id: r.phuong_thuc_id, ten: (paymentMethods || []).find((m) => m.id === r.phuong_thuc_id)?.ten || "Tiền mặt", so_tien: r.so_tien })),
    };
    addSale(invoice);
    setProducts((cur) => {
      const next = cur.map((p) => {
        const line = items.find((it) => it.hang_hoa_id === p.id);
        if (!line) return p;
        return adjustProductStock(p, -line.so_luong, khoId);
      });
      storageSet(STORE_KEYS.products, next);
      return next;
    });
    if (lotStore) {
      const nextLots = applyLotChanges(lotStore.items, true, items, khoId);
      lotStore.persist(nextLots, "update", { silent: true });
    }
    setLastReceipt(invoice);
    setCart([]);
    setPaymentRows([{ phuong_thuc_id: paymentMethods?.[0]?.id || "", so_tien: 0 }]);
    setCustomerId("");
  }

  const filteredProducts = products.filter(
    (p) => !search || p.ten?.toLowerCase().includes(search.toLowerCase()) || p.ma?.toLowerCase().includes(search.toLowerCase()) || p.ma_vach?.includes(search)
  );

  // Phím tắt: F3 focus ô tìm/quét, F9 thanh toán, Esc xóa ô tìm kiếm.
  // Bỏ qua khi đang mở modal quét mã vạch hoặc xem hóa đơn vừa in.
  useEffect(() => {
    function onKey(e) {
      if (scannerOpen || lastReceipt) return;
      if (e.key === "F3") {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      } else if (e.key === "F9") {
        e.preventDefault();
        if (cart.length > 0) checkout();
      } else if (e.key === "Escape" && document.activeElement === searchRef.current) {
        setSearch("");
        setScanError("");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scannerOpen, lastReceipt, cart, paymentRows, customerId, khoId]);

  return (
    <div>
      <PageHeader
        title="Bán hàng nhanh"
        subtitle="Chọn hàng hoặc quét mã vạch để thêm vào giỏ, thanh toán ngay tại quầy · Phím tắt: F3 tìm hàng, F9 thanh toán"
        action={<Btn variant="outline" onClick={() => setScannerOpen(true)}><ScanLine size={15} /> Quét mã vạch</Btn>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="relative mb-1">
            <input
              ref={searchRef}
              autoFocus
              value={search}
              onChange={(e) => { setSearch(e.target.value); setScanError(""); }}
              onKeyDown={handleSearchEnter}
              placeholder="Gõ tên/mã hàng để lọc, hoặc quét/gõ mã vạch rồi Enter... (F3)"
              className={inputCls}
              style={inputStyle}
            />
          </div>
          {scanError && <div className="mb-2 text-[12px]" style={{ color: COLORS.red }}>{scanError}</div>}
          {filteredProducts.length === 0 ? (
            <EmptyState icon={Package} title="Không có hàng hóa phù hợp" hint="Thử từ khóa khác hoặc thêm hàng hóa mới." />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[65vh] overflow-y-auto pr-1">
              {filteredProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => addToCart(p)}
                  className="text-left rounded-lg p-3 hover:shadow-md transition-shadow"
                  style={{ border: `1px solid ${COLORS.border}`, background: COLORS.surface }}
                >
                  <div className="text-[13px] font-medium mb-1 line-clamp-2" style={{ color: COLORS.text }}>{p.ten}</div>
                  <div className="text-[11.5px]" style={{ color: (p.ton_kho || 0) <= (p.ton_toi_thieu || 0) ? COLORS.red : COLORS.textMuted }}>Tồn: {p.ton_kho ?? 0} {p.dvt}</div>
                  <div className="text-[13.5px] font-semibold mt-1" style={{ color: COLORS.navy }}>{fmtVND(priceFor(p))}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg p-4 flex flex-col" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
          <Field label="Khách hàng">
            <select className={inputCls} style={inputStyle} value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
              <option value="">Khách lẻ</option>
              {customers.map((c) => <option key={c.id} value={c.id}>{c.ten}</option>)}
            </select>
          </Field>
          {warehouses?.length > 1 && (
            <Field label="Bán từ kho">
              <select className={inputCls} style={inputStyle} value={khoId} onChange={(e) => setKhoId(e.target.value)}>
                {warehouses.map((w) => <option key={w.id} value={w.id}>{w.ten}</option>)}
              </select>
            </Field>
          )}
          {(priceList || chietKhauPct > 0) && (
            <div className="mb-2 px-2 py-1.5 rounded text-[11.5px]" style={{ background: COLORS.goldBg, color: "#5C4109" }}>
              {priceList && <div>Bảng giá: <b>{priceList.ten}</b></div>}
              {chietKhauPct > 0 && <div>Chiết khấu: <b>{chietKhauPct}%</b></div>}
            </div>
          )}

          <div className="flex-1 overflow-y-auto my-2 space-y-2 min-h-[120px]">
            {cart.length === 0 ? (
              <div className="text-[12.5px] text-center py-8" style={{ color: COLORS.textMuted }}>Giỏ hàng trống</div>
            ) : (
              cart.map((l) => {
                const product = products.find((p) => p.id === l.hang_hoa_id);
                const overselling = product && l.so_luong > (khoId && product.ton_kho_theo_kho ? (product.ton_kho_theo_kho[khoId] || 0) : (product.ton_kho || 0));
                return (
                  <div key={l.hang_hoa_id}>
                    <div className="flex items-center gap-2 text-[12.5px]">
                      <div className="flex-1 min-w-0">
                        <div className="truncate" style={{ color: COLORS.text }}>{l.ten}</div>
                        <div style={{ color: COLORS.textMuted }}>{fmtVND(l.don_gia)} / {l.dvt}</div>
                      </div>
                      <button type="button" onClick={() => setQty(l.hang_hoa_id, l.so_luong - 1)} className="w-6 h-6 rounded shrink-0" style={{ border: `1px solid ${COLORS.border}` }}>−</button>
                      <span className="w-6 text-center shrink-0" style={overselling ? { color: COLORS.red, fontWeight: 600 } : {}}>{l.so_luong}</span>
                      <button type="button" onClick={() => setQty(l.hang_hoa_id, l.so_luong + 1)} className="w-6 h-6 rounded shrink-0" style={{ border: `1px solid ${COLORS.border}` }}>+</button>
                      <button type="button" onClick={() => removeLine(l.hang_hoa_id)} className="shrink-0"><X size={14} color={COLORS.red} /></button>
                    </div>
                    {overselling && (
                      <div className="text-[11px] mt-0.5" style={{ color: COLORS.red }}>Vượt tồn kho (còn {product.ton_kho ?? 0})</div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {chietKhauPct > 0 && (
            <div className="flex justify-between text-[12.5px] mb-1">
              <span style={{ color: COLORS.textMuted }}>Chiết khấu</span>
              <span style={{ color: COLORS.red }}>-{fmtVND(discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-[16px] font-semibold py-2 my-1" style={{ borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
            <span style={{ color: COLORS.text }}>Tổng cộng</span>
            <span style={{ color: COLORS.navy }}>{fmtVND(total)}</span>
          </div>
          <Field label="Khách thanh toán">
            <SplitPaymentEditor methods={paymentMethods} rows={paymentRows} setRows={setPaymentRows} autoTotal={total} />
          </Field>
          <div className="flex justify-between text-[13px] mb-3">
            <span style={{ color: COLORS.textMuted }}>Tiền thừa trả khách</span>
            <span style={{ color: COLORS.green, fontWeight: 600 }}>{fmtVND(tienThua)}</span>
          </div>
          <Btn onClick={checkout} disabled={cart.length === 0} className="w-full justify-center">Thanh toán (F9)</Btn>
        </div>
      </div>

      {scannerOpen && <BarcodeScannerModal onClose={() => setScannerOpen(false)} onDetected={handleScanned} />}
      {lastReceipt && (
        <PrintDocument
          onClose={() => setLastReceipt(null)}
          doc={{
            title: "Hóa đơn bán hàng",
            ma: lastReceipt.ma,
            ngay: lastReceipt.ngay,
            partnerLabel: "Khách hàng",
            partnerName: customers.find((c) => c.id === lastReceipt.doi_tac_id)?.ten || "Khách lẻ",
            items: lastReceipt.items,
            total: lastReceipt.tong_tien,
          }}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stock vouchers: Nhập kho / Xuất kho (manual adjustments)             */
/* ------------------------------------------------------------------ */
function StockVoucherPage({ type, store, productStore, warehouses }) {
  // type: 'in' | 'out'
  const isIn = type === "in";
  const { items, add, remove } = store;
  const { items: products, setItems: setProducts } = productStore;
  const [creating, setCreating] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [printing, setPrinting] = useState(null);
  const list = items.filter((v) => v.loai === type).sort((a, b) => (b.ngay || "").localeCompare(a.ngay || ""));

  function create(form) {
    add({ ...form, id: uid(isIn ? "PNK" : "PXK"), loai: type });
    const delta = isIn ? 1 : -1;
    setProducts((cur) => {
      const next = cur.map((p) => {
        if (p.id !== form.hang_hoa_id) return p;
        let updated = adjustProductStock(p, delta * form.so_luong, form.kho_id);
        if (isIn && form.don_gia > 0) {
          updated = { ...updated, gia_von: weightedAvgCost(p.ton_kho || 0, p.gia_von || 0, form.so_luong, form.don_gia) };
        }
        return updated;
      });
      storageSet(STORE_KEYS.products, next);
      return next;
    });
    setCreating(false);
  }

  function del(v) {
    const delta = isIn ? -1 : 1;
    setProducts((cur) => {
      const next = cur.map((p) => (p.id === v.hang_hoa_id ? adjustProductStock(p, delta * v.so_luong, v.kho_id) : p));
      storageSet(STORE_KEYS.products, next);
      return next;
    });
    remove(v.id);
    setToDelete(null);
  }

  return (
    <div>
      <PageHeader
        title={isIn ? "Nhập kho" : "Xuất kho"}
        subtitle={isIn ? "Phiếu nhập kho không qua mua hàng (điều chỉnh, chuyển kho...)" : "Phiếu xuất kho không qua bán hàng (hao hụt, chuyển kho...)"}
        action={<Btn onClick={() => setCreating(true)}><Plus size={15} /> Tạo phiếu</Btn>}
      />
      {list.length === 0 ? (
        <EmptyState icon={isIn ? ArrowDownToLine : ArrowUpFromLine} title={`Chưa có phiếu ${isIn ? "nhập" : "xuất"} kho`} hint="Dùng để điều chỉnh tồn kho ngoài giao dịch mua/bán." action={<Btn onClick={() => setCreating(true)}><Plus size={15} /> Tạo phiếu</Btn>} />
      ) : (
        <Table
          columns={[
            { key: "ma", label: "Số phiếu" },
            { key: "ngay", label: "Ngày", render: (r) => fmtDate(r.ngay) },
            { key: "ten_hang", label: "Hàng hóa" },
            { key: "so_luong", label: "Số lượng", align: "right" },
            { key: "ly_do", label: "Lý do" },
          ]}
          rows={list}
          onPrint={setPrinting}
          onDelete={setToDelete}
        />
      )}
      {creating && <StockVoucherForm isIn={isIn} products={products} warehouses={warehouses} onCancel={() => setCreating(false)} onSave={create} />}
      {toDelete && <ConfirmBar text={`Xóa phiếu "${toDelete.ma}"? Tồn kho sẽ được hoàn lại.`} onConfirm={() => del(toDelete)} onCancel={() => setToDelete(null)} />}
      {printing && (
        <PrintDocument
          onClose={() => setPrinting(null)}
          doc={{
            title: isIn ? "Phiếu nhập kho" : "Phiếu xuất kho",
            ma: printing.ma,
            ngay: printing.ngay,
            partnerLabel: "Lý do",
            partnerName: printing.ly_do || "—",
            items: [{ ten: printing.ten_hang, so_luong: printing.so_luong, don_gia: 0 }],
            total: 0,
          }}
        />
      )}
    </div>
  );
}

function StockVoucherForm({ isIn, products, warehouses, onSave, onCancel }) {
  const [hangHoaId, setHangHoaId] = useState("");
  const [enteredQty, setEnteredQty] = useState(1);
  const [unitIdx, setUnitIdx] = useState(0);
  const [ngay, setNgay] = useState(todayStr());
  const [lyDo, setLyDo] = useState("");
  const [khoId, setKhoId] = useState(warehouses?.[0]?.id || "");
  const [donGia, setDonGia] = useState(0);

  const product = products.find((p) => p.id === hangHoaId);
  const units = [{ ten: product?.dvt || "Cái", ty_le: 1 }, ...((product?.don_vi_quy_doi) || [])];
  const baseQty = enteredQty * (units[unitIdx]?.ty_le || 1);

  function submit(e) {
    e.preventDefault();
    if (!hangHoaId) return;
    onSave({
      hang_hoa_id: hangHoaId,
      so_luong: baseQty,
      ngay,
      ly_do: lyDo,
      kho_id: khoId || undefined,
      don_gia: isIn ? Number(donGia) || 0 : undefined,
      ma: uid(isIn ? "PNK" : "PXK").toUpperCase(),
      ten_hang: product?.ten,
    });
  }
  return (
    <Modal title={isIn ? "Tạo phiếu nhập kho" : "Tạo phiếu xuất kho"} onClose={onCancel}>
      <form onSubmit={submit}>
        <Field label="Hàng hóa" required>
          <select required className={inputCls} style={inputStyle} value={hangHoaId} onChange={(e) => { setHangHoaId(e.target.value); setUnitIdx(0); }}>
            <option value="">-- Chọn hàng hóa --</option>
            {products.map((p) => <option key={p.id} value={p.id}>{p.ten} (tồn: {p.ton_kho ?? 0} {p.dvt})</option>)}
          </select>
        </Field>
        {warehouses?.length > 1 && (
          <Field label="Kho / Chi nhánh" required>
            <select required className={inputCls} style={inputStyle} value={khoId} onChange={(e) => setKhoId(e.target.value)}>
              {warehouses.map((w) => <option key={w.id} value={w.id}>{w.ten}</option>)}
            </select>
          </Field>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
          <Field label="Số lượng" required>
            <div className="flex items-center gap-1.5">
              <input required type="number" min="1" className={inputCls} style={inputStyle} value={enteredQty} onChange={(e) => setEnteredQty(+e.target.value)} />
              {units.length > 1 ? (
                <select className={inputCls} style={{ ...inputStyle, width: 110 }} value={unitIdx} onChange={(e) => setUnitIdx(+e.target.value)}>
                  {units.map((u, i) => <option key={i} value={i}>{u.ten}</option>)}
                </select>
              ) : (
                <span className="text-[12.5px] shrink-0" style={{ color: COLORS.textMuted }}>{units[0]?.ten}</span>
              )}
            </div>
            {unitIdx > 0 && <div className="text-[11.5px] mt-1" style={{ color: COLORS.textMuted }}>= {baseQty} {product?.dvt}</div>}
          </Field>
          <Field label="Ngày"><input type="date" className={inputCls} style={inputStyle} value={ngay} onChange={(e) => setNgay(e.target.value)} /></Field>
        </div>
        {isIn && (
          <Field label="Đơn giá nhập (để trống nếu không đổi giá vốn)">
            <input type="number" min="0" className={inputCls} style={inputStyle} value={donGia} onChange={(e) => setDonGia(e.target.value)} placeholder="VD: nhập điều chỉnh có giá — sẽ cập nhật giá vốn bình quân" />
          </Field>
        )}
        <Field label="Lý do"><input className={inputCls} style={inputStyle} value={lyDo} onChange={(e) => setLyDo(e.target.value)} placeholder={isIn ? "VD: nhập điều chỉnh, chuyển kho..." : "VD: hao hụt, hỏng, chuyển kho..."} /></Field>
        <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
          <Btn type="button" variant="outline" onClick={onCancel}>Hủy</Btn>
          <Btn type="submit">Lưu phiếu</Btn>
        </div>
      </form>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Chuyển kho                                                          */
/* ------------------------------------------------------------------ */
function StockTransferPage({ store, productStore, warehouses }) {
  const { items, add, remove } = store;
  const { items: products, setItems: setProducts } = productStore;
  const [creating, setCreating] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const list = items.filter((v) => v.loai === "transfer").sort((a, b) => (b.ngay || "").localeCompare(a.ngay || ""));
  const whName = (id) => warehouses.find((w) => w.id === id)?.ten || "—";

  function create(form) {
    add({ ...form, id: uid("CK"), loai: "transfer" });
    setProducts((cur) => {
      const next = cur.map((p) => {
        if (p.id !== form.hang_hoa_id) return p;
        let np = adjustProductStock(p, -form.so_luong, form.tu_kho_id);
        np = adjustProductStock(np, form.so_luong, form.den_kho_id);
        return np;
      });
      storageSet(STORE_KEYS.products, next);
      return next;
    });
    setCreating(false);
  }

  function del(v) {
    setProducts((cur) => {
      const next = cur.map((p) => {
        if (p.id !== v.hang_hoa_id) return p;
        let np = adjustProductStock(p, v.so_luong, v.tu_kho_id);
        np = adjustProductStock(np, -v.so_luong, v.den_kho_id);
        return np;
      });
      storageSet(STORE_KEYS.products, next);
      return next;
    });
    remove(v.id);
    setToDelete(null);
  }

  return (
    <div>
      <PageHeader
        title="Chuyển kho"
        subtitle="Chuyển hàng hóa giữa các kho/chi nhánh — không làm thay đổi tổng tồn kho"
        action={<Btn onClick={() => setCreating(true)}><Plus size={15} /> Tạo phiếu chuyển kho</Btn>}
      />
      {warehouses.length < 2 ? (
        <EmptyState icon={Truck} title="Cần ít nhất 2 kho để chuyển hàng" hint="Vào mục Kho / Chi nhánh để thêm kho thứ 2 trước." />
      ) : list.length === 0 ? (
        <EmptyState icon={Truck} title="Chưa có phiếu chuyển kho" hint="Tạo phiếu khi cần chuyển hàng giữa các kho/chi nhánh." action={<Btn onClick={() => setCreating(true)}><Plus size={15} /> Tạo phiếu chuyển kho</Btn>} />
      ) : (
        <Table
          columns={[
            { key: "ma", label: "Số phiếu" },
            { key: "ngay", label: "Ngày", render: (r) => fmtDate(r.ngay) },
            { key: "ten_hang", label: "Hàng hóa" },
            { key: "so_luong", label: "Số lượng", align: "right" },
            { key: "tu_kho_id", label: "Từ kho", render: (r) => whName(r.tu_kho_id) },
            { key: "den_kho_id", label: "Đến kho", render: (r) => whName(r.den_kho_id) },
          ]}
          rows={list}
          onDelete={setToDelete}
        />
      )}
      {creating && <StockTransferForm products={products} warehouses={warehouses} onCancel={() => setCreating(false)} onSave={create} />}
      {toDelete && <ConfirmBar text={`Xóa phiếu "${toDelete.ma}"? Tồn kho sẽ được hoàn lại đúng kho ban đầu.`} onConfirm={() => del(toDelete)} onCancel={() => setToDelete(null)} />}
    </div>
  );
}

function StockTransferForm({ products, warehouses, onSave, onCancel }) {
  const [hangHoaId, setHangHoaId] = useState("");
  const [soLuong, setSoLuong] = useState(1);
  const [tuKhoId, setTuKhoId] = useState(warehouses[0]?.id || "");
  const [denKhoId, setDenKhoId] = useState(warehouses[1]?.id || "");
  const [ngay, setNgay] = useState(todayStr());
  const [error, setError] = useState("");

  const product = products.find((p) => p.id === hangHoaId);
  const availableAtSource = product ? (product.ton_kho_theo_kho?.[tuKhoId] || 0) : 0;

  function submit(e) {
    e.preventDefault();
    if (!hangHoaId || !tuKhoId || !denKhoId) return;
    if (tuKhoId === denKhoId) { setError("Kho nguồn và kho đích phải khác nhau."); return; }
    if (soLuong > availableAtSource) { setError(`Kho nguồn chỉ còn ${availableAtSource} ${product?.dvt} — không đủ để chuyển.`); return; }
    setError("");
    onSave({ ma: uid("CK").toUpperCase(), ngay, hang_hoa_id: hangHoaId, so_luong: soLuong, tu_kho_id: tuKhoId, den_kho_id: denKhoId, ten_hang: product?.ten });
  }

  return (
    <Modal title="Tạo phiếu chuyển kho" onClose={onCancel}>
      <form onSubmit={submit}>
        <Field label="Hàng hóa" required>
          <select required className={inputCls} style={inputStyle} value={hangHoaId} onChange={(e) => setHangHoaId(e.target.value)}>
            <option value="">-- Chọn hàng hóa --</option>
            {products.map((p) => <option key={p.id} value={p.id}>{p.ten}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
          <Field label="Từ kho" required>
            <select required className={inputCls} style={inputStyle} value={tuKhoId} onChange={(e) => setTuKhoId(e.target.value)}>
              {warehouses.map((w) => <option key={w.id} value={w.id}>{w.ten}</option>)}
            </select>
            {product && <div className="text-[11.5px] mt-1" style={{ color: COLORS.textMuted }}>Tồn tại kho này: {availableAtSource} {product.dvt}</div>}
          </Field>
          <Field label="Đến kho" required>
            <select required className={inputCls} style={inputStyle} value={denKhoId} onChange={(e) => setDenKhoId(e.target.value)}>
              {warehouses.map((w) => <option key={w.id} value={w.id}>{w.ten}</option>)}
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
          <Field label="Số lượng" required><input required type="number" min="1" className={inputCls} style={inputStyle} value={soLuong} onChange={(e) => setSoLuong(+e.target.value)} /></Field>
          <Field label="Ngày"><input type="date" className={inputCls} style={inputStyle} value={ngay} onChange={(e) => setNgay(e.target.value)} /></Field>
        </div>
        {error && <div className="mb-3 text-[12.5px]" style={{ color: COLORS.red }}>{error}</div>}
        <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
          <Btn type="button" variant="outline" onClick={onCancel}>Hủy</Btn>
          <Btn type="submit">Lưu phiếu</Btn>
        </div>
      </form>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Phiếu thu / Phiếu chi                                               */
/* ------------------------------------------------------------------ */
function CashVoucherPage({ type, store, partnerStore, paymentMethodStore }) {
  const isThu = type === "thu";
  const { items, add, remove } = store;
  const { items: partners } = partnerStore;
  const { items: paymentMethods } = paymentMethodStore || { items: [] };
  const [creating, setCreating] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [printing, setPrinting] = useState(null);
  const partnerName = (id) => partners.find((p) => p.id === id)?.ten || "Khác";
  const pmName = (id) => paymentMethods.find((p) => p.id === id)?.ten;
  const list = [...items].sort((a, b) => (b.ngay || "").localeCompare(a.ngay || ""));

  function create(form) {
    add({ ...form, id: uid(isThu ? "PT" : "PC") });
    setCreating(false);
  }

  return (
    <div>
      <PageHeader
        title={isThu ? "Phiếu thu" : "Phiếu chi"}
        subtitle={isThu ? "Ghi nhận tiền thu từ khách hàng" : "Ghi nhận tiền chi cho nhà cung cấp / chi phí"}
        action={<Btn onClick={() => setCreating(true)}><Plus size={15} /> Tạo phiếu</Btn>}
      />
      {list.length === 0 ? (
        <EmptyState icon={isThu ? Wallet : HandCoins} title={`Chưa có ${isThu ? "phiếu thu" : "phiếu chi"}`} hint="Tạo phiếu để theo dõi dòng tiền và công nợ." action={<Btn onClick={() => setCreating(true)}><Plus size={15} /> Tạo phiếu</Btn>} />
      ) : (
        <Table
          columns={[
            { key: "ma", label: "Số phiếu" },
            { key: "ngay", label: "Ngày", render: (r) => fmtDate(r.ngay) },
            { key: "doi_tac", label: isThu ? "Khách hàng" : "Nhà cung cấp / Nội dung", render: (r) => (r.doi_tac_id ? partnerName(r.doi_tac_id) : r.ghi_chu || "—") },
            { key: "phuong_thuc", label: "Quỹ", render: (r) => pmName(r.phuong_thuc_tt_id) ? <Badge tone="muted">{pmName(r.phuong_thuc_tt_id)}</Badge> : "—" },
            { key: "so_tien", label: "Số tiền", align: "right", render: (r) => <span style={{ color: isThu ? COLORS.green : COLORS.red, fontWeight: 600 }}>{fmtVND(r.so_tien)}</span> },
            { key: "ghi_chu", label: "Ghi chú" },
          ]}
          rows={list}
          onPrint={setPrinting}
          onDelete={setToDelete}
        />
      )}
      {creating && <CashVoucherForm isThu={isThu} partners={partners} paymentMethods={paymentMethods} onCancel={() => setCreating(false)} onSave={create} />}
      {toDelete && <ConfirmBar text={`Xóa phiếu "${toDelete.ma}"?`} onConfirm={() => { remove(toDelete.id); setToDelete(null); }} onCancel={() => setToDelete(null)} />}
      {printing && (
        <PrintDocument
          onClose={() => setPrinting(null)}
          doc={{
            title: isThu ? "Phiếu thu" : "Phiếu chi",
            ma: printing.ma,
            ngay: printing.ngay,
            partnerLabel: isThu ? "Người nộp" : "Người nhận",
            partnerName: printing.doi_tac_id ? partnerName(printing.doi_tac_id) : (printing.ghi_chu || "—"),
            items: [{ ten: printing.ghi_chu || (isThu ? "Thu tiền" : "Chi tiền"), so_luong: 1, don_gia: printing.so_tien }],
            total: printing.so_tien,
            note: printing.ghi_chu,
          }}
        />
      )}
    </div>
  );
}

function CashVoucherForm({ isThu, partners, paymentMethods, onSave, onCancel }) {
  const [f, setF] = useState({ doi_tac_id: "", so_tien: 0, ngay: todayStr(), ghi_chu: "", phuong_thuc_tt_id: "" });
  function submit(e) {
    e.preventDefault();
    if (!f.so_tien) return;
    onSave({ ...f, ma: uid(isThu ? "PT" : "PC").toUpperCase() });
  }
  return (
    <Modal title={isThu ? "Tạo phiếu thu" : "Tạo phiếu chi"} onClose={onCancel}>
      <form onSubmit={submit}>
        <Field label={isThu ? "Khách hàng" : "Nhà cung cấp"}>
          <select className={inputCls} style={inputStyle} value={f.doi_tac_id} onChange={(e) => setF({ ...f, doi_tac_id: e.target.value })}>
            <option value="">-- Không chọn / chi phí khác --</option>
            {partners.map((p) => <option key={p.id} value={p.id}>{p.ten}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
          <Field label="Số tiền" required><input required type="number" min="0" className={inputCls} style={inputStyle} value={f.so_tien} onChange={(e) => setF({ ...f, so_tien: +e.target.value })} /></Field>
          <Field label="Ngày"><input type="date" className={inputCls} style={inputStyle} value={f.ngay} onChange={(e) => setF({ ...f, ngay: e.target.value })} /></Field>
        </div>
        {paymentMethods && paymentMethods.length > 0 && (
          <Field label="Quỹ / phương thức thanh toán">
            <select className={inputCls} style={inputStyle} value={f.phuong_thuc_tt_id} onChange={(e) => setF({ ...f, phuong_thuc_tt_id: e.target.value })}>
              <option value="">-- Chưa phân loại --</option>
              {paymentMethods.map((p) => <option key={p.id} value={p.id}>{p.ten}</option>)}
            </select>
          </Field>
        )}
        <Field label="Ghi chú / nội dung"><input className={inputCls} style={inputStyle} value={f.ghi_chu} onChange={(e) => setF({ ...f, ghi_chu: e.target.value })} /></Field>
        <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
          <Btn type="button" variant="outline" onClick={onCancel}>Hủy</Btn>
          <Btn type="submit">Lưu phiếu</Btn>
        </div>
      </form>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Phương thức thanh toán                                              */
/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/* Thanh toán nhiều phương thức trên một chứng từ — dùng ở đơn bán/mua  */
/* và POS. rows: [{ phuong_thuc_id, ten, so_tien }]                     */
/* ------------------------------------------------------------------ */
function SplitPaymentEditor({ methods, rows, setRows, autoTotal }) {
  const sum = rows.reduce((s, r) => s + (Number(r.so_tien) || 0), 0);
  const options = methods && methods.length > 0 ? methods : [{ id: "", ten: "Tiền mặt" }];

  function addRow() {
    const used = new Set(rows.map((r) => r.phuong_thuc_id));
    const next = options.find((m) => !used.has(m.id)) || options[0];
    setRows([...rows, { phuong_thuc_id: next?.id || "", so_tien: 0 }]);
  }
  function updateRow(i, patch) {
    setRows(rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  }
  function removeRow(i) {
    setRows(rows.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-1.5 mb-1.5">
          <select
            className={inputCls}
            style={{ ...inputStyle, flex: 1 }}
            value={r.phuong_thuc_id}
            onChange={(e) => updateRow(i, { phuong_thuc_id: e.target.value })}
          >
            {options.map((m) => <option key={m.id || "cash"} value={m.id}>{m.ten}</option>)}
          </select>
          <input
            type="number"
            min="0"
            className={inputCls}
            style={{ ...inputStyle, width: 130 }}
            value={r.so_tien}
            onChange={(e) => updateRow(i, { so_tien: e.target.value })}
          />
          {rows.length > 1 && (
            <button type="button" onClick={() => removeRow(i)} className="p-1 rounded hover:bg-slate-100 shrink-0" aria-label="Bỏ phương thức này">
              <X size={14} color={COLORS.red} />
            </button>
          )}
        </div>
      ))}
      <div className="flex items-center justify-between">
        <button type="button" onClick={addRow} className="text-[12px] font-medium underline" style={{ color: COLORS.navy }}>
          + Thêm phương thức thanh toán
        </button>
        {rows.length > 1 && (
          <span className="text-[12px]" style={{ color: COLORS.textMuted }}>
            Tổng: <b style={{ color: COLORS.text }}>{fmtVND(sum)}</b>{autoTotal != null && sum !== autoTotal ? ` (chênh ${fmtVND(sum - autoTotal)})` : ""}
          </span>
        )}
      </div>
    </div>
  );
}

function PaymentMethodsPage({ store }) {
  const { items, add, update, remove } = store;
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  function save(form) {
    if (form.id) update(form.id, form);
    else add({ ...form, id: uid("PTTT") });
    setEditing(null);
  }

  return (
    <div>
      <PageHeader
        title="Phương thức thanh toán"
        subtitle="Quỹ tiền mặt, tài khoản ngân hàng, ví điện tử... dùng cho Phiếu thu/chi và Sổ quỹ"
        action={<Btn onClick={() => setEditing({})}><Plus size={15} /> Thêm phương thức</Btn>}
      />
      {items.length === 0 ? (
        <EmptyState icon={CreditCard} title="Chưa có phương thức thanh toán" hint="VD: Tiền mặt, Chuyển khoản Vietcombank, Ví MoMo... Thêm để tách sổ quỹ theo từng nguồn tiền." action={<Btn onClick={() => setEditing({})}><Plus size={15} /> Thêm phương thức</Btn>} />
      ) : (
        <Table
          columns={[
            { key: "ten", label: "Tên" },
            { key: "loai", label: "Loại", render: (r) => <Badge tone={r.loai === "tien_mat" ? "amber" : "muted"}>{r.loai === "tien_mat" ? "Tiền mặt" : "Ngân hàng / ví"}</Badge> },
            { key: "so_du_dau", label: "Số dư đầu (toàn thời gian)", align: "right", render: (r) => fmtVND(r.so_du_dau) },
          ]}
          rows={items}
          onEdit={setEditing}
          onDelete={setToDelete}
        />
      )}
      {editing && (
        <Modal title={editing.id ? "Sửa phương thức thanh toán" : "Thêm phương thức thanh toán"} onClose={() => setEditing(null)}>
          <PaymentMethodForm initial={editing} onCancel={() => setEditing(null)} onSave={save} />
        </Modal>
      )}
      {toDelete && <ConfirmBar text={`Xóa "${toDelete.ten}"?`} onConfirm={() => { remove(toDelete.id); setToDelete(null); }} onCancel={() => setToDelete(null)} />}
    </div>
  );
}

function PaymentMethodForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState({ ten: initial.ten || "", loai: initial.loai || "tien_mat", so_du_dau: initial.so_du_dau || 0, id: initial.id });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(f); }}>
      <Field label="Tên" required><input required className={inputCls} style={inputStyle} value={f.ten} onChange={(e) => setF({ ...f, ten: e.target.value })} placeholder="VD: Tiền mặt tại quầy, Vietcombank..." /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
        <Field label="Loại">
          <select className={inputCls} style={inputStyle} value={f.loai} onChange={(e) => setF({ ...f, loai: e.target.value })}>
            <option value="tien_mat">Tiền mặt</option>
            <option value="ngan_hang">Ngân hàng / ví điện tử</option>
          </select>
        </Field>
        <Field label="Số dư đầu (toàn thời gian)"><input type="number" className={inputCls} style={inputStyle} value={f.so_du_dau} onChange={(e) => setF({ ...f, so_du_dau: +e.target.value })} /></Field>
      </div>
      <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
        <Btn type="button" variant="outline" onClick={onCancel}>Hủy</Btn>
        <Btn type="submit">Lưu</Btn>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Sổ quỹ                                                              */
/* ------------------------------------------------------------------ */
function SoQuyPage({ receipts, payments, paymentMethods }) {
  const todayM = monthKey(todayStr());
  const [tuNgay, setTuNgay] = useState(`${todayM}-01`);
  const [denNgay, setDenNgay] = useState(todayStr());
  const [quyId, setQuyId] = useState("all");

  const matchesQuy = (r) => quyId === "all" || r.phuong_thuc_tt_id === quyId;

  // All thu/chi entries as signed movements, oldest first
  const allMoves = useMemo(() => {
    const thu = receipts.filter(matchesQuy).map((r) => ({ ...r, loai: "thu", amount: r.so_tien }));
    const chi = payments.filter(matchesQuy).map((r) => ({ ...r, loai: "chi", amount: -r.so_tien }));
    return [...thu, ...chi].sort((a, b) => (a.ngay || "").localeCompare(b.ngay || "") || (a.ma || "").localeCompare(b.ma || ""));
  }, [receipts, payments, quyId]);

  const baseOpening = quyId === "all"
    ? paymentMethods.reduce((s, p) => s + (p.so_du_dau || 0), 0)
    : (paymentMethods.find((p) => p.id === quyId)?.so_du_dau || 0);

  const openingBalance = baseOpening + allMoves.filter((m) => (m.ngay || "") < tuNgay).reduce((s, m) => s + m.amount, 0);
  const inPeriod = allMoves.filter((m) => (m.ngay || "") >= tuNgay && (m.ngay || "") <= denNgay);
  const totalThu = inPeriod.filter((m) => m.loai === "thu").reduce((s, m) => s + m.amount, 0);
  const totalChi = inPeriod.filter((m) => m.loai === "chi").reduce((s, m) => s - m.amount, 0);
  const closingBalance = openingBalance + totalThu - totalChi;

  let running = openingBalance;
  const rows = inPeriod.map((m) => {
    running += m.amount;
    return { ...m, running };
  });

  function doExport() {
    exportExcel(`so-quy-${tuNgay}_${denNgay}`, [{
      name: "Sổ quỹ",
      rows: [
        { "Ngày": "", "Chứng từ": "", "Diễn giải": "Số dư đầu kỳ", "Thu": "", "Chi": "", "Tồn quỹ": openingBalance },
        ...rows.map((r) => ({
          "Ngày": fmtDate(r.ngay), "Chứng từ": r.ma,
          "Diễn giải": r.doi_tac_id ? "" : (r.ghi_chu || ""),
          "Thu": r.loai === "thu" ? r.amount : "", "Chi": r.loai === "chi" ? -r.amount : "",
          "Tồn quỹ": r.running,
        })),
      ],
    }]);
  }

  return (
    <div>
      <PageHeader
        title="Sổ quỹ"
        subtitle="Theo dõi dòng tiền thu/chi và số dư tồn quỹ theo thời gian"
        action={<ExcelButton onClick={doExport} />}
      />
      <div className="flex flex-col sm:flex-row sm:items-end gap-2.5 mb-4">
        <Field label="Quỹ">
          <select className={inputCls} style={{ ...inputStyle, minWidth: 180 }} value={quyId} onChange={(e) => setQuyId(e.target.value)}>
            <option value="all">Tất cả các quỹ</option>
            {paymentMethods.map((p) => <option key={p.id} value={p.id}>{p.ten}</option>)}
          </select>
        </Field>
        <Field label="Từ ngày"><input type="date" className={inputCls} style={inputStyle} value={tuNgay} onChange={(e) => setTuNgay(e.target.value)} /></Field>
        <Field label="Đến ngày"><input type="date" className={inputCls} style={inputStyle} value={denNgay} onChange={(e) => setDenNgay(e.target.value)} /></Field>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <StatCard icon={BookOpen} label="Số dư đầu kỳ" value={fmtVND(openingBalance)} tone="navy" />
        <StatCard icon={TrendingUp} label="Tổng thu trong kỳ" value={fmtVND(totalThu)} tone="green" />
        <StatCard icon={TrendingDown} label="Tổng chi trong kỳ" value={fmtVND(totalChi)} tone="red" />
        <StatCard icon={CircleDollarSign} label="Số dư cuối kỳ" value={fmtVND(closingBalance)} tone="navy" />
      </div>

      {paymentMethods.length === 0 && (
        <div className="mb-4 px-3 py-2 rounded-md text-[12px]" style={{ background: COLORS.amberBg, color: "#5C4109" }}>
          Bạn chưa có "Phương thức thanh toán" nào — sổ quỹ vẫn hiển thị được (gộp chung mọi phiếu thu/chi), nhưng để tách riêng tiền mặt/ngân hàng, hãy thêm phương thức thanh toán trong mục Danh mục.
        </div>
      )}

      {rows.length === 0 ? (
        <EmptyState icon={BookOpen} title="Không có giao dịch nào trong kỳ" hint="Thử mở rộng khoảng ngày hoặc chọn quỹ khác." />
      ) : (
        <Table
          columns={[
            { key: "ma", label: "Chứng từ" },
            { key: "ngay", label: "Ngày", render: (r) => fmtDate(r.ngay) },
            { key: "dien_giai", label: "Diễn giải", render: (r) => r.ghi_chu || (r.loai === "thu" ? "Thu tiền" : "Chi tiền") },
            { key: "thu", label: "Thu", align: "right", render: (r) => (r.loai === "thu" ? <span style={{ color: COLORS.green }}>{fmtVND(r.amount)}</span> : "") },
            { key: "chi", label: "Chi", align: "right", render: (r) => (r.loai === "chi" ? <span style={{ color: COLORS.red }}>{fmtVND(-r.amount)}</span> : "") },
            { key: "running", label: "Tồn quỹ", align: "right", render: (r) => <span style={{ fontWeight: 600 }}>{fmtVND(r.running)}</span> },
          ]}
          rows={rows}
          rowKey="id"
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Công nợ                                                             */
/* ------------------------------------------------------------------ */
function DebtPage({ customers, suppliers, sales, purchases, receipts, payments, salereturns, purchasereturns }) {
  const [tab, setTab] = useState("kh");

  const khRows = customers.map((c) => {
    const banHang = sales.filter((s) => s.doi_tac_id === c.id).reduce((s, i) => s + invoiceGrandTotal(i), 0);
    const daThuTrenHD = sales.filter((s) => s.doi_tac_id === c.id).reduce((s, i) => s + (i.da_thanh_toan || 0), 0);
    const thuThem = receipts.filter((r) => r.doi_tac_id === c.id).reduce((s, i) => s + i.so_tien, 0);
    const traHang = (salereturns || []).filter((r) => r.doi_tac_id === c.id).reduce((s, i) => s + i.tong_tien, 0);
    const conNo = tinhConNoKhachHang(c, sales, receipts, salereturns);
    const tuoiNo = tinhTuoiNo(c.id, c.no_dau || 0, sales, receipts, salereturns);
    return { ...c, phatSinh: banHang, daThu: daThuTrenHD + thuThem, traHang, conNo, ...tuoiNo };
  });

  const nccRows = suppliers.map((c) => {
    const muaHang = purchases.filter((s) => s.doi_tac_id === c.id).reduce((s, i) => s + invoiceGrandTotal(i), 0);
    const daTraTrenHD = purchases.filter((s) => s.doi_tac_id === c.id).reduce((s, i) => s + (i.da_thanh_toan || 0), 0);
    const traThem = payments.filter((r) => r.doi_tac_id === c.id).reduce((s, i) => s + i.so_tien, 0);
    const traHang = (purchasereturns || []).filter((r) => r.doi_tac_id === c.id).reduce((s, i) => s + i.tong_tien, 0);
    const conNo = tinhConNoNCC(c, purchases, payments, purchasereturns);
    const tuoiNo = tinhTuoiNo(c.id, c.no_dau || 0, purchases, payments, purchasereturns);
    return { ...c, phatSinh: muaHang, daTra: daTraTrenHD + traThem, traHang, conNo, ...tuoiNo };
  });

  const totalPhaiThu = khRows.reduce((s, r) => s + Math.max(r.conNo, 0), 0);
  const totalPhaiTra = nccRows.reduce((s, r) => s + Math.max(r.conNo, 0), 0);
  const overLimitCount = khRows.filter((r) => r.han_muc_cong_no > 0 && r.conNo > r.han_muc_cong_no).length;

  function doExport() {
    exportExcel("cong-no", [
      {
        name: "Công nợ KH",
        rows: khRows.map((r) => ({
          "Khách hàng": r.ten, "Phát sinh": r.phatSinh, "Đã thu": r.daThu, "Trả hàng": r.traHang, "Còn phải thu": r.conNo,
          "Nợ 0-30 ngày": r.d0_30, "Nợ 31-60 ngày": r.d31_60, "Nợ 61-90 ngày": r.d61_90, "Nợ trên 90 ngày": r.d90,
        })),
      },
      {
        name: "Công nợ NCC",
        rows: nccRows.map((r) => ({
          "Nhà cung cấp": r.ten, "Phát sinh": r.phatSinh, "Đã trả": r.daTra, "Trả hàng": r.traHang, "Còn phải trả": r.conNo,
          "Nợ 0-30 ngày": r.d0_30, "Nợ 31-60 ngày": r.d31_60, "Nợ 61-90 ngày": r.d61_90, "Nợ trên 90 ngày": r.d90,
        })),
      },
    ]);
  }

  const agingCols = [
    { key: "d0_30", label: "0–30 ngày", align: "right", render: (r) => (r.d0_30 > 0 ? fmtVND(r.d0_30) : "—") },
    { key: "d31_60", label: "31–60 ngày", align: "right", render: (r) => (r.d31_60 > 0 ? <span style={{ color: COLORS.amber }}>{fmtVND(r.d31_60)}</span> : "—") },
    { key: "d61_90", label: "61–90 ngày", align: "right", render: (r) => (r.d61_90 > 0 ? <span style={{ color: COLORS.red }}>{fmtVND(r.d61_90)}</span> : "—") },
    { key: "d90", label: "Trên 90 ngày", align: "right", render: (r) => (r.d90 > 0 ? <span style={{ color: COLORS.red, fontWeight: 600 }}>{fmtVND(r.d90)}</span> : "—") },
  ];

  return (
    <div>
      <PageHeader title="Công nợ" subtitle="Theo dõi công nợ phải thu, phải trả và tuổi nợ 30/60/90 ngày" action={<ExcelButton onClick={doExport} />} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <StatCard icon={TrendingUp} label="Tổng phải thu (khách hàng)" value={fmtVND(totalPhaiThu)} tone="green" />
        <StatCard icon={TrendingDown} label="Tổng phải trả (nhà cung cấp)" value={fmtVND(totalPhaiTra)} tone="red" />
      </div>
      {overLimitCount > 0 && (
        <div className="mb-4 px-3 py-2 rounded-md text-[12.5px] flex items-center gap-2" style={{ background: COLORS.redBg, color: COLORS.red }}>
          <AlertTriangle size={14} /> {overLimitCount} khách hàng đang nợ vượt hạn mức công nợ đã khai.
        </div>
      )}
      <div className="flex gap-1 mb-3">
        {[{ k: "kh", l: "Công nợ khách hàng" }, { k: "ncc", l: "Công nợ nhà cung cấp" }].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            className="px-3 py-1.5 text-[13px] font-medium rounded-md"
            style={tab === t.k ? { background: COLORS.navy, color: "#fff" } : { color: COLORS.textMuted }}
          >
            {t.l}
          </button>
        ))}
      </div>
      {tab === "kh" ? (
        khRows.length === 0 ? <EmptyState icon={CircleDollarSign} title="Chưa có dữ liệu công nợ" hint="Thêm khách hàng và đơn bán hàng để xem công nợ." /> : (
          <Table
            columns={[
              {
                key: "ten", label: "Khách hàng",
                render: (r) => (
                  <span>
                    {r.ten}
                    {r.han_muc_cong_no > 0 && r.conNo > r.han_muc_cong_no && (
                      <Badge tone="red"> Vượt hạn mức</Badge>
                    )}
                  </span>
                ),
              },
              { key: "conNo", label: "Còn phải thu", align: "right", render: (r) => <span style={{ color: r.conNo > 0 ? COLORS.red : COLORS.green, fontWeight: 600 }}>{fmtVND(r.conNo)}</span> },
              ...agingCols,
              { key: "daThu", label: "Đã thu", align: "right", render: (r) => fmtVND(r.daThu) },
            ]}
            rows={khRows}
          />
        )
      ) : (
        nccRows.length === 0 ? <EmptyState icon={CircleDollarSign} title="Chưa có dữ liệu công nợ" hint="Thêm nhà cung cấp và đơn mua hàng để xem công nợ." /> : (
          <Table
            columns={[
              { key: "ten", label: "Nhà cung cấp" },
              { key: "conNo", label: "Còn phải trả", align: "right", render: (r) => <span style={{ color: r.conNo > 0 ? COLORS.red : COLORS.green, fontWeight: 600 }}>{fmtVND(r.conNo)}</span> },
              ...agingCols,
              { key: "daTra", label: "Đã trả", align: "right", render: (r) => fmtVND(r.daTra) },
            ]}
            rows={nccRows}
          />
        )
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tồn kho                                                             */
/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/* Lô hàng / Serial — xem tồn theo lô, cảnh báo sắp hết hạn              */
/* ------------------------------------------------------------------ */
function LotsPage({ lotStore, products, warehouses }) {
  const { items: lots } = lotStore;
  const [query, setQuery] = useState("");
  const [khoId, setKhoId] = useState("all");

  const productName = (id) => products.find((p) => p.id === id)?.ten || "—";
  const warehouseName = (id) => warehouses?.find((w) => w.id === id)?.ten;

  const q = query.trim().toLowerCase();
  const rows = lots
    .filter((l) => (l.so_luong || 0) > 0)
    .filter((l) => khoId === "all" || l.kho_id === khoId || !l.kho_id)
    .filter((l) => !q || l.ma_lo?.toLowerCase().includes(q) || productName(l.hang_hoa_id).toLowerCase().includes(q))
    .sort((a, b) => (a.han_su_dung || "9999").localeCompare(b.han_su_dung || "9999"));

  const today = todayStr();
  function expiryTone(hsd) {
    if (!hsd) return null;
    const days = Math.floor((new Date(hsd) - new Date(today)) / 86400000);
    if (days < 0) return "red";
    if (days <= 30) return "amber";
    return null;
  }
  const expiringCount = rows.filter((l) => { const t = expiryTone(l.han_su_dung); return t === "red" || t === "amber"; }).length;

  return (
    <div>
      <PageHeader title="Lô hàng / Serial" subtitle="Tồn kho theo từng lô, hạn sử dụng và số serial/IMEI" />
      {expiringCount > 0 && (
        <div className="mb-4 px-3 py-2 rounded-md text-[12.5px] flex items-center gap-2" style={{ background: COLORS.redBg, color: COLORS.red }}>
          <AlertTriangle size={14} /> {expiringCount} lô đã hết hạn hoặc sắp hết hạn trong 30 ngày tới.
        </div>
      )}
      <div className="flex items-center gap-2 mb-3">
        <Toolbar query={query} setQuery={setQuery} placeholder="Tìm theo số lô/serial hoặc tên hàng..." />
        {warehouses?.length > 1 && (
          <select className={inputCls} style={{ ...inputStyle, minWidth: 150 }} value={khoId} onChange={(e) => setKhoId(e.target.value)}>
            <option value="all">Tất cả các kho</option>
            {warehouses.map((w) => <option key={w.id} value={w.id}>{w.ten}</option>)}
          </select>
        )}
      </div>
      {rows.length === 0 ? (
        <EmptyState icon={Tag} title="Chưa có lô hàng nào" hint="Bật quản lý theo lô/serial cho hàng hóa cần theo dõi, số lô sẽ xuất hiện khi nhập hàng." />
      ) : (
        <Table
          columns={[
            { key: "hang_hoa_id", label: "Hàng hóa", render: (r) => productName(r.hang_hoa_id) },
            { key: "ma_lo", label: "Số lô / Serial" },
            {
              key: "han_su_dung", label: "Hạn sử dụng",
              render: (r) => {
                if (!r.han_su_dung) return "—";
                const tone = expiryTone(r.han_su_dung);
                return tone ? <Badge tone={tone === "red" ? "red" : "amber"}>{fmtDate(r.han_su_dung)}</Badge> : fmtDate(r.han_su_dung);
              },
            },
            { key: "so_luong", label: "Còn lại", align: "right" },
            { key: "kho_id", label: "Kho", render: (r) => warehouseName(r.kho_id) || "—" },
            { key: "ngay_nhap", label: "Ngày nhập", render: (r) => fmtDate(r.ngay_nhap) },
          ]}
          rows={rows}
          rowKey="id"
        />
      )}
    </div>
  );
}

function StockPage({ products, warehouses }) {
  const [query, setQuery] = useState("");
  const [khoId, setKhoId] = useState("all");
  const filtered = products.filter((p) => !query || p.ten?.toLowerCase().includes(query.toLowerCase()));

  function stockOf(p) {
    if (khoId === "all") return p.ton_kho || 0;
    return p.ton_kho_theo_kho?.[khoId] || 0;
  }

  const totalValue = filtered.reduce((s, p) => s + stockOf(p) * (p.gia_von || 0), 0);
  const lowStock = filtered.filter((p) => stockOf(p) <= (p.ton_toi_thieu || 0));

  function doExport() {
    exportExcel("ton-kho", [{
      name: "Tồn kho",
      rows: filtered.map((p) => ({
        "Mã hàng": p.ma, "Tên hàng": p.ten, "ĐVT": p.dvt,
        "Tồn kho": stockOf(p), "Tồn tối thiểu": p.ton_toi_thieu ?? 0,
        "Giá vốn": p.gia_von || 0, "Giá trị tồn": stockOf(p) * (p.gia_von || 0),
      })),
    }]);
  }

  return (
    <div>
      <PageHeader
        title="Tồn kho"
        subtitle="Số lượng và giá trị tồn kho hiện tại"
        action={
          <div className="flex items-center gap-2">
            {warehouses?.length > 1 && (
              <select className={inputCls} style={{ ...inputStyle, minWidth: 150 }} value={khoId} onChange={(e) => setKhoId(e.target.value)}>
                <option value="all">Tất cả các kho</option>
                {warehouses.map((w) => <option key={w.id} value={w.id}>{w.ten}</option>)}
              </select>
            )}
            <ExcelButton onClick={doExport} />
          </div>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <StatCard icon={Boxes} label="Tổng mặt hàng" value={products.length} tone="navy" />
        <StatCard icon={CircleDollarSign} label="Giá trị tồn kho (theo giá vốn)" value={fmtVND(totalValue)} tone="navy" />
        <StatCard icon={AlertTriangle} label="Mặt hàng sắp hết" value={lowStock.length} tone="red" />
      </div>
      <Toolbar query={query} setQuery={setQuery} placeholder="Tìm hàng hóa..." />
      {products.length === 0 ? (
        <EmptyState icon={PackageSearch} title="Chưa có dữ liệu tồn kho" hint="Thêm hàng hóa trong mục Danh mục để bắt đầu." />
      ) : (
        <Table
          columns={[
            { key: "ma", label: "Mã hàng" },
            { key: "ten", label: "Tên hàng" },
            { key: "dvt", label: "ĐVT" },
            { key: "ton_kho", label: "Tồn kho", align: "right", render: (r) => (
              <span style={{ color: stockOf(r) <= (r.ton_toi_thieu || 0) ? COLORS.red : COLORS.text, fontWeight: stockOf(r) <= (r.ton_toi_thieu || 0) ? 600 : 400 }}>{stockOf(r)}</span>
            ) },
            { key: "ton_toi_thieu", label: "Tồn tối thiểu", align: "right" },
            { key: "gia_tri", label: "Giá trị tồn", align: "right", render: (r) => fmtVND(stockOf(r) * (r.gia_von || 0)) },
            { key: "trang_thai", label: "Trạng thái", render: (r) => (stockOf(r) <= (r.ton_toi_thieu || 0) ? <Badge tone="red">Sắp hết</Badge> : <Badge tone="green">Bình thường</Badge>) },
          ]}
          rows={filtered}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Kiểm kê kho — đếm thực tế và điều chỉnh chênh lệch với sổ sách        */
/* ------------------------------------------------------------------ */
function StockTakePage({ store, productStore, warehouses }) {
  const { items, add, remove } = store;
  const { items: products, setItems: setProducts } = productStore;
  const [creating, setCreating] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const list = [...items].sort((a, b) => (b.ngay || "").localeCompare(a.ngay || ""));

  function create(form) {
    add({ ...form, id: uid("KK") });
    setProducts((cur) => {
      const next = cur.map((p) => {
        const line = form.lines.find((l) => l.hang_hoa_id === p.id);
        if (!line || line.chenh_lech === 0) return p;
        return adjustProductStock(p, line.chenh_lech, form.kho_id);
      });
      storageSet(STORE_KEYS.products, next);
      return next;
    });
    setCreating(false);
    toast(`Đã cân bằng kho theo ${form.lines.length} mặt hàng chênh lệch.`);
  }

  function del(v) {
    // Hoàn tác: trừ lại đúng phần chênh lệch đã áp dụng.
    setProducts((cur) => {
      const next = cur.map((p) => {
        const line = v.lines.find((l) => l.hang_hoa_id === p.id);
        if (!line || line.chenh_lech === 0) return p;
        return adjustProductStock(p, -line.chenh_lech, v.kho_id);
      });
      storageSet(STORE_KEYS.products, next);
      return next;
    });
    remove(v.id);
    setToDelete(null);
  }

  return (
    <div>
      <PageHeader
        title="Kiểm kê kho"
        subtitle="Đối chiếu tồn kho thực tế với sổ sách và tự động cân bằng chênh lệch"
        action={<Btn onClick={() => setCreating(true)}><Plus size={15} /> Tạo phiếu kiểm kê</Btn>}
      />
      {list.length === 0 ? (
        <EmptyState icon={Boxes} title="Chưa có phiếu kiểm kê nào" hint="Đếm hàng thực tế định kỳ để phát hiện sớm thất thoát hoặc sai lệch nhập liệu." action={<Btn onClick={() => setCreating(true)}><Plus size={15} /> Tạo phiếu kiểm kê</Btn>} />
      ) : (
        <Table
          columns={[
            { key: "ma", label: "Số phiếu" },
            { key: "ngay", label: "Ngày", render: (r) => fmtDate(r.ngay) },
            { key: "kho_ten", label: "Kho / Chi nhánh", render: (r) => r.kho_ten || "—" },
            { key: "so_mat_hang", label: "Số mặt hàng chênh lệch", align: "right", render: (r) => r.lines.length },
            {
              key: "gia_tri_lech",
              label: "Giá trị chênh lệch",
              align: "right",
              render: (r) => {
                const v = r.lines.reduce((s, l) => s + l.chenh_lech * (l.gia_von || 0), 0);
                return <span style={{ color: v < 0 ? COLORS.red : v > 0 ? COLORS.green : COLORS.textMuted, fontWeight: 600 }}>{fmtVND(v)}</span>;
              },
            },
          ]}
          rows={list}
          onEdit={setViewing}
          onDelete={setToDelete}
        />
      )}
      {creating && <StockTakeForm products={products} warehouses={warehouses} onCancel={() => setCreating(false)} onSave={create} />}
      {viewing && (
        <Modal title={`Chi tiết ${viewing.ma}`} onClose={() => setViewing(null)} width="max-w-2xl">
          <div className="mb-3 text-[13px]" style={{ color: COLORS.textMuted }}>
            Ngày kiểm kê: {fmtDate(viewing.ngay)} {viewing.kho_ten && <>· Kho: {viewing.kho_ten}</>} {viewing.ghi_chu && <>· Ghi chú: {viewing.ghi_chu}</>}
          </div>
          <Table
            columns={[
              { key: "ten", label: "Hàng hóa" },
              { key: "so_sach", label: "Sổ sách", align: "right" },
              { key: "thuc_te", label: "Thực tế", align: "right" },
              {
                key: "chenh_lech", label: "Chênh lệch", align: "right",
                render: (r) => <span style={{ color: r.chenh_lech < 0 ? COLORS.red : r.chenh_lech > 0 ? COLORS.green : COLORS.textMuted, fontWeight: 600 }}>{r.chenh_lech > 0 ? "+" : ""}{r.chenh_lech}</span>,
              },
            ]}
            rows={viewing.lines}
            rowKey="hang_hoa_id"
            paginate={false}
          />
        </Modal>
      )}
      {toDelete && (
        <ConfirmBar text={`Xóa phiếu "${toDelete.ma}"? Tồn kho sẽ trở về như trước khi kiểm kê.`} onConfirm={() => del(toDelete)} onCancel={() => setToDelete(null)} />
      )}
    </div>
  );
}

function StockTakeForm({ products, warehouses, onCancel, onSave }) {
  const [khoId, setKhoId] = useState(warehouses?.[0]?.id || "");
  const [ngay, setNgay] = useState(todayStr());
  const [ghiChu, setGhiChu] = useState("");
  const [query, setQuery] = useState("");
  const [counts, setCounts] = useState({}); // { [productId]: thucTe }

  function soSachOf(p) {
    return khoId && p.ton_kho_theo_kho ? (p.ton_kho_theo_kho[khoId] || 0) : (p.ton_kho || 0);
  }
  function thucTeOf(p) {
    const v = counts[p.id];
    return v === undefined ? soSachOf(p) : v;
  }

  const q = query.trim().toLowerCase();
  const filtered = products.filter((p) => !q || p.ten?.toLowerCase().includes(q) || p.ma?.toLowerCase().includes(q));

  const changedLines = products
    .map((p) => ({ p, chenh: thucTeOf(p) - soSachOf(p) }))
    .filter((x) => x.chenh !== 0);

  const [submit, busy] = useSubmitGuard(async (e) => {
    e.preventDefault();
    if (changedLines.length === 0) {
      toast("Không có chênh lệch nào để cân bằng.", "info");
      return;
    }
    onSave({
      ma: uid("KK").toUpperCase(),
      ngay,
      kho_id: khoId || undefined,
      kho_ten: warehouses?.find((w) => w.id === khoId)?.ten,
      ghi_chu: ghiChu,
      lines: changedLines.map(({ p, chenh }) => ({
        hang_hoa_id: p.id,
        ten: p.ten,
        so_sach: soSachOf(p),
        thuc_te: soSachOf(p) + chenh,
        chenh_lech: chenh,
        gia_von: p.gia_von || 0,
      })),
    });
  });

  return (
    <Modal title="Tạo phiếu kiểm kê kho" onClose={onCancel} width="max-w-3xl">
      <form onSubmit={submit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
          {warehouses?.length > 1 && (
            <Field label="Kho / Chi nhánh" required>
              <select required className={inputCls} style={inputStyle} value={khoId} onChange={(e) => { setKhoId(e.target.value); setCounts({}); }}>
                {warehouses.map((w) => <option key={w.id} value={w.id}>{w.ten}</option>)}
              </select>
            </Field>
          )}
          <Field label="Ngày kiểm kê"><input type="date" className={inputCls} style={inputStyle} value={ngay} onChange={(e) => setNgay(e.target.value)} /></Field>
        </div>
        <Field label="Ghi chú"><input className={inputCls} style={inputStyle} value={ghiChu} onChange={(e) => setGhiChu(e.target.value)} placeholder="VD: kiểm kê định kỳ cuối tháng" /></Field>

        <div className="mt-1 mb-2 flex items-center justify-between gap-2">
          <span className="text-[12.5px] font-medium" style={{ color: COLORS.textMuted }}>
            Nhập số lượng đếm được thực tế — chỉ dòng có chênh lệch mới được ghi nhận ({changedLines.length} dòng)
          </span>
        </div>
        <Toolbar query={query} setQuery={setQuery} placeholder="Tìm hàng hóa..." />

        <div className="rounded-md border overflow-hidden" style={{ borderColor: COLORS.border }}>
          <Table
            columns={[
              { key: "ma", label: "Mã hàng" },
              { key: "ten", label: "Tên hàng" },
              { key: "so_sach", label: "Sổ sách", align: "right", sortValue: (p) => soSachOf(p), render: (p) => soSachOf(p) },
              {
                key: "thuc_te", label: "Thực tế", align: "right", sortable: false,
                render: (p) => (
                  <input
                    type="number"
                    className={inputCls}
                    style={{ ...inputStyle, width: 90, textAlign: "right" }}
                    value={thucTeOf(p)}
                    onChange={(e) => setCounts((cur) => ({ ...cur, [p.id]: e.target.value === "" ? soSachOf(p) : Number(e.target.value) }))}
                  />
                ),
              },
              {
                key: "chenh_lech", label: "Chênh lệch", align: "right", sortValue: (p) => thucTeOf(p) - soSachOf(p),
                render: (p) => {
                  const c = thucTeOf(p) - soSachOf(p);
                  return <span style={{ color: c < 0 ? COLORS.red : c > 0 ? COLORS.green : COLORS.textMuted, fontWeight: c !== 0 ? 600 : 400 }}>{c > 0 ? "+" : ""}{c}</span>;
                },
              },
            ]}
            rows={filtered}
            pageSize={20}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
          <Btn type="button" variant="outline" onClick={onCancel}>Hủy</Btn>
          <Btn type="submit" busy={busy}>Lưu & cân bằng kho ({changedLines.length})</Btn>
        </div>
      </form>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Nhập - Xuất - Tồn chi tiết                                          */
/* ------------------------------------------------------------------ */
function NXTPage({ products, sales, purchases, salereturns, purchasereturns, vouchers, warehouses }) {
  const todayM = monthKey(todayStr());
  const [tuNgay, setTuNgay] = useState(`${todayM}-01`);
  const [denNgay, setDenNgay] = useState(todayStr());
  const [khoId, setKhoId] = useState("all");
  const [query, setQuery] = useState("");
  const [detailProduct, setDetailProduct] = useState(null);

  const movements = useMemo(() => {
    const list = [];
    sales.forEach((inv) => inv.items.forEach((it) => list.push({ productId: it.hang_hoa_id, ngay: inv.ngay, delta: -it.so_luong, doc: inv.ma, loai: "Bán hàng", khoId: inv.kho_id })));
    purchases.forEach((inv) => inv.items.forEach((it) => list.push({ productId: it.hang_hoa_id, ngay: inv.ngay, delta: it.so_luong, doc: inv.ma, loai: "Mua hàng", khoId: inv.kho_id })));
    (salereturns || []).forEach((r) => r.items.forEach((it) => list.push({ productId: it.hang_hoa_id, ngay: r.ngay, delta: it.so_luong, doc: r.ma, loai: "Trả hàng bán", khoId: r.kho_id })));
    (purchasereturns || []).forEach((r) => r.items.forEach((it) => list.push({ productId: it.hang_hoa_id, ngay: r.ngay, delta: -it.so_luong, doc: r.ma, loai: "Trả hàng mua", khoId: r.kho_id })));
    (vouchers || []).forEach((v) => {
      if (v.loai === "in") list.push({ productId: v.hang_hoa_id, ngay: v.ngay, delta: v.so_luong, doc: v.ma, loai: "Nhập kho", khoId: v.kho_id });
      else if (v.loai === "out") list.push({ productId: v.hang_hoa_id, ngay: v.ngay, delta: -v.so_luong, doc: v.ma, loai: "Xuất kho", khoId: v.kho_id });
      else if (v.loai === "transfer") {
        list.push({ productId: v.hang_hoa_id, ngay: v.ngay, delta: -v.so_luong, doc: v.ma, loai: "Chuyển kho (xuất)", khoId: v.tu_kho_id, isTransfer: true });
        list.push({ productId: v.hang_hoa_id, ngay: v.ngay, delta: v.so_luong, doc: v.ma, loai: "Chuyển kho (nhập)", khoId: v.den_kho_id, isTransfer: true });
      }
    });
    return list;
  }, [sales, purchases, salereturns, purchasereturns, vouchers]);

  const filteredMovements = useMemo(
    () => movements.filter((m) => (khoId === "all" ? !m.isTransfer : m.khoId === khoId)),
    [movements, khoId]
  );

  const movesByProduct = useMemo(() => {
    const map = {};
    filteredMovements.forEach((m) => {
      (map[m.productId] = map[m.productId] || []).push(m);
    });
    Object.values(map).forEach((arr) => arr.sort((a, b) => (a.ngay || "").localeCompare(b.ngay || "")));
    return map;
  }, [filteredMovements]);

  const summary = useMemo(() => {
    return products
      .filter((p) => !query || p.ten?.toLowerCase().includes(query.toLowerCase()) || p.ma?.toLowerCase().includes(query.toLowerCase()))
      .map((p) => {
        const moves = movesByProduct[p.id] || [];
        const current = khoId === "all" ? (p.ton_kho || 0) : (p.ton_kho_theo_kho?.[khoId] || 0);
        const afterEnd = moves.filter((m) => (m.ngay || "") > denNgay).reduce((s, m) => s + m.delta, 0);
        const closing = current - afterEnd;
        const inPeriod = moves.filter((m) => (m.ngay || "") >= tuNgay && (m.ngay || "") <= denNgay);
        const opening = closing - inPeriod.reduce((s, m) => s + m.delta, 0);
        const nhap = inPeriod.filter((m) => m.delta > 0).reduce((s, m) => s + m.delta, 0);
        const xuat = inPeriod.filter((m) => m.delta < 0).reduce((s, m) => s - m.delta, 0);
        return { ...p, opening, nhap, xuat, closing };
      });
  }, [products, movesByProduct, tuNgay, denNgay, query, khoId]);

  const detailRows = useMemo(() => {
    if (!detailProduct) return [];
    const s = summary.find((x) => x.id === detailProduct.id);
    const moves = (movesByProduct[detailProduct.id] || []).filter((m) => (m.ngay || "") >= tuNgay && (m.ngay || "") <= denNgay);
    let running = s?.opening || 0;
    return moves.map((m) => {
      running += m.delta;
      return { ...m, running };
    });
  }, [detailProduct, movesByProduct, tuNgay, denNgay, summary]);

  function doExport() {
    exportExcel(`nhap-xuat-ton-${tuNgay}_${denNgay}`, [{
      name: "NXT tổng hợp",
      rows: summary.map((p) => ({
        "Mã hàng": p.ma, "Tên hàng": p.ten, "ĐVT": p.dvt,
        "Tồn đầu kỳ": p.opening, "Nhập trong kỳ": p.nhap, "Xuất trong kỳ": p.xuat, "Tồn cuối kỳ": p.closing,
      })),
    }]);
  }

  return (
    <div>
      <PageHeader title="Nhập - Xuất - Tồn" subtitle="Sổ kho theo kỳ: tồn đầu kỳ + nhập − xuất = tồn cuối kỳ" action={<ExcelButton onClick={doExport} />} />
      <div className="flex flex-col sm:flex-row sm:items-end gap-2.5 mb-4">
        {warehouses?.length > 1 && (
          <Field label="Kho / Chi nhánh">
            <select className={inputCls} style={{ ...inputStyle, minWidth: 150 }} value={khoId} onChange={(e) => setKhoId(e.target.value)}>
              <option value="all">Tất cả các kho</option>
              {warehouses.map((w) => <option key={w.id} value={w.id}>{w.ten}</option>)}
            </select>
          </Field>
        )}
        <Field label="Từ ngày"><input type="date" className={inputCls} style={inputStyle} value={tuNgay} onChange={(e) => setTuNgay(e.target.value)} /></Field>
        <Field label="Đến ngày"><input type="date" className={inputCls} style={inputStyle} value={denNgay} onChange={(e) => setDenNgay(e.target.value)} /></Field>
      </div>
      <Toolbar query={query} setQuery={setQuery} placeholder="Tìm mã hoặc tên hàng hóa..." />
      {summary.length === 0 ? (
        <EmptyState icon={Boxes} title="Chưa có hàng hóa" hint="Thêm hàng hóa trong mục Danh mục để xem báo cáo Nhập-Xuất-Tồn." />
      ) : (
        <Table
          columns={[
            { key: "ma", label: "Mã hàng" },
            { key: "ten", label: "Tên hàng" },
            { key: "opening", label: "Tồn đầu kỳ", align: "right" },
            { key: "nhap", label: "Nhập trong kỳ", align: "right", render: (r) => <span style={{ color: COLORS.green }}>{r.nhap > 0 ? `+${r.nhap}` : 0}</span> },
            { key: "xuat", label: "Xuất trong kỳ", align: "right", render: (r) => <span style={{ color: COLORS.red }}>{r.xuat > 0 ? `-${r.xuat}` : 0}</span> },
            { key: "closing", label: "Tồn cuối kỳ", align: "right", render: (r) => <span style={{ fontWeight: 600 }}>{r.closing}</span> },
            { key: "action", label: "", render: (r) => <Btn size="sm" variant="outline" onClick={() => setDetailProduct(r)}>Chi tiết</Btn> },
          ]}
          rows={summary}
        />
      )}
      {detailProduct && (
        <Modal title={`Chi tiết Nhập-Xuất-Tồn — ${detailProduct.ten}`} onClose={() => setDetailProduct(null)} width="max-w-2xl">
          <div className="text-[13px] mb-3" style={{ color: COLORS.textMuted }}>
            Từ {fmtDate(tuNgay)} đến {fmtDate(denNgay)} · Tồn đầu kỳ: <b style={{ color: COLORS.text }}>{detailProduct.opening}</b> {detailProduct.dvt}
          </div>
          {detailRows.length === 0 ? (
            <div className="text-[13px] py-6 text-center" style={{ color: COLORS.textMuted }}>Không có phát sinh nào trong kỳ.</div>
          ) : (
            <Table
              columns={[
                { key: "ngay", label: "Ngày", render: (r) => fmtDate(r.ngay) },
                { key: "doc", label: "Chứng từ" },
                { key: "loai", label: "Loại" },
                { key: "delta", label: "SL", align: "right", render: (r) => <span style={{ color: r.delta > 0 ? COLORS.green : COLORS.red }}>{r.delta > 0 ? `+${r.delta}` : r.delta}</span> },
                { key: "running", label: "Tồn sau GD", align: "right", render: (r) => <span style={{ fontWeight: 600 }}>{r.running}</span> },
              ]}
              rows={detailRows}
              rowKey="doc"
            />
          )}
          <div className="flex justify-end mt-3 text-[13.5px] font-semibold" style={{ color: COLORS.text }}>
            Tồn cuối kỳ: {detailProduct.closing} {detailProduct.dvt}
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Nhân viên & Bảng lương                                              */
/* ------------------------------------------------------------------ */
function EmployeesPage({ store }) {
  const { items, add, update, remove } = store;
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  function save(form) {
    if (form.id) update(form.id, form);
    else add({ ...form, id: uid("NV") });
    setEditing(null);
  }

  return (
    <div>
      <PageHeader title="Nhân viên" subtitle={`${items.length} nhân viên`} action={<Btn onClick={() => setEditing({})}><Plus size={15} /> Thêm nhân viên</Btn>} />
      {items.length === 0 ? (
        <EmptyState icon={Contact} title="Chưa có nhân viên" hint="Thêm nhân viên để lập bảng lương hàng tháng." action={<Btn onClick={() => setEditing({})}><Plus size={15} /> Thêm nhân viên</Btn>} />
      ) : (
        <Table
          columns={[
            { key: "ten", label: "Họ tên" },
            { key: "chuc_vu", label: "Chức vụ" },
            { key: "dien_thoai", label: "Điện thoại" },
            { key: "luong_co_ban", label: "Lương cơ bản", align: "right", render: (r) => fmtVND(r.luong_co_ban) },
          ]}
          rows={items}
          onEdit={setEditing}
          onDelete={setToDelete}
        />
      )}
      {editing && (
        <Modal title={editing.id ? "Sửa nhân viên" : "Thêm nhân viên"} onClose={() => setEditing(null)}>
          <EmployeeForm initial={editing} onCancel={() => setEditing(null)} onSave={save} />
        </Modal>
      )}
      {toDelete && <ConfirmBar text={`Xóa nhân viên "${toDelete.ten}"?`} onConfirm={() => { remove(toDelete.id); setToDelete(null); }} onCancel={() => setToDelete(null)} />}
    </div>
  );
}

function EmployeeForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState({
    ten: initial.ten || "", chuc_vu: initial.chuc_vu || "", dien_thoai: initial.dien_thoai || "",
    luong_co_ban: initial.luong_co_ban || 0, ngay_vao_lam: initial.ngay_vao_lam || todayStr(), id: initial.id,
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(f); }}>
      <Field label="Họ tên" required><input required className={inputCls} style={inputStyle} value={f.ten} onChange={(e) => setF({ ...f, ten: e.target.value })} /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
        <Field label="Chức vụ"><input className={inputCls} style={inputStyle} value={f.chuc_vu} onChange={(e) => setF({ ...f, chuc_vu: e.target.value })} /></Field>
        <Field label="Điện thoại"><input className={inputCls} style={inputStyle} value={f.dien_thoai} onChange={(e) => setF({ ...f, dien_thoai: e.target.value })} /></Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
        <Field label="Lương cơ bản"><input type="number" className={inputCls} style={inputStyle} value={f.luong_co_ban} onChange={(e) => setF({ ...f, luong_co_ban: +e.target.value })} /></Field>
        <Field label="Ngày vào làm"><input type="date" className={inputCls} style={inputStyle} value={f.ngay_vao_lam} onChange={(e) => setF({ ...f, ngay_vao_lam: e.target.value })} /></Field>
      </div>
      <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
        <Btn type="button" variant="outline" onClick={onCancel}>Hủy</Btn>
        <Btn type="submit">Lưu</Btn>
      </div>
    </form>
  );
}

function PayrollPage({ employees, store }) {
  const { items: records, persist } = store;
  const [thang, setThang] = useState(monthKey(todayStr()));
  const [printing, setPrinting] = useState(null);

  const rowsForMonth = employees.map((e) => {
    const rec = records.find((r) => r.thang === thang && r.employee_id === e.id);
    return rec || { employee_id: e.id, thang, luong_co_ban: e.luong_co_ban || 0, phu_cap: 0, thuong: 0, khau_tru: 0 };
  });

  function updateCell(employeeId, field, value) {
    const idx = records.findIndex((r) => r.thang === thang && r.employee_id === employeeId);
    const base = idx >= 0 ? records[idx] : { id: uid("BL"), employee_id: employeeId, thang, luong_co_ban: employees.find((e) => e.id === employeeId)?.luong_co_ban || 0, phu_cap: 0, thuong: 0, khau_tru: 0 };
    const updated = { ...base, [field]: +value };
    if (idx >= 0) {
      const next = [...records]; next[idx] = updated; persist(next);
    } else {
      persist([...records, updated]);
    }
  }

  function thucLanh(r) { return (r.luong_co_ban || 0) + (r.phu_cap || 0) + (r.thuong || 0) - (r.khau_tru || 0); }
  const totalThang = rowsForMonth.reduce((s, r) => s + thucLanh(r), 0);

  function doExport() {
    exportExcel(`bang-luong-${thang}`, [{
      name: "Bảng lương",
      rows: rowsForMonth.map((r) => {
        const emp = employees.find((e) => e.id === r.employee_id);
        return {
          "Họ tên": emp?.ten, "Chức vụ": emp?.chuc_vu, "Lương cơ bản": r.luong_co_ban,
          "Phụ cấp": r.phu_cap, "Thưởng": r.thuong, "Khấu trừ": r.khau_tru, "Thực lãnh": thucLanh(r),
        };
      }),
    }]);
  }

  return (
    <div>
      <PageHeader
        title="Bảng lương"
        subtitle="Bảng lương cơ bản theo tháng — lương + phụ cấp + thưởng - khấu trừ"
        action={<div className="flex items-center gap-2"><input type="month" className={inputCls} style={{ ...inputStyle, width: 150 }} value={thang} onChange={(e) => setThang(e.target.value)} /><ExcelButton onClick={doExport} /></div>}
      />
      {employees.length === 0 ? (
        <EmptyState icon={Banknote} title="Chưa có nhân viên" hint="Thêm nhân viên trong mục Nhân viên trước khi lập bảng lương." />
      ) : (
        <>
          <div className="rounded-lg overflow-hidden mb-3" style={{ border: `1px solid ${COLORS.border}` }}>
            <table className="w-full text-[13px]">
              <thead>
                <tr style={{ background: COLORS.bg }}>
                  {["Nhân viên", "Lương cơ bản", "Phụ cấp", "Thưởng", "Khấu trừ (BH, thuế...)", "Thực lãnh", ""].map((h, i) => (
                    <th key={i} className="px-3 py-2 font-semibold whitespace-nowrap" style={{ color: COLORS.textMuted, textAlign: i === 0 ? "left" : "right", borderBottom: `1px solid ${COLORS.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rowsForMonth.map((r, i) => {
                  const emp = employees.find((e) => e.id === r.employee_id);
                  return (
                    <tr key={r.employee_id} style={{ background: i % 2 ? "#FAFBFC" : "#fff", borderBottom: `1px solid ${COLORS.border}` }}>
                      <td className="px-3 py-2" style={{ color: COLORS.text }}>{emp?.ten}<div className="text-[11.5px]" style={{ color: COLORS.textMuted }}>{emp?.chuc_vu}</div></td>
                      <td className="px-3 py-2 text-right" style={{ color: COLORS.text }}>{fmtVND(r.luong_co_ban)}</td>
                      <td className="px-2 py-1.5 text-right"><input type="number" className={inputCls} style={{ ...inputStyle, width: 100, textAlign: "right" }} value={r.phu_cap} onChange={(e) => updateCell(r.employee_id, "phu_cap", e.target.value)} /></td>
                      <td className="px-2 py-1.5 text-right"><input type="number" className={inputCls} style={{ ...inputStyle, width: 100, textAlign: "right" }} value={r.thuong} onChange={(e) => updateCell(r.employee_id, "thuong", e.target.value)} /></td>
                      <td className="px-2 py-1.5 text-right"><input type="number" className={inputCls} style={{ ...inputStyle, width: 120, textAlign: "right" }} value={r.khau_tru} onChange={(e) => updateCell(r.employee_id, "khau_tru", e.target.value)} /></td>
                      <td className="px-3 py-2 text-right font-semibold" style={{ color: COLORS.green }}>{fmtVND(thucLanh(r))}</td>
                      <td className="px-2"><Btn size="sm" variant="outline" onClick={() => setPrinting({ emp, r })}><Printer size={13} /></Btn></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end text-[14px] font-semibold" style={{ color: COLORS.text }}>Tổng chi lương tháng {thang}: {fmtVND(totalThang)}</div>
        </>
      )}
      {printing && (
        <PrintDocument
          onClose={() => setPrinting(null)}
          doc={{
            title: "Phiếu lương", ma: `${printing.emp?.ten} - ${thang}`, ngay: todayStr(),
            partnerLabel: "Nhân viên", partnerName: printing.emp?.ten,
            items: [
              { ten: "Lương cơ bản", so_luong: 1, don_gia: printing.r.luong_co_ban },
              { ten: "Phụ cấp", so_luong: 1, don_gia: printing.r.phu_cap },
              { ten: "Thưởng", so_luong: 1, don_gia: printing.r.thuong },
              { ten: "Khấu trừ", so_luong: 1, don_gia: -printing.r.khau_tru },
            ],
            total: thucLanh(printing.r),
          }}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Báo cáo thuế (VAT & thuế TNDN cơ bản)                                */
/* ------------------------------------------------------------------ */
function TaxReportPage({ sales, purchases, products }) {
  const [thang, setThang] = useState(monthKey(todayStr()));
  const [citRate, setCitRate] = useState(20);

  const vatRate = (productId) => products.find((p) => p.id === productId)?.thue_suat_vat ?? 10;

  const salesInMonth = sales.filter((s) => monthKey(s.ngay) === thang);
  const purchasesInMonth = purchases.filter((s) => monthKey(s.ngay) === thang);

  const outputVAT = salesInMonth.reduce((sum, inv) => sum + inv.items.reduce((s, it) => s + it.so_luong * it.don_gia * (vatRate(it.hang_hoa_id) / 100), 0), 0);
  const inputVAT = purchasesInMonth.reduce((sum, inv) => sum + inv.items.reduce((s, it) => s + it.so_luong * it.don_gia * (vatRate(it.hang_hoa_id) / 100), 0), 0);
  const vatPayable = outputVAT - inputVAT;

  const revenue = salesInMonth.reduce((s, i) => s + i.tong_tien, 0);
  const cogs = salesInMonth.reduce((sum, inv) => sum + inv.items.reduce((s, it) => {
    const p = products.find((pp) => pp.id === it.hang_hoa_id);
    return s + (p?.gia_von || 0) * it.so_luong;
  }, 0), 0);
  const profitBeforeTax = revenue - cogs;
  const citEstimate = Math.max(profitBeforeTax, 0) * (citRate / 100);

  function doExport() {
    exportExcel(`bao-cao-thue-${thang}`, [
      {
        name: "Thuế GTGT",
        rows: [
          { "Chỉ tiêu": "Thuế GTGT đầu ra (bán hàng)", "Số tiền": outputVAT },
          { "Chỉ tiêu": "Thuế GTGT đầu vào (mua hàng)", "Số tiền": inputVAT },
          { "Chỉ tiêu": "Thuế GTGT phải nộp", "Số tiền": vatPayable },
        ],
      },
      {
        name: "Thuế TNDN (ước tính)",
        rows: [
          { "Chỉ tiêu": "Doanh thu", "Số tiền": revenue },
          { "Chỉ tiêu": "Giá vốn hàng bán", "Số tiền": cogs },
          { "Chỉ tiêu": "Lợi nhuận trước thuế (ước tính)", "Số tiền": profitBeforeTax },
          { "Chỉ tiêu": `Thuế suất TNDN (${citRate}%)`, "Số tiền": citEstimate },
        ],
      },
    ]);
  }

  return (
    <div>
      <PageHeader
        title="Báo cáo thuế"
        subtitle="Ước tính thuế GTGT phải nộp và thuế TNDN cơ bản theo tháng"
        action={<div className="flex items-center gap-2"><input type="month" className={inputCls} style={{ ...inputStyle, width: 150 }} value={thang} onChange={(e) => setThang(e.target.value)} /><ExcelButton onClick={doExport} /></div>}
      />
      <div className="mb-4 px-3 py-2 rounded-md text-[12px] flex items-start gap-2" style={{ background: COLORS.amberBg, color: "#5C4109" }}>
        <AlertTriangle size={14} className="mt-0.5 shrink-0" />
        <span>Đây là số liệu ước tính cơ bản dựa trên dữ liệu bán/mua hàng trong hệ thống (thuế suất GTGT lấy theo từng mặt hàng, thuế TNDN tính đơn giản trên lợi nhuận gộp — chưa trừ chi phí quản lý, khấu hao...). Vui lòng đối chiếu với kế toán/quyết toán thuế chính thức trước khi kê khai.</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <StatCard icon={Landmark} label="Thuế GTGT đầu ra" value={fmtVND(outputVAT)} tone="navy" />
        <StatCard icon={Landmark} label="Thuế GTGT đầu vào" value={fmtVND(inputVAT)} tone="navy" />
        <StatCard icon={Percent} label={vatPayable >= 0 ? "Thuế GTGT phải nộp" : "Thuế GTGT được khấu trừ"} value={fmtVND(Math.abs(vatPayable))} tone={vatPayable >= 0 ? "red" : "green"} />
      </div>

      <div className="rounded-lg p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
        <div className="text-[13.5px] font-semibold mb-3" style={{ color: COLORS.text }}>Thuế TNDN (ước tính)</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between"><span style={{ color: COLORS.textMuted }}>Doanh thu</span><span style={{ color: COLORS.text }}>{fmtVND(revenue)}</span></div>
            <div className="flex justify-between"><span style={{ color: COLORS.textMuted }}>Giá vốn hàng bán</span><span style={{ color: COLORS.text }}>{fmtVND(cogs)}</span></div>
            <div className="flex justify-between font-semibold"><span style={{ color: COLORS.text }}>Lợi nhuận trước thuế</span><span style={{ color: COLORS.text }}>{fmtVND(profitBeforeTax)}</span></div>
          </div>
          <div>
            <Field label="Thuế suất thuế TNDN (%)">
              <input type="number" min="0" max="100" className={inputCls} style={{ ...inputStyle, width: 120 }} value={citRate} onChange={(e) => setCitRate(+e.target.value)} />
            </Field>
            <div className="mt-2 text-[13px]" style={{ color: COLORS.textMuted }}>Thuế TNDN ước tính</div>
            <div className="text-[20px] font-semibold" style={{ color: COLORS.navy }}>{fmtVND(citEstimate)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard & Reports                                                 */
/* ------------------------------------------------------------------ */
function StatCard({ icon: Icon, label, value, tone = "navy", sub }) {
  const toneMap = {
    navy: COLORS.navy,
    green: COLORS.green,
    red: COLORS.red,
    amber: COLORS.amber,
  };
  return (
    <div className="rounded-lg p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12.5px] font-medium" style={{ color: COLORS.textMuted }}>{label}</span>
        <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: toneMap[tone] + "1A" }}>
          <Icon size={14} color={toneMap[tone]} />
        </div>
      </div>
      <div className="text-[20px] font-semibold" style={{ color: COLORS.text, fontVariantNumeric: "tabular-nums" }}>{value}</div>
      {sub && <div className="text-[12px] mt-1" style={{ color: COLORS.textMuted }}>{sub}</div>}
    </div>
  );
}

const DASHBOARD_PRESETS = [
  { key: "today", label: "Hôm nay" },
  { key: "week", label: "Tuần này" },
  { key: "thisMonth", label: "Tháng này" },
  { key: "lastMonth", label: "Tháng trước" },
];

function rangeForPreset(preset) {
  const today = new Date();
  const iso = (d) => d.toISOString().slice(0, 10);
  if (preset === "today") return { from: todayStr(), to: todayStr() };
  if (preset === "week") {
    const dow = today.getDay() || 7; // Thứ Hai = 1 ... Chủ Nhật = 7
    const monday = new Date(today);
    monday.setDate(today.getDate() - dow + 1);
    return { from: iso(monday), to: todayStr() };
  }
  if (preset === "lastMonth") {
    const first = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const last = new Date(today.getFullYear(), today.getMonth(), 0);
    return { from: iso(first), to: iso(last) };
  }
  // thisMonth (mặc định)
  return { from: todayStr().slice(0, 7) + "-01", to: todayStr() };
}

/** Kỳ trước liền kề, có cùng độ dài ngày với kỳ đang chọn — dùng để so sánh tăng/giảm. */
function previousRange(from, to) {
  const DAY = 86400000;
  const days = Math.floor((new Date(to) - new Date(from)) / DAY) + 1;
  const prevTo = new Date(new Date(from).getTime() - DAY).toISOString().slice(0, 10);
  const prevFrom = new Date(new Date(from).getTime() - days * DAY).toISOString().slice(0, 10);
  return { from: prevFrom, to: prevTo };
}

function pctChange(cur, prev) {
  if (!prev) return cur ? null : 0; // null = kỳ trước không có số liệu để so sánh
  return ((cur - prev) / prev) * 100;
}

function ChangeBadge({ pct }) {
  if (pct === null) return <span className="text-[11px]" style={{ color: COLORS.textMuted }}>Kỳ trước chưa có số liệu</span>;
  const up = pct >= 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span className="text-[11px] inline-flex items-center gap-0.5 font-medium" style={{ color: up ? COLORS.green : COLORS.red }}>
      <Icon size={11} /> {Math.abs(pct).toFixed(1)}% so với kỳ trước
    </span>
  );
}

function Dashboard({ products, customers, suppliers, sales, purchases, receipts, payments, salereturns }) {
  const recharts = useRecharts();
  const [preset, setPreset] = useState("thisMonth");
  const [range, setRange] = useState(() => rangeForPreset("thisMonth"));

  function choosePreset(key) {
    setPreset(key);
    setRange(rangeForPreset(key));
  }
  function setCustomRange(patch) {
    setPreset("custom");
    setRange((cur) => ({ ...cur, ...patch }));
  }

  const { from, to } = range;
  const prev = previousRange(from, to);
  const inRange = (d) => d >= from && d <= to;
  const inPrevRange = (d) => d >= prev.from && d <= prev.to;

  const revenue = sales.filter((s) => inRange(s.ngay)).reduce((s, i) => s + i.tong_tien, 0);
  const revenuePrev = sales.filter((s) => inPrevRange(s.ngay)).reduce((s, i) => s + i.tong_tien, 0);
  const purchaseAmt = purchases.filter((s) => inRange(s.ngay)).reduce((s, i) => s + i.tong_tien, 0);
  const purchaseAmtPrev = purchases.filter((s) => inPrevRange(s.ngay)).reduce((s, i) => s + i.tong_tien, 0);
  const soDonBan = sales.filter((s) => inRange(s.ngay)).length;
  const soDonBanPrev = sales.filter((s) => inPrevRange(s.ngay)).length;

  const totalPhaiThu = customers.reduce((sum, c) => sum + Math.max(tinhConNoKhachHang(c, sales, receipts, salereturns), 0), 0);
  const lowStock = products.filter((p) => (p.ton_kho || 0) <= (p.ton_toi_thieu || 0));

  // Biểu đồ doanh thu: theo ngày nếu khoảng ≤ 31 ngày, theo tháng nếu dài hơn.
  const DAY = 86400000;
  const spanDays = Math.floor((new Date(to) - new Date(from)) / DAY) + 1;
  const chartData = useMemo(() => {
    const inRangeSales = sales.filter((s) => inRange(s.ngay));
    if (spanDays <= 31) {
      const days = Array.from({ length: spanDays }).map((_, i) => {
        const d = new Date(from);
        d.setDate(d.getDate() + i);
        const key = d.toISOString().slice(0, 10);
        const doanhThu = inRangeSales.filter((s) => s.ngay === key).reduce((s, x) => s + x.tong_tien, 0);
        return { name: key.slice(5), doanhThu };
      });
      return days;
    }
    const map = {};
    inRangeSales.forEach((s) => {
      const k = monthKey(s.ngay);
      if (!k) return;
      map[k] = (map[k] || 0) + s.tong_tien;
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b)).map(([name, doanhThu]) => ({ name, doanhThu }));
  }, [sales, from, to, spanDays]);

  const recent = [...sales].sort((a, b) => (b.ngay || "").localeCompare(a.ngay || "")).slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Bảng điều khiển"
        subtitle={`Tổng quan hoạt động kinh doanh · ${fmtDate(todayStr())}`}
        action={
          <div className="flex flex-wrap items-center gap-1.5">
            {DASHBOARD_PRESETS.map((p) => (
              <button
                key={p.key}
                onClick={() => choosePreset(p.key)}
                className="px-2.5 py-1.5 text-[12.5px] font-medium rounded-md"
                style={preset === p.key ? { background: COLORS.navy, color: "#fff" } : { color: COLORS.textMuted, background: COLORS.bg }}
              >
                {p.label}
              </button>
            ))}
            <div className="flex items-center gap-1 pl-1.5 ml-0.5" style={{ borderLeft: `1px solid ${COLORS.border}` }}>
              <CalendarDays size={13} color={COLORS.textMuted} />
              <input type="date" value={from} max={to} onChange={(e) => setCustomRange({ from: e.target.value })} className="text-[12px] rounded-md border px-1.5 py-1" style={{ borderColor: COLORS.border }} />
              <span className="text-[12px]" style={{ color: COLORS.textMuted }}>–</span>
              <input type="date" value={to} min={from} max={todayStr()} onChange={(e) => setCustomRange({ to: e.target.value })} className="text-[12px] rounded-md border px-1.5 py-1" style={{ borderColor: COLORS.border }} />
            </div>
          </div>
        }
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <StatCard icon={TrendingUp} label="Doanh thu" value={fmtVND(revenue)} tone="green" sub={<ChangeBadge pct={pctChange(revenue, revenuePrev)} />} />
        <StatCard icon={ShoppingBag} label="Mua hàng" value={fmtVND(purchaseAmt)} tone="navy" sub={<ChangeBadge pct={pctChange(purchaseAmt, purchaseAmtPrev)} />} />
        <StatCard icon={FileBarChart} label="Số đơn bán" value={soDonBan} tone="amber" sub={<ChangeBadge pct={pctChange(soDonBan, soDonBanPrev)} />} />
        <StatCard icon={AlertTriangle} label="Hàng sắp hết tồn kho" value={lowStock.length} tone="red" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <StatCard icon={CircleDollarSign} label="Công nợ phải thu (hiện tại)" value={fmtVND(totalPhaiThu)} tone="amber" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="col-span-2 rounded-lg p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
          <div className="text-[13.5px] font-semibold mb-3" style={{ color: COLORS.text }}>
            Doanh thu {spanDays <= 31 ? "theo ngày" : "theo tháng"} — {fmtDate(from)} đến {fmtDate(to)}
          </div>
          {recharts ? (
            <recharts.ResponsiveContainer width="100%" height={220}>
              <recharts.BarChart data={chartData}>
                <recharts.CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} vertical={false} />
                <recharts.XAxis dataKey="name" tick={{ fontSize: 11, fill: COLORS.textMuted }} axisLine={{ stroke: COLORS.border }} tickLine={false} />
                <recharts.YAxis tick={{ fontSize: 11, fill: COLORS.textMuted }} axisLine={false} tickLine={false} width={40} tickFormatter={(v) => (v >= 1000000 ? (v / 1000000).toFixed(0) + "tr" : v)} />
                <recharts.Tooltip formatter={(v) => fmtVND(v)} contentStyle={{ fontSize: 12, borderRadius: 6, borderColor: COLORS.border }} />
                <recharts.Bar dataKey="doanhThu" name="Doanh thu" fill={COLORS.navy} radius={[3, 3, 0, 0]} />
              </recharts.BarChart>
            </recharts.ResponsiveContainer>
          ) : (
            <ChartSkeleton height={220} />
          )}
        </div>

        <div className="rounded-lg p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
          <div className="text-[13.5px] font-semibold mb-3" style={{ color: COLORS.text }}>Hàng sắp hết</div>
          {lowStock.length === 0 ? (
            <div className="text-[13px]" style={{ color: COLORS.textMuted }}>Không có mặt hàng nào dưới mức tồn tối thiểu.</div>
          ) : (
            <div className="space-y-2">
              {lowStock.slice(0, 6).map((p) => (
                <div key={p.id} className="flex items-center justify-between text-[13px]">
                  <span style={{ color: COLORS.text }}>{p.ten}</span>
                  <Badge tone="red">{p.ton_kho ?? 0} {p.dvt}</Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg mt-3 p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
        <div className="text-[13.5px] font-semibold mb-3" style={{ color: COLORS.text }}>Đơn bán hàng gần đây</div>
        {recent.length === 0 ? (
          <div className="text-[13px]" style={{ color: COLORS.textMuted }}>Chưa có đơn bán hàng nào.</div>
        ) : (
          <Table
            columns={[
              { key: "ma", label: "Số chứng từ" },
              { key: "ngay", label: "Ngày", render: (r) => fmtDate(r.ngay) },
              { key: "doi_tac_id", label: "Khách hàng", render: (r) => customers.find((c) => c.id === r.doi_tac_id)?.ten || "—" },
              { key: "tong_tien", label: "Thành tiền", align: "right", render: (r) => fmtVND(r.tong_tien) },
            ]}
            rows={recent}
            paginate={false}
          />
        )}
      </div>
    </div>
  );
}

function ReportsPage({ sales, purchases, products, channels, warehouses }) {
  const recharts = useRecharts();
  const [khoId, setKhoId] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredSales = useMemo(() => {
    let rows = khoId === "all" ? sales : sales.filter((s) => s.kho_id === khoId);
    if (dateFrom) rows = rows.filter((s) => s.ngay >= dateFrom);
    if (dateTo) rows = rows.filter((s) => s.ngay <= dateTo);
    return rows;
  }, [sales, khoId, dateFrom, dateTo]);

  const monthly = useMemo(() => {
    const map = {};
    filteredSales.forEach((s) => {
      const k = monthKey(s.ngay);
      if (!k) return;
      map[k] = map[k] || { name: k, doanhThu: 0, giaVon: 0 };
      map[k].doanhThu += s.tong_tien;
      map[k].giaVon += s.items.reduce((sum, it) => {
        const p = products.find((pp) => pp.id === it.hang_hoa_id);
        return sum + (p?.gia_von || 0) * it.so_luong;
      }, 0);
    });
    return Object.values(map).sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredSales, products]);

  const topProducts = useMemo(() => {
    const map = {};
    filteredSales.forEach((s) => s.items.forEach((it) => {
      map[it.hang_hoa_id] = map[it.hang_hoa_id] || { ten: it.ten, sl: 0, doanhThu: 0 };
      map[it.hang_hoa_id].sl += it.so_luong;
      map[it.hang_hoa_id].doanhThu += it.so_luong * it.don_gia;
    }));
    return Object.values(map).sort((a, b) => b.doanhThu - a.doanhThu).slice(0, 8);
  }, [filteredSales]);

  const byChannel = useMemo(() => {
    if (!channels || channels.length === 0) return [];
    const map = {};
    filteredSales.forEach((s) => {
      const key = s.kenh_id || "__none";
      map[key] = map[key] || { ten: channels.find((c) => c.id === s.kenh_id)?.ten || "Chưa gán kênh", doanhThu: 0, soDon: 0 };
      map[key].doanhThu += s.tong_tien;
      map[key].soDon += 1;
    });
    return Object.values(map).sort((a, b) => b.doanhThu - a.doanhThu);
  }, [filteredSales, channels]);

  const totalRevenue = filteredSales.reduce((s, i) => s + i.tong_tien, 0);
  const totalCost = monthly.reduce((s, m) => s + m.giaVon, 0);
  const profit = totalRevenue - totalCost;

  function doExport() {
    exportExcel("bao-cao-kinh-doanh", [
      { name: "Doanh thu theo tháng", rows: monthly.map((m) => ({ "Tháng": m.name, "Doanh thu": m.doanhThu, "Giá vốn": m.giaVon, "Lợi nhuận": m.doanhThu - m.giaVon })) },
      { name: "Hàng bán chạy", rows: topProducts.map((p) => ({ "Hàng hóa": p.ten, "Số lượng bán": p.sl, "Doanh thu": p.doanhThu })) },
      ...(byChannel.length ? [{ name: "Doanh thu theo kênh", rows: byChannel.map((c) => ({ "Kênh": c.ten, "Số đơn": c.soDon, "Doanh thu": c.doanhThu })) }] : []),
    ]);
  }

  return (
    <div>
      <PageHeader
        title="Báo cáo"
        subtitle="Doanh thu, lợi nhuận và hàng bán chạy"
        action={
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              <CalendarDays size={13} color={COLORS.textMuted} />
              <input type="date" value={dateFrom} max={dateTo || undefined} onChange={(e) => setDateFrom(e.target.value)} className="text-[12px] rounded-md border px-1.5 py-1" style={{ borderColor: COLORS.border }} aria-label="Từ ngày" />
              <span className="text-[12px]" style={{ color: COLORS.textMuted }}>–</span>
              <input type="date" value={dateTo} min={dateFrom || undefined} onChange={(e) => setDateTo(e.target.value)} className="text-[12px] rounded-md border px-1.5 py-1" style={{ borderColor: COLORS.border }} aria-label="Đến ngày" />
              {(dateFrom || dateTo) && (
                <button onClick={() => { setDateFrom(""); setDateTo(""); }} className="text-[11.5px] px-1.5 py-1 rounded-md hover:bg-slate-100" style={{ color: COLORS.textMuted }}>Xóa lọc</button>
              )}
            </div>
            {warehouses?.length > 1 && (
              <select className={inputCls} style={{ ...inputStyle, minWidth: 150 }} value={khoId} onChange={(e) => setKhoId(e.target.value)}>
                <option value="all">Tất cả các kho</option>
                {warehouses.map((w) => <option key={w.id} value={w.id}>{w.ten}</option>)}
              </select>
            )}
            <ExcelButton onClick={doExport} />
          </div>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <StatCard icon={TrendingUp} label="Tổng doanh thu" value={fmtVND(totalRevenue)} tone="green" />
        <StatCard icon={ShoppingBag} label="Tổng giá vốn" value={fmtVND(totalCost)} tone="navy" />
        <StatCard icon={CircleDollarSign} label="Lợi nhuận gộp" value={fmtVND(profit)} tone={profit >= 0 ? "green" : "red"} />
      </div>

      <div className="rounded-lg p-4 mb-3" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
        <div className="text-[13.5px] font-semibold mb-3" style={{ color: COLORS.text }}>Doanh thu & giá vốn theo tháng</div>
        {monthly.length === 0 ? (
          <div className="text-[13px]" style={{ color: COLORS.textMuted }}>Chưa có dữ liệu bán hàng.</div>
        ) : !recharts ? (
          <ChartSkeleton height={240} />
        ) : (
          <recharts.ResponsiveContainer width="100%" height={240}>
            <recharts.LineChart data={monthly}>
              <recharts.CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} vertical={false} />
              <recharts.XAxis dataKey="name" tick={{ fontSize: 11, fill: COLORS.textMuted }} axisLine={{ stroke: COLORS.border }} tickLine={false} />
              <recharts.YAxis tick={{ fontSize: 11, fill: COLORS.textMuted }} axisLine={false} tickLine={false} width={45} tickFormatter={(v) => (v >= 1000000 ? (v / 1000000).toFixed(0) + "tr" : v)} />
              <recharts.Tooltip formatter={(v) => fmtVND(v)} contentStyle={{ fontSize: 12, borderRadius: 6, borderColor: COLORS.border }} />
              <recharts.Legend wrapperStyle={{ fontSize: 12 }} />
              <recharts.Line type="monotone" dataKey="doanhThu" name="Doanh thu" stroke={COLORS.green} strokeWidth={2} dot={false} />
              <recharts.Line type="monotone" dataKey="giaVon" name="Giá vốn" stroke={COLORS.red} strokeWidth={2} dot={false} />
            </recharts.LineChart>
          </recharts.ResponsiveContainer>
        )}
      </div>

      {byChannel.length > 0 && (
        <div className="rounded-lg p-4 mb-3" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
          <div className="text-[13.5px] font-semibold mb-3" style={{ color: COLORS.text }}>Doanh thu theo kênh bán hàng</div>
          <Table
            columns={[
              { key: "ten", label: "Kênh" },
              { key: "soDon", label: "Số đơn", align: "right" },
              { key: "doanhThu", label: "Doanh thu", align: "right", render: (r) => fmtVND(r.doanhThu) },
            ]}
            rows={byChannel}
            rowKey="ten"
          />
        </div>
      )}

      <div className="rounded-lg p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
        <div className="text-[13.5px] font-semibold mb-3" style={{ color: COLORS.text }}>Hàng bán chạy</div>
        {topProducts.length === 0 ? (
          <div className="text-[13px]" style={{ color: COLORS.textMuted }}>Chưa có dữ liệu.</div>
        ) : (
          <Table
            columns={[
              { key: "ten", label: "Hàng hóa" },
              { key: "sl", label: "Số lượng bán", align: "right" },
              { key: "doanhThu", label: "Doanh thu", align: "right", render: (r) => fmtVND(r.doanhThu) },
            ]}
            rows={topProducts}
            rowKey="ten"
          />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Trả hàng bán / Trả hàng mua                                         */
/* ------------------------------------------------------------------ */
function ReturnPage({ mode, retStore, invStore, partnerStore, productStore, warehouses }) {
  // mode: 'sale' (trả hàng bán, khách trả lại) | 'purchase' (trả hàng mua, trả lại NCC)
  const isSaleReturn = mode === "sale";
  const { items: returns, add: addRet, remove: removeRet } = retStore;
  const { items: invoices } = invStore;
  const { items: partners } = partnerStore;
  const { items: products, setItems: setProducts } = productStore;
  const [creating, setCreating] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [printing, setPrinting] = useState(null);
  const partnerName = (id) => partners.find((p) => p.id === id)?.ten || "—";
  const list = [...returns].sort((a, b) => (b.ngay || "").localeCompare(a.ngay || ""));

  function create(form) {
    addRet({ ...form, id: uid(isSaleReturn ? "THB" : "THM") });
    // sale return: hàng quay lại kho (+); purchase return: hàng rời kho (-)
    const delta = isSaleReturn ? 1 : -1;
    setProducts((cur) => {
      const next = cur.map((p) => {
        const line = form.items.find((it) => it.hang_hoa_id === p.id);
        if (!line) return p;
        return adjustProductStock(p, delta * line.so_luong, form.kho_id);
      });
      storageSet(STORE_KEYS.products, next);
      return next;
    });
    setCreating(false);
  }

  function del(r) {
    const delta = isSaleReturn ? -1 : 1;
    setProducts((cur) => {
      const next = cur.map((p) => {
        const line = r.items.find((it) => it.hang_hoa_id === p.id);
        if (!line) return p;
        return adjustProductStock(p, delta * line.so_luong, r.kho_id);
      });
      storageSet(STORE_KEYS.products, next);
      return next;
    });
    removeRet(r.id);
    setToDelete(null);
  }

  return (
    <div>
      <PageHeader
        title={isSaleReturn ? "Trả hàng bán" : "Trả hàng mua"}
        subtitle={isSaleReturn ? "Khách hàng trả lại hàng đã mua — giảm công nợ phải thu" : "Trả lại hàng cho nhà cung cấp — giảm công nợ phải trả"}
        action={<Btn onClick={() => setCreating(true)}><Plus size={15} /> Tạo phiếu trả hàng</Btn>}
      />
      {list.length === 0 ? (
        <EmptyState icon={Undo2} title="Chưa có phiếu trả hàng" hint="Tạo phiếu khi khách trả hàng hoặc bạn trả hàng cho nhà cung cấp." action={<Btn onClick={() => setCreating(true)}><Plus size={15} /> Tạo phiếu trả hàng</Btn>} />
      ) : (
        <Table
          columns={[
            { key: "ma", label: "Số phiếu" },
            { key: "ngay", label: "Ngày", render: (r) => fmtDate(r.ngay) },
            { key: "doi_tac_id", label: isSaleReturn ? "Khách hàng" : "Nhà cung cấp", render: (r) => partnerName(r.doi_tac_id) },
            { key: "so_luong", label: "Số mặt hàng", align: "right", render: (r) => r.items.length },
            { key: "tong_tien", label: "Giá trị trả", align: "right", render: (r) => fmtVND(r.tong_tien) },
            { key: "ly_do", label: "Lý do" },
          ]}
          rows={list}
          onPrint={setPrinting}
          onDelete={setToDelete}
        />
      )}
      {creating && <ReturnForm isSaleReturn={isSaleReturn} invoices={invoices} partners={partners} products={products} warehouses={warehouses} onCancel={() => setCreating(false)} onSave={create} />}
      {toDelete && <ConfirmBar text={`Xóa phiếu "${toDelete.ma}"? Tồn kho sẽ được điều chỉnh lại.`} onConfirm={() => del(toDelete)} onCancel={() => setToDelete(null)} />}
      {printing && (
        <PrintDocument
          onClose={() => setPrinting(null)}
          doc={{
            title: isSaleReturn ? "Phiếu trả hàng bán" : "Phiếu trả hàng mua",
            ma: printing.ma,
            ngay: printing.ngay,
            partnerLabel: isSaleReturn ? "Khách hàng" : "Nhà cung cấp",
            partnerName: partnerName(printing.doi_tac_id),
            items: printing.items,
            total: printing.tong_tien,
            note: printing.ly_do,
          }}
        />
      )}
    </div>
  );
}

function ReturnForm({ isSaleReturn, invoices, partners, products, warehouses, onSave, onCancel }) {
  const [doiTacId, setDoiTacId] = useState("");
  const [ngay, setNgay] = useState(todayStr());
  const [lyDo, setLyDo] = useState("");
  const [khoId, setKhoId] = useState(warehouses?.[0]?.id || "");
  const [lines, setLines] = useState([{ hang_hoa_id: "", so_luong: 1, don_gia: 0, don_vi_idx: 0 }]);
  const total = lines.reduce((s, l) => s + (Number(l.so_luong) || 0) * (Number(l.don_gia) || 0), 0);

  function unitsFor(productId) {
    const prod = products.find((p) => p.id === productId);
    return [{ ten: prod?.dvt || "Cái", ty_le: 1 }, ...((prod?.don_vi_quy_doi) || [])];
  }

  function setLine(idx, patch) {
    setLines((cur) => {
      const next = [...cur];
      next[idx] = { ...next[idx], ...patch };
      if (patch.hang_hoa_id) {
        const prod = products.find((p) => p.id === patch.hang_hoa_id);
        next[idx].don_vi_idx = 0;
        if (prod) next[idx].don_gia = isSaleReturn ? prod.gia_ban : prod.gia_von;
      }
      if (patch.don_vi_idx !== undefined) {
        const prod = products.find((p) => p.id === next[idx].hang_hoa_id);
        const units = unitsFor(next[idx].hang_hoa_id);
        const tyLe = units[patch.don_vi_idx]?.ty_le || 1;
        const basePrice = prod ? (isSaleReturn ? prod.gia_ban : prod.gia_von) : 0;
        next[idx].don_gia = Math.round(basePrice * tyLe);
      }
      return next;
    });
  }
  function addLine() { setLines((cur) => [...cur, { hang_hoa_id: "", so_luong: 1, don_gia: 0, don_vi_idx: 0 }]); }
  function removeLine(idx) { setLines((cur) => cur.filter((_, i) => i !== idx)); }

  function submit(e) {
    e.preventDefault();
    const validLines = lines.filter((l) => l.hang_hoa_id && l.so_luong > 0);
    if (!doiTacId || validLines.length === 0) return;
    const withNames = validLines.map((l) => {
      const units = unitsFor(l.hang_hoa_id);
      const tyLe = units[l.don_vi_idx || 0]?.ty_le || 1;
      return {
        hang_hoa_id: l.hang_hoa_id,
        ten: products.find((p) => p.id === l.hang_hoa_id)?.ten || "",
        so_luong: (Number(l.so_luong) || 0) * tyLe,
        don_gia: tyLe > 1 ? Math.round((Number(l.don_gia) || 0) / tyLe) : (Number(l.don_gia) || 0),
      };
    });
    onSave({ ma: uid(isSaleReturn ? "THB" : "THM").toUpperCase(), ngay, doi_tac_id: doiTacId, kho_id: khoId || undefined, items: withNames, tong_tien: total, ly_do: lyDo });
  }

  return (
    <Modal title={isSaleReturn ? "Tạo phiếu trả hàng bán" : "Tạo phiếu trả hàng mua"} onClose={onCancel} width="max-w-3xl">
      <form onSubmit={submit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
          <Field label={isSaleReturn ? "Khách hàng" : "Nhà cung cấp"} required>
            <select required className={inputCls} style={inputStyle} value={doiTacId} onChange={(e) => setDoiTacId(e.target.value)}>
              <option value="">-- Chọn --</option>
              {partners.map((p) => <option key={p.id} value={p.id}>{p.ten}</option>)}
            </select>
          </Field>
          <Field label="Ngày chứng từ"><input type="date" className={inputCls} style={inputStyle} value={ngay} onChange={(e) => setNgay(e.target.value)} /></Field>
        </div>
        {warehouses?.length > 1 && (
          <Field label="Kho / Chi nhánh" required>
            <select required className={inputCls} style={inputStyle} value={khoId} onChange={(e) => setKhoId(e.target.value)}>
              {warehouses.map((w) => <option key={w.id} value={w.id}>{w.ten}</option>)}
            </select>
          </Field>
        )}
        <div className="mt-1 mb-2 text-[12.5px] font-medium" style={{ color: COLORS.textMuted }}>Chi tiết hàng trả</div>
        <div className="rounded-md border overflow-x-auto" style={{ borderColor: COLORS.border }}>
          {lines.map((l, idx) => {
            const lineUnits = unitsFor(l.hang_hoa_id);
            return (
              <div key={idx} className="flex items-center gap-2 px-2.5 py-2 border-b last:border-b-0 min-w-[680px]" style={{ borderColor: COLORS.border }}>
                <select className={inputCls + " flex-1"} style={inputStyle} value={l.hang_hoa_id} onChange={(e) => setLine(idx, { hang_hoa_id: e.target.value })}>
                  <option value="">-- Chọn hàng hóa --</option>
                  {products.map((p) => <option key={p.id} value={p.id}>{p.ten}</option>)}
                </select>
                <input type="number" min="1" className={inputCls} style={{ ...inputStyle, width: 65 }} value={l.so_luong} onChange={(e) => setLine(idx, { so_luong: +e.target.value })} />
                {lineUnits.length > 1 ? (
                  <select className={inputCls} style={{ ...inputStyle, width: 95 }} value={l.don_vi_idx || 0} onChange={(e) => setLine(idx, { don_vi_idx: +e.target.value })}>
                    {lineUnits.map((u, i) => <option key={i} value={i}>{u.ten}</option>)}
                  </select>
                ) : (
                  <span className="text-[12px] w-16 shrink-0" style={{ color: COLORS.textMuted }}>{lineUnits[0]?.ten}</span>
                )}
                <input type="number" min="0" className={inputCls} style={{ ...inputStyle, width: 110 }} value={l.don_gia} onChange={(e) => setLine(idx, { don_gia: +e.target.value })} />
                <div className="w-28 text-right text-[13px]" style={{ color: COLORS.text }}>{fmtVND((l.so_luong || 0) * (l.don_gia || 0))}</div>
                <button type="button" onClick={() => removeLine(idx)} className="p-1 rounded hover:bg-slate-100"><X size={14} color={COLORS.textMuted} /></button>
              </div>
            );
          })}
        </div>
        <button type="button" onClick={addLine} className="mt-2 text-[12.5px] font-medium flex items-center gap-1" style={{ color: COLORS.navy }}>
          <Plus size={13} /> Thêm dòng hàng
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 mt-4">
          <Field label="Lý do trả hàng"><input className={inputCls} style={inputStyle} value={lyDo} onChange={(e) => setLyDo(e.target.value)} placeholder="VD: hàng lỗi, giao sai, không đúng đơn..." /></Field>
          <div className="flex flex-col items-end justify-center pt-4">
            <span className="text-[12.5px]" style={{ color: COLORS.textMuted }}>Giá trị trả hàng</span>
            <span className="text-[18px] font-semibold" style={{ color: COLORS.navy }}>{fmtVND(total)}</span>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
          <Btn type="button" variant="outline" onClick={onCancel}>Hủy</Btn>
          <Btn type="submit">Lưu phiếu</Btn>
        </div>
      </form>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* In phiếu / Xuất PDF (in qua hộp thoại in của trình duyệt)            */
/* ------------------------------------------------------------------ */
const PAPER_CSS = {
  A4: { page: "@page { size: A4 portrait; margin: 12mm; }", width: 760, base: 13 },
  A5: { page: "@page { size: A5 landscape; margin: 8mm; }", width: 700, base: 12 },
  K80: { page: "@page { size: 80mm auto; margin: 3mm; }", width: 300, base: 11 },
};

function PrintDocument({ doc, onClose }) {
  const company = CURRENT_COMPANY;
  const [paper, setPaper] = useState(company.kho_giay || "A4");
  const [ready, setReady] = useState(false);

  // Cho phép chọn khổ giấy trước khi bung hộp thoại in của trình duyệt.
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose?.(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!doc) return null;
  const {
    title, ma, ngay, partnerLabel, partnerName, partnerAddress, partnerTax,
    items, total, note, soHddt, mauSoHddt, kyHieuHddt,
    subtotal, discount, vat, signers,
  } = doc;

  const cfg = PAPER_CSS[paper] || PAPER_CSS.A4;
  const narrow = paper === "K80";

  const lineSum = (items || []).reduce((s, it) => s + (it.so_luong || 0) * (it.don_gia || 0), 0);
  const shownSubtotal = subtotal != null ? subtotal : lineSum;
  const shownDiscount = discount || 0;
  const shownVat = vat || 0;
  const grandTotal = (total != null ? total : shownSubtotal - shownDiscount) + shownVat;

  const signerList = signers || ["Người lập phiếu", "Người giao/nhận hàng", "Thủ kho"];

  return (
    <div id="ntcons-print-root">
      <style>{`
        ${cfg.page}
        @media print {
          body * { visibility: hidden; }
          #ntcons-print-root, #ntcons-print-root * { visibility: visible; }
          #ntcons-print-root { position: absolute; top: 0; left: 0; width: 100%; }
          #ntcons-print-sheet { box-shadow: none !important; margin: 0 !important; padding: 0 !important; width: 100% !important; max-width: none !important; }
          .no-print { display: none !important; }
          table { page-break-inside: auto; }
          tr { page-break-inside: avoid; }
          thead { display: table-header-group; }
        }
      `}</style>

      <div className="fixed inset-0 z-[100] overflow-y-auto py-6 px-3" style={{ background: "#F1EEE7", color: "#1a1a1a" }}>
        {/* Thanh công cụ — không in ra giấy */}
        <div className="no-print flex flex-wrap items-center justify-center gap-2 mb-4">
          <select
            className="rounded-md border px-2 py-1.5 text-[13px] bg-white outline-none"
            style={{ borderColor: COLORS.border }}
            value={paper}
            onChange={(e) => setPaper(e.target.value)}
            aria-label="Khổ giấy"
          >
            {PAPER_SIZES.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
          </select>
          <button onClick={() => window.print()} className="px-3 py-1.5 rounded-md text-[13px] font-medium inline-flex items-center gap-1.5" style={{ background: COLORS.navy, color: "#fff" }}>
            <Printer size={14} /> In / Xuất PDF
          </button>
          <button onClick={onClose} className="px-3 py-1.5 rounded-md text-[13px] font-medium bg-white border" style={{ borderColor: COLORS.border, color: COLORS.text }}>
            Đóng (Esc)
          </button>
        </div>

        <div
          id="ntcons-print-sheet"
          className="bg-white mx-auto shadow-lg"
          style={{ width: cfg.width, maxWidth: "100%", padding: narrow ? 14 : 36, fontSize: cfg.base }}
        >
          {/* Đầu chứng từ: thông tin công ty + tên chứng từ */}
          <div className={narrow ? "text-center" : "flex items-start gap-3 pb-3"} style={narrow ? { paddingBottom: 8 } : { borderBottom: "2px solid #1a1a1a" }}>
            <img src={LOGO_SRC} alt="" className={narrow ? "w-12 h-12 object-contain mx-auto mb-1" : "w-14 h-14 object-contain shrink-0"} />
            <div className={narrow ? "" : "min-w-0"} style={{ lineHeight: 1.45 }}>
              <div className="font-bold uppercase" style={{ fontSize: cfg.base + 2 }}>{company.ten || "NTCONS"}</div>
              {company.ma_so_thue && <div>MST: {company.ma_so_thue}</div>}
              {company.dia_chi && <div>{company.dia_chi}</div>}
              {(company.dien_thoai || company.email) && (
                <div>{[company.dien_thoai && `ĐT: ${company.dien_thoai}`, company.email].filter(Boolean).join(" · ")}</div>
              )}
              {company.so_tai_khoan && (
                <div>STK: {company.so_tai_khoan}{company.ngan_hang ? ` — ${company.ngan_hang}` : ""}{company.chu_tai_khoan ? ` (${company.chu_tai_khoan})` : ""}</div>
              )}
            </div>
            {!narrow && (
              <div className="ml-auto text-right shrink-0" style={{ lineHeight: 1.45 }}>
                <div className="font-bold uppercase" style={{ fontSize: cfg.base + 5 }}>{title}</div>
                <div>Số: {ma} · Ngày {fmtDate(ngay)}</div>
                {soHddt && <div>Mẫu số {mauSoHddt} — Ký hiệu {kyHieuHddt} — Số {soHddt}</div>}
              </div>
            )}
          </div>

          {narrow && (
            <div className="text-center mb-2 pb-2" style={{ borderBottom: "1px dashed #999" }}>
              <div className="font-bold uppercase" style={{ fontSize: cfg.base + 3 }}>{title}</div>
              <div>Số: {ma} · {fmtDate(ngay)}</div>
              {soHddt && <div>Mẫu {mauSoHddt} — KH {kyHieuHddt} — Số {soHddt}</div>}
            </div>
          )}

          {/* Đối tác */}
          <div className={narrow ? "mb-2" : "my-4"} style={{ lineHeight: 1.6 }}>
            <div>{partnerLabel}: <span className="font-semibold">{partnerName}</span></div>
            {partnerTax && <div>Mã số thuế: {partnerTax}</div>}
            {partnerAddress && <div>Địa chỉ: {partnerAddress}</div>}
          </div>

          {/* Chi tiết hàng hóa */}
          <table className="w-full border-collapse" style={{ fontSize: cfg.base }}>
            <thead>
              <tr>
                {!narrow && <th className="border px-2 py-1.5 text-center" style={{ width: 34 }}>STT</th>}
                <th className="border px-2 py-1.5 text-left">Hàng hóa</th>
                <th className="border px-2 py-1.5 text-right">SL</th>
                <th className="border px-2 py-1.5 text-right">Đơn giá</th>
                <th className="border px-2 py-1.5 text-right">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {(items || []).map((it, i) => (
                <tr key={i}>
                  {!narrow && <td className="border px-2 py-1.5 text-center">{i + 1}</td>}
                  <td className="border px-2 py-1.5">{it.ten}</td>
                  <td className="border px-2 py-1.5 text-right">{it.so_luong}</td>
                  <td className="border px-2 py-1.5 text-right">{fmtVND(it.don_gia)}</td>
                  <td className="border px-2 py-1.5 text-right">{fmtVND((it.so_luong || 0) * (it.don_gia || 0))}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Tổng hợp tiền */}
          <div className="flex justify-end mt-3">
            <div style={{ minWidth: narrow ? "100%" : 300 }}>
              <div className="flex justify-between py-0.5">
                <span>Cộng tiền hàng</span><span>{fmtVND(shownSubtotal)}</span>
              </div>
              {shownDiscount > 0 && (
                <div className="flex justify-between py-0.5">
                  <span>Chiết khấu</span><span>-{fmtVND(shownDiscount)}</span>
                </div>
              )}
              {shownVat > 0 && (
                <div className="flex justify-between py-0.5">
                  <span>Thuế GTGT</span><span>{fmtVND(shownVat)}</span>
                </div>
              )}
              <div className="flex justify-between py-1 mt-1 font-bold" style={{ borderTop: "1px solid #1a1a1a", fontSize: cfg.base + 2 }}>
                <span>Tổng thanh toán</span><span>{fmtVND(grandTotal)}</span>
              </div>
            </div>
          </div>
          <div className="mt-1.5 italic">Số tiền bằng chữ: {docTienBangChu(grandTotal)}</div>

          {note && <div className="mt-3">Ghi chú: {note}</div>}

          {/* Chữ ký — máy in nhiệt K80 không in phần này */}
          {!narrow && (
            <div className={`grid gap-6 text-center mt-12`} style={{ gridTemplateColumns: `repeat(${signerList.length}, minmax(0, 1fr))` }}>
              {signerList.map((s) => (
                <div key={s}>
                  <div className="font-semibold">{s}</div>
                  <div className="text-gray-500" style={{ fontSize: cfg.base - 1 }}>(Ký, ghi rõ họ tên)</div>
                  <div style={{ height: 64 }} />
                </div>
              ))}
            </div>
          )}

          {company.chan_trang && (
            <div className="text-center italic mt-6" style={{ fontSize: cfg.base - 1 }}>{company.chan_trang}</div>
          )}
        </div>
      </div>

      {/* Tự mở hộp thoại in sau khi bản xem trước đã dựng xong */}
      <AutoPrint when={ready} />
    </div>
  );
}

/** Gọi window.print() đúng một lần, sau khi bản xem trước đã render. */
function AutoPrint({ when }) {
  const done = useRef(false);
  useEffect(() => {
    if (when && !done.current) {
      done.current = true;
      window.print();
    }
  }, [when]);
  return null;
}

function PrintButton({ onClick }) {
  return (
    <Btn size="sm" variant="outline" onClick={onClick}>
      <Printer size={13.5} /> In / Xuất PDF
    </Btn>
  );
}

/* ------------------------------------------------------------------ */
/* Quét mã vạch bằng camera (dùng chung: ProductForm, POS)             */
/* ------------------------------------------------------------------ */
function BarcodeScannerModal({ onClose, onDetected }) {
  const scannerRef = useRef(null);
  const [error, setError] = useState("");
  const [starting, setStarting] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let scannerInstance = null;

    import("html5-qrcode")
      .then(({ Html5Qrcode }) => {
        if (cancelled) return;
        return Html5Qrcode.getCameras().then((cameras) => {
          if (cancelled) return;
          const cameraId = cameras?.[cameras.length - 1]?.id || cameras?.[0]?.id;
          if (!cameraId) {
            setError("Không tìm thấy camera trên thiết bị này.");
            setStarting(false);
            return;
          }
          scannerInstance = new Html5Qrcode("ntcons-barcode-reader");
          scannerRef.current = scannerInstance;
          return scannerInstance
            .start(
              cameraId,
              { fps: 10, qrbox: { width: 250, height: 140 } },
              (decodedText) => onDetected(decodedText),
              () => {} // per-frame scan miss — ignore, keep scanning
            )
            .then(() => setStarting(false));
        });
      })
      .catch((e) => {
        if (!cancelled) {
          setError("Không mở được camera (có thể trình duyệt chưa cấp quyền, hoặc thiết bị không hỗ trợ).");
          setStarting(false);
        }
        console.error(e);
      });

    return () => {
      cancelled = true;
      if (scannerInstance) {
        scannerInstance.stop().catch(() => {}).finally(() => scannerInstance.clear?.());
      }
    };
  }, []);

  return (
    <Modal title="Quét mã vạch" onClose={onClose}>
      <div id="ntcons-barcode-reader" style={{ width: "100%", minHeight: 220, borderRadius: 8, overflow: "hidden", background: "#111" }} />
      {starting && !error && <div className="mt-3 text-[12.5px] text-center" style={{ color: COLORS.textMuted }}>Đang mở camera...</div>}
      {error && <div className="mt-3 text-[12.5px]" style={{ color: COLORS.red }}>{error}</div>}
      <div className="mt-3 text-[12px]" style={{ color: COLORS.textMuted }}>Đưa mã vạch vào giữa khung hình — hệ thống sẽ tự nhận diện.</div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Đăng nhập & Quản lý người dùng                                      */
/* ------------------------------------------------------------------ */
const SESSION_KEY = "ntcons:session";
const DEFAULT_ADMIN_PLAINTEXT = "admin123";
const DEFAULT_ADMIN = { id: "U_ADMIN", ten: "Quản trị viên", username: "admin", password: bcrypt.hashSync(DEFAULT_ADMIN_PLAINTEXT, 10), role: "admin" };
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

function LoginScreen({ users, onLogin, bootstrapping, updateUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const uname = username.trim();
    const pwd = password.trim();
    const existing = (users || []).find((x) => x.username.toLowerCase() === uname.toLowerCase());

    // Locked out?
    if (existing?.locked_until && new Date(existing.locked_until) > new Date()) {
      const mins = Math.max(1, Math.ceil((new Date(existing.locked_until) - new Date()) / 60000));
      setError(`Tài khoản tạm khóa do đăng nhập sai nhiều lần. Thử lại sau ${mins} phút.`);
      return;
    }

    let ok = false;
    let matchedUser = existing;
    if (existing) {
      try {
        ok = bcrypt.compareSync(pwd, existing.password || "");
      } catch (e) {
        ok = false;
      }
    } else if (uname.toLowerCase() === DEFAULT_ADMIN.username && pwd === DEFAULT_ADMIN_PLAINTEXT) {
      // Safety net: the default admin always works even if the shared user
      // list hasn't finished loading yet, so a first-time login never blocks.
      ok = true;
      matchedUser = DEFAULT_ADMIN;
    }

    if (!ok) {
      setError("Sai tên đăng nhập hoặc mật khẩu.");
      if (existing && updateUser) {
        const attempts = (existing.failed_attempts || 0) + 1;
        const patch = { failed_attempts: attempts };
        if (attempts >= MAX_LOGIN_ATTEMPTS) {
          patch.locked_until = new Date(Date.now() + LOCKOUT_MINUTES * 60000).toISOString();
        }
        updateUser(existing.id, patch);
      }
      return;
    }

    setError("");
    if (existing && (existing.failed_attempts || existing.locked_until) && updateUser) {
      updateUser(existing.id, { failed_attempts: 0, locked_until: null });
    }
    onLogin(matchedUser);
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: COLORS.bg }}>
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <img src={LOGO_SRC} alt="NTCONS" className="w-16 h-16 object-contain mb-2" />
          <div className="text-[17px] font-bold" style={{ color: COLORS.text }}>banhang.ntcons</div>
          <div className="text-[12.5px]" style={{ color: COLORS.textMuted }}>Hệ thống quản lý bán hàng · kho · công nợ</div>
        </div>
        <div className="rounded-lg p-6" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
          {bootstrapping ? (
            <div className="text-[13px] text-center py-4" style={{ color: COLORS.textMuted }}>Đang khởi tạo...</div>
          ) : (
            <form onSubmit={submit}>
              <Field label="Tên đăng nhập" required>
                <input required autoFocus className={inputCls} style={inputStyle} value={username} onChange={(e) => setUsername(e.target.value)} />
              </Field>
              <Field label="Mật khẩu" required>
                <div className="relative">
                  <input required type={showPw ? "text" : "password"} className={inputCls} style={{ ...inputStyle, paddingRight: 32 }} value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-2 top-1/2 -translate-y-1/2">
                    {showPw ? <EyeOff size={14} color={COLORS.textMuted} /> : <Eye size={14} color={COLORS.textMuted} />}
                  </button>
                </div>
              </Field>
              {error && <div className="text-[12.5px] mb-3" style={{ color: COLORS.red }}>{error}</div>}
              <Btn type="submit" className="w-full justify-center">Đăng nhập</Btn>
            </form>
          )}
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-md p-3 text-[11.5px]" style={{ background: COLORS.amberBg, color: "#5C4109" }}>
          <ShieldCheck size={14} className="mt-0.5 shrink-0" />
          <span>Đăng nhập tài khoản mặc định lần đầu: <b>admin / admin123</b>. Mật khẩu được lưu dưới dạng mã hóa (bcrypt) và tài khoản tự khóa 15 phút sau {MAX_LOGIN_ATTEMPTS} lần đăng nhập sai — nhưng đây vẫn là lớp bảo mật cơ bản cho nội bộ, chưa phải xác thực cấp doanh nghiệp. Hãy đổi mật khẩu mặc định sớm.</span>
        </div>
      </div>
    </div>
  );
}

function UsersPage({ store, currentUser }) {
  const { items, add, update, remove } = store;
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  function save(form) {
    if (form.id) update(form.id, form);
    else add({ ...form, id: uid("U") });
    setEditing(null);
  }

  return (
    <div>
      <PageHeader title="Người dùng" subtitle="Quản lý tài khoản đăng nhập và phân quyền theo vai trò" action={<Btn onClick={() => setEditing({})}><Plus size={15} /> Thêm người dùng</Btn>} />
      <Table
        columns={[
          { key: "ten", label: "Họ tên" },
          { key: "username", label: "Tên đăng nhập" },
          { key: "role", label: "Vai trò", render: (r) => <Badge tone={r.role === "admin" ? "green" : "muted"}>{ROLE_LABELS[r.role] || r.role}</Badge> },
          { key: "trang_thai", label: "Trạng thái", render: (r) => (r.locked_until && new Date(r.locked_until) > new Date() ? <Badge tone="red">Tạm khóa</Badge> : <Badge tone="green">Bình thường</Badge>) },
        ]}
        rows={items}
        onEdit={setEditing}
        onDelete={(r) => (r.id === currentUser.id ? null : setToDelete(r))}
      />
      {editing && (
        <Modal title={editing.id ? "Sửa người dùng" : "Thêm người dùng"} onClose={() => setEditing(null)}>
          <UserForm initial={editing} onCancel={() => setEditing(null)} onSave={save} />
        </Modal>
      )}
      {toDelete && (
        <ConfirmBar text={`Xóa tài khoản "${toDelete.ten}"?`} onConfirm={() => { remove(toDelete.id); setToDelete(null); }} onCancel={() => setToDelete(null)} />
      )}
    </div>
  );
}

function UserForm({ initial, onSave, onCancel }) {
  const isEditing = !!initial.id;
  const [f, setF] = useState({
    ten: initial.ten || "",
    username: initial.username || "",
    password: "", // never pre-fill — this would otherwise show the stored hash
    role: initial.role || "sales",
    id: initial.id,
  });

  function submit(e) {
    e.preventDefault();
    const payload = { ten: f.ten, username: f.username, role: f.role, id: f.id, failed_attempts: 0, locked_until: null };
    if (f.password) {
      payload.password = bcrypt.hashSync(f.password, 10);
    } else if (!isEditing) {
      return; // password required for a brand-new account
    }
    onSave(payload);
  }

  return (
    <form onSubmit={submit}>
      <Field label="Họ tên" required><input required className={inputCls} style={inputStyle} value={f.ten} onChange={(e) => setF({ ...f, ten: e.target.value })} /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
        <Field label="Tên đăng nhập" required><input required className={inputCls} style={inputStyle} value={f.username} onChange={(e) => setF({ ...f, username: e.target.value })} /></Field>
        <Field label="Mật khẩu" required={!isEditing}>
          <input
            required={!isEditing}
            type="password"
            className={inputCls}
            style={inputStyle}
            value={f.password}
            onChange={(e) => setF({ ...f, password: e.target.value })}
            placeholder={isEditing ? "Để trống nếu không đổi" : ""}
          />
        </Field>
      </div>
      <Field label="Vai trò">
        <select className={inputCls} style={inputStyle} value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })}>
          {Object.entries(ROLE_LABELS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
        </select>
      </Field>
      <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
        <Btn type="button" variant="outline" onClick={onCancel}>Hủy</Btn>
        <Btn type="submit">Lưu</Btn>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Auth gate                                                            */
/* ------------------------------------------------------------------ */
function useAuth(usersStore) {
  const [currentUser, setCurrentUser] = useState(null); // null = not logged in yet
  const [ready, setReady] = useState(false);
  const [effectiveUsers, setEffectiveUsers] = useState([]);
  const initRef = useRef(false);

  // Single, deterministic init pass: make sure a default admin exists, then
  // try to silently resume the last session on this device. Runs exactly once.
  useEffect(() => {
    if (usersStore.loading || initRef.current) return;
    initRef.current = true;
    (async () => {
      let list = usersStore.items && usersStore.items.length > 0 ? usersStore.items : [DEFAULT_ADMIN];
      if (!usersStore.items || usersStore.items.length === 0) {
        usersStore.persist(list);
      }
      setEffectiveUsers(list);
      try {
        const sess = await storageGet(SESSION_KEY, false);
        if (sess?.username) {
          const u = list.find((x) => x.username === sess.username);
          if (u) { setCurrentUser(u); setCurrentActor(u); }
        }
      } catch (e) {
        /* ignore — just show the login screen */
      }
      setReady(true);
    })();
  }, [usersStore.loading]);

  // Keep the working user list in sync once the store has loaded/updated.
  useEffect(() => {
    if (!usersStore.loading && usersStore.items && usersStore.items.length > 0) {
      setEffectiveUsers(usersStore.items);
    }
  }, [usersStore.loading, usersStore.items]);

  function login(u) {
    setCurrentUser(u);
    setCurrentActor(u);
    storageSet(SESSION_KEY, { username: u.username }, false);
  }
  function logout() {
    setCurrentUser(null);
    setCurrentActor(null);
    storageSet(SESSION_KEY, null, false);
  }

  return { currentUser, login, logout, ready, users: effectiveUsers };
}

/* ------------------------------------------------------------------ */
/* Sao lưu & Phục hồi                                                  */
/* ------------------------------------------------------------------ */
const BACKUP_STORE_LABELS = {
  products: "Hàng hóa", customers: "Khách hàng", suppliers: "Nhà cung cấp",
  sales: "Bán hàng", purchases: "Mua hàng", receipts: "Phiếu thu", payments: "Phiếu chi",
  vouchers: "Phiếu kho (Nhập/Xuất)", salereturns: "Trả hàng bán", purchasereturns: "Trả hàng mua",
  pricelists: "Bảng giá", salesorders: "Đơn đặt hàng", purchaseorders: "Đơn đặt hàng mua", employees: "Nhân viên", payroll: "Bảng lương",
  channels: "Kênh bán hàng", paymentmethods: "Phương thức thanh toán", users: "Người dùng (tài khoản)",
  lots: "Lô hàng / Serial",
};

function BackupPage({ stores }) {
  const [confirmRestore, setConfirmRestore] = useState(null);
  const [error, setError] = useState("");
  const [restored, setRestored] = useState(false);
  const fileInputRef = useRef(null);

  // Sao lưu tự động (máy chủ) — snapshot hàng ngày do Vercel Cron tạo, xem README để bật.
  const [autoBackups, setAutoBackups] = useState(null); // null = chưa tải xong lần đầu
  const [autoError, setAutoError] = useState("");
  const [runNowBusy, setRunNowBusy] = useState(false);
  const [fetchingId, setFetchingId] = useState(null);

  function apiHeaders() {
    const secret = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_STORAGE_API_SECRET) || "";
    return secret ? { "X-Storage-Secret": secret } : {};
  }

  async function loadAutoBackups() {
    setAutoError("");
    try {
      const res = await fetch("/api/backups", { headers: apiHeaders() });
      if (!res.ok) throw new Error("status " + res.status);
      const data = await res.json();
      setAutoBackups(data.backups || []);
    } catch (e) {
      setAutoBackups([]);
      setAutoError("Không tải được danh sách sao lưu tự động — có thể máy chủ chưa bật tính năng này (xem README).");
    }
  }

  useEffect(() => { loadAutoBackups(); }, []);

  async function runBackupNow() {
    setRunNowBusy(true);
    setAutoError("");
    try {
      const res = await fetch("/api/backup-cron", { headers: apiHeaders() });
      if (!res.ok) throw new Error("status " + res.status);
      toast("Đã tạo bản sao lưu mới trên máy chủ.");
      await loadAutoBackups();
    } catch (e) {
      setAutoError("Không tạo được bản sao lưu — kiểm tra lại cấu hình máy chủ (xem README).");
    } finally {
      setRunNowBusy(false);
    }
  }

  async function fetchAutoBackup(id) {
    setFetchingId(id);
    try {
      const res = await fetch(`/api/backups?id=${id}`, { headers: apiHeaders() });
      if (!res.ok) throw new Error("status " + res.status);
      return await res.json();
    } catch (e) {
      toast("Không tải được nội dung bản sao lưu này.", "error");
      return null;
    } finally {
      setFetchingId(null);
    }
  }

  async function downloadAutoBackup(b) {
    const full = await fetchAutoBackup(b.id);
    if (!full) return;
    const payload = { app: "banhang.ntcons", exported_at: full.created_at, data: full.payload };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `banhang-ntcons-auto-backup-${(full.created_at || "").slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function restoreFromAuto(b) {
    const full = await fetchAutoBackup(b.id);
    if (!full) return;
    setConfirmRestore({ exported_at: full.created_at, data: full.payload });
  }

  function doExport() {
    const payload = { app: "banhang.ntcons", exported_at: new Date().toISOString(), data: {} };
    Object.entries(stores).forEach(([key, store]) => {
      payload.data[key] = store.items;
    });
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `banhang-ntcons-backup-${todayStr()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function handleFileChosen(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setRestored(false);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed || typeof parsed.data !== "object") throw new Error("File không đúng định dạng sao lưu của banhang.ntcons.");
        setConfirmRestore(parsed);
        setError("");
      } catch (err) {
        setError("Không đọc được file: " + err.message);
      }
    };
    reader.onerror = () => setError("Không đọc được file đã chọn.");
    reader.readAsText(file);
    e.target.value = "";
  }

  function doRestore() {
    if (!confirmRestore) return;
    Object.entries(stores).forEach(([key, store]) => {
      const incoming = confirmRestore.data[key];
      if (Array.isArray(incoming)) store.persist(incoming, "restore");
    });
    setConfirmRestore(null);
    setRestored(true);
  }

  const counts = Object.entries(stores).map(([key, store]) => ({ key, label: BACKUP_STORE_LABELS[key] || key, count: store.items.length }));
  const totalRecords = counts.reduce((s, c) => s + c.count, 0);

  return (
    <div>
      <PageHeader title="Sao lưu & Phục hồi" subtitle="Xuất toàn bộ dữ liệu ra 1 file, hoặc khôi phục từ file đã sao lưu trước đó" />

      <div className="mb-4 px-3 py-2 rounded-md text-[12px] flex items-start gap-2" style={{ background: COLORS.amberBg, color: "#5C4109" }}>
        <AlertTriangle size={14} className="mt-0.5 shrink-0" />
        <span>File sao lưu chứa toàn bộ dữ liệu kinh doanh, kể cả danh sách tài khoản đăng nhập (mật khẩu đã mã hóa, không phải dạng thô). Hãy lưu file này ở nơi an toàn, không chia sẻ công khai.</span>
      </div>

      {restored && (
        <div className="mb-4 px-3 py-2 rounded-md text-[12.5px]" style={{ background: COLORS.greenBg, color: COLORS.green }}>
          Đã phục hồi dữ liệu thành công từ file sao lưu.
        </div>
      )}
      {error && <div className="mb-4 px-3 py-2 rounded-md text-[12.5px]" style={{ background: COLORS.redBg, color: COLORS.red }}>{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
          <div className="flex items-center gap-2 mb-2">
            <Database size={16} color={COLORS.navy} />
            <div className="text-[13.5px] font-semibold" style={{ color: COLORS.text }}>Xuất sao lưu</div>
          </div>
          <div className="text-[12.5px] mb-3" style={{ color: COLORS.textMuted }}>Tổng {totalRecords} bản ghi trên {counts.length} danh mục/module.</div>
          <Btn onClick={doExport}><Database size={14} /> Xuất toàn bộ dữ liệu (.json)</Btn>
        </div>
        <div className="rounded-lg p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
          <div className="flex items-center gap-2 mb-2">
            <Upload size={16} color={COLORS.navy} />
            <div className="text-[13.5px] font-semibold" style={{ color: COLORS.text }}>Phục hồi từ file</div>
          </div>
          <div className="text-[12.5px] mb-3" style={{ color: COLORS.textMuted }}>Chọn file .json đã xuất trước đó. Thao tác này sẽ <b>thay thế toàn bộ</b> dữ liệu hiện tại.</div>
          <input ref={fileInputRef} type="file" accept="application/json" onChange={handleFileChosen} className="hidden" />
          <Btn variant="outline" onClick={() => fileInputRef.current?.click()}><Upload size={14} /> Chọn file để phục hồi</Btn>
        </div>
      </div>

      <div className="rounded-lg p-4 mb-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <History size={16} color={COLORS.navy} />
            <div className="text-[13.5px] font-semibold" style={{ color: COLORS.text }}>Sao lưu tự động (máy chủ)</div>
          </div>
          <Btn size="sm" variant="outline" onClick={runBackupNow} busy={runNowBusy}>Sao lưu ngay</Btn>
        </div>
        <div className="text-[12.5px] mb-3" style={{ color: COLORS.textMuted }}>
          Máy chủ tự tạo một bản sao lưu mỗi ngày (2:00 sáng giờ Việt Nam) và giữ lại 30 bản gần nhất. Không cần thao tác gì thêm — mục này chỉ để xem lại hoặc khôi phục khi cần.
        </div>
        {autoError && <div className="mb-3 px-3 py-2 rounded-md text-[12px]" style={{ background: COLORS.amberBg, color: "#5C4109" }}>{autoError}</div>}
        {autoBackups === null ? (
          <div className="text-[12.5px]" style={{ color: COLORS.textMuted }}>Đang tải...</div>
        ) : autoBackups.length === 0 ? (
          !autoError && <div className="text-[12.5px]" style={{ color: COLORS.textMuted }}>Chưa có bản sao lưu tự động nào — bản đầu tiên sẽ xuất hiện sau lần chạy theo lịch, hoặc bấm "Sao lưu ngay".</div>
        ) : (
          <Table
            columns={[
              { key: "created_at", label: "Thời điểm", render: (r) => new Date(r.created_at).toLocaleString("vi-VN") },
              { key: "record_count", label: "Số bản ghi", align: "right" },
              {
                key: "action", label: "", sortable: false, align: "right",
                render: (r) => (
                  <div className="flex items-center justify-end gap-1">
                    <Btn size="sm" variant="outline" onClick={() => downloadAutoBackup(r)} busy={fetchingId === r.id}>Tải xuống</Btn>
                    <Btn size="sm" variant="outline" onClick={() => restoreFromAuto(r)} busy={fetchingId === r.id}>Khôi phục</Btn>
                  </div>
                ),
              },
            ]}
            rows={autoBackups}
            rowKey="id"
            pageSize={10}
          />
        )}
      </div>

      <div className="rounded-lg p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
        <div className="text-[13.5px] font-semibold mb-3" style={{ color: COLORS.text }}>Dữ liệu hiện tại</div>
        <Table
          columns={[
            { key: "label", label: "Danh mục / module" },
            { key: "count", label: "Số bản ghi", align: "right" },
          ]}
          rows={counts}
          rowKey="key"
        />
      </div>

      {confirmRestore && (
        <Modal title="Xác nhận phục hồi dữ liệu" onClose={() => setConfirmRestore(null)}>
          <div className="flex items-start gap-2 mb-3 px-3 py-2 rounded-md text-[12.5px]" style={{ background: COLORS.redBg, color: COLORS.red }}>
            <AlertTriangle size={14} className="mt-0.5 shrink-0" />
            <span>Toàn bộ dữ liệu hiện tại sẽ bị <b>ghi đè</b> bằng dữ liệu trong file này. Hành động này không thể hoàn tác.</span>
          </div>
          <div className="text-[12.5px] mb-4" style={{ color: COLORS.textMuted }}>
            File sao lưu ngày: {confirmRestore.exported_at ? fmtDate(confirmRestore.exported_at.slice(0, 10)) : "không rõ"}
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t" style={{ borderColor: COLORS.border }}>
            <Btn variant="outline" onClick={() => setConfirmRestore(null)}>Hủy</Btn>
            <Btn variant="danger" onClick={doRestore}>Xác nhận phục hồi</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Nhật ký hoạt động                                                   */
/* ------------------------------------------------------------------ */
function AuditLogPage({ store }) {
  const { items } = store;
  const [query, setQuery] = useState("");

  const list = [...items]
    .sort((a, b) => (b.ts || "").localeCompare(a.ts || ""))
    .filter((e) => !query || [e.module, e.actor, e.description].some((s) => (s || "").toLowerCase().includes(query.toLowerCase())));

  function doExport() {
    exportExcel("nhat-ky-hoat-dong", [{
      name: "Nhật ký",
      rows: list.map((e) => ({
        "Thời gian": new Date(e.ts).toLocaleString("vi-VN"),
        "Người thực hiện": e.actor,
        "Hành động": ACTION_LABELS[e.action] || e.action,
        "Module": e.module,
        "Nội dung": e.description,
      })),
    }]);
  }

  const actionTone = { create: "green", update: "amber", delete: "red", restore: "muted" };

  return (
    <div>
      <PageHeader title="Nhật ký hoạt động" subtitle="Lịch sử tạo mới / cập nhật / xóa dữ liệu trong hệ thống — tối đa 2.000 hoạt động gần nhất" action={<ExcelButton onClick={doExport} />} />
      <Toolbar query={query} setQuery={setQuery} placeholder="Tìm theo module, người dùng, nội dung..." />
      {list.length === 0 ? (
        <EmptyState icon={History} title="Chưa có hoạt động nào" hint="Nhật ký sẽ tự động ghi lại mỗi khi có người tạo, sửa hoặc xóa dữ liệu." />
      ) : (
        <Table
          columns={[
            { key: "ts", label: "Thời gian", render: (r) => new Date(r.ts).toLocaleString("vi-VN") },
            { key: "actor", label: "Người thực hiện" },
            { key: "action", label: "Hành động", render: (r) => <Badge tone={actionTone[r.action] || "muted"}>{ACTION_LABELS[r.action] || r.action}</Badge> },
            { key: "module", label: "Module" },
            { key: "description", label: "Nội dung" },
          ]}
          rows={list.slice(0, 300)}
          rowKey="id"
        />
      )}
      {list.length > 300 && (
        <div className="mt-2 text-[12px] text-center" style={{ color: COLORS.textMuted }}>Chỉ hiển thị 300 hoạt động gần nhất trên màn hình — dùng "Xuất Excel" để xem toàn bộ.</div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Thông báo / nhắc nhở tự động                                        */
/* ------------------------------------------------------------------ */
const OVERDUE_DAYS = 30;

function computeNotifications(sales, products) {
  const notifs = [];
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - OVERDUE_DAYS);
  const cutoffStr = cutoff.toISOString().slice(0, 10);

  sales.forEach((inv) => {
    const unpaid = inv.tong_tien - (inv.da_thanh_toan || 0);
    if (unpaid > 0 && inv.ngay && inv.ngay < cutoffStr) {
      const days = Math.floor((Date.now() - new Date(inv.ngay).getTime()) / 86400000);
      notifs.push({ type: "debt", key: `debt-${inv.id}`, text: `Hóa đơn ${inv.ma} quá hạn ${days} ngày — còn nợ ${fmtVND(unpaid)}`, page: "debt" });
    }
  });

  products.forEach((p) => {
    if ((p.ton_kho || 0) <= (p.ton_toi_thieu || 0)) {
      notifs.push({ type: "stock", key: `stock-${p.id}`, text: `${p.ten} sắp hết hàng (còn ${p.ton_kho ?? 0} ${p.dvt})`, page: "stock" });
    }
  });

  return notifs;
}

function SavingIndicator() {
  const saving = useSavingIndicator();
  if (!saving) return null;
  return (
    <span className="flex items-center gap-1.5 text-[12.5px]" style={{ color: COLORS.textMuted }} aria-live="polite">
      <Loader2 size={13} className="animate-spin" />
      <span className="hidden sm:inline">Đang lưu...</span>
    </span>
  );
}

function NotificationsBell({ notifications, onNavigate }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="relative p-1.5 rounded hover:bg-slate-100">
        <Bell size={18} color={COLORS.textMuted} />
        {notifications.length > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-semibold text-white"
            style={{ background: COLORS.red }}
          >
            {notifications.length > 9 ? "9+" : notifications.length}
          </span>
        )}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-lg shadow-xl z-50" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
            <div className="px-3 py-2 text-[12.5px] font-semibold border-b" style={{ borderColor: COLORS.border, color: COLORS.text }}>
              Thông báo ({notifications.length})
            </div>
            {notifications.length === 0 ? (
              <div className="px-3 py-6 text-center text-[12.5px]" style={{ color: COLORS.textMuted }}>Không có thông báo nào.</div>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.key}
                  onClick={() => { onNavigate(n.page); setOpen(false); }}
                  className="w-full text-left px-3 py-2 text-[12.5px] border-b last:border-b-0 hover:bg-slate-50 flex items-start gap-2"
                  style={{ borderColor: COLORS.border, color: COLORS.text }}
                >
                  {n.type === "debt" ? <CircleDollarSign size={13} className="mt-0.5 shrink-0" color={COLORS.red} /> : <AlertTriangle size={13} className="mt-0.5 shrink-0" color={COLORS.amber} />}
                  <span>{n.text}</span>
                </button>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App shell                                                           */
/* ------------------------------------------------------------------ */
export default function App() {
  // Cho phép lối tắt PWA (?page=pos) mở thẳng vào trang tương ứng.
  const [page, setPage] = useState(() => {
    try {
      const p = new URLSearchParams(window.location.search).get("page");
      return p || "dashboard";
    } catch {
      return "dashboard";
    }
  });
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const productStore = useCollection(STORE_KEYS.products);
  const customerStore = useCollection(STORE_KEYS.customers);
  const supplierStore = useCollection(STORE_KEYS.suppliers);
  const salesStore = useCollection(STORE_KEYS.sales);
  const purchaseStore = useCollection(STORE_KEYS.purchases);
  const receiptStore = useCollection(STORE_KEYS.receipts);
  const paymentStore = useCollection(STORE_KEYS.payments);
  const voucherStore = useCollection(STORE_KEYS.vouchers);
  const saleReturnStore = useCollection(STORE_KEYS.salereturns);
  const purchaseReturnStore = useCollection(STORE_KEYS.purchasereturns);
  const usersStore = useCollection(STORE_KEYS.users);
  const priceListStore = useCollection(STORE_KEYS.pricelists);
  const salesOrderStore = useCollection(STORE_KEYS.salesorders);
  const purchaseOrderStore = useCollection(STORE_KEYS.purchaseorders);
  const lotStore = useCollection(STORE_KEYS.lots);
  const employeeStore = useCollection(STORE_KEYS.employees);
  const payrollStore = useCollection(STORE_KEYS.payroll);
  const channelStore = useCollection(STORE_KEYS.channels);
  const paymentMethodStore = useCollection(STORE_KEYS.paymentmethods);
  const warehouseStore = useCollection(STORE_KEYS.warehouses);
  const einvoiceStore = useCollection(STORE_KEYS.einvoiceconfig);
  const companyStore = useCollection(STORE_KEYS.company);
  const stocktakeStore = useCollection(STORE_KEYS.stocktakes);
  const auditLogStore = useCollection(STORE_KEYS.auditlog);
  const auditStoreRef = useRef(null);
  auditStoreRef.current = auditLogStore;
  useEffect(() => { registerAuditStore(auditStoreRef); }, []);

  const auth = useAuth(usersStore);

  // Nạp thông tin công ty vào biến dùng chung cho mọi mẫu in.
  const companyRow = companyStore.items[0];
  useEffect(() => { setCurrentCompany(companyRow); }, [companyRow]);

  const anyLoading =
    productStore.loading || customerStore.loading || supplierStore.loading ||
    salesStore.loading || purchaseStore.loading || receiptStore.loading ||
    paymentStore.loading || voucherStore.loading || saleReturnStore.loading ||
    purchaseReturnStore.loading || priceListStore.loading || salesOrderStore.loading ||
    employeeStore.loading || payrollStore.loading || channelStore.loading ||
    paymentMethodStore.loading || auditLogStore.loading || warehouseStore.loading || einvoiceStore.loading ||
    companyStore.loading || stocktakeStore.loading || purchaseOrderStore.loading || lotStore.loading;

  const allowedPages = auth.currentUser ? (ROLE_PAGES[auth.currentUser.role] || null) : [];

  // If the current page isn't allowed for this role, bounce back to the dashboard.
  useEffect(() => {
    if (auth.currentUser && allowedPages && !allowedPages.includes(page)) {
      setPage("dashboard");
    }
  }, [auth.currentUser?.id]);

  if (!auth.ready) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: COLORS.bg }}>
        <div className="text-[13px]" style={{ color: COLORS.textMuted }}>Đang tải...</div>
      </div>
    );
  }

  if (!auth.currentUser) {
    return <LoginScreen users={auth.users} onLogin={auth.login} bootstrapping={false} updateUser={usersStore.update} />;
  }

  const pageMap = {
    dashboard: (
      <Dashboard
        products={productStore.items}
        customers={customerStore.items}
        suppliers={supplierStore.items}
        sales={salesStore.items}
        purchases={purchaseStore.items}
        receipts={receiptStore.items}
        payments={paymentStore.items}
        salereturns={saleReturnStore.items}
      />
    ),
    products: <ProductsPage store={productStore} warehouses={warehouseStore.items} />,
    customers: <PartnerPage store={customerStore} kind="customer" priceLists={priceListStore.items} />,
    suppliers: <PartnerPage store={supplierStore} kind="supplier" />,
    pricelists: <PriceListsPage store={priceListStore} products={productStore.items} />,
    channels: <ChannelsPage store={channelStore} />,
    warehouses: <WarehousesPage store={warehouseStore} />,
    pos: (
      <POSPage
        products={productStore.items}
        customers={customerStore.items}
        priceLists={priceListStore.items}
        channels={channelStore.items}
        warehouses={warehouseStore.items}
        salesStore={salesStore}
        productStore={productStore}
        paymentMethods={paymentMethodStore.items}
        lotStore={lotStore}
      />
    ),
    salesorders: (
      <SalesOrdersPage
        store={salesOrderStore}
        salesStore={salesStore}
        productStore={productStore}
        partnerStore={customerStore}
        priceLists={priceListStore.items}
        channels={channelStore.items}
        warehouses={warehouseStore.items}
      />
    ),
    purchaseorders: (
      <PurchaseOrdersPage
        store={purchaseOrderStore}
        purchaseStore={purchaseStore}
        productStore={productStore}
        partnerStore={supplierStore}
        warehouses={warehouseStore.items}
        lotStore={lotStore}
      />
    ),
    sales: (
      <InvoicePage
        mode="sale"
        invStore={salesStore}
        partnerStore={customerStore}
        productStore={productStore}
        priceLists={priceListStore.items}
        channels={channelStore.items}
        warehouses={warehouseStore.items}
        soStore={salesOrderStore}
        einvoiceStore={einvoiceStore}
        receiptsData={receiptStore.items}
        salereturnsData={saleReturnStore.items}
        paymentMethods={paymentMethodStore.items}
        lotStore={lotStore}
      />
    ),
    salereturns: <ReturnPage mode="sale" retStore={saleReturnStore} invStore={salesStore} partnerStore={customerStore} productStore={productStore} warehouses={warehouseStore.items} />,
    purchases: <InvoicePage mode="purchase" invStore={purchaseStore} partnerStore={supplierStore} productStore={productStore} warehouses={warehouseStore.items} receiptsData={paymentStore.items} salereturnsData={purchaseReturnStore.items} paymentMethods={paymentMethodStore.items} lotStore={lotStore} />,
    purchasereturns: <ReturnPage mode="purchase" retStore={purchaseReturnStore} invStore={purchaseStore} partnerStore={supplierStore} productStore={productStore} warehouses={warehouseStore.items} />,
    stockin: <StockVoucherPage type="in" store={voucherStore} productStore={productStore} warehouses={warehouseStore.items} />,
    stockout: <StockVoucherPage type="out" store={voucherStore} productStore={productStore} warehouses={warehouseStore.items} />,
    stocktransfer: <StockTransferPage store={voucherStore} productStore={productStore} warehouses={warehouseStore.items} />,
    receipts: <CashVoucherPage type="thu" store={receiptStore} partnerStore={customerStore} paymentMethodStore={paymentMethodStore} />,
    payments: <CashVoucherPage type="chi" store={paymentStore} partnerStore={supplierStore} paymentMethodStore={paymentMethodStore} />,
    paymentmethods: <PaymentMethodsPage store={paymentMethodStore} />,
    soquy: <SoQuyPage receipts={receiptStore.items} payments={paymentStore.items} paymentMethods={paymentMethodStore.items} />,
    debt: (
      <DebtPage
        customers={customerStore.items}
        suppliers={supplierStore.items}
        sales={salesStore.items}
        purchases={purchaseStore.items}
        receipts={receiptStore.items}
        payments={paymentStore.items}
        salereturns={saleReturnStore.items}
        purchasereturns={purchaseReturnStore.items}
      />
    ),
    stock: <StockPage products={productStore.items} warehouses={warehouseStore.items} />,
    stocktake: <StockTakePage store={stocktakeStore} productStore={productStore} warehouses={warehouseStore.items} />,
    lots: <LotsPage lotStore={lotStore} products={productStore.items} warehouses={warehouseStore.items} />,
    nxt: <NXTPage products={productStore.items} sales={salesStore.items} purchases={purchaseStore.items} salereturns={saleReturnStore.items} purchasereturns={purchaseReturnStore.items} vouchers={voucherStore.items} warehouses={warehouseStore.items} />,
    reports: <ReportsPage sales={salesStore.items} purchases={purchaseStore.items} products={productStore.items} channels={channelStore.items} warehouses={warehouseStore.items} />,
    taxreport: <TaxReportPage sales={salesStore.items} purchases={purchaseStore.items} products={productStore.items} />,
    employees: <EmployeesPage store={employeeStore} />,
    payroll: <PayrollPage employees={employeeStore.items} store={payrollStore} />,
    users: <UsersPage store={usersStore} currentUser={auth.currentUser} />,
    backup: (
      <BackupPage
        stores={{
          products: productStore, customers: customerStore, suppliers: supplierStore,
          sales: salesStore, purchases: purchaseStore, receipts: receiptStore, payments: paymentStore,
          vouchers: voucherStore, salereturns: saleReturnStore, purchasereturns: purchaseReturnStore,
          pricelists: priceListStore, salesorders: salesOrderStore, purchaseorders: purchaseOrderStore, employees: employeeStore,
          payroll: payrollStore, channels: channelStore, paymentmethods: paymentMethodStore, users: usersStore,
          lots: lotStore,
        }}
      />
    ),
    auditlog: <AuditLogPage store={auditLogStore} />,
    einvoice: <EInvoiceSettingsPage store={einvoiceStore} />,
    company: <CompanySettingsPage store={companyStore} />,
  };

  const notifications = anyLoading ? [] : computeNotifications(salesStore.items, productStore.items);

  const currentLabel = NAV_GROUPS.flatMap((g) => g.items).find((i) => i.key === page)?.label || "";
  const activePage = allowedPages && !allowedPages.includes(page) ? "dashboard" : page;

  return (
    <div className="flex min-h-screen" style={{ background: COLORS.bg, fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>
      <Sidebar
        page={activePage}
        setPage={setPage}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        allowedPages={allowedPages}
        user={auth.currentUser}
        onLogout={auth.logout}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
      />
      <div className="flex-1 min-w-0">
        <div className="h-14 flex items-center px-3 sm:px-6 gap-2" style={{ background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}` }}>
          <button className="p-1.5 -ml-1 rounded hover:bg-slate-100 sm:hidden" onClick={() => setMobileNavOpen(true)}>
            <Menu size={19} color={COLORS.text} />
          </button>
          <span className="text-[13px] hidden sm:inline" style={{ color: COLORS.textMuted }}>banhang.ntcons</span>
          <ChevronRight size={13} color={COLORS.textMuted} className="hidden sm:inline" />
          <span className="text-[13.5px] font-medium truncate" style={{ color: COLORS.text }}>{currentLabel}</span>
          <div className="ml-auto flex items-center gap-3">
            <SyncQueueBanner />
            <SavingIndicator />
            <NotificationsBell notifications={notifications} onNavigate={setPage} />
          </div>
        </div>
        <div className="p-3 sm:p-6 max-w-[1200px]">
          {anyLoading ? (
            <div className="flex items-center justify-center py-24 text-[13px]" style={{ color: COLORS.textMuted }}>Đang tải dữ liệu...</div>
          ) : (
            pageMap[activePage]
          )}
        </div>
      </div>
      <ToastHost />
    </div>
  );
}
