"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 6;

const DEFAULT_APPROVE_REASON =
  "Laporan Anda telah diverifikasi dan akan segera ditindak lanjuti oleh petugas.";
const DEFAULT_REJECT_REASON =
  "Laporan yang Anda lampirkan kurang jelas sehingga laporan tidak bisa terverifikasi.";

// ── Heroicons inline SVG ────────────────────────────────────────────────────

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);

const DocumentTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M7.5 4.5h9A2.25 2.25 0 0118.75 6.75v10.5A2.25 2.25 0 0116.5 19.5h-9A2.25 2.25 0 015.25 17.25V6.75A2.25 2.25 0 017.5 4.5z" />
  </svg>
);

const ChatBubbleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
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

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ChevronLeftSmallIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRightSmallIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const XMarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ── Status Badge ────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    pending:  { bg: "bg-amber-100",  text: "text-amber-700",  dot: "bg-amber-400",  label: "Pending" },
    approved: { bg: "bg-green-100",  text: "text-green-700",  dot: "bg-green-500",  label: "Approved" },
    rejected: { bg: "bg-red-100",    text: "text-red-600",    dot: "bg-red-500",    label: "Rejected" },
  };
  const s = map[status] || map.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
      {s.label}
    </span>
  );
}

// ── Avatar ──────────────────────────────────────────────────────────────────
function Avatar({ name = "?", size = 32 }) {
  const colors = ["#c8956b", "#8b4a20", "#a07a5e", "#7a5c44", "#5c2d0e"];
  const idx = (name.charCodeAt(0) || 0) % colors.length;
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-full text-white font-bold border-2 border-white"
      style={{
        width: size, height: size,
        background: `linear-gradient(135deg, ${colors[idx]}, ${colors[(idx + 2) % colors.length]})`,
        fontSize: size * 0.34,
      }}
    >
      {initials}
    </div>
  );
}

// ── Reason Confirmation Modal ───────────────────────────────────────────────
function ReasonModal({ type, onConfirm, onCancel }) {
  const isApprove = type === "approved";
  const [reason, setReason] = useState(
    isApprove ? DEFAULT_APPROVE_REASON : DEFAULT_REJECT_REASON
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div
          className={`px-6 py-5 flex items-center justify-between ${
            isApprove
              ? "bg-gradient-to-r from-green-500 to-emerald-400"
              : "bg-gradient-to-r from-red-500 to-red-400"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
              {isApprove ? <CheckCircleIcon /> : <XCircleIcon />}
            </div>
            <div>
              <h3 className="text-white font-extrabold text-base">
                {isApprove ? "Setujui Laporan" : "Tolak Laporan"}
              </h3>
              <p className="text-white/80 text-xs">
                {isApprove
                  ? "Laporan akan diverifikasi"
                  : "Laporan akan ditolak"}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
          >
            <XMarkIcon />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <label className="block text-xs font-bold text-[#5c2d0e] uppercase tracking-wider mb-2">
            Alasan / Pesan untuk Pelapor
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-2xl border border-[#e8d9cc] bg-[#fdf9f6] text-sm text-[#3b2f2f] outline-none focus:ring-2 focus:ring-[#c8956b]/40 focus:border-[#c8956b] resize-none transition"
            placeholder="Tulis alasan untuk pelapor..."
          />
          <p className="text-[10px] text-[#b89f8d] mt-1.5">
            Pesan ini akan ditampilkan kepada pengguna di halaman laporan mereka.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 h-11 rounded-2xl border border-[#e8d9cc] bg-white text-[#7a5c44] text-sm font-bold hover:bg-[#f7f3ef] transition"
          >
            Batal
          </button>
          <button
            onClick={() => onConfirm(reason)}
            className={`flex-1 h-11 rounded-2xl text-white text-sm font-bold transition shadow-md ${
              isApprove
                ? "bg-gradient-to-r from-green-500 to-emerald-400 hover:opacity-90 shadow-green-200"
                : "bg-gradient-to-r from-red-500 to-red-400 hover:opacity-90 shadow-red-200"
            }`}
          >
            {isApprove ? "Ya, Setujui" : "Ya, Tolak"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────

export default function KelolaLaporanPage() {
  const router = useRouter();

  const [user, setUser] = useState({ username: "Admin Name", role: "admin" });
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("laporan");

  // Modal state
  const [reasonModal, setReasonModal] = useState(null); // { type: "approved"|"rejected", reportId }

  /* =========================
     FETCH REPORTS
  ========================= */
  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      if (userData) setUser(JSON.parse(userData));

      const response = await fetch("http://localhost:5000/api/posts/all", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setReports(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.log("FETCH REPORT ERROR:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  /* =========================
     OPEN APPROVE MODAL
  ========================= */
  const openApproveModal = (id) => {
    setReasonModal({ type: "approved", reportId: id });
  };

  /* =========================
     OPEN REJECT MODAL
  ========================= */
  const openRejectModal = (id) => {
    setReasonModal({ type: "rejected", reportId: id });
  };

  /* =========================
     CONFIRM (with reason)
  ========================= */
  const handleConfirm = async (reason) => {
    if (!reasonModal) return;
    const { type, reportId } = reasonModal;
    setReasonModal(null);

    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/posts/status/${reportId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: type, reason }),
      });
      fetchReports();
    } catch (err) {
      console.log("UPDATE STATUS ERROR:", err);
    }
  };

  // Derived stats
  const totalReports  = reports.length;
  const totalPending  = reports.filter((r) => r.status === "pending").length;
  const totalApproved = reports.filter((r) => r.status === "approved").length;
  const totalRejected = reports.filter((r) => r.status === "rejected").length;

  const filtered = reports.filter((r) => {
    const matchFilter = filter === "all" || r.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      (r.header || "").toLowerCase().includes(q) ||
      (r.username || "").toLowerCase().includes(q) ||
      (r.category_name || r.category || r.category_title || "").toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilterChange = (f) => { setFilter(f); setPage(1); };
  const handleSearch = (v) => { setSearch(v); setPage(1); };

  const navItems = [
    { key: "dashboard", label: "Dashboard",      icon: <GridIcon />,         action: () => router.push("/admin/dashboard") },
    { key: "laporan",   label: "Kelola Laporan", icon: <DocumentTextIcon />, action: () => router.push("/admin/laporan") },
    { key: "chat",      label: "Chat Admin",      icon: <ChatBubbleIcon />,   action: () => router.push("/admin/chatadmin") },
  ];

  const FILTER_TABS = [
    { key: "all",      label: "Semua",    count: totalReports },
    { key: "pending",  label: "Pending",  count: totalPending },
    { key: "approved", label: "Approved", count: totalApproved },
    { key: "rejected", label: "Rejected", count: totalRejected },
  ];

  const TABLE_HEADS = ["No", "Laporan", "Pelapor", "Kategori", "Lokasi", "Tanggal", "Status", "Aksi"];

  return (
    <div className="min-h-screen bg-[#f7f3ef] flex">

      {/* ── REASON MODAL ── */}
      {reasonModal && (
        <ReasonModal
          type={reasonModal.type}
          onConfirm={handleConfirm}
          onCancel={() => setReasonModal(null)}
        />
      )}

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
              <p className="text-[10px] text-[#d4a87a] font-semibold uppercase tracking-widest mt-0.5">
                Admin Panel
              </p>
            </div>
          )}
        </div>

        {/* Admin badge */}
        {sidebarOpen && (
          <div className="mx-4 mt-5 mb-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4 flex items-center gap-3">
            <Avatar name={user?.username || "Admin"} size={44} />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user?.username || "Admin"}</p>
              <p className="text-[11px] text-[#e7c8ab] capitalize">{user?.role || "admin"}</p>
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

        {/* Bottom: Bell + Logout */}
        <div className="px-3 pb-6 flex flex-col gap-1">
          <button
            onClick={() => (window.location.href = "/admin/chatadmin")}
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
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              router.push("/login");
            }}
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
          MAIN CONTENT
      ══════════════════════════════════════ */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"} min-h-screen flex flex-col`}>

        {/* TOPBAR */}
        <div className="sticky top-0 z-20 bg-[#f7f3ef]/80 backdrop-blur-md border-b border-[#e8d9cc] px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#a07a5e] font-semibold uppercase tracking-widest">Admin Panel</p>
            <h2 className="text-xl font-extrabold text-[#2b1d15]">Kelola Laporan</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:flex items-center">
              <span className="absolute left-3 text-[#a07a5e] pointer-events-none"><MagnifyingGlassIcon /></span>
              <input
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Cari laporan, user, kategori..."
                className="pl-9 pr-5 py-2.5 rounded-2xl border border-[#ddd0c5] bg-white/80 backdrop-blur text-sm text-[#3b2f2f] placeholder-[#b89f8d] outline-none focus:ring-2 focus:ring-[#c8956b]/40 focus:border-[#c8956b] shadow-sm w-64 transition-all"
              />
            </div>

            <div className="flex items-center gap-2 bg-white border border-[#e8d9cc] rounded-2xl px-3 py-2 shadow-sm">
              <Avatar name={user?.username || "Admin"} size={28} />
              <span className="text-sm font-bold text-[#2b1d15] hidden md:block">{user?.username || "Admin"}</span>
            </div>
          </div>
        </div>

        {/* PAGE BODY */}
        <div className="px-8 py-8 flex-1">

          {/* ── STAT CARDS ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Laporan", value: totalReports,  from: "#5c2d0e", to: "#8b4a20", bar: "from-[#5c2d0e] to-[#c8956b]", track: "bg-[#f0e5d8]", pct: 100 },
              { label: "Pending",       value: totalPending,  from: "#b45309", to: "#d97706", bar: "from-amber-500 to-amber-300",  track: "bg-amber-100",   pct: totalReports ? Math.round((totalPending  / totalReports) * 100) : 0 },
              { label: "Approved",      value: totalApproved, from: "#16a34a", to: "#22c55e", bar: "from-green-500 to-emerald-400", track: "bg-green-100", pct: totalReports ? Math.round((totalApproved / totalReports) * 100) : 0 },
              { label: "Rejected",      value: totalRejected, from: "#dc2626", to: "#f87171", bar: "from-red-500 to-red-400",      track: "bg-red-100",     pct: totalReports ? Math.round((totalRejected / totalReports) * 100) : 0 },
            ].map((s) => (
              <div key={s.label} className="group relative bg-white rounded-3xl border border-[#eee5da] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-white flex-shrink-0 text-lg font-extrabold"
                    style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})`, boxShadow: `0 4px 12px ${s.from}40` }}
                  >
                    {s.value}
                  </div>
                  <div>
                    <p className="text-[11px] text-[#a07a5e] font-bold uppercase tracking-wider">{s.label}</p>
                    <p className="text-[11px] text-[#b89f8d] font-semibold">{s.pct}% of total</p>
                  </div>
                </div>
                <div className={`h-1.5 rounded-full overflow-hidden ${s.track}`}>
                  <div className={`h-full rounded-full bg-gradient-to-r ${s.bar} transition-all duration-700`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* ── TABLE CARD ── */}
          <div className="bg-white rounded-3xl border border-[#eee5da] shadow-sm overflow-hidden">

            <div className="px-6 pt-5 pb-4 border-b border-[#f0e8df] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#2b1d15]">Daftar Laporan</h3>
                <p className="text-xs text-[#a07a5e] mt-0.5">{filtered.length} laporan ditemukan</p>
              </div>

              <div className="flex gap-2 flex-wrap">
                {FILTER_TABS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => handleFilterChange(f.key)}
                    className={`
                      text-xs px-4 py-2 rounded-full font-bold transition-all duration-150 flex items-center gap-1.5
                      ${filter === f.key
                        ? "bg-gradient-to-r from-[#5c2d0e] to-[#c8956b] text-white shadow-md"
                        : "bg-[#f7f3ef] border border-[#e8d9cc] text-[#7a5c44] hover:bg-[#f0e8df]"
                      }
                    `}
                  >
                    {f.label}
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${filter === f.key ? "bg-white/20" : "bg-[#e8d9cc]"}`}>
                      {f.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile search */}
            <div className="px-6 py-3 border-b border-[#f0e8df] md:hidden">
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[#a07a5e] pointer-events-none"><MagnifyingGlassIcon /></span>
                <input
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Cari laporan..."
                  className="pl-9 pr-4 py-2 rounded-xl border border-[#ddd0c5] bg-[#fdf9f6] text-sm text-[#3b2f2f] placeholder-[#b89f8d] outline-none focus:ring-2 focus:ring-[#c8956b]/30 w-full transition-all"
                />
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#fdf9f6] border-b border-[#f0e8df]">
                    {TABLE_HEADS.map((h) => (
                      <th key={h} className="px-5 py-3.5 text-left text-[11px] font-bold text-[#a07a5e] uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#f7f3ef]">
                  {paged.map((r, i) => (
                    <tr key={r.id} className="group hover:bg-[#fdf6f0] transition-colors duration-150">
                      {/* No */}
                      <td className="px-5 py-4 text-xs font-bold text-[#a07a5e]">
                        {(page - 1) * ITEMS_PER_PAGE + i + 1}
                      </td>

                      {/* Laporan */}
                      <td className="px-5 py-4 max-w-[180px]">
                        <p className="font-bold text-[#2b1d15] text-xs truncate">
                          {r.title || r.header || "-"}
                        </p>
                        {/* Show existing reason if any */}
                        {r.reason && (
                          <p className="text-[10px] text-[#a07a5e] truncate mt-0.5 max-w-[160px]" title={r.reason}>
                            💬 {r.reason}
                          </p>
                        )}
                      </td>

                      {/* Pelapor */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Avatar name={r.username || "?"} size={26} />
                          <div className="flex items-center gap-1 text-[#a07a5e]">
                            <UserIcon />
                            <span className="text-xs font-semibold text-[#2b1d15] whitespace-nowrap">{r.username || "-"}</span>
                          </div>
                        </div>
                      </td>

                      {/* Kategori */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 text-[#a07a5e]">
                          <TagIcon />
                          <span className="text-xs font-semibold text-[#5c3b27] bg-[#f0e8df] px-2 py-0.5 rounded-full whitespace-nowrap">
                            {r.category_name || r.category || r.category_title || "-"}
                          </span>
                        </div>
                      </td>

                      {/* Lokasi */}
                      <td className="px-5 py-4 max-w-[140px]">
                        <div className="flex items-center gap-1 text-[#a07a5e]">
                          <MapPinIcon />
                          <span className="text-xs text-[#6b5040] truncate">{r.location || "-"}</span>
                        </div>
                      </td>

                      {/* Tanggal */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-[#a07a5e]">
                          <CalendarIcon />
                          <span className="text-xs text-[#6b5040]">
                            {r.created_at
                              ? new Date(r.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
                              : "-"}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge status={r.status} />
                      </td>

                      {/* Aksi */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openApproveModal(r.id)}
                            className="w-8 h-8 rounded-xl bg-green-50 border border-green-100 text-green-500 hover:bg-green-500 hover:text-white hover:border-green-500 flex items-center justify-center transition-all duration-200"
                            title="Approve"
                          >
                            <CheckCircleIcon />
                          </button>
                          <button
                            onClick={() => openRejectModal(r.id)}
                            className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all duration-200"
                            title="Reject"
                          >
                            <XCircleIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {paged.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-center py-16 text-[#b89f8d]">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-[#f0e8df] flex items-center justify-center text-[#c8956b]">
                            <DocumentTextIcon />
                          </div>
                          <p className="font-semibold text-sm">Tidak ada laporan ditemukan</p>
                          <p className="text-xs">Coba ubah filter atau kata kunci pencarian.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="px-6 py-4 border-t border-[#f0e8df] bg-[#fdf9f6] flex items-center justify-between gap-4">
              <p className="text-xs text-[#a07a5e] font-semibold">
                Menampilkan{" "}
                <span className="text-[#5c2d0e] font-extrabold">{Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)}</span>
                {" "}–{" "}
                <span className="text-[#5c2d0e] font-extrabold">{Math.min(page * ITEMS_PER_PAGE, filtered.length)}</span>
                {" "}dari{" "}
                <span className="text-[#5c2d0e] font-extrabold">{filtered.length}</span>
                {" "}laporan
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-150 ${
                    page === 1
                      ? "border-[#e8d9cc] bg-white text-[#c4a98a] cursor-not-allowed opacity-50"
                      : "border-[#e8d9cc] bg-white text-[#5c2d0e] hover:bg-[#f0e8df] hover:border-[#c8956b]"
                  }`}
                >
                  <ChevronLeftSmallIcon />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-xl border text-xs font-bold transition-all duration-150 ${
                      page === p
                        ? "bg-gradient-to-br from-[#5c2d0e] to-[#8b4a20] text-white border-transparent shadow-md"
                        : "border-[#e8d9cc] bg-white text-[#5c2d0e] hover:bg-[#f0e8df] hover:border-[#c8956b]"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center transition-all duration-150 ${
                    page === totalPages
                      ? "border-[#e8d9cc] bg-white text-[#c4a98a] cursor-not-allowed opacity-50"
                      : "border-[#e8d9cc] bg-white text-[#5c2d0e] hover:bg-[#f0e8df] hover:border-[#c8956b]"
                  }`}
                >
                  <ChevronRightSmallIcon />
                </button>
              </div>
            </div>
          </div>

          <div className="h-8" />
        </div>
      </main>
    </div>
  );
}