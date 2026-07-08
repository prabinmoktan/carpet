// import React from 'react'

// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page
'use client'

import React, { useState, useMemo } from "react";
import {
  LayoutDashboard, ShoppingCart, Package, Users, BarChart3,
  Search, Bell, TrendingUp, TrendingDown, AlertTriangle,
  ArrowUpRight, ChevronDown, MoreHorizontal, Circle
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend, LineChart, Line
} from "recharts";
import { SidebarItem } from "@/app/constant";


/* ---------------------------------------------------------
   DATA — a hand-knotted wool carpet house based in Kathmandu
--------------------------------------------------------- */

const revenueTrend = [
  { month: "Jan", revenue: 1120000, orders: 64 },
  { month: "Feb", revenue: 980000, orders: 55 },
  { month: "Mar", revenue: 1340000, orders: 71 },
  { month: "Apr", revenue: 1260000, orders: 68 },
  { month: "May", revenue: 1510000, orders: 79 },
  { month: "Jun", revenue: 1430000, orders: 74 },
  { month: "Jul", revenue: 1690000, orders: 88 },
  { month: "Aug", revenue: 1580000, orders: 82 },
  { month: "Sep", revenue: 1820000, orders: 94 },
  { month: "Oct", revenue: 1990000, orders: 101 },
  { month: "Nov", revenue: 2150000, orders: 112 },
  { month: "Dec", revenue: 2380000, orders: 124 },
];

const topProducts = [
  { name: "Everest Diamond Weave", sold: 142, revenue: 2130000 },
  { name: "Kathmandu Valley Medallion", sold: 118, revenue: 1770000 },
  { name: "Tibetan Wool Runner", sold: 96, revenue: 960000 },
  { name: "Pashmina Silk Blend", sold: 84, revenue: 1680000 },
  { name: "Thimi Traditional Knot", sold: 61, revenue: 732000 },
];

const categoryMix = [
  { name: "Hand-Knotted Wool", value: 42 },
  { name: "Silk Blend", value: 21 },
  { name: "Tufted", value: 18 },
  { name: "Runners", value: 12 },
  { name: "Custom Orders", value: 7 },
];

const CATEGORY_COLORS = ["#8C4A2F", "#C99A3D", "#6B7F5B", "#B5542E", "#9C8563"];

const orders = [
  { id: "ORD-3041", customer: "Anjali Rai", product: "Everest Diamond Weave", amount: 15000, status: "Delivered", date: "Jul 05, 2026" },
  { id: "ORD-3040", customer: "Marcus Webb", product: "Pashmina Silk Blend", amount: 22500, status: "Shipped", date: "Jul 05, 2026" },
  { id: "ORD-3039", customer: "Sita Gurung", product: "Tibetan Wool Runner", amount: 8000, status: "Processing", date: "Jul 04, 2026" },
  { id: "ORD-3038", customer: "Helena Voss", product: "Kathmandu Valley Medallion", amount: 18500, status: "Delivered", date: "Jul 04, 2026" },
  { id: "ORD-3037", customer: "Ram Bahadur Thapa", product: "Thimi Traditional Knot", amount: 12000, status: "Cancelled", date: "Jul 03, 2026" },
  { id: "ORD-3036", customer: "Yuki Tanaka", product: "Everest Diamond Weave", amount: 15000, status: "Shipped", date: "Jul 03, 2026" },
  { id: "ORD-3035", customer: "Priya Shrestha", product: "Pashmina Silk Blend", amount: 22500, status: "Processing", date: "Jul 02, 2026" },
  { id: "ORD-3034", customer: "David Klein", product: "Tibetan Wool Runner", amount: 8000, status: "Delivered", date: "Jul 01, 2026" },
];

const inventory = [
  { name: "Everest Diamond Weave", category: "Hand-Knotted", stock: 34, reorder: 15 },
  { name: "Kathmandu Valley Medallion", category: "Hand-Knotted", stock: 9, reorder: 15 },
  { name: "Tibetan Wool Runner", category: "Runner", stock: 52, reorder: 20 },
  { name: "Pashmina Silk Blend", category: "Silk Blend", stock: 6, reorder: 10 },
  { name: "Thimi Traditional Knot", category: "Hand-Knotted", stock: 21, reorder: 15 },
  { name: "Lotus Trellis Tufted", category: "Tufted", stock: 3, reorder: 12 },
  { name: "Dhaka Weave Hallway Runner", category: "Runner", stock: 40, reorder: 15 },
];

const customers = [
  { name: "Anjali Rai", location: "Kathmandu, NP", orders: 12, spent: 186000, tier: "VIP" },
  { name: "Marcus Webb", location: "Austin, US", orders: 4, spent: 84500, tier: "Returning" },
  { name: "Sita Gurung", location: "Pokhara, NP", orders: 7, spent: 61200, tier: "Returning" },
  { name: "Helena Voss", location: "Munich, DE", orders: 2, spent: 37000, tier: "New" },
  { name: "Yuki Tanaka", location: "Osaka, JP", orders: 9, spent: 142800, tier: "VIP" },
  { name: "Priya Shrestha", location: "Lalitpur, NP", orders: 3, spent: 45200, tier: "New" },
];

/* ---------------------------------------------------------
   HELPERS
--------------------------------------------------------- */

const fmtNPR = (n) => `Rs ${n.toLocaleString("en-IN")}`;

const statusStyle = {
  Delivered: { bg: "#EAF0E4", fg: "#4C6641", dot: "#6B7F5B" },
  Shipped: { bg: "#FBF1E4", fg: "#8A5A20", dot: "#C99A3D" },
  Processing: { bg: "#FCEEE9", fg: "#A5462A", dot: "#B5542E" },
  Cancelled: { bg: "#F1EDE6", fg: "#7A7264", dot: "#9C8563" },
};

const tierStyle = {
  VIP: { bg: "#8C4A2F", fg: "#FBF5EC" },
  Returning: { bg: "#EFE6D6", fg: "#5A4326" },
  New: { bg: "#F1EDE6", fg: "#7A7264" },
};

function StatusBadge({ status }) {
  const s = statusStyle[status] || statusStyle.Processing;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ background: s.bg, color: s.fg }}
    >
      <Circle size={6} fill={s.dot} stroke="none" />
      {status}
    </span>
  );
}

function TierBadge({ tier }) {
  const s = tierStyle[tier] || tierStyle.New;
  return (
    <span
      className="px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide uppercase"
      style={{ background: s.bg, color: s.fg }}
    >
      {tier}
    </span>
  );
}

/* Woven-texture signature strip — a small basket-weave pattern used
   sparingly as a brand mark, echoing the product itself. */
function WeaveStrip({ height = 8, opacity = 1 }) {
  return (
    <svg width="100%" height={height} style={{ display: "block", opacity }} preserveAspectRatio="none">
      <defs>
        <pattern id="weavePattern" width="16" height={height} patternUnits="userSpaceOnUse">
          <rect width="8" height={height} fill="#B5542E" />
          <rect x="8" width="8" height={height} fill="#8C4A2F" />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill="url(#weavePattern)" />
    </svg>
  );
}

function KpiCard({ label, value, delta, positive, icon: Icon }) {
  return (
    <div className="dash-card p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium uppercase tracking-wide dash-muted">{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#F1EDE6" }}>
          <Icon size={16} color="#8C4A2F" />
        </div>
      </div>
      <div className="text-2xl font-semibold dash-ink" style={{ fontFamily: "Fraunces, serif" }}>{value}</div>
      <div className="flex items-center gap-1 text-xs font-medium" style={{ color: positive ? "#4C6641" : "#A5462A" }}>
        {positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
        {delta}
        <span className="dash-muted font-normal ml-1">vs last month</span>
      </div>
    </div>
  );
}



/* ---------------------------------------------------------
   MAIN
--------------------------------------------------------- */

export default function CarpetAdminDashboard() {
  const [page, setPage] = useState("overview");
  const [orderFilter, setOrderFilter] = useState("All");

  const lowStock = inventory.filter((i) => i.stock <= i.reorder);
  const totalRevenue = revenueTrend.reduce((a, b) => a + b.revenue, 0);
  const totalOrders = revenueTrend.reduce((a, b) => a + b.orders, 0);

  const filteredOrders = useMemo(
    () => (orderFilter === "All" ? orders : orders.filter((o) => o.status === orderFilter)),
    [orderFilter]
  );

  const pageTitle = SidebarItem?.find((n) => n.name === page)?.name ?? "Overview";

  return (
    <div className="dash-root flex " style={{ fontFamily: "'Work Sans', sans-serif" }}>
      <style>{`
        .dash-root { --parchment:#F7F2E9; --card:#FFFDF8; --ink:#2E211A; --muted:#8A7E6E;
          --border:#E7DEC9; --rust:#B5542E; --rust-dark:#8C4A2F; --gold:#C99A3D;
          background: var(--parchment); color: var(--ink); width: 100%; }
        .dash-ink { color: var(--ink); }
        .dash-muted { color: var(--muted); }
        .dash-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px;
          box-shadow: 0 1px 2px rgba(46,33,26,0.04); }
        .dash-sidebar { background: #2E211A; }
        .nav-item { transition: background 0.15s ease, color 0.15s ease; }
        .nav-item:hover { background: rgba(255,255,255,0.06); }
        .nav-item.active { background: var(--rust); color: #FBF5EC; }
        table.dash-table th { text-align: left; font-size: 11px; text-transform: uppercase;
          letter-spacing: 0.04em; color: var(--muted); font-weight: 600; padding: 10px 14px;
          border-bottom: 1px solid var(--border); }
        table.dash-table td { padding: 12px 14px; border-bottom: 1px solid #F1EBDC; font-size: 13.5px; }
        table.dash-table tr:last-child td { border-bottom: none; }
        .stock-bar-bg { background: #ECE4D2; border-radius: 4px; height: 6px; overflow: hidden; }
        .filter-pill { border: 1px solid var(--border); background: var(--card); }
        .filter-pill.active { background: var(--rust-dark); color: #FBF5EC; border-color: var(--rust-dark); }
      `}</style>

      {/* SIDEBAR */}
      {/* <aside className="dash-sidebar w-60 shrink-0 flex flex-col py-6" style={{ color: "#EDE3D2" }}>
        <div className="px-6 flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-md overflow-hidden shrink-0" style={{ border: "1px solid #4A3626" }}>
            <WeaveStrip height={36} />
          </div>
          <div>
            <div className="font-semibold text-sm tracking-wide" style={{ fontFamily: "Fraunces, serif", color: "#FBF5EC" }}>
              Himalayan Loom
            </div>
            <div className="text-[11px]" style={{ color: "#A7987F" }}>Admin Console</div>
          </div>
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {NAV.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setPage(key)}
              className={`nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left ${page === key ? "active" : ""}`}
              style={{ color: page === key ? "#FBF5EC" : "#C9BBA3" }}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto mx-3 px-4 py-4 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
          <div className="text-xs font-medium mb-1" style={{ color: "#EDE3D2" }}>Low stock alert</div>
          <div className="text-[12px]" style={{ color: "#A7987F" }}>{lowStock.length} products need reordering</div>
        </div>
      </aside> */}

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        

        <main className="flex-1 overflow-y-auto px-8 py-6">
          {page === "overview" && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard label="Total Revenue" value={fmtNPR(totalRevenue)} delta="+10.7%" positive icon={ArrowUpRight} />
                <KpiCard label="Orders (YTD)" value={totalOrders.toLocaleString()} delta="+8.2%" positive icon={ShoppingCart} />
                <KpiCard label="Low Stock Items" value={lowStock.length} delta="+2 this week" positive={false} icon={AlertTriangle} />
                <KpiCard label="New Customers" value="316" delta="+14.3%" positive icon={Users} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="dash-card p-5 lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-sm" style={{ fontFamily: "Fraunces, serif" }}>Revenue Trend</h3>
                      <p className="text-xs dash-muted">Monthly revenue, last 12 months</p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={revenueTrend}>
                      <defs>
                        <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#B5542E" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="#B5542E" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#EFE6D6" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#8A7E6E" }} axisLine={{ stroke: "#E7DEC9" }} tickLine={false} />
                      <YAxis hide />
                      <Tooltip
                        formatter={(v) => fmtNPR(v)}
                        contentStyle={{ background: "#FFFDF8", border: "1px solid #E7DEC9", borderRadius: 8, fontSize: 12 }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#B5542E" strokeWidth={2.5} fill="url(#revFill)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="dash-card p-5">
                  <h3 className="font-semibold text-sm mb-1" style={{ fontFamily: "Fraunces, serif" }}>Top Products</h3>
                  <p className="text-xs dash-muted mb-4">By units sold</p>
                  <div className="flex flex-col gap-3">
                    {topProducts.map((p, i) => (
                      <div key={p.name} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0" style={{ background: "#F1EDE6", color: "#8C4A2F" }}>
                          {i + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-medium truncate">{p.name}</div>
                          <div className="stock-bar-bg mt-1">
                            <div style={{ width: `${(p.sold / topProducts[0].sold) * 100}%`, background: "#C99A3D", height: "100%" }} />
                          </div>
                        </div>
                        <div className="text-xs font-semibold dash-muted shrink-0">{p.sold}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="dash-card lg:col-span-2 overflow-hidden">
                  <div className="flex items-center justify-between px-5 pt-5 pb-3">
                    <h3 className="font-semibold text-sm" style={{ fontFamily: "Fraunces, serif" }}>Recent Orders</h3>
                    <button onClick={() => setPage("orders")} className="text-xs font-medium" style={{ color: "#B5542E" }}>View all →</button>
                  </div>
                  <table className="dash-table w-full">
                    <thead>
                      <tr><th>Order</th><th>Customer</th><th>Product</th><th>Amount</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o.id}>
                          <td className="font-medium">{o.id}</td>
                          <td>{o.customer}</td>
                          <td className="dash-muted">{o.product}</td>
                          <td>{fmtNPR(o.amount)}</td>
                          <td><StatusBadge status={o.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="dash-card p-5">
                  <h3 className="font-semibold text-sm mb-1" style={{ fontFamily: "Fraunces, serif" }}>Reorder Soon</h3>
                  <p className="text-xs dash-muted mb-4">Stock at or below threshold</p>
                  <div className="flex flex-col gap-3">
                    {lowStock.map((item) => (
                      <div key={item.name} className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-xs font-medium truncate">{item.name}</div>
                          <div className="text-[11px] dash-muted">{item.category}</div>
                        </div>
                        <span className="text-xs font-semibold shrink-0 px-2 py-0.5 rounded" style={{ background: "#FCEEE9", color: "#A5462A" }}>
                          {item.stock} left
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {page === "orders" && (
            <div className="dash-card overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 flex-wrap gap-3" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="flex gap-2 flex-wrap">
                  {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setOrderFilter(s)}
                      className={`filter-pill px-3 py-1.5 rounded-full text-xs font-medium ${orderFilter === s ? "active" : ""}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <span className="text-xs dash-muted">{filteredOrders.length} orders</span>
              </div>
              <table className="dash-table w-full">
                <thead>
                  <tr><th>Order</th><th>Customer</th><th>Product</th><th>Amount</th><th>Date</th><th>Status</th><th></th></tr>
                </thead>
                <tbody>
                  {filteredOrders.map((o) => (
                    <tr key={o.id}>
                      <td className="font-medium">{o.id}</td>
                      <td>{o.customer}</td>
                      <td className="dash-muted">{o.product}</td>
                      <td>{fmtNPR(o.amount)}</td>
                      <td className="dash-muted">{o.date}</td>
                      <td><StatusBadge status={o.status} /></td>
                      <td><MoreHorizontal size={16} className="dash-muted cursor-pointer" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {page === "inventory" && (
            <div className="dash-card overflow-hidden">
              <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
                <h3 className="font-semibold text-sm" style={{ fontFamily: "Fraunces, serif" }}>Inventory</h3>
                <p className="text-xs dash-muted">Stock levels across all collections</p>
              </div>
              <table className="dash-table w-full">
                <thead>
                  <tr><th>Product</th><th>Category</th><th>Stock</th><th>Reorder Level</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {inventory.map((item) => {
                    const low = item.stock <= item.reorder;
                    const pct = Math.min(100, (item.stock / (item.reorder * 2)) * 100);
                    return (
                      <tr key={item.name}>
                        <td className="font-medium">{item.name}</td>
                        <td className="dash-muted">{item.category}</td>
                        <td style={{ width: 160 }}>
                          <div className="flex items-center gap-2">
                            <div className="stock-bar-bg flex-1">
                              <div style={{ width: `${pct}%`, background: low ? "#B5542E" : "#6B7F5B", height: "100%" }} />
                            </div>
                            <span className="text-xs font-medium">{item.stock}</span>
                          </div>
                        </td>
                        <td className="dash-muted">{item.reorder}</td>
                        <td>
                          {low ? (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: "#FCEEE9", color: "#A5462A" }}>Reorder</span>
                          ) : (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: "#EAF0E4", color: "#4C6641" }}>In stock</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {page === "customers" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {customers.map((c) => (
                <div key={c.name} className="dash-card p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold" style={{ background: "#F1EDE6", color: "#8C4A2F" }}>
                        {c.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{c.name}</div>
                        <div className="text-[11px] dash-muted">{c.location}</div>
                      </div>
                    </div>
                    <TierBadge tier={c.tier} />
                  </div>
                  <div className="flex justify-between text-xs pt-2" style={{ borderTop: "1px solid #F1EBDC" }}>
                    <div>
                      <div className="dash-muted mb-0.5">Orders</div>
                      <div className="font-semibold">{c.orders}</div>
                    </div>
                    <div className="text-right">
                      <div className="dash-muted mb-0.5">Lifetime Spend</div>
                      <div className="font-semibold">{fmtNPR(c.spent)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {page === "analytics" && (
            <div className="flex flex-col gap-5">
              <div className="dash-card p-5">
                <h3 className="font-semibold text-sm mb-1" style={{ fontFamily: "Fraunces, serif" }}>Revenue vs Orders</h3>
                <p className="text-xs dash-muted mb-4">Monthly comparison, last 12 months</p>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={revenueTrend}>
                    <CartesianGrid stroke="#EFE6D6" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#8A7E6E" }} axisLine={{ stroke: "#E7DEC9" }} tickLine={false} />
                    <YAxis yAxisId="left" hide />
                    <YAxis yAxisId="right" orientation="right" hide />
                    <Tooltip contentStyle={{ background: "#FFFDF8", border: "1px solid #E7DEC9", borderRadius: 8, fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line yAxisId="left" type="monotone" dataKey="revenue" name="Revenue (Rs)" stroke="#B5542E" strokeWidth={2.5} dot={false} />
                    <Line yAxisId="right" type="monotone" dataKey="orders" name="Orders" stroke="#6B7F5B" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="dash-card p-5">
                  <h3 className="font-semibold text-sm mb-1" style={{ fontFamily: "Fraunces, serif" }}>Top Products by Revenue</h3>
                  <p className="text-xs dash-muted mb-4">Rs earned per collection</p>
                  <ResponsiveContainer width="100%" height={240}>
                    <BarChart data={topProducts} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid stroke="#EFE6D6" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 11, fill: "#8A7E6E" }} axisLine={false} tickLine={false} />
                      <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11, fill: "#2E211A" }} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(v) => fmtNPR(v)} contentStyle={{ background: "#FFFDF8", border: "1px solid #E7DEC9", borderRadius: 8, fontSize: 12 }} />
                      <Bar dataKey="revenue" fill="#B5542E" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="dash-card p-5">
                  <h3 className="font-semibold text-sm mb-1" style={{ fontFamily: "Fraunces, serif" }}>Category Mix</h3>
                  <p className="text-xs dash-muted mb-4">Share of units sold</p>
                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Pie data={categoryMix} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                        {categoryMix.map((entry, i) => (
                          <Cell key={entry.name} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: "#FFFDF8", border: "1px solid #E7DEC9", borderRadius: 8, fontSize: 12 }} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}