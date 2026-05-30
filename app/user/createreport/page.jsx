"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

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
  Map,
  Keyboard,
  Navigation,
  X,
} from "lucide-react";

// Dynamic import MapPicker (no SSR)
const MapPicker = dynamic(() => import("./MapPicker"), { ssr: false });

export default function CreateReportPage() {
  const router = useRouter();

  const fileInputRef    = useRef(null);
  const profileInputRef = useRef(null);

  const [preview, setPreview] = useState(null);

  // PROFILE
  const [user,         setUser]         = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [sidebarOpen,  setSidebarOpen]  = useState(true);
  const [activeMenu,   setActiveMenu]   = useState("create");

  // FORM STATE
  const [header,   setHeader]   = useState("");
  const [body,     setBody]     = useState("");
  const [category, setCategory] = useState(1);
  const [location, setLocation] = useState("");
  const [image,    setImage]    = useState(null);
  const [loading,  setLoading]  = useState(false);

  // LOCATION MODE
  const [locationMode,      setLocationMode]      = useState("type"); // "type" | "map"
  const [selectedPosition,  setSelectedPosition]  = useState([-6.2, 106.816666]);
  const [geoLoading,        setGeoLoading]        = useState(false);

  // =========================
  // PROTECT PAGE
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user  = localStorage.getItem("user");

    if (!token || !user) { router.push("/login"); return; }

    const parsedUser = JSON.parse(user);
    if (parsedUser.role !== "user") { router.push("/login"); return; }

    setUser(parsedUser);

    const savedProfile = localStorage.getItem(`profileImage_${parsedUser.id}`);
    if (savedProfile) setProfileImage(savedProfile);
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
      localStorage.setItem(`profileImage_${user.id}`, imageBase64);
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
  // HANDLE UPLOAD FOTO
  // =========================
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // =========================
  // CURRENT LOCATION (GPS)
  // =========================
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) { alert("Geolocation tidak didukung"); return; }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setSelectedPosition([lat, lng]);
        setLocation(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`);
        setGeoLoading(false);
      },
      (error) => {
        console.log(error);
        alert("Gagal mengambil lokasi");
        setGeoLoading(false);
      }
    );
  };

  // =========================
  // HANDLE SUBMIT
  // =========================
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) { alert("Silahkan login terlebih dahulu"); return; }

      if (!image) {
        alert("Bukti foto wajib diupload sebelum mengirim laporan!");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("header", header);
      formData.append("body", `Lokasi: ${location}\n\n${body}`);
      formData.append("category_id", category);
      formData.append("location", location);
      if (image) formData.append("image", image);

      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) { alert(data.message || "Gagal membuat laporan"); return; }

      alert("Laporan berhasil dibuat");

      // RESET FORM
      setHeader("");
      setBody("");
      setCategory(1);
      setLocation("");
      setImage(null);
      setPreview(null);
      setLocationMode("type");

      router.push("/user/homepage");
    } catch (error) {
      console.log(error);
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  // ── Nav items ──
  const navItems = [
    { key: "home",    label: "Home",          icon: <Home size={20} />,         action: () => router.push("/user/homepage") },
    { key: "create",  label: "Create Report", icon: <PlusCircle size={20} />,   action: () => router.push("/user/createreport") },
    { key: "reports", label: "My Reports",    icon: <FileTextIcon size={20} />, action: () => router.push("/user/myreport") },
    { key: "profile", label: "Profile",       icon: <UserCircle2 size={20} />,  action: () => router.push("/user/profile") },
  ];

  const CATEGORIES = [
    { id: 1, label: "Jalan Rusak" },
    { id: 2, label: "Sampah" },
    { id: 3, label: "Lampu Jalan" },
    { id: 4, label: "Banjir" },
  ];

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

  return (
    <div className="min-h-screen bg-[#f7f3ef] flex">

      {/* ══════════════════════════════════════
          SIDEBAR
      ══════════════════════════════════════ */}
      <aside className={`fixed top-0 left-0 h-full z-30 flex flex-col bg-gradient-to-b from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b] text-white transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"}`}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
          <span className="text-3xl flex-shrink-0 select-none">&#9749;</span>
          {sidebarOpen && (
            <h1 className="text-2xl font-extrabold text-[#f0d5b8] tracking-tight whitespace-nowrap">Call It!</h1>
          )}
        </div>

        {/* Profile card */}
        {sidebarOpen ? (
          <div className="mx-4 mt-5 mb-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4 flex items-center gap-3">
            <div className="relative group flex-shrink-0">
              <img
                src={profileImage || `https://ui-avatars.com/api/?name=${user.username}&background=c8956b&color=fff`}
                alt="profile"
                className="w-11 h-11 rounded-full object-cover border-2 border-[#c8956b] cursor-pointer"
                onClick={() => profileInputRef.current.click()}
              />
              <div onClick={() => profileInputRef.current.click()} className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer">
                <span className="text-[10px] font-bold">Edit</span>
              </div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user.username}</p>
              <p className="text-[11px] text-[#e7c8ab]">User Account</p>
            </div>
            <input type="file" accept="image/*" ref={profileInputRef} onChange={handleProfileUpload} className="hidden" />
          </div>
        ) : (
          <div className="flex justify-center mt-5 mb-2">
            <img
              src={profileImage || `https://ui-avatars.com/api/?name=${user.username}&background=c8956b&color=fff`}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border-2 border-[#c8956b]"
            />
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 flex flex-col gap-1 px-3 mt-4">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => { setActiveMenu(item.key); item.action(); }}
              title={!sidebarOpen ? item.label : ""}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${activeMenu === item.key ? "bg-[#c8956b] text-white shadow-lg shadow-[#c8956b]/30" : "text-[#f3d7bf] hover:bg-white/10 hover:text-white"} ${!sidebarOpen ? "justify-center" : ""}`}
            >
              {item.icon}
              {sidebarOpen && <span className="whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-6 flex flex-col gap-1">
          <button title={!sidebarOpen ? "Notifications" : ""} className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[#f3d7bf] hover:bg-white/10 transition-all text-sm font-semibold ${!sidebarOpen ? "justify-center" : ""}`}>
            <div className="relative flex-shrink-0">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#e57c4a] rounded-full border-2 border-[#5c2d0e]" />
            </div>
            {sidebarOpen && <span>Notifications</span>}
          </button>

          <button onClick={handleLogout} title={!sidebarOpen ? "Logout" : ""} className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[#e57c4a] hover:bg-[#3d2718] hover:text-[#ff9a72] transition-all text-sm font-semibold ${!sidebarOpen ? "justify-center" : ""}`}>
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-7 w-6 h-6 bg-[#d8b08c] rounded-full flex items-center justify-center shadow-lg hover:bg-[#b07d55] transition"
        >
          <ChevronLeft size={14} color="white" className={`transition-transform duration-300 ${!sidebarOpen ? "rotate-180" : ""}`} />
        </button>
      </aside>

      {/* ══════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════ */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"} min-h-screen flex flex-col`}>

        {/* Top bar */}
        <div className="sticky top-0 z-20 bg-[#f7f3ef]/80 backdrop-blur-md border-b border-[#e8d9cc] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="w-9 h-9 rounded-xl bg-white border border-[#e8d9cc] flex items-center justify-center hover:bg-[#f0e5d8] transition text-[#7a5c44] shadow-sm">
              <ArrowLeft size={17} />
            </button>
            <div>
              <p className="text-xs text-[#a07a5e] font-semibold uppercase tracking-widest">Create</p>
              <h2 className="text-xl font-extrabold text-[#2b1d15]">New Report</h2>
            </div>
          </div>

          {/* Step indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs text-[#a07a5e] font-medium">
            <span className="w-6 h-6 rounded-full bg-[#c8956b] text-white text-xs flex items-center justify-center font-bold">1</span>
            <span className="text-[#7a5c44] font-semibold">Fill Details</span>
            <span className="text-[#d9c5b2] mx-1">&#8594;</span>
            <span className="w-6 h-6 rounded-full bg-[#e8d9cc] text-[#a07a5e] text-xs flex items-center justify-center font-bold">2</span>
            <span>Review</span>
            <span className="text-[#d9c5b2] mx-1">&#8594;</span>
            <span className="w-6 h-6 rounded-full bg-[#e8d9cc] text-[#a07a5e] text-xs flex items-center justify-center font-bold">3</span>
            <span>Submit</span>
          </div>
        </div>

        {/* Page body */}
        <div className="flex-1 px-8 py-8">
          <div className="max-w-2xl mx-auto">

            {/* ── UNIFIED CARD (hero + form menyatu) ── */}
            <div className="bg-white rounded-[28px] border border-[#eee5da] shadow-md overflow-hidden">

              {/* Hero strip */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b] px-8 py-8">
                <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full border-[32px] border-white/5" />
                <div className="absolute -bottom-14 -left-8 w-48 h-48 rounded-full border-[24px] border-white/5" />
                <div className="absolute top-3 right-28 w-3 h-3 rounded-full bg-white/20" />
                <div className="absolute bottom-4 right-12 w-5 h-5 rounded-full bg-white/10" />
                <div className="relative z-10">
                  <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-widest border border-white/10">
                    Citizen Report Form
                  </span>
                  <h1 className="text-2xl font-extrabold text-white mb-1 leading-snug">Submit Your Complaint</h1>
                  <p className="text-[#f0d5b8]/80 text-sm leading-relaxed max-w-md">
                    Report issues like damaged roads, floods, or public facility problems. Fill in all fields for faster processing.
                  </p>
                </div>
              </div>

              {/* Accent line */}
              <div className="h-0.5 w-full bg-gradient-to-r from-[#c8956b]/60 via-[#f0d5b8] to-transparent" />

              {/* Form body */}
              <div className="px-8 py-8 space-y-6">

                {/* ── UPLOAD FOTO ── */}
                <div>
                  <label className="block text-sm font-bold text-[#2b1d15] mb-2.5">
                    Evidence Photo
                    <span className="ml-2 text-[11px] font-semibold text-[#e57c4a] bg-red-50 px-2 py-0.5 rounded-full border border-red-100">Wajib</span>
                  </label>

                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleUpload} className="hidden" />

                  <div
                    onClick={() => fileInputRef.current.click()}
                    className="relative overflow-hidden border-2 border-dashed border-[#ddd0c5] rounded-2xl h-44 flex flex-col items-center justify-center cursor-pointer bg-[#fdf9f6] hover:border-[#c8956b] hover:bg-[#fdf6f0] transition-all duration-200 group"
                  >
                    {preview ? (
                      <>
                        <img src={preview} alt="preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2">
                          <Camera size={22} className="text-white" />
                          <span className="text-white text-xs font-semibold">Change Photo</span>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); setPreview(null); setImage(null); }}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
                        >
                          <X size={14} />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-xl bg-[#f0e5d8] flex items-center justify-center mb-2.5 text-[#c8956b] group-hover:bg-[#e8d0bb] transition">
                          <Camera size={22} />
                        </div>
                        <p className="font-bold text-[#5c3b27] text-sm">Click or drag photo here</p>
                        <p className="text-xs text-[#a07a5e] mt-1">PNG, JPG, WEBP — Max 5MB</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="border-t border-[#f0e8df]" />

                {/* ── JUDUL ── */}
                <div>
                  <label className="block text-sm font-bold text-[#2b1d15] mb-2.5">Report Title</label>
                  <div className={`flex items-center bg-[#fdf9f6] border rounded-xl px-4 py-3 transition-all duration-200 ${header ? "border-[#c8956b] ring-2 ring-[#c8956b]/15" : "border-[#e8d9cc] focus-within:border-[#c8956b] focus-within:ring-2 focus-within:ring-[#c8956b]/15"}`}>
                    <FileText size={17} className="text-[#c8956b] mr-3 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Contoh: Jalan berlubang di Jl. Sudirman"
                      value={header}
                      onChange={(e) => setHeader(e.target.value)}
                      className="bg-transparent outline-none flex-1 text-sm text-[#2b1d15] placeholder-[#c4a98a]"
                    />
                  </div>
                </div>

                {/* ── CATEGORY ── */}
                <div>
                  <label className="block text-sm font-bold text-[#2b1d15] mb-2.5">Category</label>

                  {/* Pill shortcut */}
                  <div className="flex gap-2 flex-wrap mb-3">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`text-xs px-4 py-2 rounded-full font-semibold transition-all duration-150 ${category === cat.id ? "bg-gradient-to-r from-[#5c2d0e] to-[#c8956b] text-white shadow-sm" : "bg-[#f0e8df] text-[#7a5c44] hover:bg-[#e8d0bb]"}`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Select (logic tetap) */}
                  <div className="relative bg-[#fdf9f6] border border-[#e8d9cc] focus-within:border-[#c8956b] rounded-xl px-4 py-3 transition-all duration-200">
                    <select
                      value={category}
                      onChange={(e) => setCategory(Number(e.target.value))}
                      className="appearance-none w-full bg-transparent outline-none text-sm text-[#2b1d15] cursor-pointer"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a07a5e] pointer-events-none" />
                  </div>
                </div>

                {/* ── LOCATION ── */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-sm font-bold text-[#2b1d15]">Location</label>

                    {/* Toggle Ketik / Peta */}
                    <div className="flex items-center gap-1 bg-[#f0e8df] rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => setLocationMode("type")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 ${locationMode === "type" ? "bg-white text-[#5c2d0e] shadow-sm" : "text-[#a07a5e] hover:text-[#5c2d0e]"}`}
                      >
                        <Keyboard size={13} />
                        Ketik
                      </button>
                      <button
                        type="button"
                        onClick={() => setLocationMode("map")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 ${locationMode === "map" ? "bg-white text-[#5c2d0e] shadow-sm" : "text-[#a07a5e] hover:text-[#5c2d0e]"}`}
                      >
                        <Map size={13} />
                        Pilih di Peta
                      </button>
                    </div>
                  </div>

                  {/* Tombol lokasi saat ini — selalu tampil */}
                  <button
                    type="button"
                    onClick={handleCurrentLocation}
                    disabled={geoLoading}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#c8956b] hover:text-[#5c2d0e] transition mb-3 disabled:opacity-50"
                  >
                    <Navigation size={13} className={geoLoading ? "animate-spin" : ""} />
                    {geoLoading ? "Mengambil lokasi..." : "Gunakan lokasi saat ini"}
                  </button>

                  {/* MODE: KETIK */}
                  {locationMode === "type" && (
                    <div className={`flex items-center bg-[#fdf9f6] border rounded-xl px-4 py-3 transition-all duration-200 ${location ? "border-[#c8956b] ring-2 ring-[#c8956b]/15" : "border-[#e8d9cc] focus-within:border-[#c8956b] focus-within:ring-2 focus-within:ring-[#c8956b]/15"}`}>
                      <MapPin size={17} className="text-[#c8956b] mr-3 flex-shrink-0" />
                      <input
                        type="text"
                        placeholder="Jl. Sudirman No. 123, Jakarta"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="bg-transparent outline-none flex-1 text-sm text-[#2b1d15] placeholder-[#c4a98a]"
                      />
                      {location && (
                        <button onClick={() => setLocation("")} className="text-[#a07a5e] hover:text-[#5c2d0e] transition ml-2">
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  )}

                  {/* MODE: PETA */}
                  {locationMode === "map" && (
                    <div className="space-y-3">
                      <div className="rounded-2xl overflow-hidden border border-[#e8d9cc] shadow-sm">
                        <MapPicker
                          selectedPosition={selectedPosition}
                          setSelectedPosition={setSelectedPosition}
                          setLocation={setLocation}
                        />
                      </div>

                      {/* Lokasi terpilih dari peta */}
                      {location && (
                        <div className="bg-[#fdf9f6] border border-[#e8d9cc] rounded-xl px-4 py-3">
                          <p className="text-[10px] text-[#a07a5e] font-bold uppercase tracking-wider mb-1">Lokasi Terpilih</p>
                          <div className="flex items-start gap-2">
                            <MapPin size={13} className="text-[#c8956b] flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-[#2b1d15] font-semibold leading-relaxed flex-1">{location}</p>
                            <button onClick={() => { setLocation(""); setSelectedPosition([-6.2, 106.816666]); }} className="text-[#a07a5e] hover:text-[#5c2d0e] transition flex-shrink-0">
                              <X size={13} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ── DESCRIPTION ── */}
                <div>
                  <label className="block text-sm font-bold text-[#2b1d15] mb-2.5">Description</label>
                  <div className={`bg-[#fdf9f6] border rounded-xl p-4 transition-all duration-200 ${body ? "border-[#c8956b] ring-2 ring-[#c8956b]/15" : "border-[#e8d9cc] focus-within:border-[#c8956b] focus-within:ring-2 focus-within:ring-[#c8956b]/15"}`}>
                    <div className="flex items-start gap-3">
                      <Pencil size={17} className="text-[#c8956b] mt-0.5 flex-shrink-0" />
                      <textarea
                        rows={5}
                        placeholder="Describe the problem in detail..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="bg-transparent outline-none w-full resize-none text-sm text-[#2b1d15] placeholder-[#c4a98a] leading-relaxed"
                      />
                    </div>
                    {body && (
                      <div className="flex justify-end mt-1.5 border-t border-[#f0e8df] pt-1.5">
                        <span className="text-[11px] text-[#a07a5e]">{body.length} characters</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── SUBMIT ── */}
                <div className="pt-2">
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !header || !body || !location}
                    className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-200 ${
                      loading || !header || !body || !location
                        ? "bg-[#ddd0c5] text-[#a07a5e] cursor-not-allowed"
                        : "bg-gradient-to-r from-[#5c2d0e] to-[#8b4a20] text-white shadow-lg shadow-[#8b4a20]/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <SendHorizonal size={18} />
                        Kirim Laporan
                      </>
                    )}
                  </button>

                  {(!header || !body || !location) && (
                    <p className="text-center text-xs text-[#c4a98a] mt-2.5">
                      Lengkapi judul, lokasi, dan deskripsi untuk mengirim
                    </p>
                  )}

                  <p className="text-center text-[#a07a5e] mt-2.5 text-xs">
                    Laporan akan diproses dalam 24 jam
                  </p>
                </div>

              </div>
            </div>
            <div className="h-10" />
          </div>
        </div>
      </main>
    </div>
  );
}