import Timeline from "../components/Timeline";

export default function Level1({ user, onNext }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">

      <h1 className="text-4xl text-neon mb-4">
        Level 1: Company Overview
      </h1>

      <p className="text-gray-400 max-w-xl">
        Welcome Agent {user}. Explore the journey of Intellismith.
      </p>

      <Timeline />

      <button
        onClick={onNext}
        className="mt-10 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full hover:scale-105 transition"
      >
        Continue →
      </button>

    </div>
  );
}