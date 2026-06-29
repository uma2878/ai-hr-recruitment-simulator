import React, { useState, useEffect } from "react";
import { API_BASE } from "../config/api";
import "./JobRecommendations.css";

function JobRecommendations() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { setError("Not logged in"); setLoading(false); return; }
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.sub;

        const res = await fetch(`${API_BASE}/api/jobs/recommendations/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) { localStorage.removeItem("token"); window.location.href = "/"; return; }
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setJobs(Array.isArray(data) ? data : []);
      } catch (e) {
        setError("Could not load job recommendations. Upload a resume first.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div className="jobs-container"><p>Loading recommendations...</p></div>;
  if (error)   return <div className="jobs-container"><p style={{color:"#ef4444"}}>{error}</p></div>;

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h2>💼 Job Recommendations</h2>
        <p>AI-generated jobs based on your profile and skills</p>
      </div>

      {jobs.length === 0 ? (
        <p>No recommendations yet. Upload your resume to get started.</p>
      ) : (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <div className="job-card" key={job.job_id}>
              <div className="job-top">
                <h3>{job.title}</h3>
                <span className="match-score">
                  {Math.round(job.score || 0)}% Match
                </span>
              </div>

              <div className="job-details">
                {job.matched_skills?.length > 0 && (
                  <p>✅ <strong>Matched:</strong> {job.matched_skills.join(", ")}</p>
                )}
                {job.missing_skills?.length > 0 && (
                  <p>📌 <strong>Missing:</strong> {job.missing_skills.join(", ")}</p>
                )}
                {job.reasons?.length > 0 && (
                  <p>💡 {job.reasons[0]}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobRecommendations;
