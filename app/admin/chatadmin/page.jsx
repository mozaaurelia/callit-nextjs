  "use client";

  import { useState, useEffect } from "react";
  import { useRouter } from "next/navigation";
  import {
    LayoutDashboard,
    FileText,
    MessageCircle,
    LogOut,
    ChevronLeft,
    UserCircle,
  } from "lucide-react";

  export default function ChatAdminPage() {
    const router = useRouter();

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("chat");


  // GATAU INI PENEMPATANNYA BENER ATAU SALAH

  const fetchChats = async (reportId) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/chats/${reportId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setMessages(data);
  };

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/posts/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("STATUS:", res.status);

      const data = await res.json();

      console.log("DATA REPORT:", data);

      setChats(
    Array.isArray(data.data) ? data.data : []
  );

    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchReports();

  }, []);

  const sendMessage = async () => {
    if (!message.trim() || !selectedChat) return;

    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        public_report_id: selectedChat.id,
        message: message,
      }),
    });

    setMessage("");

    // refresh chat setelah kirim
    fetchChats(selectedChat.id);
  };


    return (
      <div style={{ display: "flex", minHeight: "100vh", background: "linear-gradient(135deg, #fdfaf7 0%, #f8f4f0 100%)", fontFamily: "'DM Sans', sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
          * { box-sizing: border-box; }
          input, button { font-family: inherit; }
          input::placeholder { color: #c0b0a0; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #d4c4b4; border-radius: 4px; }
          .nav-link:hover { background: rgba(139,94,60,0.1) !important; color: #8b5e3c !important; }
          .row-hover:hover { background: #faf8f5 !important; cursor: pointer; }
          .filter-btn { cursor: pointer; transition: all 0.15s; }
          .filter-btn:hover { opacity: 0.8; }
          .action-icon:hover { opacity: 0.6; }
          .page-btn:hover { background: #f0e9e2 !important; }
        `}</style>

        {/* ── SIDEBAR (BARU) ── */}
    {/* SIDEBAR */}
  <aside
    className={`
      fixed top-0 left-0 h-full z-30 flex flex-col
      bg-gradient-to-b from-[#5c2d0e] via-[#7a3f1c] to-[#c8956b]
      text-white transition-all duration-300 ease-in-out
      ${sidebarOpen ? "w-64" : "w-20"}
    `}
  >

    {/* LOGO */}
    <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
      {sidebarOpen && (
        <h1 className="text-2xl font-extrabold text-[#f0d5b8]">
          Call It!
        </h1>
      )}
    </div>

    {/* ADMIN PROFILE */}
    {sidebarOpen ? (
      <div className="mx-4 mt-5 mb-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4 flex items-center gap-3">

        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#f0d5b8] to-[#c8956b] flex items-center justify-center">
          <UserCircle className="text-white" size={22} />
        </div>

        <div>
          <p className="text-sm font-bold">
            {user?.username || "Admin"}
          </p>
          <p className="text-[11px] text-[#e7c8ab]">
            Admin Panel
          </p>
        </div>

      </div>
    ) : (
      <div className="flex justify-center mt-5 mb-2">
        <UserCircle size={28} />
      </div>
    )}

    {/* NAV */}
    <nav className="flex-1 flex flex-col gap-1 px-3 mt-4">

      {[
        {
          key: "dashboard",
          label: "Dashboard",
          icon: LayoutDashboard,
          action: () => router.push("/admin/dashboard"),
        },
        {
          key: "laporan",
          label: "Kelola Laporan",
          icon: FileText,
          action: () => router.push("/admin/laporan"),
        },
        {
          key: "chat",
          label: "Chat Admin",
          icon: MessageCircle,
          action: () => router.push("/admin/chatadmin"),
        },
      ].map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.key}
            onClick={() => {
              setActiveMenu(item.key);
              item.action();
            }}
            className={`
              flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all
              ${
                activeMenu === item.key
                  ? "bg-[#c8956b] text-white shadow-lg"
                  : "text-[#f3d7bf] hover:bg-white/10 hover:text-white"
              }
              ${!sidebarOpen ? "justify-center" : ""}
            `}
          >
            <Icon size={20} />
            {sidebarOpen && <span>{item.label}</span>}
          </button>
        );
      })}

    </nav>

    {/* LOGOUT */}
    <div className="px-3 pb-6">
      <button
        onClick={() => {
          localStorage.clear();
          router.push("/login");
        }}
        className={`
          flex items-center gap-3 px-3 py-3 rounded-xl w-full
          text-[#ffd1b8] hover:bg-[#3d2718] transition
          ${!sidebarOpen ? "justify-center" : ""}
        `}
      >
        <LogOut size={20} />
        {sidebarOpen && "Logout"}
      </button>
    </div>

    {/* TOGGLE */}
    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="absolute -right-3 top-7 w-6 h-6 bg-[#d8b08c] rounded-full flex items-center justify-center shadow"
    >
      <ChevronLeft
        size={14}
        className={`${!sidebarOpen ? "rotate-180" : ""}`}
      />
    </button>

  </aside>

        {/* ── MAIN CONTENT ── */}
          <div
            style={{
              marginLeft: 260,
              flex: 1,
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >        
          {/* MAIN CONTENT (SESUAI ASLI) */}
          <main className="flex flex-1 p-6 gap-6 overflow-hidden h-full">
            {/* CHAT LIST */}
            <section className="w-[360px] h-full bg-white rounded-[32px] border border-[#eee3da] shadow-sm flex flex-col overflow-hidden">
              <div className="p-6 border-b border-[#f1e7df]">
                <h2 className="text-2xl font-bold mb-5">Chats</h2>

                <div className="bg-[#f8f3ef] rounded-2xl px-4 py-3 flex items-center gap-3 border border-[#eee3da]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-[#9d8b7d]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.5 5.5a7.5 7.5 0 0 0 11.15 11.15Z"
                    />
                  </svg>

                  <input
                    type="text"
                    placeholder="Search conversation..."
                    className="bg-transparent outline-none w-full text-sm"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chats.map((chat) => (

                  <button
                    key={chat.id}
                  onClick={() => { setSelectedChat(chat); fetchChats(chat.id); }}
                    className={`w-full text-left rounded-3xl p-4 border transition-all ${
                      selectedChat?.id === chat.id
                        ? "bg-[#8b5a34] text-white border-[#8b5a34] shadow-md"
                        : "bg-[#fcfaf8] border-[#f0e5dd] hover:bg-[#f5efea]"
                    }`}
                  >
                    <div className="flex gap-4 items-start">
                      <div className="w-14 h-14 rounded-full bg-[#dbc4b2] flex items-center justify-center font-bold text-lg shrink-0">
                        {chat.username?.charAt(0)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold truncate">
                              {chat.name || chat.username || "Unknown User"}
                            </h3>
                          <span className="text-xs opacity-70">{new Date(chat.created_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}</span>
                              </div>

                        <p className="text-sm mt-2 truncate opacity-80">
                          {chat.lastMessage || "Belum ada pesan"}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* CHAT ROOM */}
            <section className="flex-1 bg-white rounded-[32px] border border-[#eee3da] shadow-sm overflow-hidden flex flex-col h-full">
              {!selectedChat ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-10 bg-[#fcfaf8]">
                  <div className="w-52 h-52 rounded-full bg-[#f3ebe4] mb-10 flex items-center justify-center border border-[#eadfd4]">
                    <div className="w-28 h-28 border-4 border-[#b28b70] rounded-[30px]" />
                  </div>

                  <h2 className="text-4xl font-bold text-[#5a4332] mb-4">
                    Select a conversation
                  </h2>

                  <p className="text-[#9b8b7f] text-lg max-w-lg leading-relaxed">
                    Choose a user report discussion to start replying.
                  </p>
                </div>
              ) : (
                <>
                  {/* HEADER */}
                  <div className="px-8 py-6 border-b border-[#f1e7df] bg-[#fcfaf8] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-[#dbc4b2] flex items-center justify-center font-bold text-lg">
                        {selectedChat.username?.charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-bold text-lg">
                              {selectedChat.name || selectedChat.username || "Unknown User"}
                            </h3>
                        <p className="text-sm text-[#9d8b7d]">
                          Report Discussion
                        </p>
                      </div>
                    </div>

                    <span className="px-4 py-2 rounded-full bg-[#fff1df] text-[#b36b00] text-sm font-semibold">
                      {selectedChat.status}
                    </span>
                  </div>

                  {/* MESSAGES */}
                  <div className="flex-1 overflow-y-auto p-8 bg-[#faf7f4] space-y-6 min-h-0">

                    {messages.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-[#9d8b7d]">
                        Belum ada chat
                      </div>
                    ) : (
                      messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            msg.sender_id === user?.id
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-[28px] px-5 py-4 shadow-sm ${
                              msg.sender_id === user?.id
                                ? "bg-[#8b5a34] text-white"
                                : "bg-white border border-[#eee3da]"
                            }`}
                          >

                            {/* NAMA USER */}
                            <p
                              className={`text-xs font-semibold mb-2 ${
                                msg.sender_id === user?.id
                                  ? "text-white/80"
                                  : "text-[#8b5a34]"
                              }`}
                            >
                              {msg.username}
                            </p>

                            {/* ISI CHAT */}
                            <p className="leading-relaxed break-words">
                              {msg.message}
                            </p>

                            {/* JAM */}
                            <p
                              className={`text-xs mt-3 text-right ${
                                msg.sender_id === user?.id
                                  ? "text-white/70"
                                  : "text-[#9d8b7d]"
                              }`}
                            >
                              {new Date(msg.created_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>

                          </div>
                        </div>
                      ))
                    )}

                  </div>

                  {/* INPUT */}
                  <div className="p-6 border-t border-[#f1e7df] bg-white">
                    <div className="bg-[#faf7f4] border border-[#eee3da] rounded-3xl px-5 py-4 flex items-center gap-4">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your reply..."
                        className="flex-1 bg-transparent outline-none"
                      />

                      <button
                          onClick={sendMessage}
                          className="bg-[#8b5a34] hover:bg-[#774a29] transition text-white px-7 py-3 rounded-2xl font-semibold shadow-sm"
                        >
                          Send
                        </button>
                      
                    </div>
                  </div>
                </>
              )}
            </section>
          </main>
        </div>
      </div>
    );
  }