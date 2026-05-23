"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("id");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = {
    id: {
      fitur: "Fitur",
      tentang: "Tentang",
      kontak: "Kontak",
      signup: "Daftar",
      login: "Login",
      heroLabel: "Sistem Pengaduan Masyarakat",
      heroTitle: "Sampaikan laporanmu dengan cepat, aman, dan transparan.",
      heroDesc:
        "Platform ini membantu masyarakat untuk menyampaikan pengaduan secara langsung kepada pihak terkait dengan sistem yang mudah dan terstruktur.",
      mulai: "Mulai Lapor",
      pelajari: "Pelajari",
      fiturTitle: "Fitur Utama",
      fiturSub: "Semua yang kamu butuhkan dalam satu platform.",
      fitur1Title: "Laporan Cepat",
      fitur1Desc: "Buat laporan hanya dalam beberapa langkah mudah.",
      fitur2Title: "Tracking Status",
      fitur2Desc: "Pantau status laporan secara real-time kapan saja.",
      fitur3Title: "Komentar & Tanggapan",
      fitur3Desc: "Interaksi langsung dengan admin atau petugas terkait.",
      tentangTitle: "Tentang Kami",
      tentangSub: "Membangun transparansi melalui teknologi.",
      tentangDesc1: "CALL IT! adalah platform pengaduan masyarakat yang dirancang untuk mempermudah warga menyampaikan aspirasi dan keluhan secara digital.",
      tentangDesc2: "Dengan sistem yang terintegrasi dan aman, kami memastikan setiap laporan ditangani dengan profesionalisme dan akuntabilitas.",
      tentangStats1: "1000+",
      tentangStats2: "Laporan",
      tentangStats3: "95%",
      tentangStats4: "Puas",
      footer: "Sistem Pengaduan Masyarakat",
    },
    en: {
      fitur: "Features",
      tentang: "About",
      kontak: "Contact",
      signup: "Sign up",
      login: "Login",
      heroLabel: "Public Complaint System",
      heroTitle: "Submit your reports quickly, safely, and transparently.",
      heroDesc:
        "This platform helps people report issues directly to authorities with an easy and structured system.",
      mulai: "Start Report",
      pelajari: "Learn More",
      fiturTitle: "Main Features",
      fiturSub: "Everything you need in one platform.",
      fitur1Title: "Quick Reports",
      fitur1Desc: "Create reports in just a few easy steps.",
      fitur2Title: "Status Tracking",
      fitur2Desc: "Track your report status in real time, anytime.",
      fitur3Title: "Comments & Responses",
      fitur3Desc: "Interact directly with admins or officers.",
      tentangTitle: "About Us",
      tentangSub: "Building transparency through technology.",
      tentangDesc1: "CALL IT! is a public complaint platform designed to make it easy for citizens to submit aspirations and complaints digitally.",
      tentangDesc2: "With an integrated and secure system, we ensure every report is handled with professionalism and accountability.",
      tentangStats1: "1000+",
      tentangStats2: "Reports",
      tentangStats3: "95%",
      tentangStats4: "Satisfied",
      footer: "Public Complaint System",
    },
  };

  return (
    <main className="bg-white text-[#3b2f2f]">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-center">
        <div
          className={`w-[95%] max-w-6xl flex items-center justify-between px-8 py-4 transition-all duration-300 ${
            scrolled
              ? "bg-white shadow-md rounded-2xl mt-3"
              : "bg-white/90 backdrop-blur-sm rounded-2xl mt-3"
          }`}
        >
          <span className="text-[20px] font-extrabold tracking-wide text-[#3b2f2f]">
            CALL <span className="text-[#8b5e3c]">IT!</span>
          </span>

          <nav className="hidden md:flex gap-10 text-[15px] font-semibold text-[#5a4035]">
            <a href="#fitur" className="hover:text-[#8b5e3c] transition">
              {t[lang].fitur}
            </a>
            <a href="#tentang" className="hover:text-[#8b5e3c] transition">
              {t[lang].tentang}
            </a>
            <a href="#kontak" className="hover:text-[#8b5e3c] transition">
              {t[lang].kontak}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex text-[12px] font-semibold border border-[#d4b89a] rounded-lg overflow-hidden">
              {["id", "en"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 uppercase ${
                    lang === l
                      ? "bg-[#8b5e3c] text-white"
                      : "bg-white text-[#8b5e3c]"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <Link href="/register">
              <button className="border border-[#8b5e3c] text-[#8b5e3c] px-5 py-2 rounded-xl text-[14px] font-semibold hover:bg-[#f6efe9] transition">
                {t[lang].signup}
              </button>
            </Link>

            <Link href="/login">
              <button className="bg-[#8b5e3c] text-white px-5 py-2 rounded-xl text-[14px] font-bold hover:bg-[#6e4a2d] transition">
                {t[lang].login}
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden pt-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[360px] bg-[radial-gradient(ellipse_at_top,_rgba(234,217,201,0.55)_0%,_transparent_70%)] pointer-events-none" />

        <p className="text-[12px] font-medium tracking-[2px] uppercase text-[#8b5e3c] mb-5 opacity-80">
          {t[lang].heroLabel}
        </p>

        <h1 className="text-5xl md:text-[62px] font-bold leading-[1.15] max-w-3xl text-[#3b2f2f]">
          {t[lang].heroTitle}
        </h1>

        <p className="mt-5 text-[16px] text-[#7a6560] max-w-[480px] leading-[1.75]">
          {t[lang].heroDesc}
        </p>

        <div className="mt-9 flex gap-3 flex-wrap justify-center">
          <Link href="/login">
            <button className="bg-[#8b5e3c] text-white px-7 py-3 rounded-full text-[14px] font-semibold hover:bg-[#6e4a2d] transition">
              {t[lang].mulai}
            </button>
          </Link>
          <Link href="/login">
            <button className="border border-[#8b5e3c] text-[#8b5e3c] px-7 py-3 rounded-full text-[14px] hover:bg-[#f6efe9] transition">
              {t[lang].pelajari}
            </button>
          </Link>
        </div>
      </section>

      {/* FITUR (DITAMBAH ANIMASI HOVER) */}
      <section id="fitur" className="py-16 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(234,217,201,0.08)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#3b2f2f] to-[#8b5e3c] bg-clip-text text-transparent mb-4">
            {t[lang].fiturTitle}
          </h2>
          <p className="text-lg text-[#7a6560] max-w-xl mx-auto">
            {t[lang].fiturSub}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Feature 1 */}
          <div className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-7 border border-white/30 hover:border-[#8b5e3c]/50 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 hover:bg-white">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[#8b5e3c] to-[#6e4a2d] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#3b2f2f] mt-10 mb-2 group-hover:text-[#8b5e3c] transition">
              {lang === "id" ? t.id.fitur1Title : t.en.fitur1Title}
            </h3>
            <p className="text-[#7a6560] text-sm">
              {lang === "id" ? t.id.fitur1Desc : t.en.fitur1Desc}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-7 border border-white/30 hover:border-[#8b5e3c]/50 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 hover:bg-white">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[#8b5e3c] to-[#6e4a2d] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#3b2f2f] mt-10 mb-2 group-hover:text-[#8b5e3c] transition">
              {lang === "id" ? t.id.fitur2Title : t.en.fitur2Title}
            </h3>
            <p className="text-[#7a6560] text-sm">
              {lang === "id" ? t.id.fitur2Desc : t.en.fitur2Desc}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-7 border border-white/30 hover:border-[#8b5e3c]/50 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 hover:bg-white">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[#8b5e3c] to-[#6e4a2d] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#3b2f2f] mt-10 mb-2 group-hover:text-[#8b5e3c] transition">
              {lang === "id" ? t.id.fitur3Title : t.en.fitur3Title}
            </h3>
            <p className="text-[#7a6560] text-sm">
              {lang === "id" ? t.id.fitur3Desc : t.en.fitur3Desc}
            </p>
          </div>

        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="tentang" className="py-24 px-6 md:px-12 lg:px-20 bg-gradient-to-b from-white/70 to-[#f8f4f0]/90 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_right_top,_rgba(139,94,60,0.05)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#3b2f2f] via-[#8b5e3c] to-[#6e4a2d] bg-clip-text text-transparent mb-6">
              {t[lang].tentangTitle}
            </h2>
            <p className="text-xl text-[#7a6560] max-w-2xl mx-auto">
              {t[lang].tentangSub}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/40 shadow-xl">
                <h3 className="text-2xl font-bold text-[#3b2f2f] mb-4">Misi Kami</h3>
                <p className="text-[#7a6560] leading-relaxed text-lg">
                  {lang === "id" ? t.id.tentangDesc1 : t.en.tentangDesc1}
                </p>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/40 shadow-xl">
                <h3 className="text-2xl font-bold text-[#3b2f2f] mb-4">Visi Kami</h3>
                <p className="text-[#7a6560] leading-relaxed text-lg">
                  {lang === "id" ? t.id.tentangDesc2 : t.en.tentangDesc2}
                </p>
              </div>
            </div>

            {/* Right Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="group bg-gradient-to-br from-[#8b5e3c] to-[#6e4a2d] text-white rounded-3xl p-8 shadow-2xl hover:scale-105 transition-all duration-300 cursor-default">
                <div className="text-4xl md:text-5xl font-bold group-hover:scale-110 transition-transform">
                  {t[lang].tentangStats1}
                </div>
                <div className="text-sm opacity-90 mt-2">{t[lang].tentangStats2}</div>
              </div>
              
              <div className="group bg-gradient-to-br from-[#8b5e3c] to-[#6e4a2d] text-white rounded-3xl p-8 shadow-2xl hover:scale-105 transition-all duration-300 cursor-default row-span-2">
                <div className="text-4xl md:text-5xl font-bold group-hover:scale-110 transition-transform">
                  {t[lang].tentangStats3}
                </div>
                <div className="text-sm opacity-90 mt-2">{t[lang].tentangStats4}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-20 py-8 text-center text-[13px] text-[#b09080]">
        © {new Date().getFullYear()} CALL IT! — {t[lang].footer}
      </footer>

    </main>
  );
}