"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

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

const XMarkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
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

const ClipboardListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

// ── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_MAP = {
  1: "Jalan Rusak",
  2: "Sampah",
  3: "Lampu Jalan",
  4: "Banjir",
};

const CATEGORY_FILTERS = [
  { key: "all",  label: "Semua" },
  { key: "1",    label: "Jalan Rusak" },
  { key: "2",    label: "Sampah" },
  { key: "3",    label: "Lampu Jalan" },
  { key: "4",    label: "Banjir" },
];

const STATUS_CONFIG = {
  pending:  { label: "Pending",  bg: "bg-amber-100",  text: "text-amber-700",  dot: "bg-amber-400",  badge: "bg-amber-400 text-amber-900" },
  approved: { label: "Approved", bg: "bg-green-100",  text: "text-green-700",  dot: "bg-green-500",  badge: "bg-green-500 text-white" },
  rejected: { label: "Rejected", bg: "bg-red-100",    text: "text-red-600",    dot: "bg-red-500",    badge: "bg-red-500 text-white" },
};

// ── Status pill ──────────────────────────────────────────────────────────────
function StatusPill({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ────────────────────────────────────────────────────────────────────────────

export default function CommentsPage() {
  const router = useRouter();
  const chatBottomRef = useRef(null);

  const [reports, setReports]               = useState([]);
  const [loading, setLoading]               = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalOpen, setModalOpen]           = useState(false);
  const [chats, setChats]                   = useState([]);
  const [message, setMessage]               = useState("");
  const [searchQuery, setSearchQuery]       = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen]       = useState(true);
  const [activeMenu, setActiveMenu]         = useState("chat");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // =========================
  // FETCH ALL REPORTS
  // =========================
  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/posts/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setReports(data.data || []);
    } catch (err) {
      console.log("FETCH REPORTS ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  // =========================
  // OPEN MODAL + FETCH CHAT
  // =========================
  const openReport = async (report) => {
    setSelectedReport(report);
    setModalOpen(true);
    fetchChats(report.id);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedReport(null), 300);
    setChats([]);
    setMessage("");
  };

  // =========================
  // FETCH CHAT
  // =========================
  const fetchChats = async (id) => {
    const res = await fetch(`http://localhost:5000/api/chats/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setChats(data);
  };

  // =========================
  // SEND CHAT
  // =========================
  const sendChat = async () => {
    if (!message.trim()) return;
    await fetch("http://localhost:5000/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        public_report_id: selectedReport.id,
        message,
      }),
    });
    setMessage("");
    fetchChats(selectedReport.id);
  };

  // =========================
  // APPROVE
  // =========================
  const handleApprove = async (id, e) => {
    e.stopPropagation();
    await fetch(`http://localhost:5000/api/posts/status/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ status: "approved" }),
    });
    fetchReports();
    if (selectedReport?.id === id) setSelectedReport((p) => p ? { ...p, status: "approved" } : p);
  };

  // =========================
  // REJECT
  // =========================
  const handleReject = async (id, e) => {
    e.stopPropagation();
    await fetch(`http://localhost:5000/api/posts/status/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ status: "rejected" }),
    });
    fetchReports();
    if (selectedReport?.id === id) setSelectedReport((p) => p ? { ...p, status: "rejected" } : p);
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm("Yakin ingin menghapus laporan ini?");
    if (!confirmDelete) return;
    await fetch(`http://localhost:5000/api/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    fetchReports();
    if (selectedReport?.id === id) closeModal();
  };

  // =========================
  // FILTERED LIST
  // =========================
  const filtered = reports.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      r.header?.toLowerCase().includes(q) ||
      r.body?.toLowerCase().includes(q) ||
      r.username?.toLowerCase().includes(q);
    const matchCategory =
      categoryFilter === "all" || String(r.category_id) === categoryFilter;
    return matchSearch && matchCategory;
  });

  const navItems = [
    { key: "dashboard", label: "Dashboard",      icon: <GridIcon />,         action: () => router.push("/admin/dashboard") },
    { key: "laporan",   label: "Kelola Laporan", icon: <DocumentTextIcon />, action: () => router.push("/admin/laporan") },
    { key: "chat",      label: "Chat Admin",      icon: <ChatBubbleIcon />,   action: () => {} },
  ];

  const currentUserId =
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).id
      : null;

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
              <p className="text-[10px] text-[#d4a87a] font-semibold uppercase tracking-widest mt-0.5">Admin Panel</p>
            </div>
          )}
        </div>

        {/* Admin badge */}
        {sidebarOpen && (
          <div className="mx-4 mt-5 mb-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#f0d5b8] to-[#c8956b] flex items-center justify-center flex-shrink-0 text-white">
              <ShieldCheckIcon />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">Admin</p>
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
            onClick={() => router.push("/admin/chatadmin")}
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
            <h2 className="text-xl font-extrabold text-[#2b1d15]">Comments & Chat</h2>
          </div>

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

          {/* ── CATEGORY FILTER TABS ── */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {CATEGORY_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setCategoryFilter(f.key)}
                className={`
                  text-xs px-4 py-2 rounded-full font-bold transition-all duration-150 flex items-center gap-1.5
                  ${categoryFilter === f.key
                    ? "bg-gradient-to-r from-[#5c2d0e] to-[#c8956b] text-white shadow-md"
                    : "bg-white border border-[#e8d9cc] text-[#7a5c44] hover:bg-[#f0e8df]"
                  }
                `}
              >
                {f.label}
                {f.key !== "all" && (
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${categoryFilter === f.key ? "bg-white/20" : "bg-[#e8d9cc]"}`}>
                    {reports.filter((r) => String(r.category_id) === f.key).length}
                  </span>
                )}
              </button>
            ))}
            <span className="ml-auto text-xs text-[#a07a5e] font-semibold">
              {filtered.length} laporan ditemukan
            </span>
          </div>

          {/* ── REPORT GRID (2 columns) ── */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-[#b89f8d]">
              <div className="w-10 h-10 border-4 border-[#c8956b] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-sm font-semibold">Memuat laporan...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-[#b89f8d]">
              <div className="w-14 h-14 rounded-2xl bg-[#f0e8df] flex items-center justify-center mb-4 text-[#c8956b]">
                <DocumentTextIcon />
              </div>
              <p className="text-base font-semibold">Tidak ada laporan ditemukan</p>
              <p className="text-sm mt-1">Coba ubah filter atau kata kunci pencarian.</p>
            </div>
          ) : (
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filtered.map((report) => {
                const cfg = STATUS_CONFIG[report.status] || STATUS_CONFIG.pending;
                return (
                  <div
                    key={report.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-[#eee5da] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
                    onClick={() => openReport(report)}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-44">
                      <img
                        src={
                          report.image
                            ? `http://localhost:5000/uploads/${report.image}`
                            : "https://via.placeholder.com/600x300?text=No+Image"
                        }
                        alt={report.header}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Status badge */}
                      <div className="absolute top-3 right-3">
                        <span className={`text-[11px] px-3 py-1 rounded-full font-bold shadow-md ${cfg.badge}`}>
                          {cfg.label}
                        </span>
                      </div>
                      {/* Category badge */}
                      <div className="absolute bottom-3 left-3">
                        <span className="text-[11px] px-2.5 py-1 rounded-full font-bold bg-black/40 backdrop-blur-sm text-white">
                          {CATEGORY_MAP[report.category_id] || "Lainnya"}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-extrabold text-[#2b1d15] text-sm mb-2 line-clamp-1">
                        {report.header}
                      </h3>

                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center gap-1 text-[11px] text-[#b89f8d]">
                          <UserIcon />
                          <span>{report.username || "Unknown"}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-[#b89f8d]">
                          <CalendarIcon />
                          <span>{new Date(report.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                        </div>
                        {report.location && (
                          <div className="flex items-center gap-1 text-[11px] text-[#b89f8d]">
                            <MapPinIcon />
                            <span className="truncate max-w-[100px]">{report.location}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-[#6b5040] line-clamp-2 leading-relaxed flex-1">
                        {report.body}
                      </p>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#f0e8df]" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={(e) => handleApprove(report.id, e)}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-green-50 border border-green-100 text-green-600 hover:bg-green-500 hover:text-white hover:border-green-500 py-2 rounded-xl text-xs font-bold transition-all duration-200"
                        >
                          <CheckCircleIcon />
                          Approve
                        </button>
                        <button
                          onClick={(e) => handleReject(report.id, e)}
                          className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 py-2 rounded-xl text-xs font-bold transition-all duration-200"
                        >
                          <XCircleIcon />
                          Reject
                        </button>
                        <button
                          onClick={(e) => handleDelete(report.id, e)}
                          className="w-9 h-9 flex items-center justify-center bg-[#f7f3ef] border border-[#e8d9cc] text-[#a07a5e] hover:bg-red-500 hover:text-white hover:border-red-500 rounded-xl transition-all duration-200 flex-shrink-0"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    </div>

                    {/* Bottom stripe */}
                    <div className={`h-1 w-full ${
                      report.status === "approved" ? "bg-gradient-to-r from-green-400 to-emerald-300"
                      : report.status === "rejected" ? "bg-gradient-to-r from-red-400 to-red-300"
                      : "bg-gradient-to-r from-amber-300 to-yellow-200"
                    }`} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* ══════════════════════════════════════
          MODAL — DETAIL + CHAT
      ══════════════════════════════════════ */}
      {modalOpen && selectedReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-[28px] overflow-hidden flex shadow-2xl border border-[#eee5da]">

            {/* ── LEFT — DETAIL ── */}
            <div className="w-[52%] flex flex-col overflow-hidden border-r border-[#f0e8df]">

              {/* Detail header strip */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b] px-6 py-5 flex-shrink-0">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-[24px] border-white/5" />
                <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full border-[20px] border-white/5" />

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
                    onClick={closeModal}
                    className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition flex-shrink-0 mt-1"
                  >
                    <XMarkIcon />
                  </button>
                </div>
              </div>

              {/* Image */}
              {selectedReport.image && (
                <div className="h-44 overflow-hidden flex-shrink-0">
                  <img
                    src={`http://localhost:5000/uploads/${selectedReport.image}`}
                    alt={selectedReport.header}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Scrollable detail content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">

                {/* Status + action buttons */}
                <div className="flex items-center justify-between">
                  <StatusPill status={selectedReport.status} />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleApprove(selectedReport.id, e)}
                      className="flex items-center gap-1 bg-green-50 border border-green-100 text-green-600 hover:bg-green-500 hover:text-white hover:border-green-500 px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-200"
                    >
                      <CheckCircleIcon />
                      Approve
                    </button>
                    <button
                      onClick={(e) => handleReject(selectedReport.id, e)}
                      className="flex items-center gap-1 bg-red-50 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-200"
                    >
                      <XCircleIcon />
                      Reject
                    </button>
                    <button
                      onClick={(e) => handleDelete(selectedReport.id, e)}
                      className="w-8 h-8 flex items-center justify-center bg-[#f7f3ef] border border-[#e8d9cc] text-[#a07a5e] hover:bg-red-500 hover:text-white hover:border-red-500 rounded-xl transition-all duration-200"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>

                <div className="border-t border-[#f0e8df]" />

                {/* Info rows */}
                {[
                  { icon: <UserIcon />,         label: "User",     value: selectedReport.username || "Unknown" },
                  { icon: <TagIcon />,           label: "Kategori", value: CATEGORY_MAP[selectedReport.category_id] || "Lainnya" },
                  { icon: <MapPinIcon />,        label: "Lokasi",   value: selectedReport.location || "-" },
                  { icon: <CalendarIcon />,      label: "Tanggal",  value: new Date(selectedReport.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) },
                  { icon: <ShieldCheckIcon />,   label: "Admin",    value: selectedReport.admin_username || "Belum ditangani" },
                ].map((row) => (
                  <div key={row.label} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#f0e8df] flex items-center justify-center text-[#c8956b] flex-shrink-0 mt-0.5">
                      {row.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-[#a07a5e] font-bold uppercase tracking-wider">{row.label}</p>
                      <p className="text-xs text-[#2b1d15] font-semibold mt-0.5 leading-snug">{row.value}</p>
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
                    <p className="text-[10px] text-[#a07a5e] font-bold uppercase tracking-wider">Deskripsi</p>
                  </div>
                  <div className="bg-[#fdf9f6] border border-[#f0e8df] rounded-xl p-3.5">
                    <p className="text-xs text-[#4b3022] leading-relaxed whitespace-pre-line">{selectedReport.body}</p>
                  </div>
                </div>

                {/* Report ID */}
                <div className="bg-[#f7f3ef] rounded-xl px-3.5 py-2.5 flex items-center justify-between">
                  <span className="text-[10px] text-[#a07a5e] font-bold uppercase tracking-wider">Report ID</span>
                  <span className="text-[11px] text-[#5c2d0e] font-extrabold font-mono">#{selectedReport.id}</span>
                </div>
              </div>
            </div>

            {/* ── RIGHT — CHAT ── */}
            <div className="w-[48%] flex flex-col bg-[#f7f3ef]">

              {/* Chat header */}
              <div className="px-5 py-4 border-b border-[#e8d9cc] bg-white flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5c2d0e] to-[#c8956b] flex items-center justify-center text-white">
                    <ChatBubbleIcon />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#a07a5e] font-bold uppercase tracking-wider">Room Chat</p>
                    <p className="text-sm font-extrabold text-[#2b1d15]">Diskusi Laporan</p>
                  </div>
                </div>
              </div>

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {chats.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-[#b89f8d]">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-[#e8d9cc] flex items-center justify-center mb-3 text-[#c8956b]">
                      <ChatBubbleIcon />
                    </div>
                    <p className="text-sm font-semibold">Belum ada pesan</p>
                    <p className="text-xs mt-1">Mulai diskusi dengan user</p>
                  </div>
                )}

                {chats.map((c) => {
                  const isMe = c.sender_id === currentUserId;
                  return (
                    <div key={c.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                      <div className={`
                        max-w-[78%] px-4 py-2.5 rounded-2xl text-sm shadow-sm
                        ${isMe
                          ? "bg-gradient-to-br from-[#5c2d0e] to-[#7a3f1c] text-white rounded-br-sm"
                          : "bg-white text-[#3d2a20] rounded-bl-sm border border-[#f0e8df]"
                        }
                      `}>
                        <p className={`text-[10px] font-bold mb-1 ${isMe ? "text-[#f0d5b8]/70" : "text-[#a07a5e]"}`}>
                          {c.username}
                        </p>
                        <p className="leading-relaxed text-[13px]">{c.message}</p>
                        <p className={`text-[10px] mt-1.5 ${isMe ? "text-[#f0d5b8]/50 text-right" : "text-[#b89f8d]"}`}>
                          {new Date(c.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat input */}
              <div className="px-4 py-3 bg-white border-t border-[#e8d9cc] flex-shrink-0">
                <div className="flex items-center gap-2">
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendChat()}
                    placeholder="Ketik pesan..."
                    className="flex-1 bg-[#fdf9f6] border border-[#e8d9cc] focus:border-[#c8956b] focus:ring-2 focus:ring-[#c8956b]/20 rounded-2xl px-4 py-2.5 text-sm text-[#2b1d15] placeholder-[#c4a98a] outline-none transition-all"
                  />
                  <button
                    onClick={sendChat}
                    disabled={!message.trim()}
                    className={`
                      w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-200
                      ${message.trim()
                        ? "bg-gradient-to-br from-[#5c2d0e] to-[#8b4a20] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
                        : "bg-[#f0e8df] text-[#c4a98a] cursor-not-allowed"
                      }
                    `}
                  >
                    <SendIcon />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}  
  
  
  
  // "use client";

  // import { useState, useEffect } from "react";
  // import { useRouter } from "next/navigation";
  // import {
  //   LayoutDashboard,
  //   FileText,
  //   MessageCircle,
  //   LogOut,
  //   ChevronLeft,
  //   UserCircle,
  // } from "lucide-react";

  // export default function ChatAdminPage() {
  //   const router = useRouter();

  // const [chats, setChats] = useState([]);
  // const [selectedChat, setSelectedChat] = useState(null);
  // const [messages, setMessages] = useState([]);
  // const [message, setMessage] = useState("");
  // const [user, setUser] = useState(null);
  // const [sidebarOpen, setSidebarOpen] = useState(true);
  // const [activeMenu, setActiveMenu] = useState("chat");


  // // GATAU INI PENEMPATANNYA BENER ATAU SALAH

  // const fetchChats = async (reportId) => {
  //   const token = localStorage.getItem("token");

  //   const res = await fetch(
  //     `http://localhost:5000/api/chats/${reportId}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );

  //   const data = await res.json();
  //   setMessages(data);
  // };

  // const fetchReports = async () => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     const res = await fetch("http://localhost:5000/api/posts/all", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     console.log("STATUS:", res.status);

  //     const data = await res.json();

  //     console.log("DATA REPORT:", data);

  //     setChats(
  //   Array.isArray(data.data) ? data.data : []
  // );

  //   } catch (err) {
  //     console.log("FETCH ERROR:", err);
  //   }
  // };

  // useEffect(() => {

  //   const storedUser = localStorage.getItem("user");

  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }

  //   fetchReports();

  // }, []);

  // const sendMessage = async () => {
  //   if (!message.trim() || !selectedChat) return;

  //   const token = localStorage.getItem("token");

  //   await fetch("http://localhost:5000/api/chats", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       public_report_id: selectedChat.id,
  //       message: message,
  //     }),
  //   });

  //   setMessage("");

  //   // refresh chat setelah kirim
  //   fetchChats(selectedChat.id);
  // };


  //   return (
  //     <div style={{ display: "flex", minHeight: "100vh", background: "linear-gradient(135deg, #fdfaf7 0%, #f8f4f0 100%)", fontFamily: "'DM Sans', sans-serif" }}>
  //       <style>{`
  //         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
  //         * { box-sizing: border-box; }
  //         input, button { font-family: inherit; }
  //         input::placeholder { color: #c0b0a0; }
  //         ::-webkit-scrollbar { width: 4px; }
  //         ::-webkit-scrollbar-track { background: transparent; }
  //         ::-webkit-scrollbar-thumb { background: #d4c4b4; border-radius: 4px; }
  //         .nav-link:hover { background: rgba(139,94,60,0.1) !important; color: #8b5e3c !important; }
  //         .row-hover:hover { background: #faf8f5 !important; cursor: pointer; }
  //         .filter-btn { cursor: pointer; transition: all 0.15s; }
  //         .filter-btn:hover { opacity: 0.8; }
  //         .action-icon:hover { opacity: 0.6; }
  //         .page-btn:hover { background: #f0e9e2 !important; }
  //       `}</style>

  //       {/* ── SIDEBAR (BARU) ── */}
  //   {/* SIDEBAR */}
  // <aside
  //   className={`
  //     fixed top-0 left-0 h-full z-30 flex flex-col
  //     bg-gradient-to-b from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b]
  //     text-white transition-all duration-300 ease-in-out
  //     ${sidebarOpen ? "w-64" : "w-20"}
  //   `}
  // >

  //   {/* LOGO */}
  //   <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
  //     {sidebarOpen && (
  //       <h1 className="text-2xl font-extrabold text-[#f0d5b8]">
  //         Call It!
  //       </h1>
  //     )}
  //   </div>

  //   {/* ADMIN PROFILE */}
  //   {sidebarOpen ? (
  //     <div className="mx-4 mt-5 mb-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4 flex items-center gap-3">

  //       <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#f0d5b8] to-[#c8956b] flex items-center justify-center">
  //         <UserCircle className="text-white" size={22} />
  //       </div>

  //       <div>
  //         <p className="text-sm font-bold">
  //           {user?.username || "Admin"}
  //         </p>
  //         <p className="text-[11px] text-[#e7c8ab]">
  //           Admin Panel
  //         </p>
  //       </div>

  //     </div>
  //   ) : (
  //     <div className="flex justify-center mt-5 mb-2">
  //       <UserCircle size={28} />
  //     </div>
  //   )}

  //   {/* NAV */}
  //   <nav className="flex-1 flex flex-col gap-1 px-3 mt-4">

  //     {[
  //       {
  //         key: "dashboard",
  //         label: "Dashboard",
  //         icon: LayoutDashboard,
  //         action: () => router.push("/admin/dashboard"),
  //       },
  //       {
  //         key: "laporan",
  //         label: "Kelola Laporan",
  //         icon: FileText,
  //         action: () => router.push("/admin/laporan"),
  //       },
  //       {
  //         key: "chat",
  //         label: "Chat Admin",
  //         icon: MessageCircle,
  //         action: () => router.push("/admin/chatadmin"),
  //       },
  //     ].map((item) => {
  //       const Icon = item.icon;

  //       return (
  //         <button
  //           key={item.key}
  //           onClick={() => {
  //             setActiveMenu(item.key);
  //             item.action();
  //           }}
  //           className={`
  //             flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all
  //             ${
  //               activeMenu === item.key
  //                 ? "bg-[#c8956b] text-white shadow-lg"
  //                 : "text-[#f3d7bf] hover:bg-white/10 hover:text-white"
  //             }
  //             ${!sidebarOpen ? "justify-center" : ""}
  //           `}
  //         >
  //           <Icon size={20} />
  //           {sidebarOpen && <span>{item.label}</span>}
  //         </button>
  //       );
  //     })}

  //   </nav>

  //   {/* LOGOUT */}
  //   <div className="px-3 pb-6">
  //     <button
  //       onClick={() => {
  //         localStorage.clear();
  //         router.push("/login");
  //       }}
  //       className={`
  //         flex items-center gap-3 px-3 py-3 rounded-xl w-full
  //         text-[#ffd1b8] hover:bg-[#3d2718] transition
  //         ${!sidebarOpen ? "justify-center" : ""}
  //       `}
  //     >
  //       <LogOut size={20} />
  //       {sidebarOpen && "Logout"}
  //     </button>
  //   </div>

  //   {/* TOGGLE */}
  //   <button
  //     onClick={() => setSidebarOpen(!sidebarOpen)}
  //     className="absolute -right-3 top-7 w-6 h-6 bg-[#d8b08c] rounded-full flex items-center justify-center shadow"
  //   >
  //     <ChevronLeft
  //       size={14}
  //       className={`${!sidebarOpen ? "rotate-180" : ""}`}
  //     />
  //   </button>

  // </aside>

  //       {/* ── MAIN CONTENT ── */}
  //         <div
  //           style={{
  //             marginLeft: 260,
  //             flex: 1,
  //             height: "100vh",
  //             display: "flex",
  //             flexDirection: "column",
  //             overflow: "hidden",
  //           }}
  //         >        
  //         {/* MAIN CONTENT (SESUAI ASLI) */}
  //         <main className="flex flex-1 p-6 gap-6 overflow-hidden h-full">
  //           {/* CHAT LIST */}
  //           <section className="w-[360px] h-full bg-white rounded-[32px] border border-[#eee3da] shadow-sm flex flex-col overflow-hidden">
  //             <div className="p-6 border-b border-[#f1e7df]">
  //               <h2 className="text-2xl font-bold mb-5">Chats</h2>

  //               <div className="bg-[#f8f3ef] rounded-2xl px-4 py-3 flex items-center gap-3 border border-[#eee3da]">
  //                 <svg
  //                   xmlns="http://www.w3.org/2000/svg"
  //                   fill="none"
  //                   viewBox="0 0 24 24"
  //                   strokeWidth={1.5}
  //                   stroke="currentColor"
  //                   className="w-5 h-5 text-[#9d8b7d]"
  //                 >
  //                   <path
  //                     strokeLinecap="round"
  //                     strokeLinejoin="round"
  //                     d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.5 5.5a7.5 7.5 0 0 0 11.15 11.15Z"
  //                   />
  //                 </svg>

  //                 <input
  //                   type="text"
  //                   placeholder="Search conversation..."
  //                   className="bg-transparent outline-none w-full text-sm"
  //                 />
  //               </div>
  //             </div>

  //             <div className="flex-1 overflow-y-auto p-4 space-y-4">
  //               {chats.map((chat) => (

  //                 <button
  //                   key={chat.id}
  //                 onClick={() => { setSelectedChat(chat); fetchChats(chat.id); }}
  //                   className={`w-full text-left rounded-3xl p-4 border transition-all ${
  //                     selectedChat?.id === chat.id
  //                       ? "bg-[#8b5a34] text-white border-[#8b5a34] shadow-md"
  //                       : "bg-[#fcfaf8] border-[#f0e5dd] hover:bg-[#f5efea]"
  //                   }`}
  //                 >
  //                   <div className="flex gap-4 items-start">
  //                     <div className="w-14 h-14 rounded-full bg-[#dbc4b2] flex items-center justify-center font-bold text-lg shrink-0">
  //                       {chat.username?.charAt(0)}
  //                     </div>

  //                     <div className="flex-1 min-w-0">
  //                       <div className="flex items-center justify-between">
  //                         <h3 className="font-semibold truncate">
  //                             {chat.name || chat.username || "Unknown User"}
  //                           </h3>
  //                         <span className="text-xs opacity-70">{new Date(chat.created_at).toLocaleTimeString([], {
  //                               hour: "2-digit",
  //                               minute: "2-digit",
  //                             })}</span>
  //                             </div>

  //                       <p className="text-sm mt-2 truncate opacity-80">
  //                         {chat.lastMessage || "Belum ada pesan"}
  //                       </p>
  //                     </div>
  //                   </div>
  //                 </button>
  //               ))}
  //             </div>
  //           </section>

  //           {/* CHAT ROOM */}
  //           <section className="flex-1 bg-white rounded-[32px] border border-[#eee3da] shadow-sm overflow-hidden flex flex-col h-full">
  //             {!selectedChat ? (
  //               <div className="flex-1 flex flex-col items-center justify-center text-center px-10 bg-[#fcfaf8]">
  //                 <div className="w-52 h-52 rounded-full bg-[#f3ebe4] mb-10 flex items-center justify-center border border-[#eadfd4]">
  //                   <div className="w-28 h-28 border-4 border-[#b28b70] rounded-[30px]" />
  //                 </div>

  //                 <h2 className="text-4xl font-bold text-[#5a4332] mb-4">
  //                   Select a conversation
  //                 </h2>

  //                 <p className="text-[#9b8b7f] text-lg max-w-lg leading-relaxed">
  //                   Choose a user report discussion to start replying.
  //                 </p>
  //               </div>
  //             ) : (
  //               <>
  //                 {/* HEADER */}
  //                 <div className="px-8 py-6 border-b border-[#f1e7df] bg-[#fcfaf8] flex items-center justify-between">
  //                   <div className="flex items-center gap-4">
  //                     <div className="w-14 h-14 rounded-full bg-[#dbc4b2] flex items-center justify-center font-bold text-lg">
  //                       {selectedChat.username?.charAt(0)}
  //                     </div>

  //                     <div>
  //                       <h3 className="font-bold text-lg">
  //                             {selectedChat.name || selectedChat.username || "Unknown User"}
  //                           </h3>
  //                       <p className="text-sm text-[#9d8b7d]">
  //                         Report Discussion
  //                       </p>
  //                     </div>
  //                   </div>

  //                   <span className="px-4 py-2 rounded-full bg-[#fff1df] text-[#b36b00] text-sm font-semibold">
  //                     {selectedChat.status}
  //                   </span>
  //                 </div>

  //                 {/* MESSAGES */}
  //                 <div className="flex-1 overflow-y-auto p-8 bg-[#faf7f4] space-y-6 min-h-0">

  //                   {messages.length === 0 ? (
  //                     <div className="h-full flex items-center justify-center text-[#9d8b7d]">
  //                       Belum ada chat
  //                     </div>
  //                   ) : (
  //                     messages.map((msg, index) => (
  //                       <div
  //                         key={index}
  //                         className={`flex ${
  //                           msg.sender_id === user?.id
  //                             ? "justify-end"
  //                             : "justify-start"
  //                         }`}
  //                       >
  //                         <div
  //                           className={`max-w-[70%] rounded-[28px] px-5 py-4 shadow-sm ${
  //                             msg.sender_id === user?.id
  //                               ? "bg-[#8b5a34] text-white"
  //                               : "bg-white border border-[#eee3da]"
  //                           }`}
  //                         >

  //                           {/* NAMA USER */}
  //                           <p
  //                             className={`text-xs font-semibold mb-2 ${
  //                               msg.sender_id === user?.id
  //                                 ? "text-white/80"
  //                                 : "text-[#8b5a34]"
  //                             }`}
  //                           >
  //                             {msg.username}
  //                           </p>

  //                           {/* ISI CHAT */}
  //                           <p className="leading-relaxed break-words">
  //                             {msg.message}
  //                           </p>

  //                           {/* JAM */}
  //                           <p
  //                             className={`text-xs mt-3 text-right ${
  //                               msg.sender_id === user?.id
  //                                 ? "text-white/70"
  //                                 : "text-[#9d8b7d]"
  //                             }`}
  //                           >
  //                             {new Date(msg.created_at).toLocaleTimeString([], {
  //                               hour: "2-digit",
  //                               minute: "2-digit",
  //                             })}
  //                           </p>

  //                         </div>
  //                       </div>
  //                     ))
  //                   )}

  //                 </div>

  //                 {/* INPUT */}
  //                 <div className="p-6 border-t border-[#f1e7df] bg-white">
  //                   <div className="bg-[#faf7f4] border border-[#eee3da] rounded-3xl px-5 py-4 flex items-center gap-4">
  //                     <input
  //                       type="text"
  //                       value={message}
  //                       onChange={(e) => setMessage(e.target.value)}
  //                       placeholder="Type your reply..."
  //                       className="flex-1 bg-transparent outline-none"
  //                     />

  //                     <button
  //                         onClick={sendMessage}
  //                         className="bg-[#8b5a34] hover:bg-[#774a29] transition text-white px-7 py-3 rounded-2xl font-semibold shadow-sm"
  //                       >
  //                         Send
  //                       </button>
                      
  //                   </div>
  //                 </div>
  //               </>
  //             )}
  //           </section>
  //         </main>
  //       </div>
  //     </div>
  //   );
  // }