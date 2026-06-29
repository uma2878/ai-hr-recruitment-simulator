import React, { useState, useEffect } from "react";
import { API_BASE } from "../config/api";
import "./Applications.css";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { setError("Not logged in"); setLoading(false); return; }
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.sub;

        const res = await fetch(`${API_BASE}/api/applications/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) { localStorage.removeItem("token"); window.location.href = "/"; return; }
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setApplications(Array.isArray(data) ? data : []);
      } catch (e) {
        setError("Could not load applications.");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleWithdraw = async (appId) => {
    if (!window.confirm("Withdraw this application?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE}/api/applications/${appId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setApplications(prev => prev.filter(a => a.id !== appId));
      } else {
        alert("Could not withdraw application.");
      }
    } catch (e) {
      alert("Server error.");
    }
  };

  const statusColor = (status) => {
    const map = {
      applied: "#2563eb", pending: "#2563eb",
      shortlisted: "#f59e0b",
      interview_scheduled: "#8b5cf6",
      selected: "#22c55e",
      rejected: "#ef4444",
    };
    return map[status?.toLowerCase()] || "#64748b";
  };

  const formatDate = (iso) => iso ? new Date(iso).toLocaleDateString("en-IN") : "—";

  const filtered = applications.filter(app => {
    const matchSearch =
      (app.job_title || "").toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || app.status === filter;
    return matchSearch && matchFilter;
  });

  if (loading) return <div className="applications-container"><p>Loading applications...</p></div>;
  if (error)   return <div className="applications-container"><p style={{color:"#ef4444"}}>{error}</p></div>;

  return (
    <div className="applications-container">
      <h2>📋 My Applications</h2>

      <div className="top-controls">
        <input
          type="text"
          placeholder="Search by job title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option value="applied">Applied</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="interview_scheduled">Interview Scheduled</option>
          <option value="selected">Selected</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="applications-stats">
        <div className="stat-box"><h3>{applications.length}</h3><p>Total</p></div>
        <div className="stat-box">
          <h3>{applications.filter(a => a.status === "shortlisted").length}</h3>
          <p>Shortlisted</p>
        </div>
        <div className="stat-box">
          <h3>{applications.filter(a => a.status === "selected").length}</h3>
          <p>Selected</p>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p style={{marginTop:"20px"}}>No applications found.</p>
      ) : (
        filtered.map((app) => (
          <div className="application-card" key={app.id}>
            <div className="left-section">
              <h3>{app.job_title || "Job"}</h3>
              <p>Applied: {formatDate(app.applied_at)}</p>
              {app.cover_note && <p style={{fontStyle:"italic",color:"#64748b"}}>{app.cover_note}</p>}
              <span className="status" style={{ backgroundColor: statusColor(app.status), color:"white", padding:"4px 10px", borderRadius:"12px", fontSize:"12px" }}>
                {app.status}
              </span>
            </div>
            <div className="right-section">
              <button
                className="details-btn"
                style={{ backgroundColor:"#dc2626", color:"white", border:"none", padding:"8px 14px", borderRadius:"6px", cursor:"pointer" }}
                onClick={() => handleWithdraw(app.id)}
              >
                Withdraw
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Applications;
