import React, { useState, useEffect } from "react";
import { API_BASE } from "../config/api";

function SkillAssessment({ goBack }) {
  const [questions, setQuestions] = useState([]);
  const [assessmentId, setAssessmentId] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    startAssessment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startAssessment = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE}/api/assessment/start?skills=python&count=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };
  const submitAssessment = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE}/api/assessment/submit`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assessment_id: assessmentId,
          answers: answers,
        }),
      }
    );

    const data = await response.json();

    console.log("Assessment Result:", data);

    if (!response.ok) {
      alert(data.detail || "Submission failed");
      return;
    }

    alert(`Assessment Submitted!\nScore: ${data.score}%`);

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="card">
      <h2>Skill Assessment</h2>

      {loading && <p>Loading Questions...</p>}

      {!loading && questions.length > 0 && (
        <>
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
                  onChange={() =>
                    selectAnswer(questions[currentQuestion].id, index)
                  }
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
            <button onClick={submitAssessment}>
  Submit Assessment
</button>
          )}
        </>
      )}

      <br />
      <br />

      <button onClick={goBack}>Back</button>
    </div>
  );
}

export default SkillAssessment;