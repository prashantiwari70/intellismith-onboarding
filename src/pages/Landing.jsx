import { motion } from "framer-motion";
import { useState } from "react";

export default function Landing({ onStart }) {
  const [name, setName] = useState("");

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500 opacity-20 blur-3xl rounded-full top-[-100px] pointer-events-none" />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-bold text-neon tracking-widest"
      >
        INDUCTION JOURNEY
      </motion.h1>

      <p className="mt-4 text-gray-400">
        Welcome to Intellismith
      </p>

      {/* Input */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="mt-8 px-4 py-3 bg-transparent border border-neon rounded-md text-center focus:outline-none"
      />

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onStart(name)}
        className="mt-6 px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"
      >
        Start Journey →
      </motion.button>

    </div>
  );
}