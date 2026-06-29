import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { API_BASE } from "../config/api";

function Analytics() {
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState([]);
  const [matchScores, setMatchScores] = useState([]);
  const [performance, setPerformance] = useState({});

  useEffect(() => {
  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [
        skillsRes,
        statusRes,
        matchRes,
        performanceRes,
      ] = await Promise.all([
        fetch(`${API_BASE}/api/analytics/skills`, { headers }),
        fetch(`${API_BASE}/api/analytics/status`, { headers }),
        fetch(`${API_BASE}/api/analytics/match-scores`, { headers }),
        fetch(`${API_BASE}/api/analytics/interview-performance`, {
          headers,
        }),
      ]);

      const skillsData = await skillsRes.json();
      const statusData = await statusRes.json();
      const matchData = await matchRes.json();
      const performanceData = await performanceRes.json();

      console.log("Skills:", skillsData);
      console.log("Status:", statusData);
      console.log("Match Scores:", matchData);
      console.log("Performance:", performanceData);

      setSkills(skillsData);
      setStatus(statusData);
      setMatchScores(matchData);
      setPerformance(performanceData);
    } catch (err) {
      console.error(err);
    }
  };

  fetchAnalytics();
}, []);
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <h1>📈 Analytics Dashboard</h1>
          <p>
            Recruitment performance and hiring insights.
          </p>

          {/* Summary Cards */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              marginBottom: "30px",
            }}
          >
            <div style={cardStyle}>
  <h3>Total Skills</h3>
  <p>{skills.length}</p>
</div>

<div style={cardStyle}>
  <h3>Status Types</h3>
  <p>{status.length}</p>
</div>

<div style={cardStyle}>
  <h3>Score Buckets</h3>
  <p>{matchScores.length}</p>
</div>

<div style={cardStyle}>
  <h3>Interview Performance</h3>
  <p>{performance.average ?? "N/A"}</p>
</div>
          </div>

          {/* Statistics Table */}
          <h2>📊 Recruitment Statistics</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "white",
              marginBottom: "30px",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#1e293b",
                  color: "white",
                }}
              >
                <th style={tableHeader}>Metric</th>
                <th style={tableHeader}>Value</th>
              </tr>
            </thead>

            <tbody>
  {skills.map((skill, index) => (
    <tr key={index}>
      <td style={tableCell}>{skill.label}</td>
      <td style={tableCell}>{skill.count}</td>
    </tr>
  ))}
</tbody>
          </table>
          <h2>Interview Distribution</h2>

<table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    marginTop: "20px",
  }}
>
  <thead>
    <tr style={{ backgroundColor: "#1e293b", color: "white" }}>
      <th style={tableHeader}>Category</th>
      <th style={tableHeader}>Count</th>
    </tr>
  </thead>

  <tbody>
    {performance.distribution &&
      Object.entries(performance.distribution).map(
        ([key, value]) => (
          <tr key={key}>
            <td style={tableCell}>{key}</td>
            <td style={tableCell}>{value}</td>
          </tr>
        )
      )}
  </tbody>
</table>

          {/* Performance Section */}
          <h2>🚀 Performance Metrics</h2>

          <div style={{ marginTop: "20px" }}>
            <p><strong>Resume Match Rate</strong></p>
            <div style={progressBackground}>
              <div style={{ ...progressFill, width: "85%" }}>
                85%
              </div>
            </div>

            <p style={{ marginTop: "20px" }}>
              <strong>Interview Pass Rate</strong>
            </p>
            <div style={progressBackground}>
              <div style={{ ...progressFill, width: "70%" }}>
                70%
              </div>
            </div>

            <p style={{ marginTop: "20px" }}>
              <strong>Selection Rate</strong>
            </p>
            <div style={progressBackground}>
              <div style={{ ...progressFill, width: "60%" }}>
                60%
              </div>
            </div>
          </div>
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

const progressBackground = {
  width: "100%",
  backgroundColor: "#e5e7eb",
  borderRadius: "10px",
  overflow: "hidden",
};

const progressFill = {
  backgroundColor: "#2563eb",
  color: "white",
  textAlign: "center",
  padding: "8px",
};

export default Analytics;