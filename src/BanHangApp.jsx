import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  LayoutDashboard, Package, Users, Truck, ShoppingCart, ShoppingBag,
  ArrowDownToLine, ArrowUpFromLine, Wallet, HandCoins, Boxes, FileBarChart,
  Plus, Pencil, Trash2, X, Search, ChevronRight, AlertTriangle, Menu,
  TrendingUp, TrendingDown, CircleDollarSign, PackageSearch, Undo2,
  Printer, LogOut, UserCog, Lock, ShieldCheck, Eye, EyeOff,
  Tag, ClipboardList, Contact, Banknote, Landmark, FileSpreadsheet, Store, Percent, Check,
  CreditCard, BookOpen, ChevronDown
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from "recharts";
import * as XLSX from "xlsx";

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

/* Export one or more tables to a single .xlsx file, downloaded via the browser. */
function exportExcel(filename, sheets) {
  try {
    const wb = XLSX.utils.book_new();
    sheets.forEach(({ name, rows }) => {
      const ws = XLSX.utils.json_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, (name || "Sheet").slice(0, 31));
    });
    XLSX.writeFile(wb, filename.endsWith(".xlsx") ? filename : filename + ".xlsx");
  } catch (e) {
    console.error("export excel failed", e);
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
  employees: "ntcons:employees",
  payroll: "ntcons:payroll",
  channels: "ntcons:channels",
  paymentmethods: "ntcons:paymentmethods",
  counters: "ntcons:counters",
};

// Business data + accounts are stored as SHARED data so every teammate who
// opens this same app sees the same shop data and can log in with the same
// account list. See the in-app notice on the login screen for what this
// does and does not protect against.
const SHARED = true;

async function storageGet(key, shared = SHARED) {
  try {
    const res = await window.storage.get(key, shared);
    return res ? JSON.parse(res.value) : null;
  } catch (e) {
    return null;
  }
}
async function storageSet(key, value, shared = SHARED) {
  try {
    await window.storage.set(key, JSON.stringify(value), shared);
  } catch (e) {
    console.error("storage set failed", key, e);
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

  const persist = useCallback(
    (next) => {
      setItems(next);
      storageSet(storeKey, next);
    },
    [storeKey]
  );

  const add = useCallback(
    (row) => {
      setItems((cur) => {
        const next = [...(cur || []), row];
        storageSet(storeKey, next);
        return next;
      });
    },
    [storeKey]
  );

  const update = useCallback(
    (id, patch) => {
      setItems((cur) => {
        const next = (cur || []).map((r) => (r.id === id ? { ...r, ...patch } : r));
        storageSet(storeKey, next);
        return next;
      });
    },
    [storeKey]
  );

  const remove = useCallback(
    (id) => {
      setItems((cur) => {
        const next = (cur || []).filter((r) => r.id !== id);
        storageSet(storeKey, next);
        return next;
      });
    },
    [storeKey]
  );

  return { items: items || [], loading: items === null, add, update, remove, persist, setItems };
}

/* ------------------------------------------------------------------ */
/* Generic UI atoms                                                    */
/* ------------------------------------------------------------------ */
function Btn({ children, variant = "primary", size = "md", className = "", ...props }) {
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
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} style={style} {...props}>
      {children}
    </button>
  );
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
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4" style={{ background: "rgba(14,36,56,0.45)" }}>
      <div className={`w-full ${width} bg-white rounded-lg shadow-xl`} style={{ border: `1px solid ${COLORS.border}` }}>
        <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: COLORS.border }}>
          <h3 className="text-[15px] font-semibold" style={{ color: COLORS.text }}>{title}</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-100">
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
    ],
  },
  {
    label: "Giao dịch",
    items: [
      { key: "salesorders", label: "Đơn đặt hàng", icon: ClipboardList },
      { key: "sales", label: "Bán hàng", icon: ShoppingCart },
      { key: "salereturns", label: "Trả hàng bán", icon: Undo2 },
      { key: "purchases", label: "Mua hàng", icon: ShoppingBag },
      { key: "purchasereturns", label: "Trả hàng mua", icon: Undo2 },
      { key: "stockin", label: "Nhập kho", icon: ArrowDownToLine },
      { key: "stockout", label: "Xuất kho", icon: ArrowUpFromLine },
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
    items: [{ key: "users", label: "Người dùng", icon: UserCog }],
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
  sales: ["dashboard", "products", "customers", "salesorders", "sales", "salereturns", "stock", "pricelists", "channels"],
  accountant: ["dashboard", "customers", "suppliers", "receipts", "payments", "soquy", "debt", "reports", "taxreport", "employees", "payroll", "pricelists", "paymentmethods", "nxt"],
  warehouse: ["dashboard", "products", "stockin", "stockout", "stock", "nxt"],
};
function pagesForRole(role) {
  const allowed = ROLE_PAGES[role];
  if (!allowed) return NAV_GROUPS.flatMap((g) => g.items.map((i) => i.key));
  return allowed;
}

function Sidebar({ page, setPage, collapsed, setCollapsed, allowedPages, user, onLogout, mobileOpen, onCloseMobile }) {
  function goTo(key) {
    setPage(key);
    onCloseMobile?.();
  }
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

function Table({ columns, rows, onEdit, onDelete, onPrint, rowKey = "id" }) {
  const hasActions = !!(onEdit || onDelete || onPrint);
  return (
    <>
      {/* Desktop / tablet: full data table */}
      <div className="hidden sm:block rounded-lg overflow-x-auto" style={{ border: `1px solid ${COLORS.border}` }}>
        <table className="w-full text-[13px]">
          <thead>
            <tr style={{ background: COLORS.bg }}>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="px-3 py-2 font-semibold whitespace-nowrap"
                  style={{ color: COLORS.textMuted, textAlign: c.align || "left", borderBottom: `1px solid ${COLORS.border}` }}
                >
                  {c.label}
                </th>
              ))}
              {hasActions && <th className="px-3 py-2 w-24"></th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
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
                        <button onClick={() => onPrint(r)} className="p-1.5 rounded hover:bg-slate-100">
                          <Printer size={13.5} color={COLORS.textMuted} />
                        </button>
                      )}
                      {onEdit && (
                        <button onClick={() => onEdit(r)} className="p-1.5 rounded hover:bg-slate-100">
                          <Pencil size={13.5} color={COLORS.textMuted} />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(r)} className="p-1.5 rounded hover:bg-slate-100">
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
        {rows.map((r) => (
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
                  <button onClick={() => onPrint(r)} className="p-1.5 rounded hover:bg-slate-100">
                    <Printer size={15} color={COLORS.textMuted} />
                  </button>
                )}
                {onEdit && (
                  <button onClick={() => onEdit(r)} className="p-1.5 rounded hover:bg-slate-100">
                    <Pencil size={15} color={COLORS.textMuted} />
                  </button>
                )}
                {onDelete && (
                  <button onClick={() => onDelete(r)} className="p-1.5 rounded hover:bg-slate-100">
                    <Trash2 size={15} color={COLORS.red} />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Danh mục: Products / Customers / Suppliers (generic CRUD)           */
/* ------------------------------------------------------------------ */
function ProductsPage({ store }) {
  const { items, add, update, remove } = store;
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null); // null | {} | row
  const [toDelete, setToDelete] = useState(null);

  const filtered = items.filter(
    (p) => !query || p.ten?.toLowerCase().includes(query.toLowerCase()) || p.ma?.toLowerCase().includes(query.toLowerCase())
  );

  function save(form) {
    if (form.id) update(form.id, form);
    else add({ ...form, id: uid("SP") });
    setEditing(null);
  }

  return (
    <div>
      <PageHeader
        title="Hàng hóa"
        subtitle={`${items.length} mặt hàng`}
        action={<Btn onClick={() => setEditing({})}><Plus size={15} /> Thêm hàng hóa</Btn>}
      />
      <Toolbar query={query} setQuery={setQuery} placeholder="Tìm mã hoặc tên hàng hóa..." />
      {items.length === 0 ? (
        <EmptyState icon={Package} title="Chưa có hàng hóa" hint="Thêm mặt hàng đầu tiên để bắt đầu bán hàng." action={<Btn onClick={() => setEditing({})}><Plus size={15} /> Thêm hàng hóa</Btn>} />
      ) : (
        <Table
          columns={[
            { key: "ma", label: "Mã hàng" },
            { key: "ten", label: "Tên hàng" },
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
        />
      )}
      {editing && (
        <Modal title={editing.id ? "Sửa hàng hóa" : "Thêm hàng hóa"} onClose={() => setEditing(null)}>
          <ProductForm initial={editing} onCancel={() => setEditing(null)} onSave={save} />
        </Modal>
      )}
      {toDelete && (
        <ConfirmBar text={`Xóa hàng hóa "${toDelete.ten}"?`} onConfirm={() => { remove(toDelete.id); setToDelete(null); }} onCancel={() => setToDelete(null)} />
      )}
    </div>
  );
}

function ProductForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState({
    ma: initial.ma || "",
    ten: initial.ten || "",
    dvt: initial.dvt || "Cái",
    gia_von: initial.gia_von || 0,
    gia_ban: initial.gia_ban || 0,
    ton_kho: initial.ton_kho ?? 0,
    ton_toi_thieu: initial.ton_toi_thieu ?? 0,
    thue_suat_vat: initial.thue_suat_vat ?? 10,
    id: initial.id,
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(f); }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
        <Field label="Mã hàng" required><input required className={inputCls} style={inputStyle} value={f.ma} onChange={(e) => setF({ ...f, ma: e.target.value })} /></Field>
        <Field label="Đơn vị tính"><input className={inputCls} style={inputStyle} value={f.dvt} onChange={(e) => setF({ ...f, dvt: e.target.value })} /></Field>
      </div>
      <Field label="Tên hàng hóa" required><input required className={inputCls} style={inputStyle} value={f.ten} onChange={(e) => setF({ ...f, ten: e.target.value })} /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
        <Field label="Giá vốn"><input type="number" className={inputCls} style={inputStyle} value={f.gia_von} onChange={(e) => setF({ ...f, gia_von: +e.target.value })} /></Field>
        <Field label="Giá bán"><input type="number" className={inputCls} style={inputStyle} value={f.gia_ban} onChange={(e) => setF({ ...f, gia_ban: +e.target.value })} /></Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
        <Field label="Tồn kho hiện tại"><input type="number" className={inputCls} style={inputStyle} value={f.ton_kho} onChange={(e) => setF({ ...f, ton_kho: +e.target.value })} /></Field>
        <Field label="Tồn tối thiểu (cảnh báo)"><input type="number" className={inputCls} style={inputStyle} value={f.ton_toi_thieu} onChange={(e) => setF({ ...f, ton_toi_thieu: +e.target.value })} /></Field>
      </div>
      <Field label="Thuế suất GTGT (%)"><input type="number" min="0" max="100" className={inputCls} style={{ ...inputStyle, width: 120 }} value={f.thue_suat_vat} onChange={(e) => setF({ ...f, thue_suat_vat: +e.target.value })} /></Field>
      <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
        <Btn type="button" variant="outline" onClick={onCancel}>Hủy</Btn>
        <Btn type="submit">Lưu</Btn>
      </div>
    </form>
  );
}

function PartnerPage({ store, kind, priceLists }) {
  // kind: 'customer' | 'supplier'
  const { items, add, update, remove } = store;
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const label = kind === "customer" ? "khách hàng" : "nhà cung cấp";
  const prefix = kind === "customer" ? "KH" : "NCC";
  const priceListName = (id) => (priceLists || []).find((p) => p.id === id)?.ten;

  const filtered = items.filter((p) => !query || p.ten?.toLowerCase().includes(query.toLowerCase()) || p.dien_thoai?.includes(query));

  function save(form) {
    if (form.id) update(form.id, form);
    else add({ ...form, id: uid(prefix) });
    setEditing(null);
  }

  return (
    <div>
      <PageHeader
        title={kind === "customer" ? "Khách hàng" : "Nhà cung cấp"}
        subtitle={`${items.length} ${label}`}
        action={<Btn onClick={() => setEditing({})}><Plus size={15} /> Thêm {label}</Btn>}
      />
      <Toolbar query={query} setQuery={setQuery} placeholder={`Tìm tên hoặc SĐT ${label}...`} />
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
    </div>
  );
}

function PartnerForm({ initial, onSave, onCancel, kind, priceLists }) {
  const [f, setF] = useState({
    ten: initial.ten || "",
    dien_thoai: initial.dien_thoai || "",
    dia_chi: initial.dia_chi || "",
    no_dau: initial.no_dau || 0,
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
/* Invoices: Bán hàng / Mua hàng                                       */
/* ------------------------------------------------------------------ */
function InvoicePage({ mode, invStore, partnerStore, productStore, priceLists, channels, soStore }) {
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
        return { ...p, ton_kho: (p.ton_kho || 0) + delta * line.so_luong };
      });
      storageSet(STORE_KEYS.products, next);
      return next;
    });
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
        return { ...p, ton_kho: (p.ton_kho || 0) + delta * line.so_luong };
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
            { key: "so_luong", label: "Số mặt hàng", align: "right", render: (r) => r.items.length },
            { key: "tong_tien", label: "Thành tiền", align: "right", render: (r) => fmtVND(r.tong_tien) },
            {
              key: "trang_thai",
              label: "Trạng thái",
              render: (r) => (r.da_thanh_toan >= r.tong_tien ? <Badge tone="green">Đã thanh toán</Badge> : r.da_thanh_toan > 0 ? <Badge tone="amber">Thanh toán 1 phần</Badge> : <Badge tone="red">Chưa thanh toán</Badge>),
            },
          ]}
          rows={filtered}
          onEdit={setViewing}
          onDelete={setToDelete}
        />
      )}
      {creating && (
        <InvoiceForm mode={mode} partners={partners} products={products} priceLists={priceLists} channels={channels} onCancel={() => setCreating(false)} onSave={createInvoice} />
      )}
      {viewing && (
        <Modal title={`Chi tiết ${viewing.ma}`} onClose={() => setViewing(null)} width="max-w-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[13.5px]" style={{ color: COLORS.textMuted }}>
              {isSale ? "Khách hàng" : "Nhà cung cấp"}: <span style={{ color: COLORS.text }}>{partnerName(viewing.doi_tac_id)}</span> · Ngày: {fmtDate(viewing.ngay)}
              {viewing.kenh_id && <> · Kênh: <span style={{ color: COLORS.text }}>{channelName(viewing.kenh_id)}</span></>}
            </div>
            <PrintButton onClick={() => setPrinting(viewing)} />
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
          />
          <div className="flex flex-col items-end mt-3 gap-0.5">
            {viewing.chiet_khau_pct > 0 && (
              <>
                <div className="text-[13px]" style={{ color: COLORS.textMuted }}>Tạm tính: {fmtVND(viewing.tam_tinh ?? viewing.tong_tien)}</div>
                <div className="text-[13px]" style={{ color: COLORS.red }}>Chiết khấu ({viewing.chiet_khau_pct}%): -{fmtVND((viewing.tam_tinh ?? viewing.tong_tien) - viewing.tong_tien)}</div>
              </>
            )}
            <div className="text-[14px] font-semibold" style={{ color: COLORS.text }}>Tổng cộng: {fmtVND(viewing.tong_tien)}</div>
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
            items: printing.items,
            total: printing.tong_tien,
          }}
        />
      )}
    </div>
  );
}

function InvoiceForm({ mode, partners, products, priceLists, channels, onCancel, onSave, initialDoc }) {
  const isSale = mode === "sale";
  const [doiTacId, setDoiTacId] = useState(initialDoc?.doi_tac_id || partners[0]?.id || "");
  const [kenhId, setKenhId] = useState(initialDoc?.kenh_id || "");
  const [ngay, setNgay] = useState(todayStr());
  const [lines, setLines] = useState(initialDoc?.items?.length ? initialDoc.items.map((l) => ({ ...l })) : [{ hang_hoa_id: "", so_luong: 1, don_gia: 0 }]);
  const [daThanhToan, setDaThanhToan] = useState(0);

  const customer = isSale ? partners.find((p) => p.id === doiTacId) : null;
  const chietKhauPct = customer?.chiet_khau_pct || 0;
  const priceList = isSale && customer?.bang_gia_id ? (priceLists || []).find((pl) => pl.id === customer.bang_gia_id) : null;

  const subtotal = lines.reduce((s, l) => s + (Number(l.so_luong) || 0) * (Number(l.don_gia) || 0), 0);
  const discountAmount = isSale ? subtotal * (chietKhauPct / 100) : 0;
  const total = subtotal - discountAmount;

  function priceFor(productId) {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return 0;
    if (isSale && priceList?.gia?.[productId] != null) return priceList.gia[productId];
    return isSale ? prod.gia_ban : prod.gia_von;
  }

  function setLine(idx, patch) {
    setLines((cur) => {
      const next = [...cur];
      next[idx] = { ...next[idx], ...patch };
      if (patch.hang_hoa_id) {
        next[idx].don_gia = priceFor(patch.hang_hoa_id);
      }
      return next;
    });
  }
  function addLine() {
    setLines((cur) => [...cur, { hang_hoa_id: "", so_luong: 1, don_gia: 0 }]);
  }
  function removeLine(idx) {
    setLines((cur) => cur.filter((_, i) => i !== idx));
  }

  function submit(e) {
    e.preventDefault();
    const validLines = lines.filter((l) => l.hang_hoa_id && l.so_luong > 0);
    if (!doiTacId || validLines.length === 0) return;
    const withNames = validLines.map((l) => ({ ...l, ten: products.find((p) => p.id === l.hang_hoa_id)?.ten || "" }));
    onSave({
      ma: uid(isSale ? "HD" : "PN").toUpperCase(),
      ngay,
      doi_tac_id: doiTacId,
      kenh_id: isSale ? kenhId : undefined,
      items: withNames,
      tam_tinh: subtotal,
      chiet_khau_pct: isSale ? chietKhauPct : 0,
      tong_tien: total,
      da_thanh_toan: Number(daThanhToan) || 0,
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
        {isSale && channels?.length > 0 && (
          <Field label="Kênh bán hàng">
            <select className={inputCls} style={inputStyle} value={kenhId} onChange={(e) => setKenhId(e.target.value)}>
              <option value="">-- Không chọn --</option>
              {channels.map((c) => <option key={c.id} value={c.id}>{c.ten}</option>)}
            </select>
          </Field>
        )}

        <div className="mt-1 mb-2 text-[12.5px] font-medium" style={{ color: COLORS.textMuted }}>Chi tiết hàng hóa</div>
        <div className="rounded-md border overflow-x-auto" style={{ borderColor: COLORS.border }}>
          {lines.map((l, idx) => (
            <div key={idx} className="flex items-center gap-2 px-2.5 py-2 border-b last:border-b-0 min-w-[600px]" style={{ borderColor: COLORS.border }}>
              <select className={inputCls + " flex-1"} style={inputStyle} value={l.hang_hoa_id} onChange={(e) => setLine(idx, { hang_hoa_id: e.target.value })}>
                <option value="">-- Chọn hàng hóa --</option>
                {products.map((p) => <option key={p.id} value={p.id}>{p.ten} ({p.ton_kho ?? 0} {p.dvt})</option>)}
              </select>
              <input type="number" min="1" className={inputCls} style={{ ...inputStyle, width: 70 }} value={l.so_luong} onChange={(e) => setLine(idx, { so_luong: +e.target.value })} />
              <input type="number" min="0" className={inputCls} style={{ ...inputStyle, width: 120 }} value={l.don_gia} onChange={(e) => setLine(idx, { don_gia: +e.target.value })} />
              <div className="w-28 text-right text-[13px]" style={{ color: COLORS.text }}>{fmtVND((l.so_luong || 0) * (l.don_gia || 0))}</div>
              <button type="button" onClick={() => removeLine(idx)} className="p-1 rounded hover:bg-slate-100">
                <X size={14} color={COLORS.textMuted} />
              </button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addLine} className="mt-2 text-[12.5px] font-medium flex items-center gap-1" style={{ color: COLORS.navy }}>
          <Plus size={13} /> Thêm dòng hàng
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 mt-4">
          <Field label="Đã thanh toán ngay"><input type="number" min="0" className={inputCls} style={inputStyle} value={daThanhToan} onChange={(e) => setDaThanhToan(e.target.value)} /></Field>
          <div className="flex flex-col items-end justify-center pt-2">
            {isSale && discountAmount > 0 && (
              <>
                <span className="text-[12px]" style={{ color: COLORS.textMuted }}>Tạm tính: {fmtVND(subtotal)}</span>
                <span className="text-[12px]" style={{ color: COLORS.red }}>Chiết khấu: -{fmtVND(discountAmount)}</span>
              </>
            )}
            <span className="text-[12.5px]" style={{ color: COLORS.textMuted }}>Tổng cộng</span>
            <span className="text-[18px] font-semibold" style={{ color: COLORS.navy }}>{fmtVND(total)}</span>
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

function SalesOrdersPage({ store, salesStore, productStore, partnerStore, priceLists, channels }) {
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
        return { ...p, ton_kho: (p.ton_kho || 0) - line.so_luong };
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
  const [lines, setLines] = useState([{ hang_hoa_id: "", so_luong: 1, don_gia: 0 }]);

  const customer = partners.find((p) => p.id === doiTacId);
  const priceList = customer?.bang_gia_id ? (priceLists || []).find((pl) => pl.id === customer.bang_gia_id) : null;
  const total = lines.reduce((s, l) => s + (Number(l.so_luong) || 0) * (Number(l.don_gia) || 0), 0);

  function setLine(idx, patch) {
    setLines((cur) => {
      const next = [...cur];
      next[idx] = { ...next[idx], ...patch };
      if (patch.hang_hoa_id) {
        const prod = products.find((p) => p.id === patch.hang_hoa_id);
        next[idx].don_gia = priceList?.gia?.[patch.hang_hoa_id] ?? prod?.gia_ban ?? 0;
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
    const withNames = validLines.map((l) => ({ ...l, ten: products.find((p) => p.id === l.hang_hoa_id)?.ten || "" }));
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
          {lines.map((l, idx) => (
            <div key={idx} className="flex items-center gap-2 px-2.5 py-2 border-b last:border-b-0 min-w-[600px]" style={{ borderColor: COLORS.border }}>
              <select className={inputCls + " flex-1"} style={inputStyle} value={l.hang_hoa_id} onChange={(e) => setLine(idx, { hang_hoa_id: e.target.value })}>
                <option value="">-- Chọn hàng hóa --</option>
                {products.map((p) => <option key={p.id} value={p.id}>{p.ten}</option>)}
              </select>
              <input type="number" min="1" className={inputCls} style={{ ...inputStyle, width: 70 }} value={l.so_luong} onChange={(e) => setLine(idx, { so_luong: +e.target.value })} />
              <input type="number" min="0" className={inputCls} style={{ ...inputStyle, width: 120 }} value={l.don_gia} onChange={(e) => setLine(idx, { don_gia: +e.target.value })} />
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
          <Btn type="submit">Lưu đơn đặt hàng</Btn>
        </div>
      </form>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Stock vouchers: Nhập kho / Xuất kho (manual adjustments)             */
/* ------------------------------------------------------------------ */
function StockVoucherPage({ type, store, productStore }) {
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
        return { ...p, ton_kho: (p.ton_kho || 0) + delta * form.so_luong };
      });
      storageSet(STORE_KEYS.products, next);
      return next;
    });
    setCreating(false);
  }

  function del(v) {
    const delta = isIn ? -1 : 1;
    setProducts((cur) => {
      const next = cur.map((p) => (p.id === v.hang_hoa_id ? { ...p, ton_kho: (p.ton_kho || 0) + delta * v.so_luong } : p));
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
      {creating && <StockVoucherForm isIn={isIn} products={products} onCancel={() => setCreating(false)} onSave={create} />}
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

function StockVoucherForm({ isIn, products, onSave, onCancel }) {
  const [f, setF] = useState({ hang_hoa_id: "", so_luong: 1, ngay: todayStr(), ly_do: "" });
  function submit(e) {
    e.preventDefault();
    if (!f.hang_hoa_id) return;
    onSave({ ...f, ma: uid(isIn ? "PNK" : "PXK").toUpperCase(), ten_hang: products.find((p) => p.id === f.hang_hoa_id)?.ten });
  }
  return (
    <Modal title={isIn ? "Tạo phiếu nhập kho" : "Tạo phiếu xuất kho"} onClose={onCancel}>
      <form onSubmit={submit}>
        <Field label="Hàng hóa" required>
          <select required className={inputCls} style={inputStyle} value={f.hang_hoa_id} onChange={(e) => setF({ ...f, hang_hoa_id: e.target.value })}>
            <option value="">-- Chọn hàng hóa --</option>
            {products.map((p) => <option key={p.id} value={p.id}>{p.ten} (tồn: {p.ton_kho ?? 0})</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
          <Field label="Số lượng" required><input required type="number" min="1" className={inputCls} style={inputStyle} value={f.so_luong} onChange={(e) => setF({ ...f, so_luong: +e.target.value })} /></Field>
          <Field label="Ngày"><input type="date" className={inputCls} style={inputStyle} value={f.ngay} onChange={(e) => setF({ ...f, ngay: e.target.value })} /></Field>
        </div>
        <Field label="Lý do"><input className={inputCls} style={inputStyle} value={f.ly_do} onChange={(e) => setF({ ...f, ly_do: e.target.value })} placeholder={isIn ? "VD: nhập điều chỉnh, chuyển kho..." : "VD: hao hụt, hỏng, chuyển kho..."} /></Field>
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
    const banHang = sales.filter((s) => s.doi_tac_id === c.id).reduce((s, i) => s + i.tong_tien, 0);
    const daThuTrenHD = sales.filter((s) => s.doi_tac_id === c.id).reduce((s, i) => s + (i.da_thanh_toan || 0), 0);
    const thuThem = receipts.filter((r) => r.doi_tac_id === c.id).reduce((s, i) => s + i.so_tien, 0);
    const traHang = (salereturns || []).filter((r) => r.doi_tac_id === c.id).reduce((s, i) => s + i.tong_tien, 0);
    const noDau = c.no_dau || 0;
    const conNo = noDau + banHang - daThuTrenHD - thuThem - traHang;
    return { ...c, phatSinh: banHang, daThu: daThuTrenHD + thuThem, traHang, conNo };
  });

  const nccRows = suppliers.map((c) => {
    const muaHang = purchases.filter((s) => s.doi_tac_id === c.id).reduce((s, i) => s + i.tong_tien, 0);
    const daTraTrenHD = purchases.filter((s) => s.doi_tac_id === c.id).reduce((s, i) => s + (i.da_thanh_toan || 0), 0);
    const traThem = payments.filter((r) => r.doi_tac_id === c.id).reduce((s, i) => s + i.so_tien, 0);
    const traHang = (purchasereturns || []).filter((r) => r.doi_tac_id === c.id).reduce((s, i) => s + i.tong_tien, 0);
    const noDau = c.no_dau || 0;
    const conNo = noDau + muaHang - daTraTrenHD - traThem - traHang;
    return { ...c, phatSinh: muaHang, daTra: daTraTrenHD + traThem, traHang, conNo };
  });

  const totalPhaiThu = khRows.reduce((s, r) => s + Math.max(r.conNo, 0), 0);
  const totalPhaiTra = nccRows.reduce((s, r) => s + Math.max(r.conNo, 0), 0);

  function doExport() {
    exportExcel("cong-no", [
      { name: "Công nợ KH", rows: khRows.map((r) => ({ "Khách hàng": r.ten, "Phát sinh": r.phatSinh, "Đã thu": r.daThu, "Trả hàng": r.traHang, "Còn phải thu": r.conNo })) },
      { name: "Công nợ NCC", rows: nccRows.map((r) => ({ "Nhà cung cấp": r.ten, "Phát sinh": r.phatSinh, "Đã trả": r.daTra, "Trả hàng": r.traHang, "Còn phải trả": r.conNo })) },
    ]);
  }

  return (
    <div>
      <PageHeader title="Công nợ" subtitle="Theo dõi công nợ phải thu và phải trả" action={<ExcelButton onClick={doExport} />} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <StatCard icon={TrendingUp} label="Tổng phải thu (khách hàng)" value={fmtVND(totalPhaiThu)} tone="green" />
        <StatCard icon={TrendingDown} label="Tổng phải trả (nhà cung cấp)" value={fmtVND(totalPhaiTra)} tone="red" />
      </div>
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
              { key: "ten", label: "Khách hàng" },
              { key: "phatSinh", label: "Phát sinh bán hàng", align: "right", render: (r) => fmtVND(r.phatSinh) },
              { key: "daThu", label: "Đã thu", align: "right", render: (r) => fmtVND(r.daThu) },
              { key: "traHang", label: "Trả hàng", align: "right", render: (r) => fmtVND(r.traHang) },
              { key: "conNo", label: "Còn phải thu", align: "right", render: (r) => <span style={{ color: r.conNo > 0 ? COLORS.red : COLORS.green, fontWeight: 600 }}>{fmtVND(r.conNo)}</span> },
            ]}
            rows={khRows}
          />
        )
      ) : (
        nccRows.length === 0 ? <EmptyState icon={CircleDollarSign} title="Chưa có dữ liệu công nợ" hint="Thêm nhà cung cấp và đơn mua hàng để xem công nợ." /> : (
          <Table
            columns={[
              { key: "ten", label: "Nhà cung cấp" },
              { key: "phatSinh", label: "Phát sinh mua hàng", align: "right", render: (r) => fmtVND(r.phatSinh) },
              { key: "daTra", label: "Đã trả", align: "right", render: (r) => fmtVND(r.daTra) },
              { key: "traHang", label: "Trả hàng", align: "right", render: (r) => fmtVND(r.traHang) },
              { key: "conNo", label: "Còn phải trả", align: "right", render: (r) => <span style={{ color: r.conNo > 0 ? COLORS.red : COLORS.green, fontWeight: 600 }}>{fmtVND(r.conNo)}</span> },
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
function StockPage({ products }) {
  const [query, setQuery] = useState("");
  const filtered = products.filter((p) => !query || p.ten?.toLowerCase().includes(query.toLowerCase()));
  const totalValue = products.reduce((s, p) => s + (p.ton_kho || 0) * (p.gia_von || 0), 0);
  const lowStock = products.filter((p) => (p.ton_kho || 0) <= (p.ton_toi_thieu || 0));

  function doExport() {
    exportExcel("ton-kho", [{
      name: "Tồn kho",
      rows: products.map((p) => ({
        "Mã hàng": p.ma, "Tên hàng": p.ten, "ĐVT": p.dvt,
        "Tồn kho": p.ton_kho ?? 0, "Tồn tối thiểu": p.ton_toi_thieu ?? 0,
        "Giá vốn": p.gia_von || 0, "Giá trị tồn": (p.ton_kho || 0) * (p.gia_von || 0),
      })),
    }]);
  }

  return (
    <div>
      <PageHeader title="Tồn kho" subtitle="Số lượng và giá trị tồn kho hiện tại" action={<ExcelButton onClick={doExport} />} />
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
              <span style={{ color: r.ton_kho <= (r.ton_toi_thieu || 0) ? COLORS.red : COLORS.text, fontWeight: r.ton_kho <= (r.ton_toi_thieu || 0) ? 600 : 400 }}>{r.ton_kho ?? 0}</span>
            ) },
            { key: "ton_toi_thieu", label: "Tồn tối thiểu", align: "right" },
            { key: "gia_tri", label: "Giá trị tồn", align: "right", render: (r) => fmtVND((r.ton_kho || 0) * (r.gia_von || 0)) },
            { key: "trang_thai", label: "Trạng thái", render: (r) => (r.ton_kho <= (r.ton_toi_thieu || 0) ? <Badge tone="red">Sắp hết</Badge> : <Badge tone="green">Bình thường</Badge>) },
          ]}
          rows={filtered}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Nhập - Xuất - Tồn chi tiết                                          */
/* ------------------------------------------------------------------ */
function NXTPage({ products, sales, purchases, salereturns, purchasereturns, vouchers }) {
  const todayM = monthKey(todayStr());
  const [tuNgay, setTuNgay] = useState(`${todayM}-01`);
  const [denNgay, setDenNgay] = useState(todayStr());
  const [query, setQuery] = useState("");
  const [detailProduct, setDetailProduct] = useState(null);

  const movements = useMemo(() => {
    const list = [];
    sales.forEach((inv) => inv.items.forEach((it) => list.push({ productId: it.hang_hoa_id, ngay: inv.ngay, delta: -it.so_luong, doc: inv.ma, loai: "Bán hàng" })));
    purchases.forEach((inv) => inv.items.forEach((it) => list.push({ productId: it.hang_hoa_id, ngay: inv.ngay, delta: it.so_luong, doc: inv.ma, loai: "Mua hàng" })));
    (salereturns || []).forEach((r) => r.items.forEach((it) => list.push({ productId: it.hang_hoa_id, ngay: r.ngay, delta: it.so_luong, doc: r.ma, loai: "Trả hàng bán" })));
    (purchasereturns || []).forEach((r) => r.items.forEach((it) => list.push({ productId: it.hang_hoa_id, ngay: r.ngay, delta: -it.so_luong, doc: r.ma, loai: "Trả hàng mua" })));
    (vouchers || []).forEach((v) => list.push({ productId: v.hang_hoa_id, ngay: v.ngay, delta: v.loai === "in" ? v.so_luong : -v.so_luong, doc: v.ma, loai: v.loai === "in" ? "Nhập kho" : "Xuất kho" }));
    return list;
  }, [sales, purchases, salereturns, purchasereturns, vouchers]);

  const movesByProduct = useMemo(() => {
    const map = {};
    movements.forEach((m) => {
      (map[m.productId] = map[m.productId] || []).push(m);
    });
    Object.values(map).forEach((arr) => arr.sort((a, b) => (a.ngay || "").localeCompare(b.ngay || "")));
    return map;
  }, [movements]);

  const summary = useMemo(() => {
    return products
      .filter((p) => !query || p.ten?.toLowerCase().includes(query.toLowerCase()) || p.ma?.toLowerCase().includes(query.toLowerCase()))
      .map((p) => {
        const moves = movesByProduct[p.id] || [];
        const current = p.ton_kho || 0;
        const afterEnd = moves.filter((m) => (m.ngay || "") > denNgay).reduce((s, m) => s + m.delta, 0);
        const closing = current - afterEnd;
        const inPeriod = moves.filter((m) => (m.ngay || "") >= tuNgay && (m.ngay || "") <= denNgay);
        const opening = closing - inPeriod.reduce((s, m) => s + m.delta, 0);
        const nhap = inPeriod.filter((m) => m.delta > 0).reduce((s, m) => s + m.delta, 0);
        const xuat = inPeriod.filter((m) => m.delta < 0).reduce((s, m) => s - m.delta, 0);
        return { ...p, opening, nhap, xuat, closing };
      });
  }, [products, movesByProduct, tuNgay, denNgay, query]);

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

function Dashboard({ products, customers, suppliers, sales, purchases, receipts, payments, salereturns }) {
  const thisMonth = monthKey(todayStr());
  const revenueThisMonth = sales.filter((s) => monthKey(s.ngay) === thisMonth).reduce((s, i) => s + i.tong_tien, 0);
  const purchaseThisMonth = purchases.filter((s) => monthKey(s.ngay) === thisMonth).reduce((s, i) => s + i.tong_tien, 0);

  const totalPhaiThu = customers.reduce((sum, c) => {
    const banHang = sales.filter((s) => s.doi_tac_id === c.id).reduce((s, i) => s + i.tong_tien, 0);
    const daThu = sales.filter((s) => s.doi_tac_id === c.id).reduce((s, i) => s + (i.da_thanh_toan || 0), 0) + receipts.filter((r) => r.doi_tac_id === c.id).reduce((s, i) => s + i.so_tien, 0);
    const traHang = (salereturns || []).filter((r) => r.doi_tac_id === c.id).reduce((s, i) => s + i.tong_tien, 0);
    return sum + Math.max((c.no_dau || 0) + banHang - daThu - traHang, 0);
  }, 0);

  const lowStock = products.filter((p) => (p.ton_kho || 0) <= (p.ton_toi_thieu || 0));

  // last 7 days revenue trend
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    const doanhThu = sales.filter((s) => s.ngay === key).reduce((s, x) => s + x.tong_tien, 0);
    return { name: key.slice(5), doanhThu };
  });

  const recent = [...sales].sort((a, b) => (b.ngay || "").localeCompare(a.ngay || "")).slice(0, 5);

  return (
    <div>
      <PageHeader title="Bảng điều khiển" subtitle={`Tổng quan hoạt động kinh doanh · ${fmtDate(todayStr())}`} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <StatCard icon={TrendingUp} label="Doanh thu tháng này" value={fmtVND(revenueThisMonth)} tone="green" />
        <StatCard icon={ShoppingBag} label="Mua hàng tháng này" value={fmtVND(purchaseThisMonth)} tone="navy" />
        <StatCard icon={CircleDollarSign} label="Công nợ phải thu" value={fmtVND(totalPhaiThu)} tone="amber" />
        <StatCard icon={AlertTriangle} label="Hàng sắp hết tồn kho" value={lowStock.length} tone="red" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="col-span-2 rounded-lg p-4" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
          <div className="text-[13.5px] font-semibold mb-3" style={{ color: COLORS.text }}>Doanh thu 7 ngày gần nhất</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={days}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: COLORS.textMuted }} axisLine={{ stroke: COLORS.border }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: COLORS.textMuted }} axisLine={false} tickLine={false} width={40} tickFormatter={(v) => (v >= 1000000 ? (v / 1000000).toFixed(0) + "tr" : v)} />
              <Tooltip formatter={(v) => fmtVND(v)} contentStyle={{ fontSize: 12, borderRadius: 6, borderColor: COLORS.border }} />
              <Bar dataKey="doanhThu" name="Doanh thu" fill={COLORS.navy} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
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
          />
        )}
      </div>
    </div>
  );
}

function ReportsPage({ sales, purchases, products, channels }) {
  const monthly = useMemo(() => {
    const map = {};
    sales.forEach((s) => {
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
  }, [sales, products]);

  const topProducts = useMemo(() => {
    const map = {};
    sales.forEach((s) => s.items.forEach((it) => {
      map[it.hang_hoa_id] = map[it.hang_hoa_id] || { ten: it.ten, sl: 0, doanhThu: 0 };
      map[it.hang_hoa_id].sl += it.so_luong;
      map[it.hang_hoa_id].doanhThu += it.so_luong * it.don_gia;
    }));
    return Object.values(map).sort((a, b) => b.doanhThu - a.doanhThu).slice(0, 8);
  }, [sales]);

  const byChannel = useMemo(() => {
    if (!channels || channels.length === 0) return [];
    const map = {};
    sales.forEach((s) => {
      const key = s.kenh_id || "__none";
      map[key] = map[key] || { ten: channels.find((c) => c.id === s.kenh_id)?.ten || "Chưa gán kênh", doanhThu: 0, soDon: 0 };
      map[key].doanhThu += s.tong_tien;
      map[key].soDon += 1;
    });
    return Object.values(map).sort((a, b) => b.doanhThu - a.doanhThu);
  }, [sales, channels]);

  const totalRevenue = sales.reduce((s, i) => s + i.tong_tien, 0);
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
      <PageHeader title="Báo cáo" subtitle="Doanh thu, lợi nhuận và hàng bán chạy" action={<ExcelButton onClick={doExport} />} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <StatCard icon={TrendingUp} label="Tổng doanh thu" value={fmtVND(totalRevenue)} tone="green" />
        <StatCard icon={ShoppingBag} label="Tổng giá vốn" value={fmtVND(totalCost)} tone="navy" />
        <StatCard icon={CircleDollarSign} label="Lợi nhuận gộp" value={fmtVND(profit)} tone={profit >= 0 ? "green" : "red"} />
      </div>

      <div className="rounded-lg p-4 mb-3" style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
        <div className="text-[13.5px] font-semibold mb-3" style={{ color: COLORS.text }}>Doanh thu & giá vốn theo tháng</div>
        {monthly.length === 0 ? (
          <div className="text-[13px]" style={{ color: COLORS.textMuted }}>Chưa có dữ liệu bán hàng.</div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: COLORS.textMuted }} axisLine={{ stroke: COLORS.border }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: COLORS.textMuted }} axisLine={false} tickLine={false} width={45} tickFormatter={(v) => (v >= 1000000 ? (v / 1000000).toFixed(0) + "tr" : v)} />
              <Tooltip formatter={(v) => fmtVND(v)} contentStyle={{ fontSize: 12, borderRadius: 6, borderColor: COLORS.border }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="doanhThu" name="Doanh thu" stroke={COLORS.green} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="giaVon" name="Giá vốn" stroke={COLORS.red} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
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
function ReturnPage({ mode, retStore, invStore, partnerStore, productStore }) {
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
        return { ...p, ton_kho: (p.ton_kho || 0) + delta * line.so_luong };
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
        return { ...p, ton_kho: (p.ton_kho || 0) + delta * line.so_luong };
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
      {creating && <ReturnForm isSaleReturn={isSaleReturn} invoices={invoices} partners={partners} products={products} onCancel={() => setCreating(false)} onSave={create} />}
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

function ReturnForm({ isSaleReturn, invoices, partners, products, onSave, onCancel }) {
  const [doiTacId, setDoiTacId] = useState("");
  const [ngay, setNgay] = useState(todayStr());
  const [lyDo, setLyDo] = useState("");
  const [lines, setLines] = useState([{ hang_hoa_id: "", so_luong: 1, don_gia: 0 }]);
  const total = lines.reduce((s, l) => s + (Number(l.so_luong) || 0) * (Number(l.don_gia) || 0), 0);

  function setLine(idx, patch) {
    setLines((cur) => {
      const next = [...cur];
      next[idx] = { ...next[idx], ...patch };
      if (patch.hang_hoa_id) {
        const prod = products.find((p) => p.id === patch.hang_hoa_id);
        if (prod) next[idx].don_gia = isSaleReturn ? prod.gia_ban : prod.gia_von;
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
    const withNames = validLines.map((l) => ({ ...l, ten: products.find((p) => p.id === l.hang_hoa_id)?.ten || "" }));
    onSave({ ma: uid(isSaleReturn ? "THB" : "THM").toUpperCase(), ngay, doi_tac_id: doiTacId, items: withNames, tong_tien: total, ly_do: lyDo });
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
        <div className="mt-1 mb-2 text-[12.5px] font-medium" style={{ color: COLORS.textMuted }}>Chi tiết hàng trả</div>
        <div className="rounded-md border overflow-x-auto" style={{ borderColor: COLORS.border }}>
          {lines.map((l, idx) => (
            <div key={idx} className="flex items-center gap-2 px-2.5 py-2 border-b last:border-b-0 min-w-[600px]" style={{ borderColor: COLORS.border }}>
              <select className={inputCls + " flex-1"} style={inputStyle} value={l.hang_hoa_id} onChange={(e) => setLine(idx, { hang_hoa_id: e.target.value })}>
                <option value="">-- Chọn hàng hóa --</option>
                {products.map((p) => <option key={p.id} value={p.id}>{p.ten}</option>)}
              </select>
              <input type="number" min="1" className={inputCls} style={{ ...inputStyle, width: 70 }} value={l.so_luong} onChange={(e) => setLine(idx, { so_luong: +e.target.value })} />
              <input type="number" min="0" className={inputCls} style={{ ...inputStyle, width: 120 }} value={l.don_gia} onChange={(e) => setLine(idx, { don_gia: +e.target.value })} />
              <div className="w-28 text-right text-[13px]" style={{ color: COLORS.text }}>{fmtVND((l.so_luong || 0) * (l.don_gia || 0))}</div>
              <button type="button" onClick={() => removeLine(idx)} className="p-1 rounded hover:bg-slate-100"><X size={14} color={COLORS.textMuted} /></button>
            </div>
          ))}
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
function PrintDocument({ doc, onClose }) {
  useEffect(() => {
    const t = setTimeout(() => window.print(), 200);
    return () => clearTimeout(t);
  }, []);
  if (!doc) return null;
  const { title, ma, ngay, partnerLabel, partnerName, items, total, note } = doc;
  return (
    <div id="ntcons-print-root">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #ntcons-print-root, #ntcons-print-root * { visibility: visible; }
          #ntcons-print-root { position: absolute; top: 0; left: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>
      <div className="fixed inset-0 z-[100] bg-white overflow-y-auto p-10" style={{ color: "#1a1a1a" }}>
        <button onClick={onClose} className="no-print fixed top-4 right-4 px-3 py-1.5 rounded-md text-[13px] font-medium" style={{ background: COLORS.navy, color: "#fff" }}>
          Đóng
        </button>
        <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: "2px solid #1a1a1a" }}>
          <img src={LOGO_SRC} alt="NTCONS" className="w-14 h-14 object-contain" />
          <div>
            <div className="text-[16px] font-bold">NTCONS</div>
            <div className="text-[12px] text-gray-500">banhang.ntcons — Hệ thống quản lý bán hàng</div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-[18px] font-bold uppercase">{title}</div>
            <div className="text-[12px] text-gray-500">Số: {ma} · Ngày {fmtDate(ngay)}</div>
          </div>
        </div>
        <div className="mb-4 text-[13.5px]">{partnerLabel}: <span className="font-semibold">{partnerName}</span></div>
        <table className="w-full text-[13px] border-collapse mb-6">
          <thead>
            <tr>
              <th className="border px-2 py-1.5 text-left">Hàng hóa</th>
              <th className="border px-2 py-1.5 text-right">SL</th>
              <th className="border px-2 py-1.5 text-right">Đơn giá</th>
              <th className="border px-2 py-1.5 text-right">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i}>
                <td className="border px-2 py-1.5">{it.ten}</td>
                <td className="border px-2 py-1.5 text-right">{it.so_luong}</td>
                <td className="border px-2 py-1.5 text-right">{fmtVND(it.don_gia)}</td>
                <td className="border px-2 py-1.5 text-right">{fmtVND(it.so_luong * it.don_gia)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end text-[15px] font-bold mb-10">Tổng cộng: {fmtVND(total)}</div>
        {note && <div className="mb-10 text-[13px] text-gray-600">Ghi chú: {note}</div>}
        <div className="grid grid-cols-3 gap-6 text-center text-[12.5px] mt-16">
          <div><div className="font-semibold mb-12">Người lập phiếu</div><div className="text-gray-400">(Ký, ghi rõ họ tên)</div></div>
          <div><div className="font-semibold mb-12">Người giao/nhận hàng</div><div className="text-gray-400">(Ký, ghi rõ họ tên)</div></div>
          <div><div className="font-semibold mb-12">Thủ kho</div><div className="text-gray-400">(Ký, ghi rõ họ tên)</div></div>
        </div>
      </div>
    </div>
  );
}

function PrintButton({ onClick }) {
  return (
    <Btn size="sm" variant="outline" onClick={onClick}>
      <Printer size={13.5} /> In / Xuất PDF
    </Btn>
  );
}

/* ------------------------------------------------------------------ */
/* Đăng nhập & Quản lý người dùng                                      */
/* ------------------------------------------------------------------ */
const SESSION_KEY = "ntcons:session";
const DEFAULT_ADMIN = { id: "U_ADMIN", ten: "Quản trị viên", username: "admin", password: "admin123", role: "admin" };

function LoginScreen({ users, onLogin, bootstrapping }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const uname = username.trim();
    const pwd = password.trim();
    let u = (users || []).find((x) => x.username.toLowerCase() === uname.toLowerCase() && x.password === pwd);
    // Safety net: the default admin always works even if the shared user
    // list hasn't finished loading yet, so a first-time login never blocks.
    if (!u && uname.toLowerCase() === DEFAULT_ADMIN.username && pwd === DEFAULT_ADMIN.password) {
      u = DEFAULT_ADMIN;
    }
    if (!u) { setError("Sai tên đăng nhập hoặc mật khẩu."); return; }
    setError("");
    onLogin(u);
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
          <span>Đăng nhập tài khoản mặc định lần đầu: <b>admin / admin123</b>. Đây là lớp phân quyền cơ bản để tổ chức công việc nội bộ, không phải bảo mật cấp doanh nghiệp — hãy đổi mật khẩu và không dùng cho dữ liệu nhạy cảm cần bảo mật cao.</span>
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
  const [f, setF] = useState({
    ten: initial.ten || "",
    username: initial.username || "",
    password: initial.password || "",
    role: initial.role || "sales",
    id: initial.id,
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(f); }}>
      <Field label="Họ tên" required><input required className={inputCls} style={inputStyle} value={f.ten} onChange={(e) => setF({ ...f, ten: e.target.value })} /></Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
        <Field label="Tên đăng nhập" required><input required className={inputCls} style={inputStyle} value={f.username} onChange={(e) => setF({ ...f, username: e.target.value })} /></Field>
        <Field label="Mật khẩu" required><input required className={inputCls} style={inputStyle} value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} /></Field>
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
          if (u) setCurrentUser(u);
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
    storageSet(SESSION_KEY, { username: u.username }, false);
  }
  function logout() {
    setCurrentUser(null);
    storageSet(SESSION_KEY, null, false);
  }

  return { currentUser, login, logout, ready, users: effectiveUsers };
}

/* ------------------------------------------------------------------ */
/* App shell                                                           */
/* ------------------------------------------------------------------ */
export default function App() {
  const [page, setPage] = useState("dashboard");
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
  const employeeStore = useCollection(STORE_KEYS.employees);
  const payrollStore = useCollection(STORE_KEYS.payroll);
  const channelStore = useCollection(STORE_KEYS.channels);
  const paymentMethodStore = useCollection(STORE_KEYS.paymentmethods);

  const auth = useAuth(usersStore);

  const anyLoading =
    productStore.loading || customerStore.loading || supplierStore.loading ||
    salesStore.loading || purchaseStore.loading || receiptStore.loading ||
    paymentStore.loading || voucherStore.loading || saleReturnStore.loading ||
    purchaseReturnStore.loading || priceListStore.loading || salesOrderStore.loading ||
    employeeStore.loading || payrollStore.loading || channelStore.loading ||
    paymentMethodStore.loading;

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
    return <LoginScreen users={auth.users} onLogin={auth.login} bootstrapping={false} />;
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
    products: <ProductsPage store={productStore} />,
    customers: <PartnerPage store={customerStore} kind="customer" priceLists={priceListStore.items} />,
    suppliers: <PartnerPage store={supplierStore} kind="supplier" />,
    pricelists: <PriceListsPage store={priceListStore} products={productStore.items} />,
    channels: <ChannelsPage store={channelStore} />,
    salesorders: (
      <SalesOrdersPage
        store={salesOrderStore}
        salesStore={salesStore}
        productStore={productStore}
        partnerStore={customerStore}
        priceLists={priceListStore.items}
        channels={channelStore.items}
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
        soStore={salesOrderStore}
      />
    ),
    salereturns: <ReturnPage mode="sale" retStore={saleReturnStore} invStore={salesStore} partnerStore={customerStore} productStore={productStore} />,
    purchases: <InvoicePage mode="purchase" invStore={purchaseStore} partnerStore={supplierStore} productStore={productStore} />,
    purchasereturns: <ReturnPage mode="purchase" retStore={purchaseReturnStore} invStore={purchaseStore} partnerStore={supplierStore} productStore={productStore} />,
    stockin: <StockVoucherPage type="in" store={voucherStore} productStore={productStore} />,
    stockout: <StockVoucherPage type="out" store={voucherStore} productStore={productStore} />,
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
    stock: <StockPage products={productStore.items} />,
    nxt: <NXTPage products={productStore.items} sales={salesStore.items} purchases={purchaseStore.items} salereturns={saleReturnStore.items} purchasereturns={purchaseReturnStore.items} vouchers={voucherStore.items} />,
    reports: <ReportsPage sales={salesStore.items} purchases={purchaseStore.items} products={productStore.items} channels={channelStore.items} />,
    taxreport: <TaxReportPage sales={salesStore.items} purchases={purchaseStore.items} products={productStore.items} />,
    employees: <EmployeesPage store={employeeStore} />,
    payroll: <PayrollPage employees={employeeStore.items} store={payrollStore} />,
    users: <UsersPage store={usersStore} currentUser={auth.currentUser} />,
  };

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
        </div>
        <div className="p-3 sm:p-6 max-w-[1200px]">
          {anyLoading ? (
            <div className="flex items-center justify-center py-24 text-[13px]" style={{ color: COLORS.textMuted }}>Đang tải dữ liệu...</div>
          ) : (
            pageMap[activePage]
          )}
        </div>
      </div>
    </div>
  );
}
