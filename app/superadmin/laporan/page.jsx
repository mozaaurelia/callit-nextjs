"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// ── Heroicons inline SVG ────────────────────────────────────────────────────

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

const DocumentTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M7.5 4.5h9A2.25 2.25 0 0118.75 6.75v10.5A2.25 2.25 0 0116.5 19.5h-9A2.25 2.25 0 015.25 17.25V6.75A2.25 2.25 0 017.5 4.5z" />
  </svg>
);

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

const ArrowRightOnRectangleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </svg>
);

const MagnifyingGlassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 0z" />
  </svg>
);

const ChevronLeftIcon = ({ rotated }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white"
    className={`w-3 h-3 transition-transform duration-300 ${rotated ? "rotate-180" : ""}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const XMarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const ClipboardListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

// ───────────────────────────────────────────────────────────────────────────

const CATEGORY_MAP = {
  1: "Jalan Rusak",
  2: "Sampah",
  3: "Lampu Jalan",
  4: "Banjir",
};

const STATUS_CONFIG = {
  pending: { label: "Pending", bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-400", badge: "bg-amber-400 text-amber-900" },
  approved: { label: "Approved", bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500", badge: "bg-green-500 text-white" },
  rejected: { label: "Rejected", bg: "bg-red-100", text: "text-red-600", dot: "bg-red-500", badge: "bg-red-500 text-white" },
};

const FILTERS = ["All", "Pending", "Approved", "Rejected"];

// ───────────────────────────────────────────────────────────────────────────

export default function SuperAdminLaporan() {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("laporan");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);

  // STATS
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

  // =========================
  // FETCH REPORTS
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchAllReports(token);
  }, []);

  const fetchAllReports = async (token) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/posts/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) { console.log(data.message); return; }

      const list = Array.isArray(data) ? data : data.data || [];
      setReports(list);
      setStats({
        total: list.length,
        pending: list.filter((r) => r.status === "pending").length,
        approved: list.filter((r) => r.status === "approved").length,
        rejected: list.filter((r) => r.status === "rejected").length,
      });
    } catch (err) {
      console.log("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  // =========================
  // OPEN DETAIL PANEL
  // =========================
  const openDetail = (report) => {
    setSelectedReport(report);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setTimeout(() => setSelectedReport(null), 300);
  };

  // =========================
  // FILTERED LIST
  // =========================
  const filtered = reports.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      r.header?.toLowerCase().includes(q) ||
      r.body?.toLowerCase().includes(q) ||
      r.username?.toLowerCase().includes(q) ||
      r.location?.toLowerCase().includes(q);
    const matchFilter =
      activeFilter === "All" || r.status?.toLowerCase() === activeFilter.toLowerCase();
    return matchSearch && matchFilter;
  });

  // ── Nav items ──
  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: <GridIcon />, action: () => router.push("/superadmin/dashboard") },
    { key: "users", label: "Kelola User", icon: <UsersIcon />, action: () => router.push("/superadmin/kelolauser") },
    { key: "laporan", label: "Laporan", icon: <DocumentTextIcon />, action: () => router.push("/superadmin/laporan") },
  ];

  // ── Status pill ──
  const StatusPill = ({ status }) => {
    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
    return (
      <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
        {cfg.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f3ef] flex">

      {/* ══════════════════════════════════════
          SIDEBAR
      ══════════════════════════════════════ */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-30 flex flex-col
          bg-gradient-to-b from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b]
          text-white transition-all duration-300 ease-in-out
          ${sidebarOpen ? "w-64" : "w-20"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
          <span className="text-3xl flex-shrink-0 select-none">&#9749;</span>
          {sidebarOpen && (
            <div>
              <h1 className="text-2xl font-extrabold text-[#f0d5b8] tracking-tight whitespace-nowrap leading-none">
                Call It!
              </h1>
              <p className="text-[10px] text-[#d4a87a] font-semibold uppercase tracking-widest mt-0.5">Super Admin</p>
            </div>
          )}
        </div>

        {/* Admin badge */}
        {sidebarOpen && (
          <div className="mx-4 mt-5 mb-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#f0d5b8] to-[#c8956b] flex items-center justify-center flex-shrink-0">
              <ShieldCheckIcon />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">Super Admin</p>
              <p className="text-[11px] text-[#e7c8ab]">Full Access</p>
            </div>
          </div>
        )}

        {!sidebarOpen && (
          <div className="flex justify-center mt-5 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f0d5b8] to-[#c8956b] flex items-center justify-center text-white">
              <ShieldCheckIcon />
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 flex flex-col gap-1 px-3 mt-4">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveMenu(item.key); item.action(); }}
              title={!sidebarOpen ? item.label : ""}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                ${activeMenu === item.key
                  ? "bg-[#c8956b] text-white shadow-lg shadow-[#c8956b]/30"
                  : "text-[#f3d7bf] hover:bg-white/10 hover:text-white"
                }
                ${!sidebarOpen ? "justify-center" : ""}
              `}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-6 flex flex-col gap-1">
          <button
            title={!sidebarOpen ? "Notifications" : ""}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[#f3d7bf] hover:bg-white/10 transition-all text-sm font-semibold ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <span className="relative flex-shrink-0">
              <BellIcon />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#e57c4a] rounded-full border-2 border-[#5c2d0e]" />
            </span>
            {sidebarOpen && <span>Notifications</span>}
          </button>

          <button
            onClick={handleLogout}
            title={!sidebarOpen ? "Logout" : ""}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[#e57c4a] hover:bg-[#3d2718] hover:text-[#ff9a72] transition-all text-sm font-semibold ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <span className="flex-shrink-0"><ArrowRightOnRectangleIcon /></span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-7 w-6 h-6 bg-[#d8b08c] rounded-full flex items-center justify-center shadow-lg hover:bg-[#b07d55] transition"
        >
          <ChevronLeftIcon rotated={!sidebarOpen} />
        </button>
      </aside>

      {/* ══════════════════════════════════════
          MAIN
      ══════════════════════════════════════ */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"} min-h-screen flex flex-col`}>

        {/* TOPBAR */}
        <div className="sticky top-0 z-20 bg-[#f7f3ef]/80 backdrop-blur-md border-b border-[#e8d9cc] px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#a07a5e] font-semibold uppercase tracking-widest">Super Admin</p>
            <h2 className="text-xl font-extrabold text-[#2b1d15]">Manajemen Laporan</h2>
          </div>

          {/* Search */}
          <div className="relative hidden md:flex items-center">
            <span className="absolute left-3 text-[#a07a5e] pointer-events-none"><MagnifyingGlassIcon /></span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari laporan atau user..."
              className="pl-9 pr-5 py-2.5 rounded-2xl border border-[#ddd0c5] bg-white/80 backdrop-blur text-sm text-[#3b2f2f] placeholder-[#b89f8d] outline-none focus:ring-2 focus:ring-[#c8956b]/40 focus:border-[#c8956b] shadow-sm w-72 transition-all"
            />
          </div>
        </div>

        {/* PAGE BODY */}
        <div className="flex-1 px-8 py-8">

          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Laporan", value: stats.total, icon: "📋", from: "#5c2d0e", to: "#8b4a20", shadow: "#8b4a20", bar: "bg-gradient-to-r from-[#5c2d0e] to-[#c8956b]", track: "bg-[#f0e5d8]", pct: 100 },
              { label: "Pending", value: stats.pending, icon: "⏳", from: "#b45309", to: "#d97706", shadow: "#d97706", bar: "bg-gradient-to-r from-amber-500 to-amber-300", track: "bg-amber-100", pct: stats.total ? Math.round((stats.pending / stats.total) * 100) : 0 },
              { label: "Approved", value: stats.approved, icon: "✓", from: "#16a34a", to: "#22c55e", shadow: "#22c55e", bar: "bg-gradient-to-r from-green-500 to-emerald-400", track: "bg-green-100", pct: stats.total ? Math.round((stats.approved / stats.total) * 100) : 0 },
              { label: "Rejected", value: stats.rejected, icon: "✕", from: "#dc2626", to: "#f87171", shadow: "#f87171", bar: "bg-gradient-to-r from-red-500 to-red-400", track: "bg-red-100", pct: stats.total ? Math.round((stats.rejected / stats.total) * 100) : 0 },
            ].map((s) => (
              <div key={s.label} className="group relative bg-white rounded-3xl border border-[#eee5da] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl text-white flex-shrink-0`}
                    style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})`, boxShadow: `0 4px 14px ${s.shadow}40` }}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-[11px] text-[#a07a5e] font-bold uppercase tracking-wider">{s.label}</p>
                    <h2 className="text-3xl font-extrabold text-[#2b1d15] leading-none mt-0.5">{s.value}</h2>
                  </div>
                </div>
                <div className={`h-1.5 rounded-full overflow-hidden ${s.track}`}>
                  <div className={`h-full rounded-full transition-all duration-700 ${s.bar}`} style={{ width: `${s.pct}%` }} />
                </div>
                <p className="text-[11px] text-[#a07a5e] font-semibold mt-1">{s.pct}% of total</p>
              </div>
            ))}
          </div>

          {/* ── FILTER TABS ── */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs px-4 py-2 rounded-full font-bold transition-all duration-150 ${activeFilter === f
                    ? "bg-gradient-to-r from-[#5c2d0e] to-[#c8956b] text-white shadow-md"
                    : "bg-white border border-[#e8d9cc] text-[#7a5c44] hover:bg-[#f0e8df]"
                  }`}
              >
                {f}
                {f !== "All" && (
                  <span className={`ml-1.5 text-[10px] font-extrabold ${activeFilter === f ? "opacity-80" : "opacity-60"}`}>
                    {f === "Pending" ? stats.pending : f === "Approved" ? stats.approved : stats.rejected}
                  </span>
                )}
              </button>
            ))}

            <span className="ml-auto text-xs text-[#a07a5e] font-semibold">
              {filtered.length} laporan ditemukan
            </span>
          </div>

          {/* ── CONTENT AREA ── */}
          <div className="w-full">

            {/* CARDS GRID */}
            <div className="w-full">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 text-[#b89f8d]">
                  <div className="w-10 h-10 border-4 border-[#c8956b] border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-sm font-semibold">Memuat laporan...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-[#b89f8d]">
                  <span className="text-5xl mb-4">📭</span>
                  <p className="text-base font-semibold">Tidak ada laporan ditemukan</p>
                  <p className="text-sm mt-1">Coba ubah filter atau kata kunci pencarian.</p>
                </div>
              ) : (
                <div className={`grid gap-4 ${panelOpen ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4"}`}>
                  {filtered.map((report) => {
                    const isSelected = selectedReport?.id === report.id;
                    const cfg = STATUS_CONFIG[report.status] || STATUS_CONFIG.pending;
                    return (
                      <div
                        key={report.id}
                        onClick={() => isSelected && panelOpen ? closePanel() : openDetail(report)}
                        className={`
                          group bg-white rounded-2xl overflow-hidden border shadow-sm
                          hover:shadow-lg hover:-translate-y-1 transition-all duration-250 flex flex-col cursor-pointer
                          ${isSelected && panelOpen ? "border-[#c8956b] ring-2 ring-[#c8956b]/30 shadow-md" : "border-[#eee5da]"}
                        `}
                      >
                        {/* Image */}
                        <div className="relative overflow-hidden h-32">
                          <img
                            src={
                              report.image
                                ? `http://localhost:5000/uploads/${report.image}`
                                : "https://via.placeholder.com/400x300?text=No+Image"
                            }
                            alt={report.header}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Status badge */}
                          <div className="absolute top-2 right-2">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm ${cfg.badge}`}>
                              {cfg.label}
                            </span>
                          </div>
                          {/* Category badge */}
                          <div className="absolute bottom-2 left-2">
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-black/40 backdrop-blur-sm text-white">
                              {CATEGORY_MAP[report.category_id] || "Lainnya"}
                            </span>
                          </div>
                        </div>

                        {/* Body */}
                        <div className="p-3.5 flex-1 flex flex-col">
                          <h3 className="font-extrabold text-[#2b1d15] line-clamp-1 text-xs mb-1">
                            {report.header}
                          </h3>

                          <div className="flex items-center gap-1 text-[10px] text-[#b89f8d] mb-1.5">
                            <UserIcon />
                            <span className="truncate">{report.username || "Unknown"}</span>
                          </div>

                          <div className="flex items-center gap-1 text-[10px] text-[#b89f8d]">
                            <CalendarIcon />
                            {new Date(report.created_at).toLocaleDateString("id-ID", {
                              day: "numeric", month: "short", year: "numeric",
                            })}
                          </div>

                          <p className="text-[10px] text-[#6b5040] line-clamp-2 mt-2 flex-1 leading-relaxed">
                            {report.body}
                          </p>
                        </div>

                        {/* Bottom stripe */}
                        <div className={`h-0.5 w-full ${report.status === "approved" ? "bg-gradient-to-r from-green-400 to-emerald-300"
                            : report.status === "rejected" ? "bg-gradient-to-r from-red-400 to-red-300"
                              : "bg-gradient-to-r from-amber-300 to-yellow-200"
                          }`} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── DETAIL PANEL ── */}
            {/* ── POPUP DETAIL ── */}
            {panelOpen && selectedReport && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

                <div className="bg-white rounded-2xl border border-[#eee5da] shadow-2xl overflow-hidden w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">

                  {/* Panel header */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b] px-6 py-5">
                    <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border-[20px] border-white/5" />
                    <div className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full border-[16px] border-white/5" />

                    <div className="relative z-10 flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <span className="inline-flex items-center gap-1 bg-white/15 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 uppercase tracking-wider border border-white/10">
                          Detail Laporan
                        </span>

                        <h3 className="font-extrabold text-white text-base leading-snug line-clamp-2">
                          {selectedReport.header}
                        </h3>
                      </div>

                      <button
                        onClick={closePanel}
                        className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition flex-shrink-0 mt-1"
                      >
                        <XMarkIcon />
                      </button>
                    </div>
                  </div>

                  {/* Panel image */}
                  {selectedReport.image && (
                    <div className="h-52 overflow-hidden">
                      <img
                        src={`http://localhost:5000/uploads/${selectedReport.image}`}
                        alt={selectedReport.header}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Panel content */}
                  <div className="p-5 space-y-4">

                    {/* Status */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#a07a5e] uppercase tracking-wider">
                        Status
                      </span>

                      <StatusPill status={selectedReport.status} />
                    </div>

                    <div className="border-t border-[#f0e8df]" />

                    {/* Info rows */}
                    {[
                      {
                        icon: <UserIcon />,
                        label: "User",
                        value: selectedReport.username || "Unknown",
                      },
                      {
                        icon: <TagIcon />,
                        label: "Kategori",
                        value:
                          CATEGORY_MAP[selectedReport.category_id] ||
                          "Lainnya",
                      },
                      {
                        icon: <MapPinIcon />,
                        label: "Lokasi",
                        value: selectedReport.location || "-",
                      },
                      {
                        icon: <CalendarIcon />,
                        label: "Tanggal",
                        value: new Date(
                          selectedReport.created_at
                        ).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }),
                      },
                      {
                        icon: <ShieldCheckIcon />,
                        label: "Admin",
                        value:
                          selectedReport.admin_username ||
                          "Belum ditangani",
                      },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex items-start gap-3"
                      >
                        <div className="w-7 h-7 rounded-lg bg-[#f0e8df] flex items-center justify-center text-[#c8956b] flex-shrink-0 mt-0.5">
                          {row.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-[#a07a5e] font-bold uppercase tracking-wider">
                            {row.label}
                          </p>

                          <p className="text-xs text-[#2b1d15] font-semibold mt-0.5 leading-snug">
                            {row.value}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="border-t border-[#f0e8df]" />

                    {/* Deskripsi */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-[#f0e8df] flex items-center justify-center text-[#c8956b] flex-shrink-0">
                          <ClipboardListIcon />
                        </div>

                        <p className="text-[10px] text-[#a07a5e] font-bold uppercase tracking-wider">
                          Deskripsi
                        </p>
                      </div>

                      <div className="bg-[#fdf9f6] border border-[#f0e8df] rounded-xl p-3.5">
                        <p className="text-xs text-[#4b3022] leading-relaxed whitespace-pre-line">
                          {selectedReport.body}
                        </p>
                      </div>
                    </div>

                    {/* Report ID */}
                    <div className="bg-[#f7f3ef] rounded-xl px-3.5 py-2.5 flex items-center justify-between">
                      <span className="text-[10px] text-[#a07a5e] font-bold uppercase tracking-wider">
                        Report ID
                      </span>

                      <span className="text-[11px] text-[#5c2d0e] font-extrabold font-mono">
                        #{selectedReport.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}