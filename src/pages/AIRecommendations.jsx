import { useState, useEffect } from "react";
import { API_BASE } from "../config/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AIRecommendations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE}/api/ai/recommendations?limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("AI Recommendations:", data);

      setRecommendations(Array.isArray(data) ? data : (data.items || data.candidates || []));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredRecommendations = recommendations.filter((candidate) =>
    (candidate.name || "")
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
            AI-generated candidate recommendations based on resume and job
            matching.
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
                    (c) => Number(c.final_score) >= 80
                  ).length
                }
              </p>
            </div>

            <div style={cardStyle}>
              <h3>Ready For Interview</h3>
              <p>
                {
                  recommendations.filter(
                    (c) => Number(c.final_score) >= 70
                  ).length
                }
              </p>
            </div>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search Candidate..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
                key={candidate.user_id}
                style={recommendationCard}
              >
                <h2>👤 {candidate.name}</h2>

                <p>
                  <strong>Final Score:</strong>{" "}
                  {candidate.final_score}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      padding: "5px 10px",
                      borderRadius: "12px",
                      color: "white",
                      backgroundColor:
                        candidate.final_score >= 80
                          ? "green"
                          : candidate.final_score >= 60
                          ? "orange"
                          : "red",
                    }}
                  >
                    {candidate.final_score >= 80
                      ? "Highly Recommended"
                      : candidate.final_score >= 60
                      ? "Recommended"
                      : "Consider Later"}
                  </span>
                </p>

                <button
                  style={viewBtn}
                  onClick={() =>
                    alert(
`Candidate: ${candidate.name}

Final Score: ${candidate.final_score}

Summary:
${candidate.summary || "No summary available."}`
                    )
                  }
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