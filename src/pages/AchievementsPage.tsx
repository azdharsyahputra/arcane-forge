// src/pages/AchievementsPage.tsx
import type { Achievement } from "../types/achievement";
import { achievementsData } from "../data/achievements";
import bgGuild from "../assets/images/achievement-bg.png"; // ganti path kalau beda

export default function AchievementsPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center py-12 px-6"
      style={{ backgroundImage: `url(${bgGuild})` }}
    >
      {/* Title */}
      <h1 className="pixel-title select-none">ACHIEVEMENTS</h1>

      {/* container cards */}
      <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {achievementsData.map((ach: Achievement) => (
          <div key={ach.id} className="frame-outer relative">
            {/* inner plaque */}
            <div className="frame-inner flex items-start gap-6">
              {/* icon box */}
              <div className="icon-box">
                <div className="icon-inner">{ach.icon}</div>
              </div>

              {/* text */}
              <div className="flex-1">
                <div className="ach-title">{ach.title}</div>
                <div className="ach-desc">{ach.description}</div>
              </div>
            </div>

            {/* status badge bottom-right */}
            <div
              className={`status-badge ${ach.unlocked ? "unlocked" : "locked"}`}
            >
              {ach.unlocked ? "Unlocked" : "Locked"}
            </div>
          </div>
        ))}
      </div>

      {/* Styles (Tailwind utility + custom CSS) */}
      <style>{`
        /* load pixel font */
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        /* Title */
        .pixel-title {
          font-family: 'Press Start 2P', monospace;
          color: #ffcc33;
          font-size: 44px;
          line-height: 1;
          margin: 0;
          text-align: center;
          text-shadow:
            4px 4px 0 #4b2f1e,
            0 0 10px rgba(255,200,60,0.15);
          letter-spacing: 2px;
          filter: saturate(1.05);
        }

        /* Outer frame (wood border) */
        .frame-outer {
          background: transparent;
          padding: 6px; /* space for outer wooden border */
          border-radius: 8px;
          display: block;
        }

        /* inner plaque (the visible card) */
        .frame-inner {
          background: linear-gradient(180deg, #3b2a20 0%, #321e16 100%);
          border: 6px solid #6a4c2b; /* outer wooden border */
          box-shadow:
            inset 0 2px 0 rgba(255,255,255,0.03),
            0 6px 0 rgba(0,0,0,0.35);
          padding: 18px;
          border-radius: 6px;
          align-items: center;
        }

        /* Icon area */
        .icon-box {
          width: 84px;
          height: 84px;
          flex-shrink: 0;
          display:flex;
          align-items:center;
          justify-content:center;
          background: linear-gradient(180deg,#2a1c13,#3b261a);
          border: 4px solid #7b5336;
          border-radius: 6px;
          box-shadow: inset 0 -6px 12px rgba(0,0,0,0.35);
        }
        .icon-inner {
          font-size: 36px; /* emoji or small pixel image */
          line-height: 1;
          transform: translateY(-1px);
        }

        /* Title + desc */
        .ach-title {
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Press Start 2P', sans-serif;
          font-weight: 700;
          color: #ffe6b3;
          font-size: 18px;
          margin-bottom: 6px;
          text-shadow: 1px 1px 0 #3b2a20;
        }
        .ach-desc {
          color: #d8c0a6;
          font-size: 13px;
          line-height: 1.2;
        }

        /* status badge */
        .status-badge {
          position: absolute;
          right: 14px;
          bottom: 12px;
          font-weight: 700;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 12px;
          text-shadow: 1px 1px 0 rgba(0,0,0,0.6);
          border: 2px solid rgba(0,0,0,0.35);
        }
        .status-badge.unlocked {
          background: linear-gradient(180deg,#c68600,#9b6a00);
          color: #fff3d1;
          box-shadow: 0 3px 0 rgba(0,0,0,0.35);
        }
        .status-badge.locked {
          background: linear-gradient(180deg,#4a3f3a,#39302b);
          color: #cfc6b9;
        }

        /* responsive tweaks */
        @media (max-width: 640px) {
          .pixel-title { font-size: 28px; }
          .icon-box { width: 64px; height: 64px; }
          .icon-inner { font-size: 28px; }
          .ach-title { font-size: 14px; }
          .ach-desc { font-size: 12px; }
        }
      `}</style>
    </div>
  );
}
