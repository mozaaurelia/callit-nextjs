"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("LOGIN DATA:", data);

      if (!res.ok) {
        throw new Error(data.message || "Login gagal");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("TOKEN DISIMPAN:", data.token);
      console.log("USER DISIMPAN:", data.user);

      if (data.user.role === "user") {
        router.push("/user/homepage");
      } else if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/superadmin/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fdfaf7] to-[#f8f4f0] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Hero Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">

          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#8b5e3c] to-[#6e4a2d] rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3b2f2f] to-[#8b5e3c] bg-clip-text text-transparent mb-2">
              Login
            </h1>
            <p className="text-[#7a6560] text-sm">
              Masuk ke dalam CALL IT!
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl mb-6 text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6" autoComplete="off">
            <div>
              <label className="block text-sm font-medium text-[#5a4035] mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                autoComplete="new-password"
                className="w-full px-4 py-3 rounded-2xl border border-[#d4b89a]/50 bg-white/80 backdrop-blur-sm text-black focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]/50 focus:border-[#8b5e3c] transition-all duration-200 text-sm placeholder-[#b09080]"
                placeholder="admin@callit.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5a4035] mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                className="w-full px-4 py-3 rounded-2xl border border-[#d4b89a]/50 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]/50 focus:border-[#8b5e3c] transition-all duration-200 text-sm placeholder-[#b09080]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#8b5e3c] to-[#6e4a2d] text-white py-3.5 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl hover:from-[#6e4a2d] hover:to-[#5a3a22] focus:outline-none focus:ring-2 focus:ring-[#8b5e3c]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sedang masuk...
                </>
              ) : (
                "Masuk ke Dashboard"
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 pt-6 border-t border-[#f0e8db] text-center">
            <p className="text-sm text-[#7a6560]">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#8b5e3c] hover:text-[#6e4a2d] transition"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#b09080] mt-8">
          © {new Date().getFullYear()} CALL IT! Admin Panel
        </p>
      </div>
    </main>
  );
}