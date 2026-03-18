import { motion } from "framer-motion";

export default function LevelUnlock({ level, onComplete }) {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">

      {/* Glow Line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.8 }}
        className="absolute h-[2px] bg-purple-500 shadow-[0_0_20px_#a855f7]"
      />

      {/* Text */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-4xl md:text-6xl text-purple-400 tracking-widest drop-shadow-[0_0_15px_#a855f7]"
      >
        LEVEL {level} UNLOCKED
      </motion.h1>

      {/* Auto exit */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        onAnimationComplete={onComplete}
      />
    </div>
  );
}