import { motion } from "framer-motion";

export default function MissionControl({
  user,
  xp,
  unlockedLevels,
  onLevelSelect,
}) {
  const levels = [
    { id: 1, title: "Company Overview" },
    { id: 2, title: "Tech Solutions" },
    { id: 3, title: "Work Culture" },
    { id: 4, title: "Final Challenge" },
  ];

  return (
    <div className="min-h-screen p-6 text-white">

      {/* Title */}
      <h1 className="text-center text-4xl text-neon mb-6 drop-shadow-[0_0_10px_#00f5ff]">
        MISSION CONTROL
      </h1>

      {/* User Info */}
      <div className="text-center mb-6">
        <p className="text-gray-400">Agent: {user}</p>
        <p className="text-cyan-400">XP: {xp}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-800 rounded-full h-3 mb-8">
        <div
          className="bg-cyan-400 h-3 rounded-full transition-all duration-500"
          style={{ width: `${Math.min((xp / 200) * 100, 100)}%` }}
        />
      </div>

      {/* Levels */}
      <div className="space-y-4 max-w-2xl mx-auto">
        {levels.map((lvl) => {
          const isUnlocked = unlockedLevels.includes(lvl.id);

          return (
            <motion.div
              key={lvl.id}
              whileHover={{ scale: isUnlocked ? 1.05 : 1 }}
              onClick={() => isUnlocked && onLevelSelect(lvl.id)}
              className={`p-5 rounded-xl border transition-all duration-300 ${
  isUnlocked
    ? "border-cyan-400 cursor-pointer hover:shadow-[0_0_20px_#00f5ff] hover:scale-[1.02]"
    : "border-gray-700 opacity-50"
}`}
            >
              <h2 className="text-xl">
                Level {lvl.id}: {lvl.title}
              </h2>
              {isUnlocked && lvl.id < unlockedLevels.length && (
  <p className="text-green-400 text-sm mt-2 drop-shadow-[0_0_8px_#22c55e]">
    ✔ Completed
  </p>
)}

              {!isUnlocked && (
                <p className="text-sm text-gray-500 mt-2">🔒 Locked</p>
              )}

              {isUnlocked && (
                <p className="text-sm text-cyan-400 mt-2">Play →</p>
              )}
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}