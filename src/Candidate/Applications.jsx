import React, { useState } from "react";
import "./Applications.css";

function Applications() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const applications = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TCS",
      date: "12 Jul 2025",
      status: "Under Review",
      match: 92,
      probability: 85,
    },
    {
      id: 2,
      title: "Java Developer",
      company: "Infosys",
      date: "10 Jul 2025",
      status: "Shortlisted",
      match: 88,
      probability: 82,
    },
    {
      id: 3,
      title: "Python Developer",
      company: "Wipro",
      date: "08 Jul 2025",
      status: "Interview Scheduled",
      match: 90,
      probability: 80,
    },
    {
      id: 4,
      title: "Software Engineer",
      company: "Accenture",
      date: "05 Jul 2025",
      status: "Applied",
      match: 78,
      probability: 65,
    },
    {
      id: 5,
      title: "Full Stack Developer",
      company: "Cognizant",
      date: "02 Jul 2025",
      status: "Selected",
      match: 95,
      probability: 92,
    },
  ];

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.title.toLowerCase().includes(search.toLowerCase()) ||
      app.company.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || app.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="applications-container">
      <h2>📋 My Applications</h2>

      {/* Search + Filter */}

      <div className="top-controls">
        <input
          type="text"
          placeholder="Search Job or Company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Applied</option>
          <option>Under Review</option>
          <option>Shortlisted</option>
          <option>Interview Scheduled</option>
          <option>Selected</option>
        </select>
      </div>

      {/* Stats */}

      <div className="applications-stats">
        <div className="stat-box">
          <h3>{applications.length}</h3>
          <p>Total Applications</p>
        </div>

        <div className="stat-box">
          <h3>
            {
              applications.filter(
                (a) => a.status === "Shortlisted"
              ).length
            }
          </h3>
          <p>Shortlisted</p>
        </div>

        <div className="stat-box">
          <h3>
            {
              applications.filter(
                (a) =>
                  a.status === "Interview Scheduled"
              ).length
            }
          </h3>
          <p>Interviews</p>
        </div>

        <div className="stat-box">
          <h3>
            {
              applications.filter(
                (a) => a.status === "Selected"
              ).length
            }
          </h3>
          <p>Selected</p>
        </div>
      </div>

      {/* Application Cards */}

      {filteredApplications.map((app) => (
        <div className="application-card" key={app.id}>
          <div className="left-section">
            <h3>{app.title}</h3>
            <p>{app.company}</p>
            <p>Applied On: {app.date}</p>

            <span className="status">
              {app.status}
            </span>
          </div>

          <div className="right-section">
            <div className="score-box">
              <h4>AI Match Score</h4>
              <p>{app.match}%</p>
            </div>

            <div className="score-box">
              <h4>Selection Chance</h4>
              <p>{app.probability}%</p>
            </div>

            <button className="details-btn">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Applications;