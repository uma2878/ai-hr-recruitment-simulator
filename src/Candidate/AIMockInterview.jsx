import React, { useEffect, useRef, useState } from "react";
import "./AIMockInterview.css";
import { API_BASE } from "../config/api";

function AIMockInterview() {
  console.log("AIMockInterview Rendered");
  const videoRef = useRef(null);
  const [scores, setScores] = useState(null);
  const [submitted, setSubmitted] =useState(false);
  const [history, setHistory] = useState([]);

  const [role, setRole] = useState("Python Developer");
  const [skills, setSkills] = useState("python");

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [mockInterviewId, setMockInterviewId] = useState("");

  const [answers, setAnswers] = useState({});

  const [interviewStarted, setInterviewStarted] =
    useState(false);
  const [loading, setLoading] =
    useState(false);

  const [uploadingAnswer, setUploadingAnswer] =
    useState(false);

  const [recording, setRecording] =
    useState(false);

  const [timeLeft, setTimeLeft] =
    useState(60);
  const [cameraEnabled, setCameraEnabled] =
    useState(false);

  const [micEnabled, setMicEnabled] =
    useState(false);

  const [feedback, setFeedback] =
    useState([]);

  const token = localStorage.getItem("token");
    useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem("interviewHistory")
      ) || [];

    setHistory(saved);
  }, []);
    useEffect(() => {

    let timer;

    if (
      interviewStarted &&
      recording &&
      timeLeft > 0
    ) {

      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

    }

    return () => clearInterval(timer);

  }, [
    interviewStarted,
    recording,
    timeLeft,
  ]);
    useEffect(() => {

    if (
      timeLeft === 0 &&
      interviewStarted
    ) {

      submitCurrentAnswer();

    }

  }, [timeLeft]);
    const enableCamera = async () => {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        });

      videoRef.current.srcObject =
        stream;

      setCameraEnabled(true);

    } catch {

      alert(
        "Camera permission denied."
      );

    }

  };
    const enableMicrophone =
    async () => {
      try {

        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        setMicEnabled(true);

      } catch {

        alert(
          "Microphone permission denied."
        );

      }

    };
      const startSpeechRecognition =
    () => {

      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

      if (!SpeechRecognition) {

        alert(
          "Speech Recognition is not supported."
        );

        return;
      }

      const recognition =
        new SpeechRecognition();

      recognition.lang = "en-US";

      recognition.interimResults =
        false;

      recognition.start();

      recognition.onresult = (
        event
      ) => {

        const transcript =
          event.results[0][0].transcript;

        setAnswers((prev) => ({
          ...prev,
          [currentQuestion]:
            transcript,
        }));

      };

    };
      const startInterview =
    async () => {

      try {

        setLoading(true);

        const response = await fetch(
  `${API_BASE}/api/mock-interview/start`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      role: role,
      skills: [skills],
    }),
  }
);

        const data = await response.json();

console.log("Status:", response.status);
console.log("Response:", data);
console.log("Detail:", data.detail);
console.log(JSON.stringify(data, null, 2));

if (!response.ok) {
  alert(JSON.stringify(data));
  setLoading(false);
  return;
}

        setMockInterviewId(
          data.mock_interview_id
        );

        await fetchQuestions();

        setInterviewStarted(true);

      } catch (err) {

        console.error(err);

      }

      setLoading(false);

    };
      const fetchQuestions =
    async () => {

      try {

        const response =
          await fetch(
            `${API_BASE}/api/mock-interview/questions?skills=${skills}&role=${role}&count=5`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        setQuestions(
          data.questions || []
        );

      } catch (err) {

        console.error(err);

      }

    };
      const calculateLocalScore = () => {
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
      "python",
      "java",
      "fastapi",
      "spring",
      "sql",
      "mongodb",
      "node",
      "api",
      "database",
      "algorithm",
      "oop",
      "class",
      "function",
    ];

    technicalKeywords.forEach((word) => {
      if (text.includes(word)) {
        technical += 4;
      }
    });

    const answerLength = Object.values(answers)
      .join(" ")
      .length;

    if (answerLength > 150) communication += 20;
    if (answerLength > 300) communication += 20;

    if (
      text.includes("i developed") ||
      text.includes("i built") ||
      text.includes("i created") ||
      text.includes("i implemented")
    ) {
      confidence += 20;
    }

    if (
      text.includes("solution") ||
      text.includes("approach") ||
      text.includes("optimized") ||
      text.includes("resolved")
    ) {
      problemSolving += 20;
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
      ),
    };
  };
    const submitCurrentAnswer = async () => {

    if (!answers[currentQuestion]) {

      alert("Please answer the question.");

      return;
    }

    try {

      setUploadingAnswer(true);

      const response =
        await fetch(
          `${API_BASE}/api/mock-interview/submit`,
          {
            method: "POST",
            headers: {
              Authorization:
                `Bearer ${token}`,
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              mock_interview_id:
                mockInterviewId,
              answer:
                answers[currentQuestion],
            }),
          }
        );

      const data = await response.json();

console.log("Submit Response:", data);

      if (
        currentQuestion <
        questions.length - 1
      ) {

        setCurrentQuestion(
          currentQuestion + 1
        );

        setTimeLeft(60);

        setRecording(false);

      } else {

        finishInterview();

      }

    } catch (err) {

      console.error(err);

    }

    setUploadingAnswer(false);

  };
    const previousQuestion =
    () => {

      if (currentQuestion > 0) {

        setCurrentQuestion(
          currentQuestion - 1
        );

      }

    };
      const nextQuestion =
    () => {

      if (
        currentQuestion <
        questions.length - 1
      ) {

        setCurrentQuestion(
          currentQuestion + 1
        );

        setTimeLeft(60);

      }

    };
      const finishInterview = () => {

    const result =
      calculateLocalScore();

    setScores(result);

    const aiFeedback = [];

    if (
      result.technical < 70
    ) {
      aiFeedback.push(
        "Improve your technical explanations."
      );
    }

    if (
      result.communication < 70
    ) {
      aiFeedback.push(
        "Use longer and clearer answers."
      );
    }

    if (
      result.confidence < 70
    ) {
      aiFeedback.push(
        "Speak confidently using project examples."
      );
    }

    if (
      result.problemSolving < 70
    ) {
      aiFeedback.push(
        "Explain your approach before giving the solution."
      );
    }

    if (
      aiFeedback.length === 0
    ) {

      aiFeedback.push(
        "Excellent performance! Keep practicing."
      );

    }

    setFeedback(aiFeedback);

    const historyItem = {

      date:
        new Date().toLocaleString(),

      role,

      score:
        result.overall,

    };

    const updatedHistory = [
      ...history,
      historyItem,
    ];

    setHistory(updatedHistory);

    localStorage.setItem(
      "interviewHistory",
      JSON.stringify(updatedHistory)
    );

    setSubmitted(true);

    setInterviewStarted(false);

  };
    const restartInterview =
    () => {

      setQuestions([]);

      setCurrentQuestion(0);

      setAnswers({});

      setScores(null);

      setFeedback([]);

      setInterviewStarted(false);

      setSubmitted(false);

      setRecording(false);

      setTimeLeft(60);

      setMockInterviewId("");

    };
      const progress =
    questions.length > 0
      ? (
          ((currentQuestion + 1) /
            questions.length) *
          100
        ).toFixed(0)
      : 0;
        const startRecording =
    () => {

      setRecording(true);

      startSpeechRecognition();

    };
      const stopRecording =
    () => {

      setRecording(false);

    };

  return (
  <div className="mock-container">

    <h2>🎤 AI Mock Interview</h2>

    {!interviewStarted && !submitted && (
      <>
        <div className="role-section">
          <label>Role</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Python Developer</option>
            <option>Java Developer</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
          </select>

          <br /><br />

          <label>Skills</label>

          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <br /><br />

          <button
            onClick={startInterview}
            disabled={loading}
          >
            {loading ? "Starting..." : "Start Interview"}
          </button>
        </div>
      </>
    )}

    {interviewStarted && (
      <>
        <h3>Question {currentQuestion + 1}</h3>

        <p>{questions[currentQuestion]}</p>

        <video
          ref={videoRef}
          autoPlay
          muted
          className="video-preview"
        />

        <br />

        <button onClick={enableCamera}>
          Enable Camera
        </button>

        <button onClick={enableMicrophone}>
          Enable Mic
        </button>

        <button onClick={startRecording}>
          Start Recording
        </button>

        <button onClick={stopRecording}>
          Stop Recording
        </button>

        <br /><br />

        <textarea
          rows={6}
          placeholder="Type your answer..."
          value={answers[currentQuestion] || ""}
          onChange={(e) =>
            setAnswers({
              ...answers,
              [currentQuestion]: e.target.value,
            })
          }
        />

        <br /><br />

        <button
          onClick={previousQuestion}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>

        <button
          onClick={submitCurrentAnswer}
          disabled={uploadingAnswer}
        >
          Submit Answer
        </button>

        <h3>⏳ {timeLeft}s</h3>
      </>
    )}

    {submitted && (
      <>
        <h2>Interview Result</h2>

        <h3>Overall Score: {scores?.overall}%</h3>

        <ul>
          <li>Technical: {scores?.technical}%</li>
          <li>Communication: {scores?.communication}%</li>
          <li>Confidence: {scores?.confidence}%</li>
          <li>Problem Solving: {scores?.problemSolving}%</li>
        </ul>

        <h3>AI Feedback</h3>

        <ul>
          {feedback.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <button onClick={restartInterview}>
          Start New Interview
        </button>
      </>
    )}

  </div>
);
}

export default AIMockInterview;