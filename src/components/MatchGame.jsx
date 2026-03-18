import { useState } from "react";
import { motion } from "framer-motion";

const pairs = {
  Innovation: "Propose new ideas",
  Collaboration: "Work with team members",
  Growth: "Learn new skills",
};

export default function MatchGame({ onComplete }) {
  const [selected, setSelected] = useState(null);
  const [matched, setMatched] = useState({});
  const [xp, setXp] = useState(0);

  const values = Object.keys(pairs);
  const actions = Object.values(pairs);

  const handleClick = (item, type) => {
    if (!selected) {
      setSelected({ item, type });
      return;
    }

    // Match logic
    if (
      (selected.type === "value" &&
        pairs[selected.item] === item) ||
      (selected.type === "action" &&
        pairs[item] === selected.item)
    ) {
      setMatched((prev) => ({ ...prev, [selected.item]: true }));
      setXp((prev) => prev + 20);
    }

    setSelected(null);
  };

  // Completion check
  if (Object.keys(matched).length === values.length) {
    setTimeout(() => onComplete(xp), 1000);
  }

  return (
    <div className="mt-10 text-center">

      <h2 className="text-2xl text-cyan-400 mb-6">
        Match Company Values
      </h2>

      <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">

        {/* Values */}
        <div className="space-y-4">
          {values.map((val) => (
            <motion.div
              key={val}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleClick(val, "value")}
              className={`p-4 border rounded-lg cursor-pointer ${
                matched[val]
                  ? "border-green-400"
                  : "border-cyan-400"
              }`}
            >
              {val}
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-4">
          {actions.map((act) => (
            <motion.div
              key={act}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleClick(act, "action")}
              className="p-4 border border-purple-400 rounded-lg cursor-pointer"
            >
              {act}
            </motion.div>
          ))}
        </div>

      </div>

      <p className="mt-6 text-cyan-400">XP: {xp}</p>

    </div>
  );
}