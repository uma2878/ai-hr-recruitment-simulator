import React, { useState, useEffect } from "react";
import { API_BASE } from "../config/api";
import "./AISkillAnalysis.css";

function AISkillAnalysis() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { setError("Not logged in"); setLoading(false); return; }
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.sub;

        const res = await fetch(`${API_BASE}/api/ai/skill-analysis/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) { localStorage.removeItem("token"); window.location.href = "/"; return; }
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setAnalysis(data);
      } catch (e) {
        setError("Could not load skill analysis. Upload a resume first.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, []);

  if (loading) return <div className="analysis-container"><p>Loading AI Skill Analysis...</p></div>;
  if (error)   return <div className="analysis-container"><p style={{color:"#ef4444"}}>{error}</p></div>;

  return (
    <div className="analysis-container">
      <h2>🤖 AI Skill Analysis</h2>

      <div className="score-grid">
        <div className="score-card">
          <h3>Skill Levels</h3>
          {analysis.skill_levels && Object.keys(analysis.skill_levels).length > 0 ? (
            Object.entries(analysis.skill_levels).map(([skill, level]) => (
              <p key={skill}><b>{skill}:</b> {level}</p>
            ))
          ) : (
            <p>No skill data yet</p>
          )}
        </div>
      </div>

      <div className="analysis-card">
        <h3>💪 Strengths</h3>
        {analysis.strengths?.length > 0 ? (
          <div className="tags">
            {analysis.strengths.map((s, i) => <span key={i} className="tag">{s}</span>)}
          </div>
        ) : <p>No strengths data yet</p>}
      </div>

      <div className="analysis-card">
        <h3>📈 Skill Gaps</h3>
        {analysis.gaps?.length > 0 ? (
          <ul>{analysis.gaps.map((g, i) => <li key={i}>{g}</li>)}</ul>
        ) : <p>No gaps identified</p>}
      </div>

      <div className="analysis-card">
        <h3>🎯 Recommendations</h3>
        {analysis.recommendations?.length > 0 ? (
          <ul>{analysis.recommendations.map((r, i) => <li key={i}>{r}</li>)}</ul>
        ) : <p>No recommendations yet</p>}
      </div>
    </div>
  );
}

export default AISkillAnalysis;
