import { useState } from "react";
import { motion } from "framer-motion";

const data = [
  {
    title: "TA / Outsourcing",
    desc: "Helping companies hire top talent efficiently and scale teams quickly.",
  },
  {
    title: "Learning & Development",
    desc: "Providing training programs to upskill employees and improve performance.",
  },
  {
    title: "Tech Solutions",
    desc: "Delivering innovative tech-driven solutions for business growth.",
  },
];

export default function Level2({ onNext }) {
  const [active, setActive] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">

      <h1 className="text-4xl text-neon mb-6">
        Level 2: Tech Solutions
      </h1>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
        {data.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActive(index)}
            className="p-5 border border-cyan-400 rounded-xl cursor-pointer hover:shadow-[0_0_10px_#00f5ff]"
          >
            <h2 className="text-xl">{item.title}</h2>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 max-w-xl border border-purple-400 p-4 rounded-lg"
        >
          {data[active].desc}
        </motion.div>
      )}

      {/* Continue */}
      {active !== null && (
        <button
          onClick={onNext}
          className="mt-8 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full hover:scale-105 transition"
        >
          Continue →
        </button>
      )}

    </div>
  );
}