import { useState } from "react";
import { motion } from "framer-motion";

const data = [
  {
    year: "2018",
    text: "Intellismith was founded with a vision to transform hiring and learning.",
  },
  {
    year: "2020",
    text: "Expanded into Learning & Development and enterprise solutions.",
  },
  {
    year: "2022",
    text: "Partnered with multiple global clients across industries.",
  },
  {
    year: "2025",
    text: "Becoming a leading force in tech-driven talent solutions.",
  },
];

export default function Timeline() {
  const [active, setActive] = useState(null);

  return (
    <div className="mt-10 w-full max-w-3xl mx-auto">

      {/* Line */}
      <div className="flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-700" />

        {data.map((item, index) => (
          <div
            key={index}
            className="relative z-10 cursor-pointer"
            onClick={() => setActive(index)}
          >
            {/* Dot */}
            <div className={`w-5 h-5 rounded-full ${
            active === index
              ? "bg-cyan-400 shadow-[0_0_10px_#00f5ff]"
              : "bg-gray-500"
               }`} />

            {/* Year */}
            <p className="mt-2 text-sm text-gray-400 text-center">
              {item.year}
            </p>
          </div>
        ))}
      </div>

      {/* Content */}
      {active !== null && (
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-4 border border-cyan-400 rounded-lg text-center"
        >
          {data[active].text}
        </motion.div>
      )}
    </div>
  );
}