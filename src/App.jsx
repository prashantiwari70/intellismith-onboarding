import { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import TransitionScreen from "./components/TransitionScreen";
import MissionControl from "./pages/MissionControl";
import LevelUnlock from "./components/LevelUnlock";
import Level1 from "./pages/Level1";
import ScenarioPage from "./pages/ScenarioPage";
import MatchGamePage from "./pages/MatchGamePage";
import QuizPage from "./pages/QuizPage";
import Result from "./pages/Result";
import Level2 from "./pages/Level2";
import Level3 from "./pages/Level3";
import StarBackground from "./components/StarBackground";
import { playClick } from "./utils/sound";

// ✅ SCORM IMPORT (FIXED - single import only)
import {
  initSCORM,
  setScore,
  setStatus,
  commitSCORM,
  setSuspendData,
  setLocation,
} from "./scorm/scorm";

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [user, setUser] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [xp, setXp] = useState(0);
  const [unlockedLevels, setUnlockedLevels] = useState([1]);

  // ✅ LOAD FROM LOCAL STORAGE
  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("progress"));

  // ✅ Only resume if explicitly allowed
  if (saved && saved.user) {
    setUser(saved.user);
    setXp(saved.xp || 0);
    setUnlockedLevels(saved.unlockedLevels || [1]);

    
  }
}, []);

  // ✅ GLOBAL CLICK SOUND (SMART)
  useEffect(() => {
    const handleClick = (e) => {
      const tag = e.target.tagName;

      if (
        tag === "BUTTON" ||
        e.target.closest("button") ||
        e.target.classList.contains("clickable")
      ) {
        playClick();
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  // ✅ INIT SCORM
  useEffect(() => {
    initSCORM();
  }, []);

  // ✅ SAVE PROGRESS (LOCAL + SCORM)
  useEffect(() => {
    const data = {
      screen,
      xp,
      user,
      unlockedLevels,
    };

    localStorage.setItem("progress", JSON.stringify(data));
    setSuspendData(data); // ✅ SCORM resume
  }, [screen, xp, user, unlockedLevels]);

  // ✅ TRACK LOCATION
  useEffect(() => {
    setLocation(screen);
  }, [screen]);

  // Start Journey
  const handleStart = (name) => {
    if (!name) return alert("Enter name");
    setUser(name);
    setScreen("transition");
  };

  // Level click
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setScreen("unlock");
  };

  return (
    <>
      <StarBackground />

      {screen === "landing" && (
        <Landing onStart={handleStart} />
      )}

      {screen === "transition" && (
        <TransitionScreen onComplete={() => setScreen("mission")} />
      )}

      {screen === "mission" && (
        <MissionControl
          user={user}
          xp={xp}
          unlockedLevels={unlockedLevels}
          onLevelSelect={handleLevelSelect}
        />
      )}

      {screen === "unlock" && (
        <LevelUnlock
          level={selectedLevel}
          onComplete={() => {
            if (selectedLevel === 1) setScreen("level1");
            if (selectedLevel === 2) setScreen("level2");
            if (selectedLevel === 3) setScreen("level3");
            if (selectedLevel === 4) setScreen("quiz");
          }}
        />
      )}

      {screen === "level1" && (
  <Level1 user={user} onNext={() => setScreen("scenario")} />
)}

{screen === "scenario" && (
  <ScenarioPage
    user={user}
    onComplete={(earnedXP) => {
      setXp((prev) => prev + earnedXP);
      setScreen("match");
    }}
  />
)}

{screen === "match" && (
  <MatchGamePage
    onComplete={(earnedXP) => {
      setXp((prev) => prev + earnedXP);

      // ✅ FIXED (no duplicates, reliable)
      setUnlockedLevels((prev) => {
        const updated = new Set(prev);
        updated.add(2);
        return Array.from(updated);
      });

      setScreen("mission");
    }}
  />
)}

{screen === "level2" && (
  <Level2
    onNext={() => {
      // ✅ FIXED
      setUnlockedLevels((prev) => {
        const updated = new Set(prev);
        updated.add(3);
        return Array.from(updated);
      });

      setScreen("mission");
    }}
  />
)}

      {screen === "level3" && (
  <Level3
    onNext={() => {
      setUnlockedLevels((prev) => {
        const updated = new Set(prev);
        updated.add(4);
        return Array.from(updated);
      });

      setScreen("mission");
    }}
  />
)}

      {screen === "quiz" && (
  <QuizPage
    onComplete={(quizScore) => {
      setXp((prev) => {
        const finalScore = prev + quizScore;

        // ✅ SCORM
        setScore(finalScore);
        setStatus("completed");
        commitSCORM();

        return finalScore;
      });

      // ✅ MARK LEVEL 4 COMPLETED (VERY IMPORTANT)
      setUnlockedLevels((prev) => {
        const updated = new Set(prev);
        updated.add(4);
        return Array.from(updated);
      });

      setScreen("result");
    }}
  />
)}

      {screen === "result" && (
        <Result
          xp={xp}
          user={user}
          onRestart={() => {
            setXp(0);
            setUser("");
            setUnlockedLevels([1]);
            setScreen("landing");}
          }
        />
      )}
    </>
  );
}