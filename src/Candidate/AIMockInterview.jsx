import React, { useState, useEffect, useRef } from "react";
import "./AIMockInterview.css";

function AIMockInterview() {
  const videoRef = useRef(null);

  const [role, setRole] = useState("Frontend Developer");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [interviewStarted, setInterviewStarted] = useState(false);
  const [recording, setRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [scores, setScores] = useState(null);

  const [history, setHistory] = useState([]);

  const questions = {
    "Frontend Developer": [
      "What is React?",
      "What is JSX?",
      "Explain Virtual DOM.",
      "What are React Hooks?",
      "Difference between State and Props?"
    ],

    "Java Developer": [
      "What is OOP?",
      "Explain Inheritance.",
      "What is Polymorphism?",
      "What is Exception Handling?",
      "Difference between JDK and JRE?"
    ],

    "Python Developer": [
      "What is Python?",
      "What are Lists?",
      "What are Dictionaries?",
      "What is NumPy?",
      "Explain OOP in Python."
    ],

    "HR Interview": [
      "Tell me about yourself.",
      "Why should we hire you?",
      "What are your strengths?",
      "What are your weaknesses?",
      "Where do you see yourself in 5 years?"
    ]
  };

  const calculateScore = () => {
  const text = Object.values(answers)
  .join(" ")
  .toLowerCase();

  let technical = 40;
  let communication = 40;
  let confidence = 40;
  let problemSolving = 40;

  const technicalKeywords = [
    "react",
    "javascript",
    "component",
    "state",
    "props",
    "hook",
    "api",
    "java",
    "python",
    "sql"
  ];

  technicalKeywords.forEach((word) => {
    if (text.includes(word)) {
      technical += 5;
    }
  });

  const totalAnswerLength =
  Object.values(answers)
    .join(" ")
    .length;

if (totalAnswerLength > 100) {
  communication += 20;
}

if (totalAnswerLength > 200) {
  communication += 20;
}
  if (
    text.includes("i have") ||
    text.includes("i worked") ||
    text.includes("i developed")
  ) {
    confidence += 25;
  }

  if (
    text.includes("solution") ||
    text.includes("approach") ||
    text.includes("problem") ||
    text.includes("implemented")
  ) {
    problemSolving += 25;
  }

  technical = Math.min(technical, 100);
  communication = Math.min(communication, 100);
  confidence = Math.min(confidence, 100);
  problemSolving = Math.min(problemSolving, 100);

  return {
    technical,
    communication,
    confidence,
    problemSolving,
    overall: Math.round(
      (
        technical +
        communication +
        confidence +
        problemSolving
      ) / 4
    )
  };
};

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("interviewHistory")) || [];

    setHistory(saved);
  }, []);

  useEffect(() => {
    let timer;

    if (interviewStarted && recording && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [interviewStarted, recording, timeLeft]);

  const startInterview = () => {
    setInterviewStarted(true);
    setTimeLeft(60);
  };

  const startRecording = () => {
    setRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
  };

  const startCamera = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true
        });

      videoRef.current.srcObject = stream;
    } catch {
      alert("Camera Permission Denied");
    }
  };

  const startMic = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({
        audio: true
      });

      alert("Microphone Enabled");
    } catch {
      alert("Microphone Permission Denied");
    }
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition Not Supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.start();

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

    setAnswers({
  ...answers,
  [currentQuestion]: transcript
}); 
    };
  };

  const nextQuestion = () => {
    setRecording(false);
    setTimeLeft(60);

    if (
      currentQuestion <
      questions[role].length - 1
    ) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
const submitInterview = () => {

  // Check if user answered at least one question
  if (Object.keys(answers).length === 0) {
    alert("Please answer at least one question");
    return;
  }

  // Generate AI Score
  const result = calculateScore();

  console.log("AI Result:", result);

  // Save scores to state
  setScores(result);

  // Show result section
  setSubmitted(true);

  // Save interview history
  const historyData = {
    date: new Date().toLocaleDateString(),
    role: role,
    score: result.overall
  };

  const updatedHistory = [
    ...history,
    historyData
  ];

  setHistory(updatedHistory);

  localStorage.setItem(
    "interviewHistory",
    JSON.stringify(updatedHistory)
  );

  alert("✅ Interview Submitted Successfully");
};


  
  return (
    <div className="mock-container">
      <h2>🎤 AI Mock Interview</h2>

      <div className="interview-controls">
        {!interviewStarted && (
          <button onClick={startInterview}>
            🚀 Start Interview
          </button>
        )}

        {interviewStarted && (
          <>
            <button onClick={startRecording}>
              🎤 Start Answer
            </button>

            <button onClick={stopRecording}>
              ⏹️ Stop Answer
            </button>
          </>
        )}
      </div>

      <div className="role-section">
        <label>Select Role</label>

        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setCurrentQuestion(0);
          }}
        >
          <option>Frontend Developer</option>
          <option>Java Developer</option>
          <option>Python Developer</option>
          <option>HR Interview</option>
        </select>
      </div>

      {interviewStarted && (
        <div className="timer">
          ⏳ Time Left :
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60)
            .toString()
            .padStart(2, "0")}
        </div>
      )}

      <div className="camera-section">
        <button onClick={startCamera}>
          📹 Enable Camera
        </button>

        <button onClick={startMic}>
          🎤 Enable Mic
        </button>

        <button onClick={startListening}>
          🎙️ Start Speaking
        </button>
      </div>

      <video
        ref={videoRef}
        autoPlay
        muted
        className="video-preview"
      />

      <div className="question-card">
        <h3>
          Question {currentQuestion + 1}/
          {questions[role].length}
        </h3>

        <p>
          {questions[role][currentQuestion]}
        </p>
      </div>

      <textarea
  placeholder="Type your answer..."
  value={answers[currentQuestion] || ""}
  onChange={(e) =>
    setAnswers({
      ...answers,
      [currentQuestion]: e.target.value
    })
  }
/>
  <div className="answer-preview">

  <h3>Your Answers</h3>

  {Object.keys(answers).map((key) => (

    <div
      key={key}
      className="answer-card"
    >

      <h4>
        Question {parseInt(key) + 1}
      </h4>

      <p>
        {answers[key]}
      </p>

    </div>

  ))}

</div>

      <div className="nav-buttons">
        <button onClick={previousQuestion}>
          Previous
        </button>

        <button onClick={nextQuestion}>
          Next
        </button>
      </div>

      <button
        className="submit-btn"
        onClick={submitInterview}
      >
        Submit Interview
      </button>

      {submitted && (
        <div className="results">
          <h2>📊 AI Evaluation</h2>

          <div className="score-grid">
            <div className="score-card">
              Technical Accuracy
              <h3>{scores?.technical}%</h3>
            </div>

            <div className="score-card">
              Communication
              <h3>{scores?.communication}%</h3>
            </div>

            <div className="score-card">
              Confidence
              <h3>{scores?.confidence}%</h3>
            </div>

            <div className="score-card">
              Problem Solving
              <h3>{scores?.problemSolving}%</h3>
            </div>
          </div>

          <h1>
            Overall Score : {scores?.overall}%
          </h1>

          <h2>
            {scores?.overall >= 70
              ? "✅ PASS"
              : "❌ NEEDS IMPROVEMENT"}
          </h2>

          <h2>📜 Interview History</h2>

          {history.map((item, index) => (
            <div
              className="history-card"
              key={index}
            >
              <p>{item.date}</p>
              <p>{item.role}</p>
              <p>Score : {item.score}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default AIMockInterview;