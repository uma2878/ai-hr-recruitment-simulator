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

useEffect(() => {
  const fetchDashboardSummary = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE}/api/dashboard/summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Dashboard Summary:", data);

      setSummary(data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  fetchDashboardSummary();
}, []);
  const skillsData = [
  { skill: "React", count: 35 },
  { skill: "Python", count: 60 },
  { skill: "Java", count: 45 },
  { skill: "AI/ML", count: 70 },
];

const statusData = [
  { name: "Selected", value: 20 },
  { name: "Shortlisted", value: 40 },
  { name: "Pending", value: 60 },
];

const matchScoreData = [
  { range: "90%+", count: 25 },
  { range: "80-89%", count: 40 },
  { range: "70-79%", count: 35 },
  { range: "<70%", count: 20 },
];

const interviewData = [
  { level: "Excellent", count: 15 },
  { level: "Good", count: 30 },
  { level: "Average", count: 20 },
  { level: "Poor", count: 10 },
];

const COLORS = ["#22c55e", "#f59e0b", "#3b82f6"];
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
              color: "black",
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

              <p>✅ Rohith Sharma shortlisted for React Developer</p>
              <p>✅ Vaishnavi selected for AI Engineer</p>
              <p>📄 5 new resumes uploaded today</p>
              <p>🎤 3 interviews completed</p>
            </div>

            <div style={{ ...sectionCard, flex: 1 }}>
              <h3>📊 Hiring Progress</h3>

              <p>Total Applications: {summary.total_applications}</p>

              <div style={progressBg}>
                <div style={progressFill}>
                  75% Hiring Progress
                </div>
              </div>
            </div>
          </div>
          <div style={chartCard}>
  <h2>📊 Resume Skills Distribution</h2>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={skillsData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="skill" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#2563eb" />
    </BarChart>
  </ResponsiveContainer>
</div>
<div style={chartCard}>
  <h2>🎯 Match Score Distribution</h2>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={matchScoreData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="range" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#16a34a" />
    </BarChart>
  </ResponsiveContainer>
</div>
<div style={chartCard}>
  <h2>👥 Candidate Status Breakdown</h2>

  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={statusData}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
        label
      >
        {statusData.map((entry, index) => (
          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>

      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</div>
<div style={chartCard}>
  <h2>🎤 Interview Performance Graph</h2>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={interviewData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="level" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#9333ea" />
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
  marginTop: "10px",
  marginBottom: "15px",
};

const progressFill = {
  width: "75%",
  backgroundColor: "#2563eb",
  color: "white",
  textAlign: "center",
  padding: "8px",
};

export default Dashboard;