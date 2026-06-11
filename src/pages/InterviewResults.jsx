import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function InterviewResults() {
  const [searchTerm, setSearchTerm] = useState("");

  const interviews = [
    {
      id: 1,
      name: "Vaishnavi",
      role: "AI Engineer",
      score: 92,
      result: "Passed",
      feedback:
        "Excellent communication, strong AI knowledge, and problem-solving skills.",
    },
    {
      id: 2,
      name: "Rohith Sharma",
      role: "React Developer",
      score: 85,
      result: "Passed",
      feedback:
        "Good React concepts and frontend development skills.",
    },
    {
      id: 3,
      name: "Navya",
      role: "Data Scientist",
      score: 95,
      result: "Passed",
      feedback:
        "Outstanding analytical and data science skills.",
    },
    {
      id: 4,
      name: "Harsha",
      role: "ML Engineer",
      score: 90,
      result: "Passed",
      feedback:
        "Strong machine learning fundamentals and project experience.",
    },
    {
      id: 5,
      name: "Sai Kumar",
      role: "Java Developer",
      score: 78,
      result: "Pending",
      feedback:
        "Technical skills are good. Awaiting final HR round.",
    },
    {
      id: 6,
      name: "Akshaya",
      role: "Backend Developer",
      score: 68,
      result: "Failed",
      feedback:
        "Needs improvement in backend architecture concepts.",
    },
    {
      id: 7,
      name: "Praveen",
      role: "DevOps Engineer",
      score: 82,
      result: "Passed",
      feedback:
        "Good AWS and DevOps knowledge.",
    },
    {
      id: 8,
      name: "Deekshitha",
      role: "Frontend Developer",
      score: 65,
      result: "Failed",
      feedback:
        "Needs stronger JavaScript and React fundamentals.",
    },
  ];

  const filteredInterviews = interviews.filter(
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
                  interviews.filter(
                    (c) => c.result === "Passed"
                  ).length
                }
              </p>
            </div>

            <div style={cardStyle}>
              <h3>Failed</h3>
              <p>
                {
                  interviews.filter(
                    (c) => c.result === "Failed"
                  ).length
                }
              </p>
            </div>

            <div style={cardStyle}>
              <h3>Pending</h3>
              <p>
                {
                  interviews.filter(
                    (c) => c.result === "Pending"
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
              {filteredInterviews.map((candidate) => (
                <tr key={candidate.id}>
                  <td style={tableCell}>{candidate.id}</td>
                  <td style={tableCell}>{candidate.name}</td>
                  <td style={tableCell}>{candidate.role}</td>
                  <td style={tableCell}>{candidate.score}</td>

                  <td style={tableCell}>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "15px",
                        color: "white",
                        backgroundColor:
                          candidate.result === "Passed"
                            ? "green"
                            : candidate.result === "Failed"
                            ? "red"
                            : "orange",
                      }}
                    >
                      {candidate.result}
                    </span>
                  </td>

                  <td style={tableCell}>
                    <button
                      onClick={() =>
                        alert(
                          `Candidate: ${candidate.name}

Role: ${candidate.role}

Interview Score: ${candidate.score}

Feedback:
${candidate.feedback}

Final Result:
${candidate.result}`
                        )
                      }
                      style={viewBtn}
                    >
                      View Feedback
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