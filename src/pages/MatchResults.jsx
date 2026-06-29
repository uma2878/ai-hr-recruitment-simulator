import { useState, useEffect } from "react";
import { API_BASE } from "../config/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MatchResults() {
  const [searchTerm, setSearchTerm] = useState("");
const [matches, setMatches] = useState([]);

useEffect(() => {
  fetchMatches();
}, []);

const fetchMatches = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE}/api/match`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 401) { localStorage.removeItem("token"); window.location.href = "/"; return; }
    const data = await response.json();

    setMatches(Array.isArray(data) ? data : (data.items || []));
  } catch (error) {
    console.error("Error fetching matches:", error);
  }
};

  const filteredMatches = matches.filter(
  (candidate) =>
    (candidate.candidate_name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (candidate.job_title || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
);

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <h1>🎯 Match Results</h1>
          <p>AI-powered candidate matching analysis.</p>

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
              <h3>Recommended</h3>
              <p>{matches.filter((c) => c.recommendation === "Recommended").length}</p>
            </div>

            <div style={cardStyle}>
              <h3>Applied</h3>
              <p>{matches.filter((c) => c.status === "applied").length}</p>
            </div>

            <div style={cardStyle}>
              <h3>Avg Final Score</h3>
              <p>
                {matches.length
                  ? Math.round(matches.reduce((sum, c) => sum + (Number(c.final_score) || 0), 0) / matches.length)
                  : 0}%
              </p>
            </div>

            <div style={cardStyle}>
              <h3>Total Matches</h3>
              <p>{matches.length}</p>
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

          {/* Table */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "white",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#1e293b",
                  color: "white",
                }}
              >
                <th style={tableHeader}>Candidate</th>
<th style={tableHeader}>Job</th>
<th style={tableHeader}>Resume</th>
<th style={tableHeader}>Match</th>
<th style={tableHeader}>Interview</th>
<th style={tableHeader}>Final</th>
<th style={tableHeader}>Status</th>
<th style={tableHeader}>Recommendation</th>
<th style={tableHeader}>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredMatches.map((candidate) => (
                <tr key={candidate.user_id}>
  <td style={tableCell}>
    {candidate.candidate_name}
  </td>

  <td style={tableCell}>
    {candidate.job_title}
  </td>

  <td style={tableCell}>
    {candidate.resume_score}
  </td>

  <td style={tableCell}>
    {candidate.match_score}
  </td>

  <td style={tableCell}>
    {candidate.interview_score}
  </td>

  <td style={tableCell}>
    <strong>{candidate.final_score}</strong>
  </td>

  <td style={tableCell}>
    <span
      style={{
        padding: "5px 10px",
        borderRadius: "15px",
        color: "white",
        backgroundColor:
          candidate.status === "applied"
            ? "orange"
            : "green",
      }}
    >
      {candidate.status}
    </span>
  </td>

  <td style={tableCell}>
    <span
      style={{
        padding: "5px 10px",
        borderRadius: "15px",
        color: "white",
        backgroundColor:
          candidate.recommendation === "Recommended"
            ? "green"
            : "red",
      }}
    >
      {candidate.recommendation}
    </span>
  </td>

  <td style={tableCell}>
    <button
      style={viewBtn}
      onClick={() =>
        alert(
`Candidate : ${candidate.candidate_name}

Job : ${candidate.job_title}

Resume Score : ${candidate.resume_score}

Match Score : ${candidate.match_score}

Interview Score : ${candidate.interview_score}

Final Score : ${candidate.final_score}

Status : ${candidate.status}

Recommendation : ${candidate.recommendation}`
        )
      }
    >
      View
    </button>
  </td>
</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const cardStyle = {
  width: "180px",
  padding: "15px",
  borderRadius: "10px",
  backgroundColor: "white",
  border: "1px solid #ddd",
  textAlign: "center",
};

const tableHeader = {
  padding: "12px",
  border: "1px solid #ddd",
};

const tableCell = {
  padding: "12px",
  border: "1px solid #ddd",
};

const viewBtn = {
  padding: "8px 12px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#2563eb",
  color: "white",
  cursor: "pointer",
};

export default MatchResults;