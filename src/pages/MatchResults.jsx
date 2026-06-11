import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MatchResults() {
  const [searchTerm, setSearchTerm] = useState("");

  const matches = [
    {
      id: 1,
      name: "Vaishnavi",
      role: "AI Engineer",
      score: 92,
      status: "Excellent",
    },
    {
      id: 2,
      name: "Rohith Sharma",
      role: "React Developer",
      score: 85,
      status: "Good",
    },
    {
      id: 3,
      name: "Akshaya",
      role: "Backend Developer",
      score: 75,
      status: "Good",
    },
    {
      id: 4,
      name: "Sai Kumar",
      role: "Java Developer",
      score: 88,
      status: "Good",
    },
    {
      id: 5,
      name: "Navya",
      role: "Data Scientist",
      score: 95,
      status: "Excellent",
    },
    {
      id: 6,
      name: "Praveen",
      role: "DevOps Engineer",
      score: 82,
      status: "Good",
    },
    {
      id: 7,
      name: "Deekshitha",
      role: "Frontend Developer",
      score: 65,
      status: "Needs Improvement",
    },
    {
      id: 8,
      name: "Harsha",
      role: "ML Engineer",
      score: 93,
      status: "Excellent",
    },
    {
      id: 9,
      name: "Mahesh",
      role: "Power BI Analyst",
      score: 78,
      status: "Good",
    },
    {
      id: 10,
      name: "Anil Siva Kumar",
      role: "UI/UX Developer",
      score: 70,
      status: "Good",
    },
  ];

  const filteredMatches = matches.filter(
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
              <h3>Total Candidates</h3>
              <p>{matches.length}</p>
            </div>

            <div style={cardStyle}>
              <h3>Excellent</h3>
              <p>
                {
                  matches.filter(
                    (c) => c.status === "Excellent"
                  ).length
                }
              </p>
            </div>

            <div style={cardStyle}>
              <h3>Good</h3>
              <p>
                {
                  matches.filter(
                    (c) => c.status === "Good"
                  ).length
                }
              </p>
            </div>

            <div style={cardStyle}>
              <h3>Needs Improvement</h3>
              <p>
                {
                  matches.filter(
                    (c) =>
                      c.status === "Needs Improvement"
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
                <th style={tableHeader}>Job Role</th>
                <th style={tableHeader}>Match Score</th>
                <th style={tableHeader}>Status</th>
                <th style={tableHeader}>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredMatches.map((candidate) => (
                <tr key={candidate.id}>
                  <td style={tableCell}>{candidate.id}</td>
                  <td style={tableCell}>
                    {candidate.name}
                  </td>
                  <td style={tableCell}>
                    {candidate.role}
                  </td>
                  <td style={tableCell}>
                    {candidate.score}%
                  </td>

                  <td style={tableCell}>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "15px",
                        color: "white",
                        backgroundColor:
                          candidate.status ===
                          "Excellent"
                            ? "green"
                            : candidate.status ===
                              "Good"
                            ? "orange"
                            : "red",
                      }}
                    >
                      {candidate.status}
                    </span>
                  </td>

                  <td style={tableCell}>
                    <button
                      onClick={() =>
                        alert(
                          `${candidate.name}

Role: ${candidate.role}
Match Score: ${candidate.score}%
Status: ${candidate.status}`
                        )
                      }
                      style={viewBtn}
                    >
                      View Match
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