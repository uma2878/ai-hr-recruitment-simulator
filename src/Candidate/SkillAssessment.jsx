import React, { useState, useEffect } from "react";
import "./SkillAssessment.css";

function SkillAssessment() {
  const profile =
    JSON.parse(localStorage.getItem("profileData")) || {};

  const [step, setStep] = useState("home");
  const [testType, setTestType] = useState("");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  const questions = {
    technical: [
      {
        q: "What is React?",
        options: ["Library", "Framework", "Language", "Database"],
        answer: 0,
      },
      {
        q: "What is JSX?",
        options: ["HTML in JS", "CSS", "Database", "API"],
        answer: 0,
      },
    ],
    aptitude: [
      {
        q: "5 + 3 * 2 = ?",
        options: ["16", "11", "13", "10"],
        answer: 1,
      },
    ],
    communication: [
      {
        q: "Best communication skill?",
        options: ["Listening", "Arguing", "Ignoring", "Silence"],
        answer: 0,
      },
    ],
  };

  // TIMER SYSTEM
  useEffect(() => {
    if (step !== "test") return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleAnswer(-1);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step, index]);

  const startTest = (type) => {
    setTestType(type);
    setStep("test");
    setIndex(0);
    setScore(0);
    setTimeLeft(15);
  };

  const handleAnswer = (i) => {
    const q = questions[testType][index];

    if (i === q.answer) {
      setScore((prev) => prev + 1);
    } else {
      setScore((prev) => prev - 0.25); // negative marking
    }

    const next = index + 1;

    if (next < questions[testType].length) {
      setIndex(next);
      setTimeLeft(15);
    } else {
      setStep("result");
    }
  };

  const restart = () => {
    setStep("home");
    setTestType("");
    setIndex(0);
    setScore(0);
    setTimeLeft(15);
  };

  // PROGRESS BAR
  const progress =
    step === "test"
      ? ((index + 1) / questions[testType].length) * 100
      : 0;

  // SAVE RESULT
  useEffect(() => {
    if (step === "result") {
      const total = questions[testType].length;
      const percentage = Math.max(
        0,
        Math.round((score / total) * 100)
      );

      let status = "Rejected";
      if (percentage >= 75) status = "Shortlisted";
      else if (percentage >= 50) status = "Considerable";

      localStorage.setItem(
        "assessmentResult",
        JSON.stringify({
          score,
          percentage,
          status,
        })
      );
    }
  }, [step]);

  // ---------------- HOME ----------------
  if (step === "home") {
    return (
      <div className="assessment-page">
        <h1>Skill Assessment Center</h1>

        <div className="grid">
          <div className="card">
            <h2>Technical Test</h2>
            <button onClick={() => startTest("technical")}>
              Start
            </button>
          </div>

          <div className="card">
            <h2>Aptitude Test</h2>
            <button onClick={() => startTest("aptitude")}>
              Start
            </button>
          </div>

          <div className="card">
            <h2>Communication Test</h2>
            <button
              onClick={() => startTest("communication")}
            >
              Start
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- TEST ----------------
  if (step === "test") {
    const q = questions[testType][index];

    return (
      <div className="assessment-page">
        <h2>{testType.toUpperCase()} TEST</h2>

        {/* TIMER */}
        <div className="timer">⏱ {timeLeft}s</div>

        {/* PROGRESS BAR */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="card">
          <h3>
            Q{index + 1}: {q.q}
          </h3>

          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="option-btn"
            >
              {opt}
            </button>
          ))}

          {/* SKIP BUTTON */}
          <button
            onClick={() => handleAnswer(-1)}
            style={{ background: "gray", marginTop: 10 }}
          >
            Skip
          </button>
        </div>
      </div>
    );
  }

  // ---------------- RESULT ----------------
  const total = questions[testType].length;
  const percentage = Math.max(
    0,
    Math.round((score / total) * 100)
  );

  let status = "Rejected";
  if (percentage >= 75) status = "Shortlisted";
  else if (percentage >= 50) status = "Considerable";

  const interviewUnlocked = percentage >= 70;

  return (
    <div className="assessment-page">
      <div className="card">
        <h1>Assessment Result</h1>

        <p>
          <b>Name:</b> {profile.fullName || "Candidate"}
        </p>

        <h2>
          Score: {score}/{total} ({percentage}%)
        </h2>

        <h3>Status: {status}</h3>

        {interviewUnlocked && (
          <p style={{ color: "green" }}>
            🎉 Mock Interview Unlocked
          </p>
        )}

        <button onClick={restart}>
          Retake Test
        </button>
      </div>
    </div>
  );
}

export default SkillAssessment;