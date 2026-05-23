"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // HANDLE REGISTER
  // =========================
  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // VALIDASI PASSWORD
    if (form.password !== form.confirmPassword) {
      setError("Password konfirmasi tidak cocok");
      return;
    }

    if (form.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    setLoading(true);

    try {
      // =========================
      // REGISTER
      // =========================
      const registerRes = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: form.name,
            email: form.email,
            password: form.password,
          }),
        }
      );

      const registerData = await registerRes.json();

      console.log("REGISTER RESPONSE:", registerData);

      if (!registerRes.ok) {
        throw new Error(
          registerData.message || "Register gagal"
        );
      }

      // =========================
      // SIMPAN TOKEN
      // =========================
      localStorage.setItem(
        "token",
        registerData.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(registerData.user)
      );

      console.log("TOKEN:", registerData.token);
      console.log("USER:", registerData.user);

      // SUCCESS
      setSuccess("Register berhasil");

      // =========================
      // REDIRECT USER
      // =========================
      setTimeout(() => {
        router.push("/user/homepage");
      }, 1000);

    } catch (err) {
      console.log(err);

      setError(err.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fdfaf7] to-[#f8f4f0] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">

        {/* HERO CARD */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">

          {/* TITLE */}
          <div className="text-center mb-8">

            <div className="w-20 h-20 bg-gradient-to-br from-[#8b5e3c] to-[#6e4a2d] rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-xl">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#3b2f2f] to-[#8b5e3c] bg-clip-text text-transparent mb-2">
              Register
            </h1>

            <p className="text-[#7a6560] text-sm">
              Buat akun untuk CALL IT!
            </p>
          </div>

          {/* SUCCESS */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-2xl mb-6 text-sm">
              {success}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl mb-6 text-sm">
              {error}
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleRegister}
            className="space-y-6"
          >

            {/* NAME */}
            <div>
              <label className="block text-sm font-medium text-[#5a4035] mb-2">
                Nama Lengkap
              </label>

              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-2xl border border-[#d4b89a]/50 bg-white/80"
              />
            </div>

            {/* EMAIL */}
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
                placeholder="admin@callit.com"
                className="w-full px-4 py-3 rounded-2xl border border-[#d4b89a]/50 bg-white/80"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-[#5a4035] mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={form.password}
                onChange={handleChange}
                placeholder="Minimal 6 karakter"
                className="w-full px-4 py-3 rounded-2xl border border-[#d4b89a]/50 bg-white/80"
              />
            </div>

            {/* CONFIRM */}
            <div>
              <label className="block text-sm font-medium text-[#5a4035] mb-2">
                Konfirmasi Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Ulangi password"
                className="w-full px-4 py-3 rounded-2xl border border-[#d4b89a]/50 bg-white/80"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#8b5e3c] to-[#6e4a2d] text-white py-3.5 rounded-2xl font-semibold text-sm"
            >
              {loading
                ? "Membuat akun..."
                : "Daftar Akun"}
            </button>
          </form>

          {/* LOGIN */}
          <div className="mt-8 pt-6 border-t border-[#f0e8db] text-center">
            <p className="text-sm text-[#7a6560]">
              Sudah punya akun?{" "}

              <Link
                href="/login"
                className="font-semibold text-[#8b5e3c]"
              >
                Masuk sekarang
              </Link>
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <p className="text-center text-xs text-[#b09080] mt-8">
          © {new Date().getFullYear()} CALL IT!
        </p>
      </div>
    </main>
  );
}