import { useEffect } from "react";
import { finishSCORM } from "../scorm/scorm";
import { playSuccess } from "../utils/sound";

export default function Result({ xp, user, onRestart }) {
  const passed = xp >= 100;

  // ✅ Finish SCORM session
  useEffect(() => {
    finishSCORM();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">

      {/* Title */}
      <h1 className="text-4xl md:text-5xl text-neon mb-6 drop-shadow-[0_0_15px_#00f5ff]">
        🎯 MISSION COMPLETE
      </h1>

      {/* Agent */}
      <p className="text-gray-400 mb-2">
        Agent: <span className="text-white">{user}</span>
      </p>

      {/* Score */}
      <p className="text-2xl mb-4 text-cyan-400">
        Final Score: {xp}
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-gray-800 rounded-full h-3 mb-6">
        <div
          className="bg-cyan-400 h-3 rounded-full transition-all duration-500"
          style={{ width: `${Math.min((xp / 200) * 100, 100)}%` }}
        />
      </div>

      {/* Breakdown */}
      <div className="text-gray-400 mb-4">
        <p>Scenario XP: 50</p>
        <p>Match XP: 60</p>
        <p>Quiz Score: 100</p>
      </div>

      {/* PASS / FAIL */}
      <p
        className={
          passed
            ? "text-green-400 mt-2 text-xl drop-shadow-[0_0_10px_#22c55e] shadow-[0_0_20px_#22c55e]"
            : "text-red-400 mt-2 text-xl drop-shadow-[0_0_10px_#ef4444] shadow-[0_0_20px_#ef4444]"
        }
      >
        {passed ? "PASS 🎉" : "FAIL ❌"}
      </p>

      {/* Badge */}
      {passed && (
        <div className="mt-4 text-yellow-400 text-lg drop-shadow-[0_0_10px_#facc15]">
          🏆 Certified Intellismith Explorer
        </div>
      )}

      {/* Button */}
      <button
  onClick={() => {
    playSuccess(); // 🎉 play sound
    localStorage.removeItem("progress"); // ✅ clear progress
    onRestart();
  }}
  className="mt-8 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full hover:scale-105 transition"
>
  Back to Mission Control →
</button>

    </div>
  );
}