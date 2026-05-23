"use client";
import { useEffect, useState } from "react";
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

const ArrowRightOnRectangleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </svg>
);

const ChartBarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const ChevronLeftIcon = ({ rotated }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white"
    className={`w-3 h-3 transition-transform duration-300 ${rotated ? "rotate-180" : ""}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

// ───────────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [reports, setReports] = useState([]);
    const [users, setUsers] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeMenu, setActiveMenu] = useState("dashboard");

    const deleteReport = async (id) => {
        try {
            const confirmDelete = window.confirm("Yakin ingin menghapus laporan ini?");
            if (!confirmDelete) return;

            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Gagal menghapus laporan");

            setReports((prev) => prev.filter((item) => item.id !== id));
            alert("Laporan berhasil dihapus");
        } catch (err) {
            console.error("DELETE REPORT ERROR:", err);
            alert(err.message);
        }
    };

    const fetchData = async (token) => {
        try {
            console.log(" [DASHBOARD] Fetching data with token...");
            console.log(" [DASHBOARD] Token:", token.substring(0, 30) + "...");

            if (!token || !token.startsWith("eyJ")) {
                console.error("[DASHBOARD] Invalid token format!");
                throw new Error("Token tidak valid");
            }

            console.log("[DASHBOARD] Fetching posts...");
            const postRes = await fetch("http://localhost:5000/api/posts/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log(" [DASHBOARD] Posts response status:", postRes.status);

            if (postRes.status === 401) {
                console.error(" [DASHBOARD] Unauthorized - token expired or invalid");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                router.push("/login");
                return;
            }

            const postData = await postRes.json();
            console.log(" [DASHBOARD] Posts data:", postData);

            console.log(" [DASHBOARD] Fetching users...");
            const userRes = await fetch("http://localhost:5000/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log(" [DASHBOARD] Users response status:", userRes.status);

            if (userRes.status === 401) {
                console.error(" [DASHBOARD] Unauthorized - token expired or invalid");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                router.push("/login");
                return;
            }

            const userData = await userRes.json();
            console.log("[DASHBOARD] Users data:", userData);

            const usersArray =
                userData.data ||
                userData.users ||
                userData.result ||
                userData ||
                [];

            console.log("[DASHBOARD] Extracted users:", {
                length: usersArray.length,
                data: usersArray,
            });

            setReports(Array.isArray(postData) ? postData : postData.data || []);
            setUsers(Array.isArray(usersArray) ? usersArray : []);
            setError("");
        } catch (err) {
            console.error("[DASHBOARD] Fetch error:", err);
            setError(err.message || "Gagal memuat data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        try {
            console.log("[DASHBOARD] Initializing...");

            const storedUser = localStorage.getItem("user");
            const token = localStorage.getItem("token");

            console.log(" [DASHBOARD] Retrieved from localStorage:", {
                userExists: !!storedUser,
                tokenExists: !!token,
                tokenLength: token?.length,
                tokenPreview: token?.substring(0, 30) + "...",
            });

            if (!token) {
                console.warn("[DASHBOARD] Token not found, redirecting to login");
                router.push("/login");
                return;
            }

            if (!storedUser) {
                console.warn("[DASHBOARD] User not found, redirecting to login");
                router.push("/login");
                return;
            }

            const parsedUser = JSON.parse(storedUser);

            if (parsedUser.role !== "admin" && parsedUser.role !== "superadmin") {
                console.warn("[DASHBOARD] User is not admin/superadmin, redirecting");
                router.push("/login");
                return;
            }

            console.log(" [DASHBOARD] User validated:", parsedUser);

            setUser(parsedUser);
            fetchData(token);
        } catch (err) {
            console.error(" [DASHBOARD] Initialization error:", err);
            setError("Error initializing dashboard");
            setLoading(false);
        }
    }, [router]);

    // CALCULATE STATS
    const totalReports = reports.length;
    const approvedReports = reports.filter((r) => r.status === "approved").length;
    const pendingReports = reports.filter((r) => r.status === "pending").length;
    const rejectedReports = reports.filter((r) => r.status === "rejected").length;
    const recentReports = [...reports].slice(3).reverse();

    // ── Nav items ──
    const navItems = [
        { key: "dashboard", label: "Dashboard", icon: <GridIcon />,         action: () => router.push("/admin/dashboard") },
        { key: "laporan",   label: "Kelola Laporan", icon: <DocumentTextIcon />, action: () => router.push("/admin/laporan") },
        { key: "chat",      label: "Chat Admin", icon: <ChatBubbleIcon />,   action: () => router.push("/admin/comments") },
        { key: "profile",   label: "Profile", icon: <UsersIcon />, action: () => router.push("/admin/profile") },
    ];

    // LOADING STATE
    if (loading || !user) {
        return (
            <div className="min-h-screen bg-[#f7f3ef] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-[#c8956b] border-t-transparent rounded-full animate-spin" />
                    <p className="text-[#7a5c44] font-medium text-sm">Memuat dashboard...</p>
                </div>
            </div>
        );
    }

    // ERROR STATE
    if (error) {
        return (
            <div className="min-h-screen bg-[#f7f3ef] flex items-center justify-center p-6">
                <div className="bg-white border border-red-200 p-8 rounded-3xl max-w-md text-center shadow-lg">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                        <XCircleIcon />
                    </div>
                    <h2 className="text-xl font-bold text-[#2b1d15] mb-2">Terjadi Kesalahan</h2>
                    <p className="text-[#a07a5e] mb-6 text-sm">{error}</p>
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            router.push("/login");
                        }}
                        className="bg-gradient-to-r from-[#5c2d0e] to-[#8b4a20] text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow hover:shadow-lg transition"
                    >
                        Kembali ke Login
                    </button>
                </div>
            </div>
        );
    }

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
                            <p className="text-[10px] text-[#d4a87a] font-semibold uppercase tracking-widest mt-0.5">
                                Admin Panel
                            </p>
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
                            <p className="text-sm font-bold text-white truncate">{user?.username}</p>
                            <p className="text-[11px] text-[#e7c8ab] capitalize">{user?.role}</p>
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

                {/* Logout */}
                <div className="px-3 pb-6">
                    <button
                        onClick={() => {
                            console.log("[LOGOUT] Logging out...");
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            router.push("/login");
                        }}
                        title={!sidebarOpen ? "Logout" : ""}
                        className={`
                            flex items-center gap-3 px-3 py-3 rounded-xl text-[#e57c4a]
                            hover:bg-[#3d2718] hover:text-[#ff9a72] transition-all text-sm font-semibold w-full
                            ${!sidebarOpen ? "justify-center" : ""}
                        `}
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
            <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"} min-h-screen`}>

                {/* TOPBAR */}
                <div className="sticky top-0 z-20 bg-[#f7f3ef]/80 backdrop-blur-md border-b border-[#e8d9cc] px-8 py-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-[#a07a5e] font-semibold uppercase tracking-widest">Admin Panel</p>
                        <h2 className="text-xl font-extrabold text-[#2b1d15]">
                            Selamat datang, {user?.username}
                        </h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden md:block">
                            <p className="text-xs font-bold text-[#5c2d0e] capitalize bg-[#f0e5d8] px-3 py-1 rounded-full border border-[#e8d0bb]">
                                {user?.role}
                            </p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-green-400 shadow-sm shadow-green-400/50" title="Online" />
                    </div>
                </div>

                <div className="px-8 py-8 max-w-7xl mx-auto">

                    {/* ── HERO STRIP ── */}
                    <div className="relative overflow-hidden rounded-[28px] mb-8 shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b]" />
                        <div className="absolute inset-0 opacity-25" style={{
                            backgroundImage: `radial-gradient(circle at 15% 50%, rgba(255,200,150,0.5) 0%, transparent 50%),
                                              radial-gradient(circle at 85% 20%, rgba(255,160,80,0.3) 0%, transparent 45%)`
                        }} />
                        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border-[36px] border-white/5" />
                        <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full border-[28px] border-white/5" />
                        <div className="absolute top-4 right-40 w-3 h-3 rounded-full bg-white/20" />
                        <div className="absolute bottom-5 right-20 w-5 h-5 rounded-full bg-white/10" />

                        <div className="relative z-10 px-10 py-8 flex items-center justify-between gap-6">
                            <div>
                                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-widest border border-white/10">
                                    Admin Dashboard
                                </span>
                                <h1 className="text-3xl font-extrabold text-white leading-tight mb-1">
                                    Overview Sistem
                                </h1>
                                <p className="text-[#f0d5b8]/80 text-sm">
                                    Pantau semua laporan dan aktivitas user dari satu tempat.
                                </p>
                            </div>
                            <div className="hidden md:flex items-center gap-4 flex-shrink-0">
                                <div className="text-right">
                                    <p className="text-[#f0d5b8]/70 text-xs font-semibold uppercase tracking-wider">Total Laporan</p>
                                    <p className="text-5xl font-extrabold text-white leading-none">{totalReports}</p>
                                </div>
                                <div className="w-px h-12 bg-white/20" />
                                <div className="text-right">
                                    <p className="text-[#f0d5b8]/70 text-xs font-semibold uppercase tracking-wider">Total User</p>
                                    <p className="text-5xl font-extrabold text-white leading-none">{users.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── STAT CARDS ── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                        {/* Total Laporan */}
                        <div className="group relative bg-white rounded-3xl border border-[#eee5da] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden p-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#fdf6f0] to-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#5c2d0e] to-[#8b4a20] flex items-center justify-center shadow-md shadow-[#8b4a20]/30 flex-shrink-0 text-white">
                                    <ChartBarIcon />
                                </div>
                                <div>
                                    <p className="text-xs text-[#a07a5e] font-bold uppercase tracking-wider mb-1">Total Laporan</p>
                                    <h2 className="text-4xl font-extrabold text-[#2b1d15] leading-none">{totalReports}</h2>
                                </div>
                            </div>
                            <div className="relative z-10 mt-4 h-1.5 rounded-full bg-[#f0e5d8] overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-[#5c2d0e] to-[#c8956b]" style={{ width: "100%" }} />
                            </div>
                        </div>

                        {/* Disetujui */}
                        <div className="group relative bg-white rounded-3xl border border-[#eee5da] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden p-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#f0fdf4] to-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#16a34a] to-[#22c55e] flex items-center justify-center shadow-md shadow-green-500/30 flex-shrink-0 text-white">
                                    <CheckCircleIcon />
                                </div>
                                <div>
                                    <p className="text-xs text-[#a07a5e] font-bold uppercase tracking-wider mb-1">Disetujui</p>
                                    <h2 className="text-4xl font-extrabold text-green-600 leading-none">{approvedReports}</h2>
                                </div>
                            </div>
                            <div className="relative z-10 mt-4 h-1.5 rounded-full bg-green-100 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-700"
                                    style={{ width: totalReports ? `${(approvedReports / totalReports) * 100}%` : "0%" }}
                                />
                            </div>
                            <p className="relative z-10 text-[11px] text-green-500 font-semibold mt-1">
                                {totalReports ? Math.round((approvedReports / totalReports) * 100) : 0}% dari total
                            </p>
                        </div>

                        {/* Total User */}
                        <div className="group relative bg-white rounded-3xl border border-[#eee5da] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden p-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#fdf6f0] to-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center shadow-md shadow-violet-400/30 flex-shrink-0 text-white">
                                    <UsersIcon />
                                </div>
                                <div>
                                    <p className="text-xs text-[#a07a5e] font-bold uppercase tracking-wider mb-1">Total User</p>
                                    <h2 className="text-4xl font-extrabold text-[#2b1d15] leading-none">{users.length}</h2>
                                </div>
                            </div>
                            <div className="relative z-10 mt-4 h-1.5 rounded-full bg-violet-100 overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400" style={{ width: "100%" }} />
                            </div>
                        </div>
                    </div>

                    {/* ── BOTTOM GRID ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Laporan Terbaru — 2/3 width */}
                        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#eee5da] shadow-sm overflow-hidden">

                            {/* Card header */}
                            <div className="px-6 py-5 border-b border-[#f0e8df] flex items-center justify-between">
                                <div>
                                    <h3 className="text-base font-extrabold text-[#2b1d15]">Laporan Terbaru</h3>
                                    <p className="text-xs text-[#a07a5e] mt-0.5">{recentReports.length} laporan ditampilkan</p>
                                </div>
                                <button
                                    onClick={() => router.push("/admin/laporan")}
                                    className="text-xs font-bold text-[#c8956b] hover:text-[#5c2d0e] transition px-3 py-1.5 rounded-xl hover:bg-[#f0e8df]"
                                >
                                    Lihat Semua
                                </button>
                            </div>

                            <div className="p-5 space-y-3">
                                {recentReports.length === 0 ? (
                                    <div className="text-center py-12 text-[#b89f8d]">
                                        <div className="w-12 h-12 rounded-2xl bg-[#f0e8df] flex items-center justify-center mx-auto mb-3 text-[#c8956b]">
                                            <DocumentTextIcon />
                                        </div>
                                        <p className="font-semibold text-sm">Belum ada laporan</p>
                                    </div>
                                ) : (
                                    recentReports.map((item) => (
                                        <div
                                            key={item.id}
                                            className="group flex items-center justify-between p-4 bg-[#fdf9f6] hover:bg-[#f7f0e9] rounded-2xl border border-[#f0e8df] hover:border-[#e8d0bb] transition-all duration-200"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f0e5d8] to-[#e8d0bb] flex items-center justify-center font-extrabold text-[#5c2d0e] text-sm flex-shrink-0">
                                                    {item.header?.charAt(0)?.toUpperCase() || "?"}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-[#2b1d15] text-sm truncate">
                                                        {item.header || "Unnamed"}
                                                    </p>
                                                    <p className="text-xs text-[#a07a5e] mt-0.5">
                                                        User ID: {item.user_id}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2.5 flex-shrink-0 ml-3">
                                                <span className={`text-[11px] px-2.5 py-1 rounded-full font-bold ${
                                                    item.status === "approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : item.status === "rejected"
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-amber-100 text-amber-700"
                                                }`}>
                                                    {item.status}
                                                </span>

                                                <button
                                                    onClick={() => deleteReport(item.id)}
                                                    className="w-8 h-8 rounded-xl bg-red-50 border border-red-100 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all duration-200"
                                                >
                                                    <TrashIcon />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Status Laporan — 1/3 width */}
                        <div className="bg-white rounded-3xl border border-[#eee5da] shadow-sm overflow-hidden">

                            <div className="px-6 py-5 border-b border-[#f0e8df]">
                                <h3 className="text-base font-extrabold text-[#2b1d15]">Status Laporan</h3>
                                <p className="text-xs text-[#a07a5e] mt-0.5">Ringkasan semua status</p>
                            </div>

                            <div className="p-5 space-y-3">

                                {/* Menunggu */}
                                <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                                    <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
                                        <ClockIcon />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-amber-600 font-bold uppercase tracking-wider">Menunggu</p>
                                        <p className="text-2xl font-extrabold text-amber-700 leading-none mt-0.5">{pendingReports}</p>
                                    </div>
                                    <div className="text-xs text-amber-500 font-semibold">
                                        {totalReports ? Math.round((pendingReports / totalReports) * 100) : 0}%
                                    </div>
                                </div>

                                {/* Disetujui */}
                                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-2xl">
                                    <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                                        <CheckCircleIcon />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-green-600 font-bold uppercase tracking-wider">Disetujui</p>
                                        <p className="text-2xl font-extrabold text-green-700 leading-none mt-0.5">{approvedReports}</p>
                                    </div>
                                    <div className="text-xs text-green-500 font-semibold">
                                        {totalReports ? Math.round((approvedReports / totalReports) * 100) : 0}%
                                    </div>
                                </div>

                                {/* Ditolak */}
                                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
                                    <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-red-500 flex-shrink-0">
                                        <XCircleIcon />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-red-500 font-bold uppercase tracking-wider">Ditolak</p>
                                        <p className="text-2xl font-extrabold text-red-600 leading-none mt-0.5">{rejectedReports}</p>
                                    </div>
                                    <div className="text-xs text-red-400 font-semibold">
                                        {totalReports ? Math.round((rejectedReports / totalReports) * 100) : 0}%
                                    </div>
                                </div>

                                {/* Progress overview */}
                                <div className="mt-2 pt-4 border-t border-[#f0e8df]">
                                    <p className="text-[11px] text-[#a07a5e] font-bold uppercase tracking-wider mb-2">Distribusi Status</p>
                                    <div className="h-3 rounded-full overflow-hidden flex gap-0.5">
                                        <div
                                            className="bg-amber-400 h-full transition-all duration-700"
                                            style={{ width: totalReports ? `${(pendingReports / totalReports) * 100}%` : "0%" }}
                                        />
                                        <div
                                            className="bg-green-500 h-full transition-all duration-700"
                                            style={{ width: totalReports ? `${(approvedReports / totalReports) * 100}%` : "0%" }}
                                        />
                                        <div
                                            className="bg-red-400 h-full transition-all duration-700"
                                            style={{ width: totalReports ? `${(rejectedReports / totalReports) * 100}%` : "0%" }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-[10px] text-amber-500 font-semibold">Pending</span>
                                        <span className="text-[10px] text-green-500 font-semibold">Approved</span>
                                        <span className="text-[10px] text-red-400 font-semibold">Rejected</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}