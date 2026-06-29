import React, { useState, useEffect } from "react";
import { API_BASE } from "../config/api";
import "./InterviewStatus.css";

function InterviewStatus() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { setError("Not logged in"); setLoading(false); return; }
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.sub;

        const res = await fetch(`${API_BASE}/api/interviews/status/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) { localStorage.removeItem("token"); window.location.href = "/"; return; }
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setInterviews(Array.isArray(data) ? data : []);
      } catch (e) {
        setError("Could not load interview status.");
      } finally {
        setLoading(false);
      }
    };
    fetchInterviews();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      completed: "#22c55e",
      in_progress: "#8b5cf6",
      pending: "#f59e0b",
    };
    return colors[status] || "#64748b";
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  if (loading) return <div className="interview-container"><p>Loading interview status...</p></div>;
  if (error)   return <div className="interview-container"><p style={{color:"#ef4444"}}>{error}</p></div>;

  const completed  = interviews.filter(i => i.status === "completed").length;
  const inProgress = interviews.filter(i => i.status === "in_progress").length;

  return (
    <div className="interview-container">
      <h2>📊 Interview Status</h2>

      <div className="status-summary">
        <div className="summary-card"><h3>{interviews.length}</h3><p>Total</p></div>
        <div className="summary-card"><h3>{inProgress}</h3><p>In Progress</p></div>
        <div className="summary-card"><h3>{completed}</h3><p>Completed</p></div>
        <div className="summary-card">
          <h3>{interviews.filter(i => i.interview_score != null).length > 0
            ? Math.round(interviews.filter(i => i.interview_score != null)
                .reduce((s, i) => s + i.interview_score, 0) /
                interviews.filter(i => i.interview_score != null).length) + "%"
            : "—"}</h3>
          <p>Avg Score</p>
        </div>
      </div>

      {interviews.length === 0 ? (
        <p style={{marginTop:"20px"}}>No interviews yet. Start a mock interview or apply for a job.</p>
      ) : (
        <div className="status-list">
          {interviews.map((item) => (
            <div className="status-card" key={item.id}>
              <div>
                <h3>{item.job_title || "Mock Interview"}</h3>
                <p>Started: {formatDate(item.started_at)}</p>
                {item.completed_at && <p>Completed: {formatDate(item.completed_at)}</p>}
              </div>
              <div className="status-right">
                <span className="status-badge" style={{ background: getStatusColor(item.status) }}>
                  {item.status}
                </span>
                {item.interview_score != null && (
                  <p>Score: {Math.round(item.interview_score)}%</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InterviewStatus;
