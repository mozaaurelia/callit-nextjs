"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const MapPicker = dynamic(
  () => import("./MapPicker"),
  {
    ssr: false,
  }
);

import {
  ArrowLeft,
  Camera,
  ChevronDown,
  FileText,
  MapPin,
  Pencil,
  SendHorizonal,
  Home,
  PlusCircle,
  FileText as FileTextIcon,
  UserCircle2,
  Bell,
  LogOut,
  ChevronLeft,
} from "lucide-react";

export default function CreateReportPage() {
  const router = useRouter();

  const fileInputRef = useRef(null);
  const profileInputRef = useRef(null);

  const [preview, setPreview] = useState(null);

  // PROFILE
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("create");

  // FORM STATE
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState(1);
  const [location, setLocation] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState([
    -6.200000,
    106.816666,
  ]);
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  // =========================
  // PROTECT PAGE
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // BELUM LOGIN
    if (!token || !user) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(user);

    // HANYA ROLE USER YANG BOLEH
    if (parsedUser.role !== "user") {
      router.push("/login");
      return;
    }

    setUser(parsedUser);

    // LOAD FOTO PROFILE
    const savedProfile = localStorage.getItem(
      `profileImage_${parsedUser.id}`
    );

    if (savedProfile) {
      setProfileImage(savedProfile);
    }
  }, [router]);

  // =========================
  // HANDLE PROFILE UPLOAD
  // =========================
  const handleProfileUpload = (e) => {
    const file = e.target.files[0];

    if (!file || !user) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageBase64 = reader.result;

      setProfileImage(imageBase64);

      localStorage.setItem(
        `profileImage_${user.id}`,
        imageBase64
      );
    };

    reader.readAsDataURL(file);
  };

  // =========================
  // HANDLE LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  // =========================
  // HANDLE UPLOAD
  // =========================
  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };

 // =========================
// HANDLE SUBMIT
// =========================
const handleSubmit = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Silahkan login terlebih dahulu");
      return;
    }

    // VALIDASI FOTO WAJIB ADA
    if (!image) {
      alert("Bukti foto wajib diupload sebelum mengirim laporan!");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append("header", header);

    // GABUNGKAN BODY + LOCATION
    formData.append(
      "body",
      `Lokasi: ${location}\n\n${body}`
    );

    // category_id sementara default
    formData.append("category_id", category);

    // KIRIM LOCATION
    formData.append("location", location);

    if (image) {
      formData.append("image", image);
    }

    const response = await fetch(
      "http://localhost:5000/api/posts",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Gagal membuat laporan");
      return;
    }

    alert("Laporan berhasil dibuat");

    // RESET FORM
    setHeader("");
    setBody("");
    setCategory("Jalan Rusak");
    setLocation("");
    setImage(null);
    setPreview(null);

    // REDIRECT KE HOMEPAGE
    router.push("/user/homepage");

  } catch (error) {
    console.log(error);

    alert("Terjadi kesalahan");
  } finally {
    setLoading(false);
  }
};

const handleCurrentLocation = () => {

  if (!navigator.geolocation) {
    alert("Geolocation tidak didukung");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setSelectedPosition([lat, lng]);

      setLocation(
        `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`
      );
    },

    (error) => {
      console.log(error);
      alert("Gagal mengambil lokasi");
    }
  );
};

  const navItems = [
    {
      key: "home",
      label: "Home",
      icon: <Home size={20} />,
      action: () => router.push("/user/homepage"),
    },
    {
      key: "create",
      label: "Create Report",
      icon: <PlusCircle size={20} />,
      action: () => router.push("/user/createreport"),
    },
    {
      key: "reports",
      label: "My Reports",
      icon: <FileTextIcon size={20} />,
      action: () => router.push("/user/myreport"),
    },
    {
      key: "profile",
      label: "Profile",
      icon: <UserCircle2 size={20} />,
      action: () => router.push("/user/profile"),
    },
  ];

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

  return (
    <div className="min-h-screen bg-[#f7f3ef] flex">

      {/* ═══════════════════════════════
          SIDEBAR
      ═══════════════════════════════ */}
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

        {/* PROFILE */}
        {sidebarOpen ? (
          <div className="mx-4 mt-5 mb-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4 flex items-center gap-3">
            <div className="relative group">
              <img
                src={
                  profileImage
                    ? profileImage
                    : `https://ui-avatars.com/api/?name=${user.username}&background=c8956b&color=fff`
                }
                alt="profile"
                className="w-11 h-11 rounded-full object-cover border-2 border-[#c8956b] cursor-pointer"
                onClick={() =>
                  profileInputRef.current.click()
                }
              />

              <div
                onClick={() =>
                  profileInputRef.current.click()
                }
                className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer"
              >
                <span className="text-[10px] font-bold">
                  Edit
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold">
                {user.username}
              </p>

              <p className="text-[11px] text-[#e7c8ab]">
                User Account
              </p>
            </div>

            <input
              type="file"
              accept="image/*"
              ref={profileInputRef}
              onChange={handleProfileUpload}
              className="hidden"
            />
          </div>
        ) : (
          <div className="flex justify-center mt-5 mb-2">
            <img
              src={
                profileImage
                  ? profileImage
                  : `https://ui-avatars.com/api/?name=${user.username}&background=c8956b&color=fff`
              }
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#c8956b]"
            />
          </div>
        )}

        {/* NAVIGATION */}
        <nav className="flex-1 flex flex-col gap-1 px-3 mt-4">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveMenu(item.key);
                item.action();
              }}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200
                ${
                  activeMenu === item.key
                    ? "bg-[#c8956b] text-white shadow-lg"
                    : "text-[#f3d7bf] hover:bg-white/10 hover:text-white"
                }
                ${!sidebarOpen ? "justify-center" : ""}
              `}
            >
              {item.icon}

              {sidebarOpen && (
                <span>{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* BOTTOM */}
        <div className="px-3 pb-6 flex flex-col gap-1">

          {/* NOTIFICATION */}
          <button
            className={`
              flex items-center gap-3 px-3 py-3 rounded-xl
              text-[#f3d7bf] hover:bg-white/10 transition-all
              ${!sidebarOpen ? "justify-center" : ""}
            `}
          >
            <div className="relative">
              <Bell size={20} />

              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ff8b5e] rounded-full border-2 border-[#5c2d0e]" />
            </div>

            {sidebarOpen && (
              <span className="text-sm font-semibold">
                Notifications
              </span>
            )}
          </button>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className={`
              flex items-center gap-3 px-3 py-3 rounded-xl
              text-[#ffb08a] hover:bg-[#3d2718]
              hover:text-[#ff9a72] transition-all
              ${!sidebarOpen ? "justify-center" : ""}
            `}
          >
            <LogOut size={20} />

            {sidebarOpen && (
              <span className="text-sm font-semibold">
                Logout
              </span>
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
              !sidebarOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </aside>

      {/* ═══════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════ */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >

        {/* TOPBAR */}
        <div className="sticky top-0 z-20 bg-[#f7f3ef]/80 backdrop-blur-md border-b border-[#eadfd4] px-8 py-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold text-[#a07a5e]">
              Create New Report
            </p>

            <h2 className="text-2xl font-extrabold text-[#2b1d15]">
              Make a New Complaint 📝
            </h2>
          </div>

          <button
            onClick={() => router.back()}
            className="w-11 h-11 rounded-2xl bg-white border border-[#eadfd4] shadow-sm flex items-center justify-center hover:bg-[#f5ece4] transition"
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="max-w-3xl mx-auto px-6 py-8">

          {/* HERO */}
          <div className="relative overflow-hidden rounded-[30px] mb-8 shadow-xl">

            <div className="absolute inset-0 bg-gradient-to-br from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b]" />

            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 50%, rgba(255,200,150,0.45) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255,160,80,0.3) 0%, transparent 45%)
                `,
              }}
            />

            <div className="relative z-10 px-8 py-10 md:px-10">
              <span className="inline-block bg-white/15 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider backdrop-blur-sm">
                📢 Citizen Complaint Form
              </span>

              <h1 className="text-4xl font-extrabold text-white mb-2">
                Report Problems Easily
              </h1>

              <p className="text-[#f0d5b8] text-sm leading-relaxed max-w-xl">
                Submit complaints about damaged roads,
                floods, garbage, public facilities, and
                more directly from your dashboard.
              </p>
            </div>
          </div>

          {/* FORM CARD */}
          <div className="bg-white rounded-[30px] border border-[#eee5da] shadow-xl p-6 md:p-8">

            {/* UPLOAD */}
            <div className="mb-7">
              <h2 className="text-lg font-bold text-[#2b1d15] mb-4">
                Upload Evidence Photo
              </h2>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleUpload}
                className="hidden"
              />

              <div
                onClick={() =>
                  fileInputRef.current.click()
                }
                className="
                  relative overflow-hidden
                  border-2 border-dashed border-[#d9c5b2]
                  rounded-[24px]
                  bg-gradient-to-br from-[#fcfaf8] to-[#f7f1eb]
                  h-52
                  flex flex-col items-center justify-center
                  cursor-pointer
                  hover:scale-[1.01]
                  transition-all duration-300
                "
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-2xl bg-[#f2e6da] flex items-center justify-center mb-4 shadow-sm">
                      <Camera
                        size={26}
                        className="text-[#7a5133]"
                      />
                    </div>

                    <p className="font-bold text-[#5c3b27] text-sm">
                      Upload Photo
                    </p>

                    <p className="text-xs text-[#9b8573] mt-1">
                      PNG, JPG • Max 5MB
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* FORM */}
            <div className="space-y-5">

              {/* TITLE */}
              <div>
                <label className="block text-sm font-bold text-[#3b2a1f] mb-2">
                  Report Title
                </label>

                <div className="flex items-center bg-[#fcfaf8] border border-[#eadfd4] rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#c8956b]/30 transition">
                  <FileText
                    className="text-[#8b735f] mr-3"
                    size={18}
                  />

                  <input
                    type="text"
                    placeholder="Contoh: Jalan berlubang di Jl. Sudirman"
                    value={header}
                    onChange={(e) =>
                      setHeader(e.target.value)
                    }
                    className="bg-transparent outline-none flex-1 text-sm placeholder:text-[#b29c8b]"
                  />
                </div>
              </div>

              {/* CATEGORY */}
              <div>
                <label className="block text-sm font-bold text-[#3b2a1f] mb-2">
                  Category
                </label>

                <div className="relative bg-[#fcfaf8] border border-[#eadfd4] rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#c8956b]/30 transition">

               <select
                      value={category}
                      onChange={(e) =>
                        setCategory(Number(e.target.value))
                      }
                      className="appearance-none w-full bg-transparent outline-none text-sm"
                    >
                      <option value={1}>Jalan Rusak</option>
                      <option value={2}>Sampah</option>
                      <option value={3}>Lampu Jalan</option>
                      <option value={4}>Banjir</option>
                    </select>

                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b735f]"
                    size={18}
                  />
                </div>
              </div>

              {/* LOCATION */}
<div>
  <label className="block text-sm font-bold text-[#3b2a1f] mb-2">
    Location
  </label>

  {/* BUTTONS */}
  <div className="flex flex-wrap gap-3 mb-4">

    <button
      type="button"
      onClick={handleCurrentLocation}
      className="px-4 py-2 rounded-xl bg-[#7a3f1c] text-white text-sm font-semibold hover:opacity-90"
    >
      Current Location
    </button>

    <button
      type="button"
      onClick={() => setShowMap(!showMap)}
      className="px-4 py-2 rounded-xl bg-[#c8956b] text-white text-sm font-semibold hover:opacity-90"
    >
       Pick From Map
    </button>
  </div>

  {/* INPUT */}
  <div className="flex items-center bg-[#fcfaf8] border border-[#eadfd4] rounded-2xl px-4 py-3 mb-4">

    <MapPin
      className="text-[#8b735f] mr-3"
      size={18}
    />

    <input
      type="text"
      placeholder="Masukkan lokasi..."
      value={location}
      onChange={(e) =>
        setLocation(e.target.value)
      }
      className="bg-transparent outline-none flex-1 text-sm"
    />
  </div>

  {/* MAP */}
  {showMap && (
    <MapPicker
      selectedPosition={selectedPosition}
      setSelectedPosition={setSelectedPosition}
      setLocation={setLocation}
    />
  )}
</div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-bold text-[#3b2a1f] mb-2">
                  Description
                </label>

                <div className="bg-[#fcfaf8] border border-[#eadfd4] rounded-2xl p-4 focus-within:ring-2 focus-within:ring-[#c8956b]/30 transition">

                  <div className="flex items-start gap-3">

                    <Pencil
                      className="text-[#8b735f] mt-1 flex-shrink-0"
                      size={18}
                    />

                    <textarea
                      rows={5}
                      placeholder="Jelaskan detail permasalahan..."
                      value={body}
                      onChange={(e) =>
                        setBody(e.target.value)
                      }
                      className="bg-transparent outline-none w-full resize-none text-sm placeholder:text-[#b29c8b]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="
                mt-8 w-full h-14 rounded-2xl
                bg-gradient-to-r from-[#6f4324] to-[#8a5a39]
                hover:opacity-90 transition
                text-white font-bold
                shadow-lg
                flex items-center justify-center gap-2
                text-sm
              "
            >
              {loading ? "Loading..." : "Kirim Laporan"}

              <SendHorizonal size={18} />
            </button>

            <p className="text-center text-[#9b8573] mt-4 text-xs">
              Laporan akan diproses dalam 24 jam
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}