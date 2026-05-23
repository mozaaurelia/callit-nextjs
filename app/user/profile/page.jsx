"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Camera,
  Pencil,
  Shield,
  Bell,
  FileText,
  Mail,
  Home,
  PlusCircle,
  UserCircle,
  LogOut,
  ChevronLeft,
  LayoutDashboard,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
  const router = useRouter();

  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);

  const [username, setUsername] = useState("");

  const [profileImage, setProfileImage] =
    useState("");

  const [isEditing, setIsEditing] =
    useState(false);

    const [activities, setActivities] =
  useState([]);

  // SIDEBAR
  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const [activeMenu, setActiveMenu] =
    useState("profile");

  // =========================
  // CEK LOGIN + ROLE USER
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("token");

    const storedUser =
      localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    if (parsedUser.role !== "user") {
      router.push("/login");
      return;
    }

    setUser(parsedUser);

    setUsername(parsedUser.username);

    const savedProfile =
      localStorage.getItem(
        `profileImage_${parsedUser.id}`
      );

    setProfileImage(
      savedProfile ||
        parsedUser.profileImage ||
        `https://ui-avatars.com/api/?name=${parsedUser.username}&background=c8956b&color=fff`
    );
  }, [router]);

  // =========================
// FETCH AKTIVITAS USER
// =========================
useEffect(() => {

  const fetchActivities = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await fetch(
        "http://localhost:5000/api/posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      console.log("ACTIVITIES:", data);

      if (Array.isArray(data)) {
        setActivities(data);
      } else {
        setActivities([]);
      }

    } catch (err) {

      console.log(
        "FETCH ACTIVITY ERROR:",
        err
      );

    }

  };

  fetchActivities();

}, []); 

  // =========================
  // GANTI FOTO
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
  // UPDATE PROFILE
  // =========================
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/users/me",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
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
        return alert(
          data.message || "Gagal update"
        );
      }

      const updatedUser = {
        ...user,
        username,
        profileImage,
      };

      setUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      localStorage.setItem(
        `profileImage_${user.id}`,
        profileImage
      );

      setIsEditing(false);

      alert("Profile berhasil diupdate");
    } catch (err) {
      console.log(err);

      alert("Server error");
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
  // LOADING
  // =========================
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f3ef]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#c8956b] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#7a5c44] font-medium text-sm">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // NAV ITEMS
  // =========================
  const navItems = [
    {
      key: "home",
      label: "Home",
      icon: <Home size={20} />,
      action: () =>
        router.push("/user/homepage"),
    },
    {
      key: "create",
      label: "Create Report",
      icon: <PlusCircle size={20} />,
      action: () =>
        router.push("/user/createreport"),
    },
    {
      key: "reports",
      label: "My Reports",
      icon: <LayoutDashboard size={20} />,
      action: () =>
        router.push("/user/myreport"),
    },
    {
      key: "profile",
      label: "Profile",
      icon: <UserCircle size={20} />,
      action: () =>
        router.push("/user/profile"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f3ef] flex">

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-30 flex flex-col
          bg-gradient-to-b from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b]
          text-white transition-all duration-300
          ${sidebarOpen ? "w-64" : "w-20"}
        `}
      >

        {/* LOGO */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
          {sidebarOpen && (
            <h1 className="text-2xl font-extrabold text-[#f0d5b8] tracking-tight">
              Call It!
            </h1>
          )}
        </div>

        {/* PROFILE MINI */}
        {sidebarOpen ? (
          <div className="mx-4 mt-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4 flex items-center gap-3">

            <img
              src={profileImage}
              alt="profile"
              className="w-11 h-11 rounded-full object-cover border-2 border-[#c8956b]"
            />

            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">
                {user.username}
              </p>

              <p className="text-[11px] text-[#ead4c0]">
                User Account
              </p>
            </div>

          </div>
        ) : (
          <div className="flex justify-center mt-5">
            <img
              src={profileImage}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#c8956b]"
            />
          </div>
        )}

        {/* NAVIGATION */}
        <nav className="flex-1 flex flex-col gap-1 px-3 mt-5">

          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                item.action();
                setActiveMenu(item.key);
              }}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-sm font-semibold
                ${
                  activeMenu === item.key
                    ? "bg-[#c8956b] text-white shadow-lg"
                    : "text-[#f3d7bf] hover:bg-white/10 hover:text-white"
                }
                ${
                  !sidebarOpen
                    ? "justify-center"
                    : ""
                }
              `}
            >

              {item.icon}

              {sidebarOpen && (
                <span>{item.label}</span>
              )}

            </button>
          ))}

        </nav>

        {/* LOGOUT */}
        <div className="px-3 pb-6">

          <button
            onClick={handleLogout}
            className={`
              flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
              text-[#ffd1b8] hover:bg-[#3d2718]
              ${
                !sidebarOpen
                  ? "justify-center"
                  : ""
              }
            `}
          >

            <LogOut size={20} />

            {sidebarOpen && (
              <span>Logout</span>
            )}

          </button>

        </div>

        {/* TOGGLE */}
        <button
          onClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
          className="absolute -right-3 top-7 w-6 h-6 bg-[#d8b08c] rounded-full flex items-center justify-center shadow-lg hover:bg-[#b07d55] transition"
        >

          <ChevronLeft
            size={14}
            className={`transition-transform duration-300 ${
              !sidebarOpen
                ? "rotate-180"
                : ""
            }`}
          />

        </button>

      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >

        <div className="p-6 lg:p-10">

          {/* HEADER */}
          <motion.div
            initial={{
              opacity: 0,
              y: -25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-10"
          >

            <div>
              <p className="text-xs text-[#a07a5e] font-semibold uppercase tracking-widest mb-2">
                User Profile
              </p>

              <h1 className="text-4xl font-black text-[#2b1d15]">
                Profile Saya
              </h1>

              <p className="text-[#8c7665] mt-2">
                Kelola akun dan pengaturan
                profile Anda
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                setIsEditing(!isEditing)
              }
              className="flex items-center gap-2 px-5 py-3 bg-white rounded-2xl shadow-lg border border-[#eadfd3] text-[#5b4636] font-semibold hover:shadow-xl transition-all"
            >

              <Pencil size={18} />

              {isEditing
                ? "Batal Edit"
                : "Edit Profile"}

            </motion.button>

          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">

            {/* LEFT */}
            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="space-y-6"
            >

              {/* PROFILE CARD */}
              <div className="bg-white rounded-[32px] p-8 shadow-xl border border-[#f0e4d8]">

                <div className="flex flex-col items-center text-center">

                  <div className="relative mb-5">

                    <div className="w-32 h-32 rounded-full overflow-hidden border-[5px] border-white shadow-xl">
                      <img
                        src={profileImage}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <button
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      className="absolute bottom-0 right-0 w-11 h-11 rounded-full bg-gradient-to-r from-[#8b5e3c] to-[#b37b56] flex items-center justify-center shadow-lg border-4 border-white"
                    >

                      <Camera
                        size={18}
                        className="text-white"
                      />

                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={
                        handlePhotoChange
                      }
                    />

                  </div>

                  <h2 className="text-3xl font-bold text-[#3d2f25]">
                    {username}
                  </h2>

                  <div className="mt-4 flex items-center gap-2 bg-[#f7f2ed] px-4 py-2 rounded-2xl border border-[#eee4d8]">

                    <Mail
                      size={16}
                      className="text-[#8c7665]"
                    />

                    <span className="text-sm text-[#7d6656]">
                      {user.email}
                    </span>

                  </div>

                </div>

              </div>

              {/* EDIT */}
              <AnimatePresence>

                {isEditing && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: 15,
                    }}
                    className="bg-white rounded-[32px] p-6 shadow-xl border border-[#f0e4d8]"
                  >

                    <div className="space-y-5">

                      <div>
                        <label className="text-sm font-semibold text-[#5c4434] block mb-2">
                          Username
                        </label>

                        <input
                          type="text"
                          value={username}
                          onChange={(e) =>
                            setUsername(
                              e.target.value
                            )
                          }
                          className="w-full px-5 py-4 rounded-2xl bg-[#f8f4ef] border border-[#eadfd3] outline-none focus:ring-2 focus:ring-[#c8956b]/40"
                        />
                      </div>

                      <button
                        onClick={() =>
                          fileInputRef.current?.click()
                        }
                        className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl border border-[#e7d7c8] bg-[#f8f4ef]"
                      >

                        <Camera size={20} />

                        Ganti Foto Profile

                      </button>

                      <button
                        onClick={handleSave}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#8b5e3c] to-[#b37b56] text-white font-bold hover:opacity-90 transition"
                      >
                        Simpan Perubahan
                      </button>

                    </div>

                  </motion.div>
                )}

              </AnimatePresence>

            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="space-y-6"
            >

              {/* SETTINGS */}
              <div className="bg-white rounded-[32px] p-6 shadow-xl border border-[#f0e4d8]">

                <h3 className="text-2xl font-bold text-[#3d2f25] mb-6 flex items-center gap-2">
                  <Shield size={22} />
                  Pengaturan Akun
                </h3>

                <div className="space-y-3">

                  <motion.button className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#faf7f4] border border-[#efe5db] hover:shadow-md transition">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">

                        <Bell
                          size={20}
                          className="text-[#8a6548]"
                        />

                      </div>

                      <div className="text-left">

                        <h4 className="font-semibold text-[#3d2f25]">
                          Notifikasi
                        </h4>

                        <p className="text-sm text-[#8c7665]">
                          Kelola notifikasi akun
                        </p>

                      </div>

                    </div>

                  </motion.button>

                </div>

              </div>

          {/* ACTIVITY */}
<div className="bg-white rounded-[32px] p-6 shadow-xl border border-[#f0e4d8]">

  <h3 className="text-2xl font-bold text-[#3d2f25] mb-6 flex items-center gap-2">
    <FileText size={22} />
    Aktivitas
  </h3>

  <div className="space-y-4">

    {activities.length > 0 ? (
      activities.map((item) => (

        <div
          key={item.id}
          className="flex items-start gap-4 p-5 rounded-2xl bg-[#fcfaf8] border border-[#f1e7dd]"
        >

          <div className="w-3 h-3 rounded-full mt-2 bg-[#b37b56]" />

          <div className="flex-1">

            <h4 className="font-semibold text-[#3d2f25]">
              Membuat laporan
            </h4>

            <p className="text-sm text-[#8c7665] mt-1">
              {item.header}
            </p>

            <p className="text-xs text-[#b39a87] mt-1">
              {item.category_name}
            </p>

          </div>

          <span className="text-xs text-[#b39a87] whitespace-nowrap">
            {new Date(item.created_at).toLocaleDateString("id-ID")}
          </span>

        </div>

      ))
    ) : (

      <div className="text-center py-10 text-[#9c8573]">
        Belum ada aktivitas laporan
      </div>

    )}

  </div>

</div>


            </motion.div>

          </div>

        </div>

      </main>

    </div>
  );
}