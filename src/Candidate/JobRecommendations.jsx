import React from "react";
import "./JobRecommendations.css";

function JobRecommendations() {

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TCS",
      location: "Hyderabad",
      match: "95%"
    },
    {
      id: 2,
      title: "React Developer",
      company: "Infosys",
      location: "Bangalore",
      match: "92%"
    },
    {
      id: 3,
      title: "Java Developer",
      company: "Wipro",
      location: "Chennai",
      match: "90%"
    },
    {
      id: 4,
      title: "Software Engineer",
      company: "Accenture",
      location: "Pune",
      match: "88%"
    },
    {
      id: 5,
      title: "UI Developer",
      company: "Capgemini",
      location: "Mumbai",
      match: "86%"
    },
    {
      id: 6,
      title: "Full Stack Developer",
      company: "Cognizant",
      location: "Hyderabad",
      match: "84%"
    },
    {
      id: 7,
      title: "Backend Developer",
      company: "Tech Mahindra",
      location: "Noida",
      match: "82%"
    },
    {
      id: 8,
      title: "Software Trainee",
      company: "HCL",
      location: "Chennai",
      match: "80%"
    }
  ];

  const handleApply = (jobTitle) => {
    alert(`Applied for ${jobTitle} successfully!`);
  };

  return (
    <div className="jobs-container">

      <div className="jobs-header">
        <h2>💼 Job Recommendations</h2>
        <p>
          AI-generated jobs based on your profile and skills
        </p>
      </div>

      <div className="jobs-grid">

        {jobs.map((job) => (

          <div className="job-card" key={job.id}>

            <div className="job-top">

              <h3>{job.title}</h3>

              <span className="match-score">
                {job.match} Match
              </span>

            </div>

            <div className="job-details">

              <p>
                🏢 <strong>{job.company}</strong>
              </p>

              <p>
                📍 {job.location}
              </p>

            </div>

            <button
              className="apply-btn"
              onClick={() => handleApply(job.title)}
            >
              Apply Now
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default JobRecommendations;