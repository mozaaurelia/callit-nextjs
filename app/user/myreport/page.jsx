"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Search,
  Filter,
  MapPin,
  Calendar,
  Send,
  MessageCircle,
  Trash2,
} from "lucide-react";

// ── HEROICONS SIDEBAR ─────────────────────────────────────
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

const ArrowRightOnRectangleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
  </svg>
);

const ChevronLeftIcon = ({ rotated }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white"
    className={`w-3 h-3 transition-transform duration-300 ${rotated ? "rotate-180" : ""}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

// ──────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const styles = {
    approved:
      "bg-emerald-100 text-emerald-700 border border-emerald-200",
    rejected:
      "bg-red-100 text-red-700 border border-red-200",
    pending:
      "bg-amber-100 text-amber-700 border border-amber-200",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-[11px] font-bold ${
        styles[status?.toLowerCase()] ||
        "bg-gray-200 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};

export default function MyReportsPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [reports, setReports] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [user, setUser] = useState(null);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] =
    useState(null);
  const [chatMessage, setChatMessage] =
    useState("");
  const [chats, setChats] = useState([]);

  const [loading, setLoading] = useState(true);

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  // =========================
  // CEK LOGIN + ROLE USER
  // =========================
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);

      if (parsedUser.role !== "user") {
        router.push("/login");
        return;
      }

      setUser(parsedUser);

      const savedProfile =
        localStorage.getItem(
          `profileImage_${parsedUser.id}`
        );

      if (savedProfile)
        setProfileImage(savedProfile);

      fetchReports(token);
    } catch (err) {
      console.log(err);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.push("/login");
    }
  }, []);

  // =========================
  // FETCH REPORTS
  // =========================
  const fetchReports = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        setReports([]);
        return;
      }

      const safeData = Array.isArray(data)
        ? data
        : [];

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const myReports = safeData.filter(
        (item) => item.user_id === user.id
      );

      setReports(myReports);
    } catch (err) {
      console.log(err);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE REPORT
  // =========================
  const handleDelete = async (id) => {
    try {
      const confirmDelete = confirm(
        "Yakin ingin menghapus laporan?"
      );

      if (!confirmDelete) return;

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/posts/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message || "Gagal menghapus laporan"
        );
        return;
      }

      setReports(
        reports.filter((item) => item.id !== id)
      );

      setSelectedReport(null);

      alert("Laporan berhasil dihapus");
    } catch (err) {
      console.log(err);

      alert("Terjadi kesalahan");
    }
  };

  // =========================
  // SEARCH + FILTER BERFUNGSI
  // =========================
  const filteredReports = (
    Array.isArray(reports) ? reports : []
  ).filter((report) => {
    const query = search.toLowerCase();

    const matchesSearch =
      report.header
        ?.toLowerCase()
        .includes(query) ||
      report.body
        ?.toLowerCase()
        .includes(query) ||
      report.location
        ?.toLowerCase()
        .includes(query) ||
      report.status
        ?.toLowerCase()
        .includes(query);

    const matchesFilter =
      filter === "All" ||
      report.status?.toLowerCase() ===
        filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  // =========================
  // FETCH CHATS
  // =========================
  const fetchChats = async (reportId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/chats/${reportId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setChats(data);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // SEND CHAT
  // =========================
  const sendMessage = async () => {
    try {
      if (!chatMessage.trim()) return;

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/chats",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            public_report_id:
              selectedReport.id,
            message: chatMessage,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setChatMessage("");

      fetchChats(selectedReport.id);
    } catch (err) {
      console.log(err);
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
  // PROFILE IMAGE
  // =========================
  const handleProfileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

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
  // LOADING
  // =========================
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f3ef]">
        <div className="w-10 h-10 border-4 border-[#c8956b] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const navItems = [
    {
      key: "home",
      label: "Home",
      icon: <HomeIcon />,
      action: () =>
        router.push("/user/homepage"),
    },
    {
      key: "create",
      label: "Create Report",
      icon: <PlusCircleIcon />,
      action: () =>
        router.push("/user/createreport"),
    },
    {
      key: "reports",
      label: "My Reports",
      icon: <DocumentTextIcon />,
      action: () =>
        router.push("/user/myreport"),
    },
    {
      key: "profile",
      label: "Profile",
      icon: <UserCircleIcon />,
      action: () =>
        router.push("/user/profile"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f3ef] flex">

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 flex flex-col bg-linear-to-b from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b] text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >

        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
          {sidebarOpen && (
            <h1 className="text-2xl font-extrabold text-[#f0d5b8]">
              Call It!
            </h1>
          )}
        </div>

        {/* PROFILE */}
        {sidebarOpen ? (
          <div className="mx-4 mt-5 rounded-2xl bg-white/10 p-4 flex items-center gap-3">
            <img
              src={
                profileImage
                  ? profileImage
                  : `https://ui-avatars.com/api/?name=${user.username}&background=c8956b&color=fff`
              }
              alt="profile"
              className="w-11 h-11 rounded-full object-cover border-2 border-[#c8956b]"
              onClick={() =>
                fileInputRef.current.click()
              }
            />

            <div>
              <p className="text-sm font-bold">
                {user.username}
              </p>

              <p className="text-xs text-[#e7c9ae]">
                User Account
              </p>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleProfileUpload}
              className="hidden"
            />
          </div>
        ) : (
          <div className="flex justify-center mt-5">
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
        <nav className="flex-1 px-3 mt-5 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={item.action}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                item.key === "reports"
                  ? "bg-[#c8956b] text-white"
                  : "text-[#f3d7bf] hover:bg-white/10"
              } ${
                !sidebarOpen
                  ? "justify-center"
                  : ""
              }`}
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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[#ffb088] hover:bg-[#3d2718] transition ${
              !sidebarOpen
                ? "justify-center"
                : ""
            }`}
          >
            <ArrowRightOnRectangleIcon />

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
          className="absolute -right-3 top-7 w-6 h-6 bg-[#d8b08c] rounded-full flex items-center justify-center shadow-lg"
        >
          <ChevronLeftIcon
            rotated={!sidebarOpen}
          />
        </button>
      </aside>

      {/* MAIN */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >

        {/* TOPBAR */}
        <div className="sticky top-0 z-20 bg-[#f7f3ef]/80 backdrop-blur-md border-b border-[#eadfd4] px-8 py-5 flex items-center justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#a07a5e]">
              My Reports
            </p>

            <h1 className="text-2xl font-extrabold text-[#2b1d15]">
              Kelola laporan kamu ✨
            </h1>
          </div>

          {/* SEARCH BAR */}
          <div className="hidden md:flex items-center bg-white border border-[#eadfd4] rounded-2xl px-4 py-3 shadow-sm w-82.5">
            <Search
              size={18}
              className="text-[#a07a5e]"
            />

            <input
              type="text"
              placeholder="Cari laporan..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="flex-1 ml-3 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-8">

          {/* FILTER */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              "All",
              "Pending",
              "Approved",
              "Rejected",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                  filter === tab
                    ? "bg-linear-to-r from-[#6f4324] to-[#8a5a39] text-white shadow-lg"
                    : "bg-white text-[#7a5c44] border border-[#eadfd4]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* EMPTY */}
          {filteredReports.length === 0 && (
            <div className="bg-white rounded-[30px] p-12 text-center shadow-sm border border-[#eee5da]">
              <div className="text-6xl mb-4">
                📭
              </div>

              <h2 className="text-2xl font-bold text-[#6f4324]">
                Tidak ada laporan
              </h2>

              <p className="text-[#9b8573] mt-2">
                Laporan yang kamu buat akan
                muncul di sini
              </p>
            </div>
          )}

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredReports.map((report) => (

              <div
                key={report.id}
                className="group bg-white rounded-[30px] overflow-hidden border border-[#eee5da] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >

                <div
                  onClick={() => {
                    setSelectedReport(report);
                    fetchChats(report.id);
                  }}
                  className="cursor-pointer"
                >

                  <div className="relative overflow-hidden">

                    <img
                      src={
                        report.image
                          ? `http://localhost:5000/uploads/${report.image}`
                          : "/no-image.png"
                      }
                      onError={(e) => {
                        e.target.src =
                          "/no-image.png";
                      }}
                      alt="report"
                      className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                    />

                    <div className="absolute top-4 right-4">
                      <StatusBadge
                        status={report.status}
                      />
                    </div>

                  </div>

                  <div className="p-5 space-y-3">

                    <div>
                      <h3 className="font-extrabold text-lg text-[#2b1d15] line-clamp-1">
                        {report.header}
                      </h3>

                      <p className="text-xs text-[#a07a5e] mt-1">
                        {report.created_at
                          ? new Date(
                              report.created_at
                            ).toLocaleDateString(
                              "id-ID"
                            )
                          : ""}
                      </p>
                    </div>

                    <p className="text-sm text-[#6b5040] line-clamp-3 leading-relaxed">
                      {report.body}
                    </p>

                    <div className="flex items-center text-xs text-[#9b8573]">
                      <MapPin
                        size={14}
                        className="mr-1"
                      />

                      {report.location || "-"}
                    </div>

                  </div>

                </div>

                {/* DELETE */}
                {report.status?.toLowerCase() === "pending" && (
                  <div className="px-5 pb-5">
                    <button
                      onClick={() => handleDelete(report.id)}
                      className="w-full h-12 rounded-2xl bg-linear-to-r from-red-500 to-red-400 hover:opacity-90 text-white font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <Trash2 size={16} />
                      Delete Report
                    </button>
                  </div>
                )}

              </div>

            ))}
          </div>
        </div>
      </main>

      {/* MODAL */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">

          <div className="bg-white rounded-[30px] w-full max-w-3xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col">

            {/* HEADER */}
            <div className="p-6 border-b border-[#f0ebe5] flex items-center justify-between">

              <div className="flex items-center gap-4">

                <button
                  onClick={() =>
                    setSelectedReport(null)
                  }
                  className="w-11 h-11 rounded-2xl bg-[#f5eee8] flex items-center justify-center"
                >
                  <ArrowLeft size={18} />
                </button>

                <div>
                  <h2 className="font-extrabold text-xl text-[#2b1d15]">
                    {selectedReport.header}
                  </h2>

                  <p className="text-sm text-[#9b8573]">
                    Detail laporan
                  </p>
                </div>

              </div>

              <StatusBadge
                status={selectedReport.status}
              />
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              <img
                src={
                  selectedReport.image
                    ? `http://localhost:5000/uploads/${selectedReport.image}`
                    : "https://placehold.co/600x400"
                }
                alt="report"
                className="w-full h-72 object-cover rounded-3xl"
              />

              <div className="flex flex-wrap gap-3">
                <div className="bg-[#f8f3ee] px-4 py-2 rounded-xl flex items-center gap-2 text-sm text-[#6f4324] font-medium">
                  <MapPin size={15} />
                  {selectedReport.location ||
                    "-"}
                </div>

                <div className="bg-[#f8f3ee] px-4 py-2 rounded-xl flex items-center gap-2 text-sm text-[#6f4324] font-medium">
                  <Calendar size={15} />
                  {new Date(
                    selectedReport.created_at
                  ).toLocaleDateString("id-ID")}
                </div>
              </div>

              <div className="bg-[#fcfaf8] border border-[#f0ebe5] p-5 rounded-3xl">
                <p className="leading-relaxed text-[#5b4638]">
                  {selectedReport.body}
                </p>
              </div>

              {/* CHAT */}
              <div>

                <h3 className="text-sm font-bold uppercase tracking-widest text-[#a07a5e] mb-4 flex items-center gap-2">
                  <MessageCircle size={17} />
                  Diskusi Laporan
                </h3>

                <div className="space-y-4">

                  {chats.map((chat) => (

                    <div
                      key={chat.id}
                      className={`flex ${
                        chat.sender_id ===
                        JSON.parse(
                          localStorage.getItem(
                            "user"
                          )
                        ).id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >

                      <div
                        className={`max-w-[80%] p-4 rounded-2xl text-sm shadow-sm ${
                          chat.sender_id ===
                          JSON.parse(
                            localStorage.getItem(
                              "user"
                            )
                          ).id
                            ? "bg-linear-to-r from-[#6f4324] to-[#8a5a39] text-white rounded-tr-none"
                            : "bg-[#f5eee8] text-[#3d2a20] rounded-tl-none"
                        }`}
                      >

                        <p>{chat.message}</p>

                        <p className="text-[10px] mt-2 opacity-60 text-right">
                          {new Date(
                            chat.created_at
                          ).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute:
                                "2-digit",
                            }
                          )}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

            {/* INPUT */}
            <div className="p-5 border-t border-[#f0ebe5] bg-[#fcfaf8]">

              <div className="flex items-center gap-3 bg-white rounded-2xl px-3 py-2 border border-[#eadfd4]">

                <input
                  value={chatMessage}
                  onChange={(e) =>
                    setChatMessage(
                      e.target.value
                    )
                  }
                  placeholder="Ketik pesan..."
                  className="flex-1 bg-transparent outline-none text-sm"
                />

                <button
                  onClick={sendMessage}
                  className="w-11 h-11 rounded-xl bg-linear-to-r from-[#6f4324] to-[#8a5a39] text-white flex items-center justify-center"
                >
                  <Send size={18} />
                </button>

              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}