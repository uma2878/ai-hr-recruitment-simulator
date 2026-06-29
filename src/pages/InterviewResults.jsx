import { useState, useEffect } from "react";
import { API_BASE } from "../config/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function InterviewResults() {
  const [searchTerm, setSearchTerm] = useState("");

  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
  const fetchInterviews = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE}/api/interviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Interviews:", data);

      setInterviews(data.items || []);
    } catch (error) {
      console.error(error);
    }
  };

  fetchInterviews();
}, []);

  const filteredInterviews = interviews.filter(
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
          <h1>🎤 Interview Results</h1>
          <p>
            Final interview evaluation and hiring decisions.
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
              <h3>Total Interviews</h3>
              <p>{interviews.length}</p>
            </div>

            <div style={cardStyle}>
              <h3>Passed</h3>
              <p>
{
interviews.filter(i => i.status === "completed").length
}
</p>
            </div>

            <div style={cardStyle}>
              <h3>Inactive</h3>

<p>
{
interviews.filter(i => i.status === "inactive").length
}
</p>
            </div>

            <div style={cardStyle}>
              <h3>Active</h3>

<p>
{
interviews.filter(i => i.status === "active").length
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
                <th style={tableHeader}>ID</th>
                <th style={tableHeader}>Candidate</th>
                <th style={tableHeader}>Role</th>
                <th style={tableHeader}>Score</th>
                <th style={tableHeader}>Result</th>
                <th style={tableHeader}>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredInterviews.map((interview) =>(
                <tr key={interview.id}>
                  <td style={tableCell}>{interview.id.slice(0,8)}</td>
                  <td style={tableCell}>
  {interview.candidate_name}
</td>
                  <td style={tableCell}>
  {interview.job_title || "N/A"}
</td>
                  <td style={tableCell}>
  {interview.interview_score ?? "N/A"}
</td>

                  <td style={tableCell}>
  <span
    style={{
      padding: "5px 10px",
      borderRadius: "15px",
      color: "white",
      backgroundColor:
        interview.status === "completed"
          ? "green"
          : "orange",
    }}
  >
    {interview.status}
  </span>
</td>

                  <td style={tableCell}>
  <button
    style={viewBtn}
    onClick={() =>
      alert(
`Candidate: ${interview.candidate_name}

Job: ${interview.job_title || "N/A"}

Interview Score:
${interview.interview_score ?? "N/A"}

Status:
${interview.status}

Started At:
${new Date(interview.started_at).toLocaleString()}

Completed At:
${
  interview.completed_at
    ? new Date(interview.completed_at).toLocaleString()
    : "In Progress"
}`
      )
    }
  >
    View Details
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

export default InterviewResults;