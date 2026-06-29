import React, { useState } from "react";
import { API_BASE } from "../config/api";

function SkillAssessment({ goBack }) {
  const [skillInput, setSkillInput] = useState("python");
  const [questions, setQuestions] = useState([]);
  const [assessmentId, setAssessmentId] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const startAssessment = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const skills = skillInput.split(",").map(s => s.trim()).filter(Boolean).join(",") || "python";

      const response = await fetch(
        `${API_BASE}/api/assessment/start?skills=${encodeURIComponent(skills)}&count=10`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await response.json();
      setAssessmentId(data.assessment_id);
      setQuestions(data.questions || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const selectAnswer = (questionId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const submitAssessment = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/api/assessment/submit`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ assessment_id: assessmentId, answers }),
      });

      const data = await response.json();
      if (!response.ok) { alert(data.detail || "Submission failed"); return; }
      setResult(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (result) {
    return (
      <div className="card">
        <h2>Assessment Result</h2>
        <h3>Score: {result.score}%</h3>
        {result.feedback && <p>{result.feedback}</p>}
        <br />
        <button onClick={() => { setResult(null); setQuestions([]); setAnswers({}); setCurrentQuestion(0); }}>
          Try Again
        </button>
        {" "}
        <button onClick={goBack}>Back to Dashboard</button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="card">
        <h2>Skill Assessment</h2>
        <label>Skills (comma-separated):</label>
        <br />
        <input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="e.g. python, react, sql"
          style={{ padding: "8px", width: "300px", marginBottom: "12px" }}
        />
        <br />
        <button onClick={startAssessment} disabled={loading}>
          {loading ? "Loading..." : "Start Assessment"}
        </button>
        {" "}
        <button onClick={goBack}>Back</button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Skill Assessment</h2>

      <h3>
        Question {currentQuestion + 1} of {questions.length}
      </h3>

      <h4>{questions[currentQuestion].prompt}</h4>

      {questions[currentQuestion].options.map((option, index) => (
        <div key={option}>
          <label>
            <input
              type="radio"
              name={String(questions[currentQuestion].id)}
              checked={answers[questions[currentQuestion].id] === index}
              onChange={() => selectAnswer(questions[currentQuestion].id, index)}
            />
            {option}
          </label>
        </div>
      ))}

      <br />

      <button
        disabled={currentQuestion === 0}
        onClick={() => setCurrentQuestion(currentQuestion - 1)}
      >
        Previous
      </button>

      {" "}

      {currentQuestion < questions.length - 1 ? (
        <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
          Next
        </button>
      ) : (
        <button onClick={submitAssessment}>Submit Assessment</button>
      )}

      <br /><br />

      <button onClick={goBack}>Back</button>
    </div>
  );
}

export default SkillAssessment;
