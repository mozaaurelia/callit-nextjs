"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// ── Heroicons (inline SVG) ──────────────────────────────────────────────────
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.092 0L22.25 12M4.5 9.75V19.5A1.5 1.5 0 006 21h3.75a.75.75 0 00.75-.75v-4.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V20.25a.75.75 0 00.75.75H18a1.5 1.5 0 001.5-1.5V9.75" />
  </svg>
);

const PlusCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DocumentTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M7.5 4.5h9A2.25 2.25 0 0118.75 6.75v10.5A2.25 2.25 0 0116.5 19.5h-9A2.25 2.25 0 015.25 17.25V6.75A2.25 2.25 0 017.5 4.5z" />
  </svg>
);

const UserCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
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

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

// ───────────────────────────────────────────────────────────────────────────

export default function UserHomepage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState("");

  // DATA REPORT DARI DATABASE
  const [reports, setReports] = useState([]);

  // STATS
  const [totalReports, setTotalReports] = useState(0);
  const [approvedReports, setApprovedReports] = useState(0);
  const [rejectedReports, setRejectedReports] = useState(0);

  // UI STATE
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);

      if (parsedUser.role !== "user") {
        router.push("/login");
        return;
      }

      setUser(parsedUser);

      // LOAD FOTO PROFILE
      const savedProfile = localStorage.getItem(`profileImage_${parsedUser.id}`);
      if (savedProfile) setProfileImage(savedProfile);

      // FETCH REPORTS DARI DATABASE
      fetchReports(token);
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router]);


  // =========================
  // FETCH REPORT DATABASE
  // =========================
  const fetchReports = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

     const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setReports(Array.isArray(data) ? data : data.data || []);

      setReports(data);

      // TOTAL REPORT
      setTotalReports(data.length);

      // APPROVED
      const approved = data.filter((item) => item.status === "approved");
      setApprovedReports(approved.length);

      // REJECTED
      const rejected = data.filter((item) => item.status === "rejected");
      setRejectedReports(rejected.length);
    } catch (error) {
      console.log("FETCH REPORT ERROR:", error);
    }
  };


  // =========================
  // UPLOAD FOTO PROFILE
  // =========================
  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageBase64 = reader.result;
      setProfileImage(imageBase64);
      localStorage.setItem(`profileImage_${user.id}`, imageBase64);
    };
    reader.readAsDataURL(file);
  };


  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  // FILTERED REPORTS
 const filteredReports = Array.isArray(reports)
  ? reports.filter((r) => {
      const query = searchQuery.toLowerCase();

      return (
        r.header?.toLowerCase().includes(query) ||
        r.body?.toLowerCase().includes(query) ||
        r.status?.toLowerCase().includes(query)
      );
    })
  : [];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f3ef]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#c8956b] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#7a5c44] font-medium text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    {
      key: "home",
      label: "Home",
      icon: <HomeIcon />,
      action: () => setActiveMenu("home"),
    },
    {
      key: "create",
      label: "Create Report",
      icon: <PlusCircleIcon />,
      action: () => router.push("/user/createreport"),
    },
    {
      key: "reports",
      label: "My Reports",
      icon: <DocumentTextIcon />,
      action: () => router.push("/user/myreport"),
    },
    {
      key: "profile",
      label: "Profile",
      icon: <UserCircleIcon />,
      action: () => router.push("/user/profile"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f3ef] flex">

      {/* ══════════════════════════════════════
          SIDEBAR
      ══════════════════════════════════════ */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-30 flex flex-col
          bg-linear-to-b from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b] text-white
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? "w-64" : "w-20"}
        `}
      >
        {/* Logo area */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
          {sidebarOpen && (
            <h1 className="text-2xl font-extrabold text-[#f0d5b8] tracking-tight whitespace-nowrap">
              Call It!
            </h1>
          )}
        </div>

        {/* Profile mini card (expanded) */}
        {sidebarOpen && (
          <div className="mx-4 mt-5 mb-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4 flex items-center gap-3">
            <div className="relative group shrink-0">
              <img
                src={
                  profileImage
                    ? profileImage
                    : `https://ui-avatars.com/api/?name=${user.username}&background=c8956b&color=fff`
                }
                alt="profile"
                className="w-11 h-11 rounded-full object-cover border-2 border-[#c8956b] cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              />
              <div
                onClick={() => fileInputRef.current.click()}
                className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer"
              >
                <span className="text-white text-[10px] font-bold">Edit</span>
              </div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user.username}</p>
              <p className="text-[11px] text-[#a87c5e]">User Account</p>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleProfileUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Profile avatar (collapsed) */}
        {!sidebarOpen && (
          <div className="flex justify-center mt-5 mb-2">
            <img
              src={
                profileImage
                  ? profileImage
                  : `https://ui-avatars.com/api/?name=${user.username}&background=c8956b&color=fff`
              }
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#c8956b] cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleProfileUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Nav items */}
        <nav className="flex-1 flex flex-col gap-1 px-3 mt-3">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                item.action();
                setActiveMenu(item.key);
              }}
              title={!sidebarOpen ? item.label : ""}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-sm font-semibold
                ${activeMenu === item.key
                  ? "bg-[#c8956b] text-white shadow-lg shadow-[#c8956b]/30"
                  : "text-[#f3d7bf] hover:bg-white/10 hover:text-white"
                }
                ${!sidebarOpen ? "justify-center" : ""}
              `}
            >
              <span className="shrink-0">{item.icon}</span>
              {sidebarOpen && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom: Notification + Logout */}
        <div className="px-3 pb-6 flex flex-col gap-1">

          {/* Notification button */}
          <button
            title={!sidebarOpen ? "Notifications" : ""}
            className={`
              flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
              text-[#c8a98a] hover:bg-white/10 hover:text-[#f0d5b8] text-sm font-semibold
              ${!sidebarOpen ? "justify-center" : ""}
            `}
          >
            <span className="relative shrink-0">
              <BellIcon />
              {/* Red dot badge */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#e57c4a] rounded-full border-2 border-[#2b1d15]" />
            </span>
            {sidebarOpen && <span>Notifications</span>}
          </button>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            title={!sidebarOpen ? "Logout" : ""}
            className={`
              flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
              text-[#e57c4a] hover:bg-[#3d2718] hover:text-[#ff9a72] text-sm font-semibold
              ${!sidebarOpen ? "justify-center" : ""}
            `}
          >
            <span className="shrink-0"><ArrowRightOnRectangleIcon /></span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>

        {/* Collapse toggle button */}
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
      <main
        className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"} min-h-screen`}
      >

        {/* TOP BAR */}
        <div className="sticky top-0 z-20 bg-[#f7f3ef]/80 backdrop-blur-md border-b border-[#e8d9cc] px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#a07a5e] font-semibold uppercase tracking-widest">
              Dashboard
            </p>
            <h2 className="text-xl font-extrabold text-[#2b1d15]">
              Welcome back, {user.username} 👋
            </h2>
          </div>

          {/* Search bar — desktop */}
          <div className="relative hidden md:flex items-center">
            <span className="absolute left-3 text-[#a07a5e] pointer-events-none">
              <MagnifyingGlassIcon />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search complaints..."
              className="
                pl-9 pr-5 py-2.5 rounded-2xl border border-[#ddd0c5]
                bg-white/80 backdrop-blur text-sm text-[#3b2f2f]
                placeholder-[#b89f8d] outline-none
                focus:ring-2 focus:ring-[#c8956b]/40 focus:border-[#c8956b]
                shadow-sm w-72 transition-all
              "
            />
          </div>
        </div>


        <div className="px-8 py-8 max-w-6xl mx-auto">

          {/* ── HERO ───────────────────────────────────────────────── */}
          <div className="relative rounded-[28px] overflow-hidden mb-8 shadow-xl">

            {/* Background gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b]" />

            {/* Glow blobs */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 50%, rgba(255,200,150,0.45) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255,160,80,0.3) 0%, transparent 45%)
                `,
              }}
            />

            {/* Decorative rings */}
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full border-40 border-white/5" />
            <div className="absolute -bottom-20 -left-10 w-64 h-64 rounded-full border-30 border-white/5" />

            {/* Decorative dots */}
            <div className="absolute top-4 right-32 w-4 h-4 rounded-full bg-[#f0c090]/40" />
            <div className="absolute bottom-6 right-16 w-6 h-6 rounded-full bg-[#f0c090]/20" />
            <div className="absolute top-8 left-1/2 w-2 h-2 rounded-full bg-white/30" />

            {/* Content */}
            <div className="relative z-10 px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="inline-block bg-white/15 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider backdrop-blur-sm">
                  📋 Report Dashboard
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2">
                  Hello, {user.username}!
                </h1>
                <p className="text-[#7a4f2f] text-base font-medium opacity-90">
                  Here's an overview of all your reports.
                </p>
              </div>

              <div className="flex gap-3 shrink-0">
                <button
                  onClick={() => router.push('/user/createreport')}
                  className="flex items-center gap-2 bg-white text-[#5c2d0e] font-bold px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm"
                >
                  <PlusCircleIcon />
                  New Report
                </button>
                <button
                  onClick={() => router.push('/user/myreport')}
                  className="flex items-center gap-2 bg-white/15 backdrop-blur text-white font-semibold px-5 py-3 rounded-2xl border border-white/20 hover:bg-white/25 transition-all duration-200 text-sm"
                >
                  <DocumentTextIcon />
                  My Reports
                </button>
              </div>
            </div>
          </div>


          {/* ── STAT CARDS ─────────────────────────────────────────── */}
          <div className="grid md:grid-cols-3 gap-5 mb-10">

            {/* Total Reports */}
            <div className="group relative bg-white rounded-3xl border border-[#eee5da] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden p-6">
              <div className="absolute inset-0 bg-linear-to-br from-[#fdf6f0] to-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#5c2d0e] to-[#8b4a20] flex items-center justify-center shadow-md shadow-[#8b4a20]/30 shrink-0 text-2xl">
                  📋
                </div>
                <div>
                  <p className="text-xs text-[#a07a5e] font-bold uppercase tracking-wider mb-1">Total Reports</p>
                  <h2 className="text-4xl font-extrabold text-[#2b1d15]">{totalReports}</h2>
                </div>
              </div>
              <div className="relative z-10 mt-4 h-1.5 rounded-full bg-[#f0e5d8] overflow-hidden">
                <div className="h-full rounded-full bg-linear-to-r from-[#5c2d0e] to-[#c8956b]" style={{ width: "100%" }} />
              </div>
            </div>

            {/* Approved Reports */}
            <div className="group relative bg-white rounded-3xl border border-[#eee5da] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdf4] to-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#16a34a] to-[#22c55e] flex items-center justify-center shadow-md shadow-green-500/30 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#a07a5e] font-bold uppercase tracking-wider mb-1">Approved</p>
                  <h2 className="text-4xl font-extrabold text-green-600">{approvedReports}</h2>
                </div>
              </div>
              <div className="relative z-10 mt-4 h-1.5 rounded-full bg-green-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-700"
                  style={{ width: totalReports ? `${(approvedReports / totalReports) * 100}%` : "0%" }}
                />
              </div>
              <p className="relative z-10 text-[11px] text-green-500 font-semibold mt-1">
                {totalReports ? Math.round((approvedReports / totalReports) * 100) : 0}% of total
              </p>
            </div>

            {/* Rejected Reports */}
            <div className="group relative bg-white rounded-3xl border border-[#eee5da] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fff1f2] to-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#dc2626] to-[#f87171] flex items-center justify-center shadow-md shadow-red-400/30 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#a07a5e] font-bold uppercase tracking-wider mb-1">Rejected</p>
                  <h2 className="text-4xl font-extrabold text-red-500">{rejectedReports}</h2>
                </div>
              </div>
              <div className="relative z-10 mt-4 h-1.5 rounded-full bg-red-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-700"
                  style={{ width: totalReports ? `${(rejectedReports / totalReports) * 100}%` : "0%" }}
                />
              </div>
              <p className="relative z-10 text-[11px] text-red-400 font-semibold mt-1">
                {totalReports ? Math.round((rejectedReports / totalReports) * 100) : 0}% of total
              </p>
            </div>
          </div>


          {/* ── RECENT REPORTS ─────────────────────────────────────── */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-extrabold text-[#2b1d15]">Recent Reports</h2>
                <p className="text-sm text-[#a07a5e] mt-0.5">
                  {filteredReports.length} report{filteredReports.length !== 1 ? "s" : ""} found
                </p>
              </div>

              {/* Mobile search */}
              <div className="relative flex md:hidden items-center">
                <span className="absolute left-3 text-[#a07a5e] pointer-events-none">
                  <MagnifyingGlassIcon />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="
                    pl-9 pr-4 py-2 rounded-2xl border border-[#ddd0c5] bg-white
                    text-sm text-[#3b2f2f] placeholder-[#b89f8d] outline-none
                    focus:ring-2 focus:ring-[#c8956b]/40 focus:border-[#c8956b]
                    w-44 shadow-sm transition-all
                  "
                />
              </div>
            </div>

            {/* Empty state */}
            {filteredReports.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#b89f8d]">
                <span className="text-6xl mb-4">📭</span>
                <p className="text-lg font-semibold">No reports found</p>
                <p className="text-sm mt-1">Try adjusting your search or create a new report.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-4 gap-5">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="group bg-white rounded-3xl overflow-hidden border border-[#eee5da] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-44">
                      <img
                        src={
                          report.image
                            ? `http://localhost:5000/uploads/${report.image}`
                            : "https://via.placeholder.com/400x300?text=No+Image"
                        }
                        alt={report.header}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Status badge on image */}
                      <div className="absolute top-3 right-3">
                        <span
                          className={`text-[11px] px-3 py-1 rounded-full font-bold shadow-md
                            ${report.status === "approved"
                              ? "bg-green-500 text-white"
                              : report.status === "rejected"
                              ? "bg-red-500 text-white"
                              : "bg-amber-400 text-amber-900"
                            }`}
                        >
                          {report.status}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-extrabold text-[#2b1d15] line-clamp-1 text-sm mb-1">
                        {report.header}
                      </h3>

                      <p className="text-[11px] text-[#b89f8d] mb-3 flex items-center gap-1">
                        <CalendarIcon />
                        {new Date(report.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>

                      <p className="text-xs text-[#6b5040] line-clamp-3 flex-1 leading-relaxed">
                        {report.body}
                      </p>
                    </div>

                    {/* Bottom color stripe */}
                    <div
                      className={`h-1 w-full
                        ${report.status === "approved"
                          ? "bg-gradient-to-r from-green-400 to-emerald-300"
                          : report.status === "rejected"
                          ? "bg-gradient-to-r from-red-400 to-red-300"
                          : "bg-gradient-to-r from-amber-300 to-yellow-200"
                        }`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
} 