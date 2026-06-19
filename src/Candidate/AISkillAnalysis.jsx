import React from "react";
import "./AISkillAnalysis.css";

function AISkillAnalysis() {

  const analysis = {
    skillScore: 85,
    employabilityScore: 80,

    skillsDetected: [
      "React",
      "JavaScript",
      "Java",
      "SQL",
      "HTML",
      "CSS"
    ],

    strengths: [
      "Problem Solving",
      "Frontend Development",
      "Communication",
      "Team Collaboration"
    ],

    improvementAreas: [
      "Node.js",
      "System Design",
      "Cloud Computing"
    ],

    recommendedRoles: [
      "Frontend Developer",
      "React Developer",
      "Java Developer",
      "Software Engineer",
      "UI Developer"
    ]
  };

  return (
    <div className="analysis-container">

      <h2>🤖 AI Skill Analysis</h2>

      {/* SCORE CARDS */}

      <div className="score-grid">

        <div className="score-card">
          <h3>Skill Score</h3>
          <h1>{analysis.skillScore}%</h1>
        </div>

        <div className="score-card">
          <h3>Employability Score</h3>
          <h1>{analysis.employabilityScore}%</h1>
        </div>

      </div>

      {/* SKILLS DETECTED */}

      <div className="analysis-card">
        <h3>🛠️ Skills Detected</h3>

        <div className="tags">
          {analysis.skillsDetected.map((skill, index) => (
            <span key={index} className="tag">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* STRENGTHS */}

      <div className="analysis-card">
        <h3>💪 Strengths</h3>

        <ul>
          {analysis.strengths.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* IMPROVEMENT */}

      <div className="analysis-card">
        <h3>📈 Improvement Areas</h3>

        <ul>
          {analysis.improvementAreas.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* ROLES */}

      <div className="analysis-card">
        <h3>🎯 Recommended Roles</h3>

        <ul>
          {analysis.recommendedRoles.map((role, index) => (
            <li key={index}>{role}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default AISkillAnalysis