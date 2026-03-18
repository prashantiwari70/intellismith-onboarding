import { motion } from "framer-motion";

export default function TransitionScreen({ onComplete }) {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">

      {/* Horizontal glow line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1 }}
        className="absolute h-[2px] bg-cyan-400 shadow-[0_0_20px_#00f5ff]"
      />

      {/* Text */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-4xl md:text-6xl text-cyan-400 tracking-widest"
      >
        MISSION INITIALIZED
      </motion.h1>

      {/* Auto move after animation */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        onAnimationComplete={onComplete}
      />
    </div>
  );
}