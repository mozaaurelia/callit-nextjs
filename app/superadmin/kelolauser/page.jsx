"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// =============================================================================
// ICON COMPONENTS
// Semua icon di bawah adalah SVG inline dari Heroicons.
// Dibuat sebagai komponen terpisah supaya bisa dipakai ulang di mana saja
// tanpa harus install library tambahan.
// =============================================================================

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
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

// ChevronLeftIcon: icon panah untuk toggle sidebar buka/tutup
// prop `rotated` = true → icon diputar 180 derajat (sidebar tertutup)
const ChevronLeftIcon = ({ rotated }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white"
    className={`w-3 h-3 transition-transform duration-300 ${rotated ? "rotate-180" : ""}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const MagnifyingGlassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 0z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const PlusCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UserSingleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const EnvelopeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const LockClosedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
  </svg>
);

function Avatar({ name = "?", size = 36 }) {
  const colors  = ["#c8956b", "#8b4a20", "#a07a5e", "#7a5c44", "#5c2d0e"];
  const idx     = (name.charCodeAt(0) || 0) % colors.length;
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-full text-white font-bold border-2 border-white shadow-sm"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${colors[idx]}, ${colors[(idx + 2) % colors.length]})`,
        fontSize: size * 0.34,
      }}
    >
      {initials}
    </div>
  );
}

function RoleBadge({ role }) {
  const map = {
    superadmin: { bg: "bg-[#f0e5d8]", text: "text-[#5c2d0e]", dot: "bg-[#c8956b]", label: "Superadmin" },
    admin:      { bg: "bg-blue-100",   text: "text-blue-700",   dot: "bg-blue-400",   label: "Admin" },
    user:       { bg: "bg-green-100",  text: "text-green-700",  dot: "bg-green-500",  label: "User" },
  };
  const s = map[role] || map.user;

  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
      {s.label}
    </span>
  );
}

function FormField({ label, type = "text", placeholder, value, onChange, icon }) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#2b1d15] mb-2 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex items-center bg-[#fdf9f6] border border-[#e8d9cc] focus-within:border-[#c8956b] focus-within:ring-2 focus-within:ring-[#c8956b]/15 rounded-xl px-4 py-3 transition-all duration-200">
        {icon && <span className="text-[#c8956b] mr-3 flex-shrink-0">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          className="bg-transparent outline-none flex-1 text-sm text-[#2b1d15] placeholder-[#c4a98a]"
        />
      </div>
    </div>
  );
}

function Toast({ message, type, onClose }) {
  useEffect(() => {
    // Set timer 3 detik, lalu panggil onClose untuk menyembunyikan toast
    const timer = setTimeout(onClose, 3000);
    // Cleanup: batalkan timer jika komponen di-unmount sebelum 3 detik
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl text-white text-sm font-semibold transition-all duration-300
      ${type === "success" ? "bg-green-500" : "bg-red-500"}`}>
      <span>{type === "success" ? "✓" : "✕"}</span>
      {message}
    </div>
  );
}

// =============================================================================
// LOADING SPINNER COMPONENT
// Spinner kecil yang dipakai di dalam tombol saat proses loading berlangsung.
// =============================================================================
function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}


function EditUserModal({ isOpen, user, onSave, onCancel, loading }) {
  // State lokal untuk menyimpan isi form di dalam modal
  const [form, setForm] = useState({
    username:        "",
    email:           "",
    role:            "user",
    password:        "",
    confirmPassword: "",
  });

  // Setiap kali prop `user` berubah (modal dibuka dengan user berbeda),
  // isi ulang form dengan data user yang dipilih
  useEffect(() => {
    if (user) {
      setForm({
        username:        user.username || "",
        email:           user.email    || "",
        role:            user.role     || "user",
        password:        "",  // dikosongkan — opsional saat edit
        confirmPassword: "",  // dikosongkan — opsional saat edit
      });
    }
  }, [user]);

  // Jika modal tidak terbuka, jangan render apapun ke DOM
  if (!isOpen) return null;

  // Fungsi yang dipanggil saat tombol "Save Changes" diklik
  const handleSave = () => {
    // Validasi: jika password diisi, konfirmasi harus sama
    if (form.password && form.password !== form.confirmPassword) {
      alert("Password tidak sama!");
      return;
    }
    // Teruskan data form ke parent component lewat callback onSave
    onSave(form);
  };

  return (
    // Overlay gelap di belakang modal
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-[2rem] bg-white border border-[#eee5da] shadow-2xl overflow-hidden">

        {/* ── HEADER MODAL: gradient coklat dengan info user yang diedit ── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b] px-8 py-10">
          {/* Efek blur dekoratif di background header */}
          <div className="absolute -left-20 -top-15 w-55 h-55 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 w-55 h-55 rounded-full bg-[#f0c090]/20 blur-3xl" />

          {/* Avatar huruf pertama + nama user yang sedang diedit */}
          <div className="relative z-10 flex items-center gap-5">
            <div className="w-24 h-24 rounded-3xl bg-white/15 border border-white/10 backdrop-blur-md flex items-center justify-center text-3xl font-bold text-white shadow-lg">
              {form.username?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div>
              <p className="text-[#f0d5b8] uppercase tracking-[0.25em] text-xs font-semibold">
                User Editor
              </p>
              <h2 className="text-3xl font-extrabold text-white mt-2">
                {form.username || "User"}
              </h2>
              <p className="text-[#f0d5b8]/80 mt-2 text-sm">
                Kelola informasi dan permission akun ini
              </p>
            </div>
          </div>
        </div>

        {/* ── BODY MODAL: form edit ── */}
        <div className="p-8">

          {/* Baris pertama: Username + Role berdampingan */}
          <div className="grid md:grid-cols-2 gap-5">

            {/* Input username */}
            <div>
              <label className="text-sm font-bold text-[#2b1d15] mb-2.5 block">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full bg-[#fdf9f6] border border-[#e8d9cc] rounded-xl px-4 py-3 outline-none focus:border-[#c8956b] focus:ring-2 focus:ring-[#c8956b]/15 text-sm"
              />
            </div>

            {/* Dropdown pilihan role: user / admin / superadmin */}
            <div>
              <label className="text-sm font-bold text-[#2b1d15] mb-2.5 block">Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full bg-[#fdf9f6] border border-[#e8d9cc] rounded-xl px-4 py-3 outline-none focus:border-[#c8956b] focus:ring-2 focus:ring-[#c8956b]/15 text-sm"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>
          </div>

          {/* Input email — satu baris penuh */}
          <div className="mt-5">
            <label className="text-sm font-bold text-[#2b1d15] mb-2.5 block">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-[#fdf9f6] border border-[#e8d9cc] rounded-xl px-4 py-3 outline-none focus:border-[#c8956b] focus:ring-2 focus:ring-[#c8956b]/15 text-sm"
            />
          </div>

          {/* Kotak ganti password — opsional, kosongkan jika tidak ingin ganti */}
          <div className="mt-8 rounded-3xl border border-[#eee5da] bg-[#fcfaf8] p-6">
            <h3 className="text-base font-extrabold text-[#2b1d15] mb-5">
              Ganti Password
              <span className="ml-2 text-xs font-normal text-[#a07a5e]">
                (kosongkan jika tidak ingin mengubah)
              </span>
            </h3>

            {/* Input password baru + konfirmasi berdampingan */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-bold text-[#2b1d15] mb-2.5 block">Password Baru</label>
                <input
                  type="password"
                  placeholder="Masukkan password baru"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-[#fdf9f6] border border-[#e8d9cc] rounded-xl px-4 py-3 outline-none focus:border-[#c8956b] focus:ring-2 focus:ring-[#c8956b]/15 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-[#2b1d15] mb-2.5 block">Konfirmasi Password</label>
                <input
                  type="password"
                  placeholder="Ulangi password baru"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full bg-[#fdf9f6] border border-[#e8d9cc] rounded-xl px-4 py-3 outline-none focus:border-[#c8956b] focus:ring-2 focus:ring-[#c8956b]/15 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Tombol aksi: Cancel dan Save Changes berdampingan */}
          <div className="grid grid-cols-2 gap-4 mt-8">

            {/* Tombol Cancel: menutup modal tanpa menyimpan perubahan */}
            <button
              onClick={onCancel}
              className="rounded-2xl border border-[#e8d9cc] bg-[#fdf9f6] text-[#7a5c44] font-bold hover:bg-[#f7efe8] transition-all duration-300 py-3 text-sm"
            >
              Cancel
            </button>

            {/* Tombol Save Changes: memanggil handleSave → onSave → request PUT ke API */}
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-gradient-to-r from-[#5c2d0e] to-[#8b4a20] text-white rounded-2xl shadow-lg shadow-[#8b4a20]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-bold py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:translate-y-0"
            >
              {loading ? <><Spinner /> Menyimpan...</> : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT: KelolaUsersPage
// Halaman utama Kelola Pengguna untuk superadmin.
// Fitur: lihat daftar, tambah, edit, dan hapus user & admin.
// =============================================================================
export default function KelolaUsersPage() {
  const router = useRouter();

  // ── STATE UTAMA ─────────────────────────────────────────────────────────────
  const [search,      setSearch]      = useState("");               // Teks pencarian di topbar
  const [users,       setUsers]       = useState([]);               // Daftar akun role "user"
  const [admins,      setAdmins]      = useState([]);               // Daftar akun role "admin"/"superadmin"
  const [stats,       setStats]       = useState({ users: 0, admins: 0 }); // Jumlah total untuk stat card
  const [sidebarOpen, setSidebarOpen] = useState(true);             // Status sidebar terbuka/tertutup
  const [activeMenu,  setActiveMenu]  = useState("users");          // Menu aktif di sidebar

  // ── STATE TOAST ──────────────────────────────────────────────────────────────
  // null = tidak muncul | { message, type } = muncul
  const [toast, setToast] = useState(null);

  // ── STATE LOADING ────────────────────────────────────────────────────────────
  const [loadingUser,   setLoadingUser]   = useState(false); // Loading tombol "Tambah User"
  const [loadingAdmin,  setLoadingAdmin]  = useState(false); // Loading tombol "Tambah Admin"
  const [loadingEdit,   setLoadingEdit]   = useState(false); // Loading tombol "Save Changes" di modal edit
  const [loadingDelete, setLoadingDelete] = useState(null);  // ID user yang sedang dihapus (null = tidak ada)

  // ── STATE FORM TAMBAH USER BARU ──────────────────────────────────────────────
  const [newUser, setNewUser] = useState({
    username: "",
    email:    "",
    password: "",
    role:     "user", // Role selalu dikunci "user" untuk form ini
  });

  // ── STATE FORM TAMBAH ADMIN BARU ─────────────────────────────────────────────
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    email:    "",
    password: "",
    role:     "admin", // Default "admin", bisa diubah ke "superadmin" lewat dropdown
  });

  // ── STATE MODAL EDIT ─────────────────────────────────────────────────────────
  // null = modal tertutup | object user = modal terbuka dengan data user tersebut
  const [editTarget, setEditTarget] = useState(null);

  // ── HELPER: TAMPILKAN TOAST ──────────────────────────────────────────────────
  // Dipanggil setelah aksi berhasil atau gagal untuk menampilkan notifikasi
  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  // =============================================================================
  // FETCH SEMUA USER DAN ADMIN
  // Mengambil seluruh data dari API lalu memisahkan mana yang user dan admin.
  // Dipanggil: saat halaman pertama dimuat & setelah setiap aksi create/update/delete.
  // =============================================================================
  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem("token"); // Ambil token JWT dari localStorage

      const res = await fetch("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` }, // Kirim token untuk autentikasi
      });

      const data = await res.json();
      const allUsers = data.data || [];

      // Pisahkan berdasarkan role
      const onlyUsers  = allUsers.filter((u) => u.role === "user");
      const onlyAdmins = allUsers.filter((u) => u.role === "admin" || u.role === "superadmin");

      setUsers(onlyUsers);
      setAdmins(onlyAdmins);
      setStats({ users: onlyUsers.length, admins: onlyAdmins.length });
    } catch (err) {
      console.error("Gagal fetch users:", err);
    }
  }, []);

  // Panggil fetchUsers pertama kali saat komponen dimount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // =============================================================================
  // CREATE USER
  // Menambahkan akun baru dengan role "user".
  // Validasi: username, email, password wajib diisi.
  // Endpoint: POST /api/users
  // =============================================================================
  const handleCreateUser = async () => {
    // Validasi form — semua field harus diisi sebelum request dikirim
    if (!newUser.username || !newUser.email || !newUser.password) {
      showToast("Semua field harus diisi!", "error");
      return;
    }

    setLoadingUser(true); // Aktifkan loading di tombol
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Kirim data user baru, role dipaksa "user" agar tidak bisa diubah dari form ini
        body: JSON.stringify({ ...newUser, role: "user" }),
      });

      const data = await res.json();

      if (res.ok) {
        showToast("User berhasil ditambahkan!", "success");
        setNewUser({ username: "", email: "", password: "", role: "user" }); // Reset form
        fetchUsers(); // Refresh daftar agar user baru muncul
      } else {
        showToast(data.message || "Gagal menambahkan user", "error");
      }
    } catch (err) {
      console.error("Error create user:", err);
      showToast("Terjadi kesalahan server", "error");
    } finally {
      setLoadingUser(false); // Matikan loading apapun hasilnya (sukses atau gagal)
    }
  };

  // =============================================================================
  // CREATE ADMIN
  // Menambahkan akun baru dengan role "admin" atau "superadmin".
  // Validasi: username, email, password wajib diisi.
  // Endpoint: POST /api/users
  // =============================================================================
  const handleCreateAdmin = async () => {
    // Validasi form — semua field harus diisi sebelum request dikirim
    if (!newAdmin.username || !newAdmin.email || !newAdmin.password) {
      showToast("Semua field harus diisi!", "error");
      return;
    }

    setLoadingAdmin(true); // Aktifkan loading di tombol
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Kirim data admin baru beserta role yang sudah dipilih di dropdown
        body: JSON.stringify(newAdmin),
      });

      const data = await res.json();

      if (res.ok) {
        showToast("Admin berhasil ditambahkan!", "success");
        setNewAdmin({ username: "", email: "", password: "", role: "admin" }); // Reset form
        fetchUsers(); // Refresh daftar agar admin baru muncul
      } else {
        showToast(data.message || "Gagal menambahkan admin", "error");
      }
    } catch (err) {
      console.error("Error create admin:", err);
      showToast("Terjadi kesalahan server", "error");
    } finally {
      setLoadingAdmin(false); // Matikan loading apapun hasilnya
    }
  };

  // =============================================================================
  // OPEN EDIT MODAL
  // Dipanggil saat tombol "Edit" diklik pada kartu user/admin.
  // Menyimpan data user yang dipilih ke state → EditUserModal akan terbuka.
  // =============================================================================
  const handleOpenEdit = (userData) => {
    setEditTarget(userData); // Simpan data user yang akan diedit
  };

  // =============================================================================
  // SAVE EDIT (UPDATE USER)
  // Dipanggil saat tombol "Save Changes" di modal edit diklik.
  // Mengirim request PUT ke API dengan data yang sudah diperbarui.
  // Password hanya dikirim jika field-nya diisi (opsional saat edit).
  // Endpoint: PUT /api/users/:id
  // =============================================================================
  const handleSaveEdit = async (formData) => {
    // Validasi — username dan email wajib ada
    if (!formData.username || !formData.email) {
      showToast("Username dan email wajib diisi!", "error");
      return;
    }

    setLoadingEdit(true); // Aktifkan loading di tombol "Save Changes"
    try {
      const token = localStorage.getItem("token");

      // Buat payload — masukkan password hanya jika user mengisinya
      const payload = {
        username: formData.username,
        email:    formData.email,
        role:     formData.role,
        // Operator spread kondisional: password hanya ditambahkan jika tidak kosong
        ...(formData.password ? { password: formData.password } : {}),
      };

      // Kirim PUT request ke /api/users/:id dengan ID user yang sedang diedit
      const res = await fetch(`http://localhost:5000/api/users/${editTarget.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        showToast("Data berhasil diperbarui!", "success");
        setEditTarget(null); // Tutup modal edit
        fetchUsers();        // Refresh daftar agar perubahan tampil
      } else {
        showToast(data.message || "Gagal memperbarui data", "error");
      }
    } catch (err) {
      console.error("Error update user:", err);
      showToast("Terjadi kesalahan server", "error");
    } finally {
      setLoadingEdit(false); // Matikan loading apapun hasilnya
    }
  };

  // =============================================================================
  // DELETE USER
  // Dipanggil saat tombol "Hapus" diklik pada kartu user/admin.
  // Menggunakan window.confirm sebagai konfirmasi sebelum menghapus.
  // Endpoint: DELETE /api/users/:id
  // =============================================================================
  const handleDeleteUser = async (userData) => {
    // Tampilkan dialog konfirmasi bawaan browser sebelum menghapus
    const confirmed = window.confirm(
      `Yakin ingin menghapus akun "${userData.username}"?\nAksi ini tidak bisa dibatalkan.`
    );
    if (!confirmed) return; // Jika user klik "Batal", hentikan proses

    setLoadingDelete(userData.id); // Tandai ID user yang sedang dihapus untuk tampilkan loading
    try {
      const token = localStorage.getItem("token");

      // Kirim DELETE request ke /api/users/:id
      const res = await fetch(`http://localhost:5000/api/users/${userData.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        showToast("Akun berhasil dihapus!", "success");
        fetchUsers(); // Refresh daftar agar user yang dihapus tidak tampil lagi
      } else {
        showToast(data.message || "Gagal menghapus akun", "error");
      }
    } catch (err) {
      console.error("Error delete user:", err);
      showToast("Terjadi kesalahan server", "error");
    } finally {
      setLoadingDelete(null); // Reset loading delete
    }
  };

  // ── FILTER PENCARIAN ─────────────────────────────────────────────────────────
  // Filter daftar user dan admin secara real-time berdasarkan teks di input pencarian.
  // Pencarian berlaku untuk username DAN email, tidak case-sensitive.
  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAdmins = admins.filter(
    (a) =>
      a.username.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  );

  // ── ITEM NAVIGASI SIDEBAR ────────────────────────────────────────────────────
  const navItems = [
    { key: "dashboard", label: "Dashboard",    icon: <GridIcon />,         action: () => router.push("/superadmin/dashboard") },
    { key: "laporan",   label: "Laporan",      icon: <DocumentTextIcon />, action: () => router.push("/superadmin/laporan") },
    { key: "users",     label: "Kelola Users", icon: <UsersIcon />,        action: () => router.push("/superadmin/kelolauser") },
  ];

  // =============================================================================
  // RENDER
  // =============================================================================
  return (
    <div className="min-h-screen bg-[#f7f3ef] flex">

      {/* ── TOAST NOTIFIKASI ───────────────────────────────────────────────────
          Muncul di pojok kanan bawah, otomatis hilang setelah 3 detik.
          Ditampilkan setelah aksi berhasil atau gagal. */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* ── EDIT USER MODAL ────────────────────────────────────────────────────
          isOpen: true jika editTarget tidak null (ada user yang dipilih untuk diedit)
          user: data user yang akan diedit
          onSave: fungsi yang mengirim data ke API
          onCancel: tutup modal tanpa menyimpan */}
      <EditUserModal
        isOpen={!!editTarget}
        user={editTarget}
        onSave={handleSaveEdit}
        onCancel={() => setEditTarget(null)}
        loading={loadingEdit}
      />

      {/* ════════════════════════════════════════════════════════════════════════
          SIDEBAR
      ════════════════════════════════════════════════════════════════════════ */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-30 flex flex-col
          bg-gradient-to-b from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b]
          text-white transition-all duration-300 ease-in-out
          ${sidebarOpen ? "w-64" : "w-20"}
        `}
      >
        {/* Logo & nama aplikasi */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
          <span className="text-3xl flex-shrink-0 select-none">&#9749;</span>
          {sidebarOpen && (
            <div>
              <h1 className="text-2xl font-extrabold text-[#f0d5b8] tracking-tight whitespace-nowrap leading-none">
                Call It!
              </h1>
              <p className="text-[10px] text-[#d4a87a] font-semibold uppercase tracking-widest mt-0.5">
                Super Admin
              </p>
            </div>
          )}
        </div>

        {/* Badge superadmin — versi sidebar terbuka (lebar) */}
        {sidebarOpen && (
          <div className="mx-4 mt-5 mb-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#f0d5b8] to-[#c8956b] flex items-center justify-center flex-shrink-0 text-white">
              <ShieldCheckIcon />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">Super Admin</p>
              <p className="text-[11px] text-[#e7c8ab]">Full Access</p>
            </div>
          </div>
        )}

        {/* Badge superadmin — versi sidebar tertutup (sempit) */}
        {!sidebarOpen && (
          <div className="flex justify-center mt-5 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f0d5b8] to-[#c8956b] flex items-center justify-center text-white">
              <ShieldCheckIcon />
            </div>
          </div>
        )}

        {/* Menu navigasi utama */}
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

        {/* Tombol notifikasi dan logout di bagian bawah sidebar */}
        <div className="px-3 pb-6 flex flex-col gap-1">
          <button
            title={!sidebarOpen ? "Notifications" : ""}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[#f3d7bf] hover:bg-white/10 transition-all text-sm font-semibold ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <span className="relative flex-shrink-0">
              <BellIcon />
              {/* Titik oranye kecil penanda ada notifikasi */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#e57c4a] rounded-full border-2 border-[#5c2d0e]" />
            </span>
            {sidebarOpen && <span>Notifications</span>}
          </button>

          {/* Tombol logout: hapus token dari localStorage lalu redirect ke halaman login */}
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

        {/* Tombol toggle buka/tutup sidebar */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-3 top-7 w-6 h-6 bg-[#d8b08c] rounded-full flex items-center justify-center shadow-lg hover:bg-[#b07d55] transition"
        >
          <ChevronLeftIcon rotated={!sidebarOpen} />
        </button>
      </aside>

      {/* ════════════════════════════════════════════════════════════════════════
          MAIN CONTENT
          ml-64 saat sidebar terbuka, ml-20 saat sidebar tertutup
      ════════════════════════════════════════════════════════════════════════ */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"} min-h-screen flex flex-col`}>

        {/* TOPBAR: sticky supaya tetap terlihat saat halaman di-scroll */}
        <div className="sticky top-0 z-20 bg-[#f7f3ef]/80 backdrop-blur-md border-b border-[#e8d9cc] px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#a07a5e] font-semibold uppercase tracking-widest">Super Admin</p>
            <h2 className="text-xl font-extrabold text-[#2b1d15]">Kelola Pengguna</h2>
          </div>

          {/* Input pencarian — memfilter daftar user & admin secara real-time */}
          <div className="relative hidden md:flex items-center">
            <span className="absolute left-3 text-[#a07a5e] pointer-events-none"><MagnifyingGlassIcon /></span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari user atau admin..."
              className="pl-9 pr-5 py-2.5 rounded-2xl border border-[#ddd0c5] bg-white/80 backdrop-blur text-sm text-[#3b2f2f] placeholder-[#b89f8d] outline-none focus:ring-2 focus:ring-[#c8956b]/40 focus:border-[#c8956b] shadow-sm w-72 transition-all"
            />
          </div>
        </div>

        <div className="px-8 py-8 flex-1">

          {/* ── STAT CARDS: menampilkan jumlah total user dan admin ─────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

            {/* Kartu Total User */}
            <div className="group relative bg-white rounded-3xl border border-[#eee5da] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fdf6f0] to-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-[#f0e5d8] opacity-40" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5c2d0e] to-[#8b4a20] flex items-center justify-center shadow-md shadow-[#8b4a20]/30 flex-shrink-0 text-white">
                  <UserSingleIcon />
                </div>
                <div>
                  <p className="text-xs text-[#a07a5e] font-bold uppercase tracking-wider mb-1">Total User</p>
                  <h2 className="text-5xl font-extrabold text-[#2b1d15] leading-none">{stats.users}</h2>
                </div>
              </div>
              <div className="relative z-10 mt-5 h-1.5 rounded-full bg-[#f0e5d8] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#5c2d0e] to-[#c8956b]" style={{ width: "100%" }} />
              </div>
              <div className="relative z-10 flex items-center justify-between mt-2">
                <p className="text-[11px] text-[#a07a5e] font-semibold">Akun terdaftar</p>
                <span className="text-[11px] text-[#c8956b] font-bold bg-[#f0e5d8] px-2 py-0.5 rounded-full">Aktif</span>
              </div>
            </div>

            {/* Kartu Total Admin */}
            <div className="group relative bg-white rounded-3xl border border-[#eee5da] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-[#eff6ff] to-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-blue-50 opacity-60" />
              <div className="relative z-10 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1d4ed8] to-[#3b82f6] flex items-center justify-center shadow-md shadow-blue-400/30 flex-shrink-0 text-white">
                  <ShieldCheckIcon />
                </div>
                <div>
                  <p className="text-xs text-[#a07a5e] font-bold uppercase tracking-wider mb-1">Total Admin</p>
                  <h2 className="text-5xl font-extrabold text-[#2b1d15] leading-none">{stats.admins}</h2>
                </div>
              </div>
              <div className="relative z-10 mt-5 h-1.5 rounded-full bg-blue-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-700"
                  style={{
                    width: stats.users + stats.admins > 0
                      ? `${(stats.admins / (stats.users + stats.admins)) * 100}%`
                      : "0%",
                  }}
                />
              </div>
              <div className="relative z-10 flex items-center justify-between mt-2">
                <p className="text-[11px] text-[#a07a5e] font-semibold">Admin &amp; Superadmin</p>
                <span className="text-[11px] text-blue-600 font-bold bg-blue-100 px-2 py-0.5 rounded-full">
                  {stats.users + stats.admins > 0
                    ? Math.round((stats.admins / (stats.users + stats.admins)) * 100)
                    : 0}% dari total
                </span>
              </div>
            </div>
          </div>

          {/* ── CONTENT GRID: dua kolom (User Management & Admin Management) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ══════════════════════════════════════════════════════════════════
                USER MANAGEMENT CARD
            ══════════════════════════════════════════════════════════════════ */}
            <div className="bg-white rounded-3xl border border-[#eee5da] shadow-sm overflow-hidden flex flex-col">
              {/* Garis warna coklat di atas kartu */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#5c2d0e] via-[#c8956b] to-[#f0d5b8]" />

              {/* Header kartu */}
              <div className="px-6 py-5 border-b border-[#f0e8df] flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-[#2b1d15]">User Management</h3>
                  <p className="text-xs text-[#a07a5e] mt-0.5">Tambah dan kelola akun user</p>
                </div>
                <span className="text-xs font-bold text-[#5c2d0e] bg-[#f0e5d8] px-3 py-1 rounded-full border border-[#e8d0bb]">
                  {users.length} user
                </span>
              </div>

              {/* Form tambah user baru */}
              <div className="px-6 py-5 border-b border-[#f0e8df] space-y-4">
                <p className="text-[11px] text-[#a07a5e] font-bold uppercase tracking-wider">Tambah User Baru</p>

                <FormField
                  label="Username"
                  placeholder="Masukkan username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  icon={<UserSingleIcon />}
                />
                <FormField
                  label="Email"
                  type="email"
                  placeholder="Masukkan email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  icon={<EnvelopeIcon />}
                />
                <FormField
                  label="Password"
                  type="password"
                  placeholder="Masukkan password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  icon={<LockClosedIcon />}
                />

                {/* Tombol submit tambah user */}
                <button
                  onClick={handleCreateUser}
                  disabled={loadingUser}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#5c2d0e] to-[#8b4a20] text-white py-3 rounded-2xl font-bold text-sm shadow-lg shadow-[#8b4a20]/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {loadingUser ? <><Spinner /> Menyimpan...</> : <><PlusCircleIcon /> Tambah User Baru</>}
                </button>
              </div>

              {/* Daftar user — scrollable, tinggi maksimal 320px */}
              <div className="flex-1 overflow-y-auto p-6 space-y-3 max-h-80">
                {filteredUsers.length === 0 ? (
                  // Tampil jika tidak ada user atau tidak ada hasil pencarian
                  <div className="flex flex-col items-center justify-center py-10 text-[#b89f8d]">
                    <div className="w-10 h-10 rounded-xl bg-[#f0e8df] flex items-center justify-center text-[#c8956b] mx-auto mb-2">
                      <UserSingleIcon />
                    </div>
                    <p className="text-sm font-semibold">Belum ada user</p>
                  </div>
                ) : (
                  filteredUsers.map((u) => (
                    <div
                      key={u.id}
                      className="flex items-center justify-between p-4 bg-[#fdf9f6] hover:bg-[#f7f0e9] rounded-2xl border border-[#f0e8df] hover:border-[#e8d0bb] transition-all duration-200"
                    >
                      {/* Info: avatar, nama, email */}
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar name={u.username} size={38} />
                        <div className="min-w-0">
                          <p className="font-bold text-[#2b1d15] text-sm truncate">{u.username}</p>
                          <div className="flex items-center gap-1 text-[#a07a5e] mt-0.5">
                            <EnvelopeIcon />
                            <span className="text-xs truncate">{u.email}</span>
                          </div>
                        </div>
                      </div>

                      {/* Aksi: badge role + tombol Edit + tombol Hapus */}
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <RoleBadge role={u.role} />

                        {/* Tombol Edit: membuka EditUserModal dengan data user ini */}
                        <button
                          onClick={() => handleOpenEdit(u)}
                          className="rounded-xl bg-[#edf4ff] text-blue-700 px-3 py-1.5 text-xs font-bold hover:bg-[#dbeafe] transition-all duration-200"
                        >
                          Edit
                        </button>

                        {/* Tombol Hapus: memanggil handleDeleteUser dengan data user ini */}
                        <button
                          onClick={() => handleDeleteUser(u)}
                          disabled={loadingDelete === u.id}
                          className="rounded-xl bg-red-50 text-red-600 px-3 py-1.5 text-xs font-bold hover:bg-red-100 transition-all duration-200 disabled:opacity-60 flex items-center gap-1"
                        >
                          {loadingDelete === u.id ? <Spinner /> : "Hapus"}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════
                ADMIN MANAGEMENT CARD
            ══════════════════════════════════════════════════════════════════ */}
            <div className="bg-white rounded-3xl border border-[#eee5da] shadow-sm overflow-hidden flex flex-col">
              {/* Garis warna biru di atas kartu */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#1d4ed8] via-[#3b82f6] to-[#93c5fd]" />

              {/* Header kartu */}
              <div className="px-6 py-5 border-b border-[#f0e8df] flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-[#2b1d15]">Admin Management</h3>
                  <p className="text-xs text-[#a07a5e] mt-0.5">Buat dan kelola akun admin</p>
                </div>
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                  {admins.length} admin
                </span>
              </div>

              {/* Form tambah admin baru */}
              <div className="px-6 py-5 border-b border-[#f0e8df] space-y-4">
                <p className="text-[11px] text-[#a07a5e] font-bold uppercase tracking-wider">Tambah Admin Baru</p>

                <FormField
                  label="Username"
                  placeholder="Masukkan username"
                  value={newAdmin.username}
                  onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                  icon={<UserSingleIcon />}
                />
                <FormField
                  label="Email"
                  type="email"
                  placeholder="Masukkan email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  icon={<EnvelopeIcon />}
                />
                <FormField
                  label="Password"
                  type="password"
                  placeholder="Masukkan password"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  icon={<LockClosedIcon />}
                />

                {/* Dropdown pilihan role untuk admin baru */}
                <div>
                  <label className="block text-xs font-bold text-[#2b1d15] mb-2 uppercase tracking-wider">Role</label>
                  <div className="relative bg-[#fdf9f6] border border-[#e8d9cc] focus-within:border-[#c8956b] focus-within:ring-2 focus-within:ring-[#c8956b]/15 rounded-xl px-4 py-3 transition-all duration-200">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c8956b]"><TagIcon /></span>
                    <select
                      value={newAdmin.role}
                      onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                      className="appearance-none w-full bg-transparent outline-none text-sm text-[#2b1d15] pl-7 cursor-pointer"
                    >
                      <option value="admin">Admin</option>
                      <option value="superadmin">Super Admin</option>
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-[#a07a5e] pointer-events-none">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>

                {/* Tombol submit tambah admin */}
                <button
                  onClick={handleCreateAdmin}
                  disabled={loadingAdmin}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#1d4ed8] to-[#3b82f6] text-white py-3 rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {loadingAdmin ? <><Spinner /> Menyimpan...</> : <><PlusCircleIcon /> Tambah Admin Baru</>}
                </button>
              </div>

              {/* Daftar admin — scrollable, tinggi maksimal 320px */}
              <div className="flex-1 overflow-y-auto p-6 space-y-3 max-h-80">
                {filteredAdmins.length === 0 ? (
                  // Tampil jika tidak ada admin atau tidak ada hasil pencarian
                  <div className="flex flex-col items-center justify-center py-10 text-[#b89f8d]">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-400 mx-auto mb-2">
                      <ShieldCheckIcon />
                    </div>
                    <p className="text-sm font-semibold">Belum ada admin</p>
                  </div>
                ) : (
                  filteredAdmins.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center justify-between p-4 bg-[#fdf9f6] hover:bg-[#f0f6ff] rounded-2xl border border-[#f0e8df] hover:border-blue-200 transition-all duration-200"
                    >
                      {/* Info: avatar, nama, email */}
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar name={a.username} size={38} />
                        <div className="min-w-0">
                          <p className="font-bold text-[#2b1d15] text-sm truncate">{a.username}</p>
                          <div className="flex items-center gap-1 text-[#a07a5e] mt-0.5">
                            <EnvelopeIcon />
                            <span className="text-xs truncate">{a.email}</span>
                          </div>
                        </div>
                      </div>

                      {/* Aksi: badge role + tombol Edit + tombol Hapus */}
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <RoleBadge role={a.role} />

                        {/* Tombol Edit: membuka EditUserModal dengan data admin ini */}
                        <button
                          onClick={() => handleOpenEdit(a)}
                          className="rounded-xl bg-[#edf4ff] text-blue-700 px-3 py-1.5 text-xs font-bold hover:bg-[#dbeafe] transition-all duration-200"
                        >
                          Edit
                        </button>

                        {/* Tombol Hapus: memanggil handleDeleteUser dengan data admin ini */}
                        <button
                          onClick={() => handleDeleteUser(a)}
                          disabled={loadingDelete === a.id}
                          className="rounded-xl bg-red-50 text-red-600 px-3 py-1.5 text-xs font-bold hover:bg-red-100 transition-all duration-200 disabled:opacity-60 flex items-center gap-1"
                        >
                          {loadingDelete === a.id ? <Spinner /> : "Hapus"}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
          <div className="h-8" />
        </div>
      </main>
    </div>
  );
}