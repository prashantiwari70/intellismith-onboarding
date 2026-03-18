import Scenario from "../components/Scenario";

export default function ScenarioPage({ user, onComplete }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">

      <h1 className="text-4xl text-neon mb-6">
        Your First Day
      </h1>

      <Scenario onComplete={onComplete} />

    </div>
  );
}