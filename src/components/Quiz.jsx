import { useState } from "react";

const questions = [
  {
    q: "What does Intellismith focus on?",
    options: ["Gaming", "Talent & Tech Solutions", "Food Delivery", "Banking"],
    answer: 1,
  },
  {
    q: "What is a key company value?",
    options: ["Isolation", "Collaboration", "Delay", "Silence"],
    answer: 1,
  },
  {
    q: "Learning & Development means?",
    options: ["No training", "Skill growth", "Ignore skills", "Only exams"],
    answer: 1,
  },
  {
    q: "Best way to handle tasks?",
    options: ["Ignore", "Collaborate", "Delay", "Avoid"],
    answer: 1,
  },
  {
    q: "Tech solutions help in?",
    options: ["Problems", "Efficiency", "Confusion", "Delays"],
    answer: 1,
  },
];

export default function Quiz({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (i) => {
    let newScore = score;

    if (i === questions[index].answer) {
      newScore += 20;
      setScore(newScore);
    }

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setTimeout(() => onComplete(newScore), 500);
    }
  };

  return (
    <div className="text-center">

      <h2 className="text-xl mb-4">
        Question {index + 1} / 5
      </h2>

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

    </div>
  );
}