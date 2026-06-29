import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { API_BASE } from "../config/api";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [summary, setSummary] = useState({
    total_candidates: 0,
    total_jobs: 0,
    total_applications: 0,
    total_interviews: 0,
    completed_interviews: 0,
    avg_match_score: 0,
    avg_interview_score: 0,
  });

  const [activity, setActivity] = useState([]);
  const [progress, setProgress] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const responses = await Promise.all([
          fetch(`${API_BASE}/api/dashboard/summary`, {
            headers,
          }),
          fetch(`${API_BASE}/api/dashboard/activity?limit=15`, {
            headers,
          }),
          fetch(`${API_BASE}/api/dashboard/progress`, {
            headers,
          }),
        ]);

        responses.forEach((res) => {
          if (!res.ok) {
            throw new Error(`API Error: ${res.status}`);
          }
        });

        const [
          summaryData,
          activityData,
          progressData,
        ] = await Promise.all(
          responses.map((res) => res.json())
        );

        console.log("Summary:", summaryData);
        console.log("Activity:", activityData);
        console.log("Progress:", progressData);

        setSummary(summaryData);
        setActivity(activityData);
        setProgress(progressData);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />

        <div style={{ display: "flex" }}>
          <Sidebar />

          <div style={{ padding: "30px", flex: 1 }}>
            <h2>Loading Dashboard...</h2>
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

  /* ---------- Chart Data ---------- */

  const progressChart = progress.map((item) => ({
    name:
      item.stage.charAt(0).toUpperCase() +
      item.stage.slice(1),
    value: item.count,
  }));

  const activityChart = activity.reduce((acc, item) => {
    const existing = acc.find(
      (x) => x.type === item.type
    );

    if (existing) {
      existing.count++;
    } else {
      acc.push({
        type: item.type,
        count: 1,
      });
    }

    return acc;
  }, []);

  const interviewChart = [
    {
      level: "Completed",
      count: summary.completed_interviews,
    },
    {
      level: "Pending",
      count:
        summary.total_interviews -
        summary.completed_interviews,
    },
  ];

  const scoreChart = [
    {
      name: "Resume Match",
      score: summary.avg_match_score,
    },
    {
      name: "Interview",
      score: summary.avg_interview_score,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#9333ea",
  ];

  const progressPercent =
    summary.total_interviews === 0
      ? 0
      : Math.round(
          (summary.completed_interviews /
            summary.total_interviews) *
            100
        );

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            padding: "30px",
            flex: 1,
            backgroundColor: "#f8fafc",
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              marginBottom: "10px",
            }}
          >
            Dashboard
          </h1>

          <p
            style={{
              marginBottom: "30px",
            }}
          >
            Welcome to the AI HR Recruitment Simulator
          </p>

          {/* Summary Cards */}

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div style={cardStyle}>
              <h3>Total Candidates</h3>
              <p>{summary.total_candidates}</p>
            </div>

            <div style={cardStyle}>
              <h3>Total Jobs</h3>
              <p>{summary.total_jobs}</p>
            </div>

            <div style={cardStyle}>
              <h3>Total Applications</h3>
              <p>{summary.total_applications}</p>
            </div>

            <div style={cardStyle}>
              <h3>Total Interviews</h3>
              <p>{summary.total_interviews}</p>
            </div>

            <div style={cardStyle}>
              <h3>Completed Interviews</h3>
              <p>{summary.completed_interviews}</p>
            </div>

            <div style={cardStyle}>
              <h3>Avg Resume Match</h3>
              <p>{summary.avg_match_score}%</p>
            </div>

            <div style={cardStyle}>
              <h3>Avg Interview Score</h3>
              <p>{summary.avg_interview_score}%</p>
            </div>
          </div>
                    {/* Recent Activity + Hiring Progress */}

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "40px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ ...sectionCard, flex: 2 }}>
              <h2>📌 Recent Activity</h2>

              {activity.length === 0 ? (
                <p>No recent activity.</p>
              ) : (
                activity.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                      padding: "10px 0",
                    }}
                  >
                    <strong>
                      {item.type.toUpperCase()}
                    </strong>

                    <p>{item.description}</p>

                    <small style={{ color: "#6b7280" }}>
                      {new Date(
                        item.timestamp
                      ).toLocaleString()}
                    </small>
                  </div>
                ))
              )}
            </div>

            <div style={{ ...sectionCard, flex: 1 }}>
              <h3>📊 Hiring Progress</h3>

              <p>
                Total Interviews:
                <strong> {summary.total_interviews}</strong>
              </p>

              <p>
                Completed:
                <strong>
                  {" "}
                  {summary.completed_interviews}
                </strong>
              </p>

              <div style={progressBg}>
                <div
                  style={{
                    ...progressFill,
                    width: `${progressPercent}%`,
                  }}
                >
                  {progressPercent}%
                </div>
              </div>
            </div>
          </div>

          {/* Progress Chart */}

          <div style={chartCard}>
            <h2>📈 Recruitment Progress</h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#2563eb"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Average Scores */}

          <div style={chartCard}>
            <h2>🎯 Average Scores</h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="score"
                  fill="#16a34a"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Activity Breakdown */}

          <div style={chartCard}>
            <h2>📊 Activity Breakdown</h2>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={activityChart}
                  dataKey="count"
                  nameKey="type"
                  outerRadius={100}
                  label
                >
                  {activityChart.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[index % COLORS.length]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Interview Completion */}

          <div style={chartCard}>
            <h2>🎤 Interview Completion</h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={interviewChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#9333ea"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  padding: "20px",
  borderRadius: "10px",
  width: "200px",
  backgroundColor: "white",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const sectionCard = {
  backgroundColor: "white",
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
};

const chartCard = {
  backgroundColor: "white",
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
  marginTop: "25px",
};

const progressBg = {
  width: "100%",
  backgroundColor: "#e5e7eb",
  borderRadius: "10px",
  overflow: "hidden",
  marginTop: "15px",
};

const progressFill = {
  backgroundColor: "#2563eb",
  color: "white",
  textAlign: "center",
  padding: "8px",
  transition: "0.4s",
};

export default Dashboard;