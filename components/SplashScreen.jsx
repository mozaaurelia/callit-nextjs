"use client";
import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState("enter"); // enter → exit

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase("exit"), 800 + 1400);
    const doneTimer = setTimeout(() => onFinish?.(), 800 + 1400 + 800);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800;900&family=Plus+Jakarta+Sans:wght@500;600&display=swap');

        /* ── Overlay penuh ── */
        .sp-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: flex-end;        /* card mulai dari bawah */
          justify-content: center;
          background: transparent;
          pointer-events: none;
        }

        /* ── Card utama dengan border-radius ── */
        .sp-card {
          width: 100%;
          height: 100%;                 /* full layar, tapi punya radius */
          background: #8b7165;
          border-radius: 0  40px 40px; /* radius bawah saat masuk */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 22px;
          pointer-events: all;

          /* animasi masuk: slide dari bawah */
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-duration: 0.85s;
          animation-name: ${phase === "exit" ? "splashExit" : "splashEnter"};
        }

        @keyframes splashEnter {
          from {
            transform: translateY(100%);
            border-radius: 40px 40px 0 0;
          }
          to {
            transform: translateY(0);
            border-radius: 0 0 40px 40px;
          }
        }

        @keyframes splashExit {
          from {
            transform: translateY(0);
            border-radius: 0 0 40px 40px;
            opacity: 1;
          }
          to {
            transform: translateY(-102%);
            border-radius: 40px 40px 0 0;
            opacity: 0.6;
          }
        }

        /* ── Logo ── */
        .sp-logo-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: spPopIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 0.55s both;
        }

        .sp-ring {
          position: absolute;
          width: 88px;
          height: 88px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.35);
          animation: spRingPulse 1.4s ease-out 0.9s infinite;
        }

        .sp-ring-2 {
          width: 110px;
          height: 110px;
          animation-delay: 1.15s;
          opacity: 0.5;
        }

        .sp-icon {
          width: 76px;
          height: 76px;
          background: rgba(255,255,255,0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid rgba(255,255,255,0.25);
          backdrop-filter: blur(8px);
        }

        .sp-icon svg {
          width: 36px;
          height: 36px;
          fill: white;
        }

        @keyframes spPopIn {
          0%   { transform: scale(0.65); opacity: 0; }
          70%  { transform: scale(1.08); }
          100% { transform: scale(1);   opacity: 1; }
        }

        @keyframes spRingPulse {
          0%   { transform: scale(1);    opacity: 0.5; }
          100% { transform: scale(1.65); opacity: 0;   }
        }

        /* ── Teks ── */
        .sp-title {
          font-family: 'Nunito', sans-serif;
          font-size: 44px;
          font-weight: 900;
          color: #fff;
          letter-spacing: -1.5px;
          line-height: 1;
          animation: spFadeUp 0.5s ease 0.75s both;
        }

        .sp-title span { color: rgba(255,255,255,0.45); }

        .sp-sub {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          letter-spacing: 3px;
          text-transform: uppercase;
          animation: spFadeUp 0.5s ease 0.9s both;
        }

        /* ── Loading dots ── */
        .sp-dots {
          display: flex;
          gap: 7px;
          margin-top: 8px;
          animation: spFadeUp 0.5s ease 1.05s both;
        }

        .sp-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(255,255,255,0.35);
        }

        .sp-dot:nth-child(1) { animation: spDotBounce 1s ease-in-out 1.2s infinite; }
        .sp-dot:nth-child(2) { animation: spDotBounce 1s ease-in-out 1.35s infinite; }
        .sp-dot:nth-child(3) { animation: spDotBounce 1s ease-in-out 1.5s infinite; }

        @keyframes spDotBounce {
          0%, 100% { transform: translateY(0);   background: rgba(255,255,255,0.35); }
          50%       { transform: translateY(-6px); background: rgba(255,255,255,0.8);  }
        }

        @keyframes spFadeUp {
          from { transform: translateY(14px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        /* ── Noise texture overlay (opsional, efek film) ── */
        .sp-noise {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
        }
      `}</style>

      <div className="sp-overlay">
        <div className="sp-card">
          {/* noise grain */}
          <div className="sp-noise" />

          {/* Logo */}
          <div className="sp-logo-wrap">
            <div className="sp-ring" />
            <div className="sp-ring sp-ring-2" />
            <div className="sp-icon">
              <svg viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.59 1 1 0 01-.25 1.01l-2.2 2.19z" />
              </svg>
            </div>
          </div>

          {/* Teks */}
          <div className="sp-title">Call <span>it!</span></div>
          <div className="sp-sub">Sistem Pengaduan Masyarakat</div>

          {/* Dots */}
          <div className="sp-dots">
            <div className="sp-dot" />
            <div className="sp-dot" />
            <div className="sp-dot" />
          </div>
        </div>
      </div>
    </>
  );
}