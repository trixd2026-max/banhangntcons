import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  LayoutDashboard, Package, Users, Truck, ShoppingCart, ShoppingBag,
  ArrowDownToLine, ArrowUpFromLine, Wallet, HandCoins, Boxes, FileBarChart,
  Plus, Pencil, Trash2, X, Search, ChevronRight, AlertTriangle, Menu,
  TrendingUp, TrendingDown, CircleDollarSign, PackageSearch
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, Legend
} from "recharts";

/* ------------------------------------------------------------------ */
/* Tokens & helpers                                                    */
/* ------------------------------------------------------------------ */
const COLORS = {
  navyDark: "#0E2438",
  navy: "#14304D",
  navyLight: "#1D3F63",
  bg: "#EEF1F5",
  surface: "#FFFFFF",
  border: "#DCE1E8",
  text: "#1F2A37",
  textMuted: "#5B6675",
  green: "#1E8E5A",
  greenBg: "#E5F5EC",
  red: "#C0392B",
  redBg: "#FBEAE8",
  amber: "#B9770E",
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
  counters: "ntcons:counters",
};

async function storageGet(key) {
  try {
    const res = await window.storage.get(key, false);
    return res ? JSON.parse(res.value) : null;
  } catch (e) {
    return null;
  }
}
async function storageSet(key, value) {
  try {
    await window.storage.set(key, JSON.stringify(value), false);
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
    ],
  },
  {
    label: "Giao dịch",
    items: [
      { key: "sales", label: "Bán hàng", icon: ShoppingCart },
      { key: "purchases", label: "Mua hàng", icon: ShoppingBag },
      { key: "stockin", label: "Nhập kho", icon: ArrowDownToLine },
      { key: "stockout", label: "Xuất kho", icon: ArrowUpFromLine },
    ],
  },
  {
    label: "Sổ quỹ & Công nợ",
    items: [
      { key: "receipts", label: "Phiếu thu", icon: Wallet },
      { key: "payments", label: "Phiếu chi", icon: HandCoins },
      { key: "debt", label: "Công nợ", icon: CircleDollarSign },
    ],
  },
  {
    label: "Kho & Báo cáo",
    items: [
      { key: "stock", label: "Tồn kho", icon: Boxes },
      { key: "reports", label: "Báo cáo", icon: FileBarChart },
    ],
  },
];

function Sidebar({ page, setPage, collapsed, setCollapsed }) {
  return (
    <div
      className="h-screen sticky top-0 flex flex-col shrink-0 transition-all"
      style={{ width: collapsed ? 64 : 232, background: COLORS.navyDark }}
    >
      <div className="flex items-center gap-2 px-4 h-14 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="w-7 h-7 rounded flex items-center justify-center shrink-0 font-bold text-[13px]" style={{ background: COLORS.green, color: "#fff" }}>
          NT
        </div>
        {!collapsed && (
          <div className="leading-tight overflow-hidden">
            <div className="text-white text-[13.5px] font-semibold whitespace-nowrap">banhang.ntcons</div>
            <div className="text-[11px] whitespace-nowrap" style={{ color: "rgba(255,255,255,0.45)" }}>Quản lý bán hàng</div>
          </div>
        )}
        <button className="ml-auto p-1 rounded hover:bg-white/10" onClick={() => setCollapsed(!collapsed)}>
          <Menu size={16} color="rgba(255,255,255,0.7)" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {NAV_GROUPS.map((g) => (
          <div key={g.label} className="mb-1">
            {!collapsed && (
              <div className="px-4 pt-3 pb-1 text-[10.5px] font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.35)" }}>
                {g.label}
              </div>
            )}
            {g.items.map((it) => {
              const active = page === it.key;
              const Icon = it.icon;
              return (
                <button
                  key={it.key}
                  onClick={() => setPage(it.key)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-[13.5px] transition-colors"
                  style={{
                    background: active ? "rgba(255,255,255,0.08)" : "transparent",
                    color: active ? "#fff" : "rgba(255,255,255,0.65)",
                    borderLeft: active ? `2.5px solid ${COLORS.green}` : "2.5px solid transparent",
                  }}
                >
                  <Icon size={16} className="shrink-0" />
                  {!collapsed && <span className="whitespace-nowrap">{it.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page header + table shell                                           */
/* ------------------------------------------------------------------ */
function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-[18px] font-semibold" style={{ color: COLORS.text }}>{title}</h1>
        {subtitle && <p className="text-[13px] mt-0.5" style={{ color: COLORS.textMuted }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function Toolbar({ query, setQuery, placeholder, right }) {
  return (
    <div className="flex items-center justify-between mb-3 gap-3">
      <div className="relative w-72">
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

function Table({ columns, rows, onEdit, onDelete, rowKey = "id" }) {
  return (
    <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${COLORS.border}` }}>
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
            {(onEdit || onDelete) && <th className="px-3 py-2 w-20"></th>}
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
              {(onEdit || onDelete) && (
                <td className="px-3 py-2">
                  <div className="flex items-center gap-1 justify-end">
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
    id: initial.id,
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(f); }}>
      <div className="grid grid-cols-2 gap-x-3">
        <Field label="Mã hàng" required><input required className={inputCls} style={inputStyle} value={f.ma} onChange={(e) => setF({ ...f, ma: e.target.value })} /></Field>
        <Field label="Đơn vị tính"><input className={inputCls} style={inputStyle} value={f.dvt} onChange={(e) => setF({ ...f, dvt: e.target.value })} /></Field>
      </div>
      <Field label="Tên hàng hóa" required><input required className={inputCls} style={inputStyle} value={f.ten} onChange={(e) => setF({ ...f, ten: e.target.value })} /></Field>
      <div className="grid grid-cols-2 gap-x-3">
        <Field label="Giá vốn"><input type="number" className={inputCls} style={inputStyle} value={f.gia_von} onChange={(e) => setF({ ...f, gia_von: +e.target.value })} /></Field>
        <Field label="Giá bán"><input type="number" className={inputCls} style={inputStyle} value={f.gia_ban} onChange={(e) => setF({ ...f, gia_ban: +e.target.value })} /></Field>
      </div>
      <div className="grid grid-cols-2 gap-x-3">
        <Field label="Tồn kho hiện tại"><input type="number" className={inputCls} style={inputStyle} value={f.ton_kho} onChange={(e) => setF({ ...f, ton_kho: +e.target.value })} /></Field>
        <Field label="Tồn tối thiểu (cảnh báo)"><input type="number" className={inputCls} style={inputStyle} value={f.ton_toi_thieu} onChange={(e) => setF({ ...f, ton_toi_thieu: +e.target.value })} /></Field>
      </div>
      <div className="flex justify-end gap-2 mt-4 pt-3 border-t" style={{ borderColor: COLORS.border }}>
        <Btn type="button" variant="outline" onClick={onCancel}>Hủy</Btn>
        <Btn type="submit">Lưu</Btn>
      </div>
    </form>
  );
}

function PartnerPage({ store, kind }) {
  // kind: 'customer' | 'supplier'
  const { items, add, update, remove } = store;
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const label = kind === "customer" ? "khách hàng" : "nhà cung cấp";
  const prefix = kind === "customer" ? "KH" : "NCC";

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
            { key: "no_dau", label: "Nợ đầu kỳ", align: "right", render: (r) => fmtVND(r.no_dau) },
          ]}
          rows={filtered}
          onEdit={setEditing}
          onDelete={setToDelete}
        />
      )}
      {editing && (
        <Modal title={editing.id ? `Sửa ${label}` : `Thêm ${label}`} onClose={() => setEditing(null)}>
          <PartnerForm initial={editing} onCancel={() => setEditing(null)} onSave={save} />
        </Modal>
      )}
      {toDelete && (
        <ConfirmBar text={`Xóa "${toDelete.ten}"?`} onConfirm={() => { remove(toDelete.id); setToDelete(null); }} onCancel={() => setToDelete(null)} />
      )}
    </div>
  );
}

function PartnerForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState({
    ten: initial.ten || "",
    dien_thoai: initial.dien_thoai || "",
    dia_chi: initial.dia_chi || "",
    no_dau: initial.no_dau || 0,
    id: initial.id,
  });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(f); }}>
      <Field label="Tên" required><input required className={inputCls} style={inputStyle} value={f.ten} onChange={(e) => setF({ ...f, ten: e.target.value })} /></Field>
      <div className="grid grid-cols-2 gap-x-3">
        <Field label="Điện thoại"><input className={inputCls} style={inputStyle} value={f.dien_thoai} onChange={(e) => setF({ ...f, dien_thoai: e.target.value })} /></Field>
        <Field label="Nợ đầu kỳ"><input type="number" className={inputCls} style={inputStyle} value={f.no_dau} onChange={(e) => setF({ ...f, no_dau: +e.target.value })} /></Field>
      </div>
      <Field label="Địa chỉ"><input className={inputCls} style={inputStyle} value={f.dia_chi} onChange={(e) => setF({ ...f, dia_chi: e.target.value })} /></Field>
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
function InvoicePage({ mode, invStore, partnerStore, productStore }) {
  // mode: 'sale' | 'purchase'
  const isSale = mode === "sale";
  const { items: invoices, add: addInv, remove: removeInv } = invStore;
  const { items: partners } = partnerStore;
  const { items: products, setItems: setProducts } = productStore;
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const partnerName = (id) => partners.find((p) => p.id === id)?.ten || "—";

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
        <InvoiceForm mode={mode} partners={partners} products={products} onCancel={() => setCreating(false)} onSave={createInvoice} />
      )}
      {viewing && (
        <Modal title={`Chi tiết ${viewing.ma}`} onClose={() => setViewing(null)} width="max-w-2xl">
          <div className="text-[13.5px] mb-3" style={{ color: COLORS.textMuted }}>
            {isSale ? "Khách hàng" : "Nhà cung cấp"}: <span style={{ color: COLORS.text }}>{partnerName(viewing.doi_tac_id)}</span> · Ngày: {fmtDate(viewing.ngay)}
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
          <div className="flex justify-end mt-3 text-[14px] font-semibold" style={{ color: COLORS.text }}>
            Tổng cộng: {fmtVND(viewing.tong_tien)}
          </div>
        </Modal>
      )}
      {toDelete && (
        <ConfirmBar text={`Xóa chứng từ "${toDelete.ma}"? Tồn kho sẽ được hoàn lại.`} onConfirm={() => deleteInvoice(toDelete)} onCancel={() => setToDelete(null)} />
      )}
    </div>
  );
}

function InvoiceForm({ mode, partners, products, onSave, onCancel }) {
  const isSale = mode === "sale";
  const [doiTacId, setDoiTacId] = useState(partners[0]?.id || "");
  const [ngay, setNgay] = useState(todayStr());
  const [lines, setLines] = useState([{ hang_hoa_id: "", so_luong: 1, don_gia: 0 }]);
  const [daThanhToan, setDaThanhToan] = useState(0);

  const total = lines.reduce((s, l) => s + (Number(l.so_luong) || 0) * (Number(l.don_gia) || 0), 0);

  function setLine(idx, patch) {
    setLines((cur) => {
      const next = [...cur];
      next[idx] = { ...next[idx], ...patch };
      if (patch.hang_hoa_id) {
        const prod = products.find((p) => p.id === patch.hang_hoa_id);
        if (prod) next[idx].don_gia = isSale ? prod.gia_ban : prod.gia_von;
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
      items: withNames,
      tong_tien: total,
      da_thanh_toan: Number(daThanhToan) || 0,
    });
  }

  return (
    <Modal title={isSale ? "Tạo đơn bán hàng" : "Tạo đơn mua hàng"} onClose={onCancel} width="max-w-3xl">
      <form onSubmit={submit}>
        <div className="grid grid-cols-2 gap-x-3">
          <Field label={isSale ? "Khách hàng" : "Nhà cung cấp"} required>
            <select required className={inputCls} style={inputStyle} value={doiTacId} onChange={(e) => setDoiTacId(e.target.value)}>
              <option value="">-- Chọn --</option>
              {partners.map((p) => <option key={p.id} value={p.id}>{p.ten}</option>)}
            </select>
          </Field>
          <Field label="Ngày chứng từ"><input type="date" className={inputCls} style={inputStyle} value={ngay} onChange={(e) => setNgay(e.target.value)} /></Field>
        </div>

        <div className="mt-1 mb-2 text-[12.5px] font-medium" style={{ color: COLORS.textMuted }}>Chi tiết hàng hóa</div>
        <div className="rounded-md border" style={{ borderColor: COLORS.border }}>
          {lines.map((l, idx) => (
            <div key={idx} className="flex items-center gap-2 px-2.5 py-2 border-b last:border-b-0" style={{ borderColor: COLORS.border }}>
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

        <div className="grid grid-cols-2 gap-x-3 mt-4">
          <Field label="Đã thanh toán ngay"><input type="number" min="0" className={inputCls} style={inputStyle} value={daThanhToan} onChange={(e) => setDaThanhToan(e.target.value)} /></Field>
          <div className="flex flex-col items-end justify-center pt-4">
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
/* Stock vouchers: Nhập kho / Xuất kho (manual adjustments)             */
/* ------------------------------------------------------------------ */
function StockVoucherPage({ type, store, productStore }) {
  // type: 'in' | 'out'
  const isIn = type === "in";
  const { items, add, remove } = store;
  const { items: products, setItems: setProducts } = productStore;
  const [creating, setCreating] = useState(false);
  const [toDelete, setToDelete] = useState(null);
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
          onDelete={setToDelete}
        />
      )}
      {creating && <StockVoucherForm isIn={isIn} products={products} onCancel={() => setCreating(false)} onSave={create} />}
      {toDelete && <ConfirmBar text={`Xóa phiếu "${toDelete.ma}"? Tồn kho sẽ được hoàn lại.`} onConfirm={() => del(toDelete)} onCancel={() => setToDelete(null)} />}
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
        <div className="grid grid-cols-2 gap-x-3">
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
function CashVoucherPage({ type, store, partnerStore }) {
  const isThu = type === "thu";
  const { items, add, remove } = store;
  const { items: partners } = partnerStore;
  const [creating, setCreating] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const partnerName = (id) => partners.find((p) => p.id === id)?.ten || "Khác";
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
            { key: "so_tien", label: "Số tiền", align: "right", render: (r) => <span style={{ color: isThu ? COLORS.green : COLORS.red, fontWeight: 600 }}>{fmtVND(r.so_tien)}</span> },
            { key: "ghi_chu", label: "Ghi chú" },
          ]}
          rows={list}
          onDelete={setToDelete}
        />
      )}
      {creating && <CashVoucherForm isThu={isThu} partners={partners} onCancel={() => setCreating(false)} onSave={create} />}
      {toDelete && <ConfirmBar text={`Xóa phiếu "${toDelete.ma}"?`} onConfirm={() => { remove(toDelete.id); setToDelete(null); }} onCancel={() => setToDelete(null)} />}
    </div>
  );
}

function CashVoucherForm({ isThu, partners, onSave, onCancel }) {
  const [f, setF] = useState({ doi_tac_id: "", so_tien: 0, ngay: todayStr(), ghi_chu: "" });
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
        <div className="grid grid-cols-2 gap-x-3">
          <Field label="Số tiền" required><input required type="number" min="0" className={inputCls} style={inputStyle} value={f.so_tien} onChange={(e) => setF({ ...f, so_tien: +e.target.value })} /></Field>
          <Field label="Ngày"><input type="date" className={inputCls} style={inputStyle} value={f.ngay} onChange={(e) => setF({ ...f, ngay: e.target.value })} /></Field>
        </div>
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
/* Công nợ                                                             */
/* ------------------------------------------------------------------ */
function DebtPage({ customers, suppliers, sales, purchases, receipts, payments }) {
  const [tab, setTab] = useState("kh");

  const khRows = customers.map((c) => {
    const banHang = sales.filter((s) => s.doi_tac_id === c.id).reduce((s, i) => s + i.tong_tien, 0);
    const daThuTrenHD = sales.filter((s) => s.doi_tac_id === c.id).reduce((s, i) => s + (i.da_thanh_toan || 0), 0);
    const thuThem = receipts.filter((r) => r.doi_tac_id === c.id).reduce((s, i) => s + i.so_tien, 0);
    const noDau = c.no_dau || 0;
    const conNo = noDau + banHang - daThuTrenHD - thuThem;
    return { ...c, phatSinh: banHang, daThu: daThuTrenHD + thuThem, conNo };
  });

  const nccRows = suppliers.map((c) => {
    const muaHang = purchases.filter((s) => s.doi_tac_id === c.id).reduce((s, i) => s + i.tong_tien, 0);
    const daTraTrenHD = purchases.filter((s) => s.doi_tac_id === c.id).reduce((s, i) => s + (i.da_thanh_toan || 0), 0);
    const traThem = payments.filter((r) => r.doi_tac_id === c.id).reduce((s, i) => s + i.so_tien, 0);
    const noDau = c.no_dau || 0;
    const conNo = noDau + muaHang - daTraTrenHD - traThem;
    return { ...c, phatSinh: muaHang, daTra: daTraTrenHD + traThem, conNo };
  });

  const totalPhaiThu = khRows.reduce((s, r) => s + Math.max(r.conNo, 0), 0);
  const totalPhaiTra = nccRows.reduce((s, r) => s + Math.max(r.conNo, 0), 0);

  return (
    <div>
      <PageHeader title="Công nợ" subtitle="Theo dõi công nợ phải thu và phải trả" />
      <div className="grid grid-cols-2 gap-3 mb-4">
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

  return (
    <div>
      <PageHeader title="Tồn kho" subtitle="Số lượng và giá trị tồn kho hiện tại" />
      <div className="grid grid-cols-3 gap-3 mb-4">
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

function Dashboard({ products, customers, suppliers, sales, purchases, receipts, payments }) {
  const thisMonth = monthKey(todayStr());
  const revenueThisMonth = sales.filter((s) => monthKey(s.ngay) === thisMonth).reduce((s, i) => s + i.tong_tien, 0);
  const purchaseThisMonth = purchases.filter((s) => monthKey(s.ngay) === thisMonth).reduce((s, i) => s + i.tong_tien, 0);

  const totalPhaiThu = customers.reduce((sum, c) => {
    const banHang = sales.filter((s) => s.doi_tac_id === c.id).reduce((s, i) => s + i.tong_tien, 0);
    const daThu = sales.filter((s) => s.doi_tac_id === c.id).reduce((s, i) => s + (i.da_thanh_toan || 0), 0) + receipts.filter((r) => r.doi_tac_id === c.id).reduce((s, i) => s + i.so_tien, 0);
    return sum + Math.max((c.no_dau || 0) + banHang - daThu, 0);
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
      <div className="grid grid-cols-4 gap-3 mb-4">
        <StatCard icon={TrendingUp} label="Doanh thu tháng này" value={fmtVND(revenueThisMonth)} tone="green" />
        <StatCard icon={ShoppingBag} label="Mua hàng tháng này" value={fmtVND(purchaseThisMonth)} tone="navy" />
        <StatCard icon={CircleDollarSign} label="Công nợ phải thu" value={fmtVND(totalPhaiThu)} tone="amber" />
        <StatCard icon={AlertTriangle} label="Hàng sắp hết tồn kho" value={lowStock.length} tone="red" />
      </div>

      <div className="grid grid-cols-3 gap-3">
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

function ReportsPage({ sales, purchases, products }) {
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

  const totalRevenue = sales.reduce((s, i) => s + i.tong_tien, 0);
  const totalCost = monthly.reduce((s, m) => s + m.giaVon, 0);
  const profit = totalRevenue - totalCost;

  return (
    <div>
      <PageHeader title="Báo cáo" subtitle="Doanh thu, lợi nhuận và hàng bán chạy" />
      <div className="grid grid-cols-3 gap-3 mb-4">
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
/* App shell                                                           */
/* ------------------------------------------------------------------ */
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const productStore = useCollection(STORE_KEYS.products);
  const customerStore = useCollection(STORE_KEYS.customers);
  const supplierStore = useCollection(STORE_KEYS.suppliers);
  const salesStore = useCollection(STORE_KEYS.sales);
  const purchaseStore = useCollection(STORE_KEYS.purchases);
  const receiptStore = useCollection(STORE_KEYS.receipts);
  const paymentStore = useCollection(STORE_KEYS.payments);
  const voucherStore = useCollection(STORE_KEYS.vouchers);

  const anyLoading =
    productStore.loading || customerStore.loading || supplierStore.loading ||
    salesStore.loading || purchaseStore.loading || receiptStore.loading ||
    paymentStore.loading || voucherStore.loading;

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
      />
    ),
    products: <ProductsPage store={productStore} />,
    customers: <PartnerPage store={customerStore} kind="customer" />,
    suppliers: <PartnerPage store={supplierStore} kind="supplier" />,
    sales: <InvoicePage mode="sale" invStore={salesStore} partnerStore={customerStore} productStore={productStore} />,
    purchases: <InvoicePage mode="purchase" invStore={purchaseStore} partnerStore={supplierStore} productStore={productStore} />,
    stockin: <StockVoucherPage type="in" store={voucherStore} productStore={productStore} />,
    stockout: <StockVoucherPage type="out" store={voucherStore} productStore={productStore} />,
    receipts: <CashVoucherPage type="thu" store={receiptStore} partnerStore={customerStore} />,
    payments: <CashVoucherPage type="chi" store={paymentStore} partnerStore={supplierStore} />,
    debt: (
      <DebtPage
        customers={customerStore.items}
        suppliers={supplierStore.items}
        sales={salesStore.items}
        purchases={purchaseStore.items}
        receipts={receiptStore.items}
        payments={paymentStore.items}
      />
    ),
    stock: <StockPage products={productStore.items} />,
    reports: <ReportsPage sales={salesStore.items} purchases={purchaseStore.items} products={productStore.items} />,
  };

  const currentLabel = NAV_GROUPS.flatMap((g) => g.items).find((i) => i.key === page)?.label || "";

  return (
    <div className="flex min-h-screen" style={{ background: COLORS.bg, fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>
      <Sidebar page={page} setPage={setPage} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 min-w-0">
        <div className="h-14 flex items-center px-6 gap-2" style={{ background: COLORS.surface, borderBottom: `1px solid ${COLORS.border}` }}>
          <span className="text-[13px]" style={{ color: COLORS.textMuted }}>banhang.ntcons</span>
          <ChevronRight size={13} color={COLORS.textMuted} />
          <span className="text-[13px] font-medium" style={{ color: COLORS.text }}>{currentLabel}</span>
        </div>
        <div className="p-6 max-w-[1200px]">
          {anyLoading ? (
            <div className="flex items-center justify-center py-24 text-[13px]" style={{ color: COLORS.textMuted }}>Đang tải dữ liệu...</div>
          ) : (
            pageMap[page]
          )}
        </div>
      </div>
    </div>
  );
}
