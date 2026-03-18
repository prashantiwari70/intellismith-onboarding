import { useState } from "react";
import { motion } from "framer-motion";
import { playClick, playSuccess } from "../utils/sound";

export default function Scenario({ onComplete }) {
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

const handleChoice = (choice) => {
  playClick(); // 🔊 every click

  setSelected(choice);

  if (choice === "B") {
    playSuccess(); // 🎉 correct answer
    setResult("correct");
  } else {
    setResult("wrong");
  }

    setTimeout(() => {
      onComplete(choice === "B" ? 50 : 10); // XP
    }, 1500);
  };

  return (
    <div className="mt-12 text-center">

      <h2 className="text-2xl text-cyan-400 mb-4">
        Your First Day Scenario
      </h2>

      <p className="text-gray-400 mb-6">
        You are assigned your first task. What do you do?
      </p>

      {/* Options */}
      <div className="space-y-4 max-w-md mx-auto">
        {["A", "B", "C"].map((opt) => (
          <motion.button
            key={opt}
            whileHover={{ scale: 1.05 }}
            onClick={() => {
  playClick();
  handleChoice(opt);
}}
            disabled={selected}
            className="w-full p-3 border border-cyan-400 rounded-lg hover:shadow-[0_0_10px_#00f5ff]"
          >
            {opt === "A" && "Work independently without asking"}
            {opt === "B" && "Collaborate and ask teammates"}
            {opt === "C" && "Ignore and delay the task"}
          </motion.button>
        ))}
      </div>

      {/* Feedback */}
      {result && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`mt-6 ${
            result === "correct" ? "text-green-400" : "text-red-400"
          }`}
        >
          {result === "correct"
            ? "Great! Collaboration is key at Intellismith 🚀"
            : "Not ideal. Try to align with team culture."}
        </motion.p>
      )}
    </div>
  );
}