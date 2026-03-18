import { useState } from "react";
import { motion } from "framer-motion";

const questions = [
  {
    q: "What is a key value at Intellismith?",
    options: ["Isolation", "Collaboration", "Delay"],
    answer: 1,
  },
  {
    q: "Best way to grow?",
    options: ["Ignore learning", "Upskill", "Avoid challenges"],
    answer: 1,
  },
  {
    q: "Team success depends on?",
    options: ["Solo work", "Teamwork", "Silence"],
    answer: 1,
  },
];

export default function Level3({ onNext }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (i) => {
    let newScore = score;

    if (i === questions[index].answer) {
      newScore += 1;
      setScore(newScore);
    }

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">

      <h1 className="text-4xl text-neon mb-6">
        Level 3: Work Culture
      </h1>

      {!finished ? (
        <>
          <p className="mb-4">
            Question {index + 1} / 3
          </p>

          <p className="mb-6">{questions[index].q}</p>

          <div className="space-y-3">
            {questions[index].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="block w-full p-3 border border-cyan-400 rounded-lg hover:shadow-[0_0_10px_#00f5ff]"
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl mb-4">
            Score: {score} / 3
          </h2>

          {/* Badge */}
          {score >= 2 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-yellow-400 text-xl mb-4"
            >
              🏆 Collaboration Champion
            </motion.div>
          )}

          <button
            onClick={onNext}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full hover:scale-105 transition"
          >
            Continue →
          </button>
        </>
      )}

    </div>
  );
}