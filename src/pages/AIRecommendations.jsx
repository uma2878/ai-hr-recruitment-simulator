import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AIRecommendations() {
  const [searchTerm, setSearchTerm] = useState("");

  const recommendations = [
    {
      id: 1,
      name: "Vaishnavi",
      role: "AI Engineer",
      score: 92,
      recommendation: "Highly Recommended",
      details:
        "Strong Python, AI and Machine Learning skills. Excellent fit for this role.",
    },
    {
      id: 2,
      name: "Harsha",
      role: "ML Engineer",
      score: 93,
      recommendation: "Highly Recommended",
      details:
        "Excellent machine learning knowledge and project experience.",
    },
    {
      id: 3,
      name: "Navya",
      role: "Data Scientist",
      score: 95,
      recommendation: "Highly Recommended",
      details:
        "Outstanding data science and analytics skills.",
    },
    {
      id: 4,
      name: "Rohith Sharma",
      role: "React Developer",
      score: 85,
      recommendation: "Recommended",
      details:
        "Strong React and frontend development experience.",
    },
    {
      id: 5,
      name: "Sai Kumar",
      role: "Java Developer",
      score: 88,
      recommendation: "Recommended",
      details:
        "Good Java and Spring Boot expertise.",
    },
    {
      id: 6,
      name: "Akshaya",
      role: "Backend Developer",
      score: 75,
      recommendation: "Recommended",
      details:
        "Good backend development knowledge with Node.js.",
    },
    {
      id: 7,
      name: "Praveen",
      role: "DevOps Engineer",
      score: 82,
      recommendation: "Recommended",
      details:
        "AWS and DevOps skills match project requirements.",
    },
    {
      id: 8,
      name: "Deekshitha",
      role: "Frontend Developer",
      score: 65,
      recommendation: "Consider Later",
      details:
        "Needs more experience with modern frontend frameworks.",
    },
  ];

  const filteredRecommendations = recommendations.filter(
    (candidate) =>
      candidate.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      candidate.role
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <h1>⭐ AI Recommendations</h1>
          <p>
            AI-generated candidate recommendations based on
            resume and job matching.
          </p>

          {/* Summary Cards */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              marginBottom: "25px",
            }}
          >
            <div style={cardStyle}>
              <h3>Total Recommendations</h3>
              <p>{recommendations.length}</p>
            </div>

            <div style={cardStyle}>
              <h3>Top Candidates</h3>
              <p>
                {
                  recommendations.filter(
                    (c) =>
                      c.recommendation ===
                      "Highly Recommended"
                  ).length
                }
              </p>
            </div>

            <div style={cardStyle}>
              <h3>Ready For Interview</h3>
              <p>
                {
                  recommendations.filter(
                    (c) => c.score >= 85
                  ).length
                }
              </p>
            </div>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search Candidate or Role..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            style={{
              width: "320px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "25px",
            }}
          />

          {/* Recommendation Cards */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {filteredRecommendations.map((candidate) => (
              <div
                key={candidate.id}
                style={recommendationCard}
              >
                <h2>👤 {candidate.name}</h2>

                <p>
                  <strong>Role:</strong>{" "}
                  {candidate.role}
                </p>

                <p>
                  <strong>Match Score:</strong>{" "}
                  {candidate.score}%
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "12px",
                      color: "white",
                      backgroundColor:
                        candidate.recommendation ===
                        "Highly Recommended"
                          ? "green"
                          : candidate.recommendation ===
                            "Recommended"
                          ? "orange"
                          : "red",
                    }}
                  >
                    {candidate.recommendation}
                  </span>
                </p>

                <button
                  onClick={() =>
                    alert(
                      `Candidate: ${candidate.name}

Role: ${candidate.role}

Match Score: ${candidate.score}%

AI Recommendation:
${candidate.details}`
                    )
                  }
                  style={viewBtn}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const cardStyle = {
  width: "200px",
  padding: "15px",
  borderRadius: "10px",
  backgroundColor: "white",
  border: "1px solid #ddd",
  textAlign: "center",
};

const recommendationCard = {
  width: "320px",
  backgroundColor: "white",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  lineHeight: "1.8",
};

const viewBtn = {
  marginTop: "15px",
  padding: "10px 15px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#2563eb",
  color: "white",
  cursor: "pointer",
};

export default AIRecommendations;