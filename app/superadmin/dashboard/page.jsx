"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(true);

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalReports: 0,
        activeAdmins: 0,
    });

    const [showEditModal, setShowEditModal] = useState(false);

    const [editForm, setEditForm] = useState({
        id: "",
        username: "",
        email: "",
        role: "user",
        password: "",
        confirmPassword: "",
    });

    // =========================
    // FETCH USERS
    // =========================
    const fetchUsers = async () => {
        try {
            setUsersLoading(true);

            const token = localStorage.getItem("token");

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await res.json();

            setUsers(result.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setUsersLoading(false);
        }
    };

    // =========================
    // FETCH STATS
    // =========================
    const fetchStats = async () => {
        try {
            const token = localStorage.getItem("token");

            const usersRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const usersData = await usersRes.json();

            const usersArray = usersData.data || [];

            const reportsRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/posts/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const reportsData = await reportsRes.json();

            const reportsArray = Array.isArray(reportsData)
                ? reportsData
                : reportsData.data || [];

            setStats({
                totalUsers: usersArray.length,
                activeAdmins: usersArray.filter((u) =>
                    ["admin", "superadmin"].includes(u.role)
                ).length,
                totalReports: reportsArray.length,
            });
        } catch (err) {
            console.error(err);
        }
    };

    // =========================
    // DELETE USER
    // =========================
    const handleDeleteUser = async (id) => {
        const confirmDelete = window.confirm(
            "Yakin ingin menghapus user ini?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await res.json();

            if (res.ok) {
                alert("User berhasil dihapus!");

                fetchUsers();
                fetchStats();
            } else {
                alert(result.message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // =========================
    // OPEN EDIT
    // =========================
    const handleOpenEdit = (userData) => {
        setEditForm({
            id: userData.id,
            username: userData.username || "",
            email: userData.email || "",
            role: userData.role || "user",
            password: "",
            confirmPassword: "",
        });

        setShowEditModal(true);
    };

    // =========================
    // UPDATE USER
    // =========================
    const handleUpdateUser = async () => {
        if (
            editForm.password &&
            editForm.password !== editForm.confirmPassword
        ) {
            alert("Password tidak sama");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/users/${editForm.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        username: editForm.username,
                        email: editForm.email,
                        role: editForm.role,
                        password: editForm.password,
                    }),
                }
            );

            const result = await response.json();

            if (response.ok) {
                alert("User berhasil diupdate!");

                setShowEditModal(false);

                fetchUsers();
                fetchStats();
            } else {
                alert(result.message || "Gagal update user");
            }
        } catch (error) {
            console.error(error);

            alert("Terjadi kesalahan");
        }
    };

    // =========================
    // AUTH CHECK
    // =========================
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!storedUser || !token) {
            router.push("/login");
            return;
        }

        try {
            const parsedUser = JSON.parse(storedUser);

            if (parsedUser.role !== "superadmin") {
                router.push("/login");
                return;
            }

            setUser(parsedUser);

            fetchUsers();
            fetchStats();
        } catch (err) {
            localStorage.clear();
            router.push("/login");
        } finally {
            setLoading(false);
        }
    }, [router]);

    // =========================
    // AUTO REFRESH
    // =========================
    useEffect(() => {
        if (!loading) {
            const interval = setInterval(() => {
                fetchUsers();
                fetchStats();
            }, 30000);

            return () => clearInterval(interval);
        }
    }, [loading]);

    // =========================
    // LOADING
    // =========================
    if (loading || !user) {
        return (
            <div className="min-h-screen bg-[#f7f3ef] flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-4 py-20">
                    <div className="w-10 h-10 border-4 border-[#c8956b] border-t-transparent rounded-full animate-spin" />

                    <p className="text-[#7a5c44] font-medium text-sm">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#f7f3ef] text-[#2b1d15]">
            {/* SIDEBAR */}
            <aside className="fixed left-0 top-0 z-50 h-screen w-64 bg-linear-to-b from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b] border-r border-white/10 shadow-2xl flex flex-col">
                {/* LOGO */}
                <div className="px-6 py-7 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-xl text-[#f0d5b8] shadow-lg">
                            ☕
                        </div>

                        <div>
                            <h1 className="text-2xl font-extrabold text-[#f0d5b8] leading-none">
                                Call It!
                            </h1>

                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4a87a] mt-1 font-semibold">
                                Super Admin
                            </p>
                        </div>
                    </div>
                </div>

                {/* PROFILE */}
                <div className="mx-5 mt-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                    <img
                        src={`https://ui-avatars.com/api/?name=${user?.email}`}
                        alt="avatar"
                        className="w-14 h-14 rounded-2xl border-2 border-[#c8956b]"
                    />

                    <div>
                        <h3 className="text-white font-bold text-sm">
                            {user?.email?.split("@")[0]}
                        </h3>

                        <p className="text-[#e7c8ab] text-xs mt-1">
                            Superadmin Active
                        </p>
                    </div>
                </div>

                {/* NAVIGATION */}
                <nav className="flex-1 px-5 py-6 flex flex-col gap-2">
                    {/* DASHBOARD */}
                    <button className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold bg-[#c8956b] text-white shadow-lg shadow-[#c8956b]/30 transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.8}
                                    d="M3 13h8V3H3v10zm10 8h8V11h-8v10zM3 21h8v-6H3v6zm10-10h8V3h-8v8z"
                                />
                            </svg>
                        </div>

                        Dashboard
                    </button>

                    {/* USERS */}
                    <button
                        onClick={() =>
                            router.push("/superadmin/kelolauser")
                        }
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#f3d7bf] hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer"
                    >
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.8}
                                    d="M17 20h5V18a4 4 0 00-4-4h-1m-4 6H4v-2a4 4 0 014-4h5m0-4a4 4 0 100-8 4 4 0 000 8zm6 4a4 4 0 10-8 0"
                                />
                            </svg>
                        </div>

                        Kelola Users
                    </button>

                    {/* REPORTS */}
                    <button
                        onClick={() => router.push("/superadmin/laporan")}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-[#f3d7bf] hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer"
                    >
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.8}
                                    d="M9 12l2 2 4-4m5.586-3.586A2 2 0 0017.172 5H6.828a2 2 0 00-1.414.586L4.586 6.414A2 2 0 004 7.828v8.344a2 2 0 00.586 1.414l.828.828A2 2 0 006.828 19h10.344a2 2 0 001.414-.586l.828-.828A2 2 0 0020 16.172V7.828a2 2 0 00-.586-1.414l-.828-.828z"
                                />
                            </svg>
                        </div>

                        Laporan
                    </button>
                </nav>

                {/* LOGOUT */}
                <div className="p-5 border-t border-white/10">
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");

                            router.push("/login");
                        }}
                        className="w-full flex items-center justify-center gap-2 rounded-2xl border border-[#ffb08b]/10 bg-[#3d2718] py-3 text-sm font-bold text-[#ff9a72] hover:bg-[#2e1d11] transition-all duration-300"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.8}
                                d="M17 16l4-4m0 0l-4-4m4 4H9m4 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"
                            />
                        </svg>

                        Logout
                    </button>
                </div>
            </aside>

            {/* CONTENT */}
            <div className="ml-64 min-h-screen px-8 py-8">
                {/* TOPBAR */}
                <div className="sticky top-0 z-30 mb-8 bg-[#f7f3ef]/80 backdrop-blur-md border border-[#e8d9cc] rounded-[28px] px-8 py-5 flex items-center justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-[#a07a5e] font-semibold mb-2">
                            Dashboard Overview
                        </p>

                        <h2 className="text-[32px] font-extrabold text-[#2b1d15]">
                            Superadmin Dashboard
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-white border border-[#e8d9cc] rounded-2xl px-4 py-3 flex items-center gap-3 w-72">
                            <svg
                                className="w-5 h-5 text-[#c8956b]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.8}
                                    d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>

                            <input
                                type="text"
                                placeholder="Search users..."
                                className="bg-transparent outline-none text-sm w-full placeholder:text-[#c4a98a]"
                            />
                        </div>
                    </div>
                </div>

                {/* HERO */}
                <div className="relative overflow-hidden rounded-[28px] bg-linear-to-br from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b] p-10 mb-8 shadow-2xl">
                    <div className="absolute -left-30 -top-20 w-65 h-65 rounded-full border-40 border-white/5" />

                    <div className="absolute -right-25 -bottom-30 w-65 h-65 rounded-full border-40 border-white/5" />

                    <div className="absolute left-[10%] top-[30%] w-72 h-72 bg-white/10 rounded-full blur-3xl" />

                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/10 backdrop-blur-sm px-4 py-2 text-[#f0d5b8] text-xs font-semibold mb-5">
                            System Monitoring
                        </div>

                        <h1 className="text-5xl leading-tight font-extrabold text-white">
                            Control & Monitor All Platform Activities
                        </h1>

                        <p className="mt-5 text-[#f0d5b8]/80 leading-relaxed">
                            Kelola seluruh user, admin, laporan, dan aktivitas
                            sistem dalam satu dashboard superadmin modern.
                        </p>

                        <div className="flex gap-4 mt-8">
                            <button className="bg-white text-[#5c2d0e] font-bold rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                                View Reports
                            </button>

                            <button className="bg-white/15 backdrop-blur text-white border border-white/20 rounded-2xl px-6 py-3 hover:bg-white/25 transition-all duration-300">
                                Manage Users
                            </button>
                        </div>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* CARD */}
                    <div className="group relative overflow-hidden bg-white rounded-3xl border border-[#eee5da] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-6">
                        <div className="absolute inset-0 bg-linear-to-br from-[#f8ede3] to-white opacity-0 group-hover:opacity-100 transition-all duration-300" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#5c2d0e] to-[#8b4a20] shadow-lg shadow-[#8b4a20]/30 flex items-center justify-center mb-5">
                                <svg
                                    className="w-7 h-7 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.8}
                                        d="M17 20h5V18a4 4 0 00-4-4h-1m-4 6H4v-2a4 4 0 014-4h5m0-4a4 4 0 100-8 4 4 0 000 8z"
                                    />
                                </svg>
                            </div>

                            <p className="text-xs text-[#a07a5e] font-bold uppercase tracking-widest">
                                Total Users
                            </p>

                            <h3 className="text-4xl font-extrabold text-[#2b1d15] mt-3">
                                {stats.totalUsers}
                            </h3>
                        </div>
                    </div>

                    {/* CARD */}
                    <div className="group relative overflow-hidden bg-white rounded-3xl border border-[#eee5da] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-6">
                        <div className="absolute inset-0 bg-linear-to-br from-[#f8ede3] to-white opacity-0 group-hover:opacity-100 transition-all duration-300" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#7a3f1c] to-[#c8956b] shadow-lg shadow-[#c8956b]/30 flex items-center justify-center mb-5">
                                <svg
                                    className="w-7 h-7 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.8}
                                        d="M9 12l2 2 4-4m5.586-3.586A2 2 0 0017.172 5H6.828a2 2 0 00-1.414.586L4.586 6.414A2 2 0 004 7.828v8.344a2 2 0 00.586 1.414l.828.828A2 2 0 006.828 19h10.344a2 2 0 001.414-.586l.828-.828A2 2 0 0020 16.172V7.828a2 2 0 00-.586-1.414l-.828-.828z"
                                    />
                                </svg>
                            </div>

                            <p className="text-xs text-[#a07a5e] font-bold uppercase tracking-widest">
                                Total Reports
                            </p>

                            <h3 className="text-4xl font-extrabold text-[#2b1d15] mt-3">
                                {stats.totalReports}
                            </h3>
                        </div>
                    </div>

                    {/* CARD */}
                    <div className="group relative overflow-hidden bg-white rounded-3xl border border-[#eee5da] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 p-6">
                        <div className="absolute inset-0 bg-linear-to-br from-[#f8ede3] to-white opacity-0 group-hover:opacity-100 transition-all duration-300" />

                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#8b4a20] to-[#d8b08c] shadow-lg shadow-[#d8b08c]/30 flex items-center justify-center mb-5">
                                <svg
                                    className="w-7 h-7 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.8}
                                        d="M12 15v2m6-6V9a6 6 0 10-12 0v2m-1 10h14a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>

                            <p className="text-xs text-[#a07a5e] font-bold uppercase tracking-widest">
                                Active Admins
                            </p>

                            <h3 className="text-4xl font-extrabold text-[#2b1d15] mt-3">
                                {stats.activeAdmins}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* USERS TABLE */}
                <div className="bg-white rounded-[28px] border border-[#eee5da] shadow-sm p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p className="text-xs uppercase tracking-[0.25em] text-[#a07a5e] font-semibold mb-2">
                                User Management
                            </p>

                            <h2 className="text-2xl font-extrabold text-[#2b1d15]">
                                Daftar Pengguna
                            </h2>
                        </div>

                        <button
                            onClick={fetchUsers}
                            disabled={usersLoading}
                            className="bg-linear-to-r from-[#5c2d0e] to-[#8b4a20] text-white rounded-2xl shadow-lg shadow-[#8b4a20]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-bold px-6 py-3"
                        >
                            Refresh Data
                        </button>
                    </div>

                    {usersLoading ? (
                        <div className="flex flex-col items-center justify-center gap-4 py-20">
                            <div className="w-10 h-10 border-4 border-[#c8956b] border-t-transparent rounded-full animate-spin" />

                            <p className="text-[#7a5c44] font-medium text-sm">
                                Loading...
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-[28px] border border-[#eee5da]">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#f8f1eb] text-[#7a5c44]">
                                        <th className="px-6 py-5 text-xs uppercase tracking-widest font-bold text-left">
                                            Email
                                        </th>

                                        <th className="px-6 py-5 text-xs uppercase tracking-widest font-bold text-left">
                                            Role
                                        </th>

                                        <th className="px-6 py-5 text-xs uppercase tracking-widest font-bold text-left">
                                            Status
                                        </th>

                                        <th className="px-6 py-5 text-xs uppercase tracking-widest font-bold text-left">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.map((userData) => (
                                        <tr
                                            key={userData.id}
                                            className="hover:bg-[#fcf8f4] transition-all duration-200"
                                        >
                                            <td className="px-6 py-5 text-sm border-t border-[#f3ebe3] font-semibold">
                                                {userData.email}
                                            </td>

                                            <td className="px-6 py-5 text-sm border-t border-[#f3ebe3]">
                                                <span
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                                                        userData.role ===
                                                        "superadmin"
                                                            ? "bg-[#5c2d0e]/10 text-[#5c2d0e]"
                                                            : userData.role ===
                                                              "admin"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-[#f3ebe3] text-[#7a5c44]"
                                                    }`}
                                                >
                                                    {userData.role}
                                                </span>
                                            </td>

                                            <td className="px-6 py-5 text-sm border-t border-[#f3ebe3]">
                                                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />

                                                    Active
                                                </span>
                                            </td>

                                            <td className="px-6 py-5 text-sm border-t border-[#f3ebe3]">
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() =>
                                                            handleOpenEdit(
                                                                userData
                                                            )
                                                        }
                                                        className="rounded-xl bg-[#edf4ff] text-blue-700 px-4 py-2 text-xs font-bold hover:bg-[#dbeafe] transition-all duration-200"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDeleteUser(
                                                                userData.id
                                                            )
                                                        }
                                                        className="rounded-xl bg-red-50 text-red-600 px-4 py-2 text-xs font-bold hover:bg-red-100 transition-all duration-200"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="w-full max-w-2xl rounded-4xl bg-white border border-[#eee5da] shadow-2xl overflow-hidden">
                        {/* HEADER */}
                        <div className="relative overflow-hidden bg-linear-to-br from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b] px-8 py-10">
                            <div className="absolute -left-20 -top-15 w-55 h-55 rounded-full bg-white/10 blur-3xl" />

                            <div className="absolute -right-20 -bottom-20 w-55 h-55 rounded-full bg-[#f0c090]/20 blur-3xl" />

                            <div className="relative z-10 flex items-center gap-5">
                                <div className="w-24 h-24 rounded-3xl bg-white/15 border border-white/10 backdrop-blur-md flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                                    {editForm.username
                                        ?.charAt(0)
                                        ?.toUpperCase()}
                                </div>

                                <div>
                                    <p className="text-[#f0d5b8] uppercase tracking-[0.25em] text-xs font-semibold">
                                        User Editor
                                    </p>

                                    <h2 className="text-3xl font-extrabold text-white mt-2">
                                        {editForm.username}
                                    </h2>

                                    <p className="text-[#f0d5b8]/80 mt-2">
                                        Manage user information & permissions
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* BODY */}
                        <div className="p-8">
                            <div className="grid md:grid-cols-2 gap-5">
                                {/* USERNAME */}
                                <div>
                                    <label className="text-sm font-bold text-[#2b1d15] mb-2.5 block">
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        value={editForm.username}
                                        onChange={(e) =>
                                            setEditForm({
                                                ...editForm,
                                                username: e.target.value,
                                            })
                                        }
                                        className="w-full bg-[#fdf9f6] border border-[#e8d9cc] rounded-xl px-4 py-3 outline-none focus:border-[#c8956b] focus:ring-2 focus:ring-[#c8956b]/15"
                                    />
                                </div>

                                {/* ROLE */}
                                <div>
                                    <label className="text-sm font-bold text-[#2b1d15] mb-2.5 block">
                                        Role
                                    </label>

                                    <select
                                        value={editForm.role}
                                        onChange={(e) =>
                                            setEditForm({
                                                ...editForm,
                                                role: e.target.value,
                                            })
                                        }
                                        className="w-full bg-[#fdf9f6] border border-[#e8d9cc] rounded-xl px-4 py-3 outline-none focus:border-[#c8956b] focus:ring-2 focus:ring-[#c8956b]/15"
                                    >
                                        <option value="user">User</option>

                                        <option value="admin">Admin</option>

                                        <option value="superadmin">
                                            Superadmin
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div className="mt-5">
                                <label className="text-sm font-bold text-[#2b1d15] mb-2.5 block">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={editForm.email}
                                    onChange={(e) =>
                                        setEditForm({
                                            ...editForm,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full bg-[#fdf9f6] border border-[#e8d9cc] rounded-xl px-4 py-3 outline-none focus:border-[#c8956b] focus:ring-2 focus:ring-[#c8956b]/15"
                                />
                            </div>

                            {/* PASSWORD */}
                            <div className="mt-8 rounded-3xl border border-[#eee5da] bg-[#fcfaf8] p-6">
                                <h3 className="text-xl font-extrabold text-[#2b1d15] mb-6">
                                    Change Password
                                </h3>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="text-sm font-bold text-[#2b1d15] mb-2.5 block">
                                            New Password
                                        </label>

                                        <input
                                            type="password"
                                            placeholder="Masukkan password baru"
                                            value={editForm.password}
                                            onChange={(e) =>
                                                setEditForm({
                                                    ...editForm,
                                                    password: e.target.value,
                                                })
                                            }
                                            className="w-full bg-[#fdf9f6] border border-[#e8d9cc] rounded-xl px-4 py-3 outline-none focus:border-[#c8956b] focus:ring-2 focus:ring-[#c8956b]/15"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-bold text-[#2b1d15] mb-2.5 block">
                                            Confirm Password
                                        </label>

                                        <input
                                            type="password"
                                            placeholder="Confirm password"
                                            value={editForm.confirmPassword}
                                            onChange={(e) =>
                                                setEditForm({
                                                    ...editForm,
                                                    confirmPassword:
                                                        e.target.value,
                                                })
                                            }
                                            className="w-full bg-[#fdf9f6] border border-[#e8d9cc] rounded-xl px-4 py-3 outline-none focus:border-[#c8956b] focus:ring-2 focus:ring-[#c8956b]/15"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* BUTTONS */}
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <button
                                    onClick={() =>
                                        setShowEditModal(false)
                                    }
                                    className="rounded-2xl border border-[#e8d9cc] bg-[#fdf9f6] text-[#7a5c44] font-bold hover:bg-[#f7efe8] transition-all duration-300 py-3"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleUpdateUser}
                                    className="bg-linear-to-r from-[#5c2d0e] to-[#8b4a20] text-white rounded-2xl shadow-lg shadow-[#8b4a20]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-bold py-3"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}