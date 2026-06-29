import React, { useState, useEffect } from "react";
import { API_BASE } from "../config/api";

function JobBrowse({ onApply }) {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(null);
  const [error, setError] = useState("");

  const fetchJobs = async (search = "") => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    try {
      const url = search.trim()
        ? `${API_BASE}/api/search/jobs?query=${encodeURIComponent(search)}`
        : `${API_BASE}/api/jobs`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { localStorage.removeItem("token"); window.location.href = "/"; return; }
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : (data.items || data.jobs || []));
    } catch (e) {
      setError("Could not load jobs.");
    }
    setLoading(false);
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs(query);
  };

  const handleApply = async (jobId, jobTitle) => {
    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.sub;
    setApplying(jobId);
    try {
      const res = await fetch(`${API_BASE}/api/applications/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ user_id: userId, job_id: jobId }),
      });
      if (res.ok) {
        alert(`✅ Applied for ${jobTitle}!`);
        if (onApply) onApply();
      } else {
        const err = await res.json();
        alert("❌ " + (err.detail || "Could not apply"));
      }
    } catch (e) {
      alert("❌ Server error");
    }
    setApplying(null);
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2>🔍 Browse Jobs</h2>

      <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search jobs by title, skills..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
          Search
        </button>
        {query && (
          <button type="button" onClick={() => { setQuery(""); fetchJobs(""); }}
            style={{ padding: "10px 16px", backgroundColor: "#64748b", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
            Clear
          </button>
        )}
      </form>

      {loading && <p>Loading jobs...</p>}
      {error && <p style={{ color: "#ef4444" }}>{error}</p>}

      {!loading && !error && jobs.length === 0 && (
        <p>No jobs found{query ? ` for "${query}"` : ""}.</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {jobs.map((job) => (
          <div key={job.id || job.job_id} style={{ background: "white", borderRadius: "10px", padding: "18px", boxShadow: "0 2px 6px rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 6px" }}>{job.title}</h3>
              {job.company && <p style={{ margin: "0 0 4px", color: "#64748b" }}>🏢 {job.company}</p>}
              {job.location && <p style={{ margin: "0 0 4px", color: "#64748b" }}>📍 {job.location}</p>}
              {job.description && <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#475569" }}>{job.description.slice(0, 120)}{job.description.length > 120 ? "..." : ""}</p>}
              {job.skills_required?.length > 0 && (
                <p style={{ margin: "6px 0 0", fontSize: "12px" }}>
                  <strong>Skills:</strong> {job.skills_required.join(", ")}
                </p>
              )}
            </div>
            <button
              onClick={() => handleApply(job.id || job.job_id, job.title)}
              disabled={applying === (job.id || job.job_id)}
              style={{ marginLeft: "16px", padding: "8px 18px", backgroundColor: applying === (job.id || job.job_id) ? "#94a3b8" : "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", whiteSpace: "nowrap" }}
            >
              {applying === (job.id || job.job_id) ? "Applying..." : "Apply"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobBrowse;
