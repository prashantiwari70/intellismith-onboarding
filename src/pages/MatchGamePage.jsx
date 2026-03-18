import MatchGame from "../components/MatchGame";

export default function MatchGamePage({ onComplete }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">

      <h1 className="text-4xl text-neon mb-6">
        Value Alignment Mission
      </h1>

      <MatchGame onComplete={onComplete} />

    </div>
  );
}