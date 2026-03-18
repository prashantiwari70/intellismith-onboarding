import Quiz from "../components/Quiz";

export default function QuizPage({ onComplete }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">

      <h1 className="text-4xl text-neon mb-6">
        Final Challenge
      </h1>

      <Quiz onComplete={onComplete} />

    </div>
  );
}