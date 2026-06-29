import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { API_BASE } from "../config/api";

function Analytics() {
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState([]);
  const [matchScores, setMatchScores] = useState([]);
  const [performance, setPerformance] = useState({
    average: 0,
    distribution: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const responses = await Promise.all([
          fetch(`${API_BASE}/api/analytics/skills`, { headers }),
          fetch(`${API_BASE}/api/analytics/status`, { headers }),
          fetch(`${API_BASE}/api/analytics/match-scores`, { headers }),
          fetch(`${API_BASE}/api/analytics/interview-performance`, {
            headers,
          }),
        ]);

        responses.forEach((res) => {
          if (res.status === 401) { localStorage.removeItem("token"); window.location.href = "/"; }
        });

        const [
          skillsData,
          statusData,
          matchData,
          performanceData,
        ] = await Promise.all(responses.map((res) => res.json()));

        const normalizeLabels = (d) =>
          Array.isArray(d)
            ? d
            : (d?.labels || []).map((label, i) => ({ label, count: (d?.data || [])[i] || 0 }));

        setSkills(normalizeLabels(skillsData));
        setStatus(normalizeLabels(statusData));
        setMatchScores(normalizeLabels(matchData).map((item) => ({ bucket: item.label || item.bucket, count: item.count })));
        setPerformance({
          average: performanceData?.average ?? 0,
          distribution: Array.isArray(performanceData?.distribution)
            ? performanceData.distribution
            : normalizeLabels(performanceData).map((item) => ({ bucket: item.label || item.bucket, count: item.count })),
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ padding: "30px", flex: 1 }}>
            <h2>Loading Analytics...</h2>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ padding: "30px", flex: 1 }}>
            <h2>{error}</h2>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <h1>📈 Analytics Dashboard</h1>
          <p>Recruitment performance and hiring insights.</p>

          {/* Summary Cards */}

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              marginBottom: "30px",
              flexWrap: "wrap",
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
              <h3>Average Interview Score</h3>
              <p>{performance.average}</p>
            </div>
          </div>

          {/* Skills */}

          <h2>🛠 Skills Analytics</h2>

          <table style={tableStyle}>
            <thead>
              <tr style={headerRow}>
                <th style={tableHeader}>Skill</th>
                <th style={tableHeader}>Count</th>
              </tr>
            </thead>

            <tbody>
              {skills.length === 0 ? (
                <tr>
                  <td style={tableCell} colSpan="2">
                    No skills data available.
                  </td>
                </tr>
              ) : (
                skills.map((skill, index) => (
                  <tr key={index}>
                    <td style={tableCell}>{skill.label}</td>
                    <td style={tableCell}>{skill.count}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Status */}

          <h2>📊 Application Status</h2>

          <table style={tableStyle}>
            <thead>
              <tr style={headerRow}>
                <th style={tableHeader}>Status</th>
                <th style={tableHeader}>Count</th>
              </tr>
            </thead>

            <tbody>
              {status.map((item, index) => (
                <tr key={index}>
                  <td style={tableCell}>{item.label}</td>
                  <td style={tableCell}>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Match Scores */}

          <h2>🎯 Resume Match Scores</h2>

          <table style={tableStyle}>
            <thead>
              <tr style={headerRow}>
                <th style={tableHeader}>Score Bucket</th>
                <th style={tableHeader}>Count</th>
              </tr>
            </thead>

            <tbody>
              {matchScores.map((item) => (
                <tr key={item.bucket}>
                  <td style={tableCell}>{item.bucket}</td>
                  <td style={tableCell}>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Interview Performance */}

          <h2>🎤 Interview Performance</h2>

          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            Average Score: {performance.average}
          </p>

          <table style={tableStyle}>
            <thead>
              <tr style={headerRow}>
                <th style={tableHeader}>Score Range</th>
                <th style={tableHeader}>Candidates</th>
              </tr>
            </thead>

            <tbody>
              {performance.distribution.map((item) => (
                <tr key={item.bucket}>
                  <td style={tableCell}>{item.bucket}</td>
                  <td style={tableCell}>{item.count}</td>
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
  width: "200px",
  padding: "18px",
  borderRadius: "10px",
  backgroundColor: "white",
  border: "1px solid #ddd",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "white",
  marginBottom: "35px",
};

const headerRow = {
  backgroundColor: "#1e293b",
  color: "white",
};

const tableHeader = {
  padding: "12px",
  border: "1px solid #ddd",
};

const tableCell = {
  padding: "12px",
  border: "1px solid #ddd",
};

export default Analytics;