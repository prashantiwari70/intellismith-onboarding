import { useState } from "react";
import { motion } from "framer-motion";

export default function MatchGame({ onComplete }) {
  const leftItems = ["Innovation", "Collaboration", "Growth"];
  const rightItems = [
    "Propose new ideas",
    "Work with team members",
    "Learn new skills",
  ];

  const correctMatch = {
    Innovation: "Propose new ideas",
    Collaboration: "Work with team members",
    Growth: "Learn new skills",
  };

  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matches, setMatches] = useState({});
  const [xp, setXp] = useState(0);

  // ✅ LEFT CLICK
  const handleLeftClick = (item) => {
    if (matches[item]) return; // already matched
    setSelectedLeft(item);
  };

  // ✅ RIGHT CLICK
  const handleRightClick = (item) => {
    if (!selectedLeft) return;

    // correct match
    if (correctMatch[selectedLeft] === item) {
      setMatches((prev) => ({
        ...prev,
        [selectedLeft]: item,
      }));

      setXp((prev) => prev + 20);
    }

    setSelectedLeft(null);
  };

  // ✅ COMPLETE CHECK
  const isComplete = Object.keys(matches).length === 3;

  return (
    <div className="text-white text-center mt-10">

      <h1 className="text-3xl mb-6 text-cyan-400 drop-shadow-[0_0_10px_#00f5ff]">
        Value Alignment Mission
      </h1>

      <p className="mb-6 text-gray-300">Match Company Values</p>

      <div className="flex justify-center gap-10">

        {/* LEFT SIDE */}
        <div className="space-y-4">
          {leftItems.map((item) => {
            const isMatched = matches[item];

            return (
              <motion.div
                key={item}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLeftClick(item)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isMatched
                    ? "border-green-400 bg-green-900/30 shadow-[0_0_12px_#22c55e]"
                    : selectedLeft === item
                    ? "border-yellow-400"
                    : "border-cyan-400"
                }`}
              >
                {item}
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">
          {rightItems.map((item) => {
            const isMatched = Object.values(matches).includes(item);

            return (
              <motion.div
                key={item}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRightClick(item)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isMatched
                    ? "border-green-400 bg-green-900/30 shadow-[0_0_12px_#22c55e]"
                    : "border-purple-400"
                }`}
              >
                {item}
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* XP */}
      <p className="mt-6 text-cyan-400">XP: {xp}</p>

      {/* COMPLETE BUTTON */}
      {isComplete && (
        <button
          onClick={() => onComplete(xp)}
          className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:scale-105 transition"
        >
          Continue →
        </button>
      )}
    </div>
  );
}