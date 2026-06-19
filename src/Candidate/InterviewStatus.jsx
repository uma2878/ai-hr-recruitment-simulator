
       import React, { useState } from "react";
import "./InterviewStatus.css";

function InterviewStatus() {

  const [applications] = useState([
    {
      company: "TCS",
      role: "Frontend Developer",
      status: "HR Round",
      date: "15 Jun 2025",
      score: "82%"
    },
    {
      company: "Infosys",
      role: "Java Developer",
      status: "Technical Round",
      date: "18 Jun 2025",
      score: "76%"
    },
    {
      company: "Wipro",
      role: "Python Developer",
      status: "Shortlisted",
      date: "20 Jun 2025",
      score: "88%"
    },
    {
      company: "Accenture",
      role: "Full Stack Developer",
      status: "Selected",
      date: "10 Jun 2025",
      score: "91%"
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "#2563eb";

      case "Shortlisted":
        return "#f59e0b";

      case "Technical Round":
        return "#8b5cf6";

      case "HR Round":
        return "#10b981";

      case "Selected":
        return "#22c55e";

      case "Rejected":
        return "#ef4444";

      default:
        return "#64748b";
    }
  };

  return (
    <div className="interview-container">

      <h2>📊 Interview Status</h2>

      <div className="status-summary">

        <div className="summary-card">
          <h3>12</h3>
          <p>Applications</p>
        </div>

        <div className="summary-card">
          <h3>5</h3>
          <p>Shortlisted</p>
        </div>

        <div className="summary-card">
          <h3>3</h3>
          <p>Interviews</p>
        </div>

        <div className="summary-card">
          <h3>1</h3>
          <p>Selected</p>
        </div>

      </div>

      <div className="status-list">

        {applications.map((item, index) => (

          <div
            className="status-card"
            key={index}
          >

            <div>

              <h3>{item.role}</h3>

              <p>{item.company}</p>

              <p>
                Interview Date :
                {" "}
                {item.date}
              </p>

            </div>

            <div className="status-right">

              <span
                className="status-badge"
                style={{
                  background:
                    getStatusColor(item.status)
                }}
              >
                {item.status}
              </span>

              <p>
                Score:
                {" "}
                {item.score}
              </p>

            </div>

          </div>

        ))}

      </div>

      <div className="timeline-section">

        <h3>📌 Hiring Journey</h3>

        <ul className="timeline">

          <li>✅ Application Submitted</li>

          <li>✅ Resume Screened</li>

          <li>✅ Technical Interview</li>

          <li>🟡 HR Interview Pending</li>

          <li>⬜ Final Selection</li>

        </ul>

      </div>

    </div>
  );
}

export default InterviewStatus;