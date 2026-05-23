"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Camera,
  Pencil,
  Shield,
  Mail,
  UserCircle,
  LayoutDashboard,
  FileText,
  MessageCircle,
  LogOut,
  ChevronLeft,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

export default function AdminProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("profile");

  // =========================
  // CHECK ADMIN LOGIN
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    const parsed = JSON.parse(storedUser);

    if (!["admin", "superadmin"].includes(parsed.role)) {
      router.push("/login");
      return;
    }

    setUser(parsed);
    setUsername(parsed.username);

    const saved =
      localStorage.getItem(`profileImage_${parsed.id}`);

    setProfileImage(
      saved ||
        parsed.profileImage ||
        `https://ui-avatars.com/api/?name=${parsed.username}&background=c8956b&color=fff`
    );
  }, [router]);

  // =========================
  // CHANGE PHOTO
  // =========================
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      localStorage.setItem(
        `profileImage_${user.id}`,
        reader.result
      );
    };
    reader.readAsDataURL(file);
  };

  // =========================
  // SAVE PROFILE (REAL API)
  // =========================
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/users/me",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            username,
            email: user.email,
            profileImage,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return alert(data.message || "Gagal update");
      }

      const updated = {
        ...user,
        username,
        profileImage,
      };

      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));

      setIsEditing(false);
      alert("Profile admin berhasil diupdate");
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f3ef]">
        <div className="w-10 h-10 border-4 border-[#c8956b] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // =========================
  // ADMIN NAV (SAMA KAYAK DASHBOARD)
  // =========================
  const navItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      action: () => router.push("/admin/dashboard"),
    },
    {
      key: "laporan",
      label: "Kelola Laporan",
      icon: <FileText size={20} />,
      action: () => router.push("/admin/laporan"),
    },
    {
      key: "chat",
      label: "Chat Admin",
      icon: <MessageCircle size={20} />,
      action: () => router.push("/admin/chatadmin"),
    },
    {
      key: "profile",
      label: "Profile",
      icon: <UserCircle size={20} />,
      action: () => router.push("/admin/profile"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f3ef] flex">

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-30 flex flex-col
          bg-gradient-to-b from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b]
          text-white transition-all duration-300
          ${sidebarOpen ? "w-64" : "w-20"}
        `}
      >
        <div className="px-5 py-6 border-b border-white/10">
          {sidebarOpen && (
            <h1 className="text-2xl font-extrabold text-[#f0d5b8]">
              Call It!
            </h1>
          )}
        </div>

        {/* PROFILE MINI */}
        <div className="mt-5 mx-4">
          {sidebarOpen ? (
            <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl">
              <img
                src={profileImage}
                className="w-11 h-11 rounded-full border-2 border-[#c8956b]"
              />
              <div>
                <p className="font-bold text-sm">{user.username}</p>
                <p className="text-[11px] text-[#ead4c0] capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          ) : (
            <img
              src={profileImage}
              className="w-10 h-10 rounded-full mx-auto border-2 border-[#c8956b]"
            />
          )}
        </div>

        {/* NAV */}
        <nav className="flex-1 mt-5 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveMenu(item.key);
                item.action();
              }}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold
                ${
                  activeMenu === item.key
                    ? "bg-[#c8956b] text-white"
                    : "text-[#f3d7bf] hover:bg-white/10"
                }
                ${!sidebarOpen ? "justify-center" : ""}
              `}
            >
              {item.icon}
              {sidebarOpen && item.label}
            </button>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="px-3 pb-6">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-3 text-[#ffd1b8] hover:bg-[#3d2718] rounded-xl w-full ${
              !sidebarOpen ? "justify-center" : ""
            }`}
          >
            <LogOut size={20} />
            {sidebarOpen && "Logout"}
          </button>
        </div>

        {/* TOGGLE */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-7 w-6 h-6 bg-[#d8b08c] rounded-full flex items-center justify-center"
        >
          <ChevronLeft
            size={14}
            className={!sidebarOpen ? "rotate-180" : ""}
          />
        </button>
      </aside>

      {/* ================= MAIN ================= */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        } p-10`}
      >
        {/* HEADER */}
        <div className="mb-10">
          <p className="text-xs text-[#a07a5e] uppercase tracking-widest">
            Admin Profile
          </p>
          <h1 className="text-4xl font-black text-[#2b1d15]">
            Profile Saya
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT */}
          <div className="bg-white rounded-[32px] p-8 shadow-xl">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto">
                <img
                  src={profileImage}
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow"
                />

                <button
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="absolute bottom-0 right-0 w-10 h-10 bg-[#8b5e3c] rounded-full flex items-center justify-center text-white"
                >
                  <Camera size={16} />
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  onChange={handlePhotoChange}
                />
              </div>

              <h2 className="mt-4 text-2xl font-bold">
                {username}
              </h2>

              <p className="text-[#8c7665] flex items-center justify-center gap-2 mt-2">
                <Mail size={16} />
                {user.email}
              </p>
            </div>

            {/* EDIT */}
            <div className="mt-6">
              <button
                onClick={() =>
                  setIsEditing(!isEditing)
                }
                className="w-full py-3 rounded-2xl bg-[#8b5e3c] text-white font-bold"
              >
                <Pencil size={16} className="inline mr-2" />
                {isEditing
                  ? "Cancel"
                  : "Edit Profile"}
              </button>

              <AnimatePresence>
                {isEditing && (
                  <motion.div className="mt-5 space-y-4">
                    <input
                      value={username}
                      onChange={(e) =>
                        setUsername(e.target.value)
                      }
                      className="w-full p-4 rounded-xl bg-[#f7f2ed] border"
                      placeholder="Username"
                    />

                    <button
                      onClick={handleSave}
                      className="w-full py-3 bg-gradient-to-r from-[#8b5e3c] to-[#b37b56] text-white rounded-xl"
                    >
                      Simpan
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-[32px] p-8 shadow-xl">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Shield size={20} />
              Info Admin
            </h3>

            <div className="mt-6 space-y-3 text-[#7d6656]">
              <p>Role: {user.role}</p>
              <p>ID: {user.id}</p>
              <p>Status: Active</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}