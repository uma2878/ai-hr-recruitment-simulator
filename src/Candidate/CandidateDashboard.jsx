import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./CandidateDashboard.css";
import CandidateProfile from "./CandidateProfile";
import AISkillAnalysis from "./AISkillAnalysis";
import JobRecommendations from "./JobRecommendations";
import Applications from "./Applications";
import AIMockInterview from "./AIMockInterview";
import InterviewStatus from "./InterviewStatus";
import SkillAssessment from "./SkillAssessment";
import CandidateSettings from "./CandidateSettings";
function CandidateDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (confirmLogout) {
    navigate("/candidate-login");
  }
};
  const [page, setPage] = useState("dashboard");

  const [profilePic, setProfilePic] = useState(null);
  const [profileName, setProfileName] = useState("Candidate");

  const [profileData, setProfileData] = useState(null);

  const [resumeName, setResumeName] = useState(null);
  const [resumeURL, setResumeURL] = useState(null);
 const [searchTerm, setSearchTerm] =
  useState("");

const [searchResults, setSearchResults] =
  useState([]);

  const [darkMode, setDarkMode] = useState(
  JSON.parse(localStorage.getItem("settings"))
    ?.darkMode || false
);


  const jobsData = [
  {
    role: "Frontend Developer",
    company: "Google",
    location: "Bangalore",
    match: "95%"
  },
  {
    role: "React Developer",
    company: "Microsoft",
    location: "Hyderabad",
    match: "90%"
  },
  {
    role: "Java Developer",
    company: "Infosys",
    location: "Pune",
    match: "88%"
  },
  {
    role: "Python Developer",
    company: "TCS",
    location: "Chennai",
    match: "92%"
  },
  {
    role: "Full Stack Developer",
    company: "Amazon",
    location: "Bangalore",
    match: "96%"
  }
];

  useEffect(() => {
  const settings =
    JSON.parse(
      localStorage.getItem("settings")
    );

  if (settings) {
    setDarkMode(settings.darkMode);
  }
}, []);

  useEffect(() => {
    const saved = localStorage.getItem("profileData");

    if (saved) {
      const data = JSON.parse(saved);

      setProfileData(data);
      setProfileName(data.fullName || "Candidate");
    }
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const removeProfile = () => {
    setProfilePic(null);
  };

  const generateJobs = () => {
    if (!profileData) {
      return [
        {
          role: "Complete Profile First",
          company: "System",
          match: "0%",
        },
      ];
    }

    const skills = profileData.skills?.toLowerCase() || "";
    let jobs = [];

    if (skills.includes("react") || skills.includes("frontend")) {
      jobs.push({
        role: "Frontend Developer",
        company: "TCS",
        match: "92%",
      });
    }

    if (skills.includes("java")) {
      jobs.push({
        role: "Java Developer",
        company: "Infosys",
        match: "88%",
      });
    }

    if (skills.includes("python")) {
      jobs.push({
        role: "Python Developer",
        company: "Wipro",
        match: "86%",
      });
    }

    if (jobs.length === 0) {
      jobs.push({
        role: "Software Trainee",
        company: "Startup",
        match: "75%",
      });
    }

    return jobs;
  };




  const renderPage = () => {
    switch (page) {
      case "profile":
        return <CandidateProfile setProfileName={setProfileName} />;

      case "ai":
        return <AISkillAnalysis />;

      case "resume":
        return (
          <div className="card">
            <h2>📄 Resume Upload</h2>

            <br />

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                setResumeName(file.name);
                setResumeURL(URL.createObjectURL(file));
              }}
            />

            {resumeName && (
              <div style={{ marginTop: "20px" }}>
                <p>📌 {resumeName}</p>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >
                  <button
                    onClick={() => {
                      window.open(resumeURL, "_blank");
                    }}
                  >
                    Preview
                  </button>

                  <label
                    style={{
                      background: "#2563eb",
                      color: "#fff",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Replace

                    <input
                      hidden
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (!file) return;

                        setResumeName(file.name);
                        setResumeURL(URL.createObjectURL(file));
                      }}
                    />
                  </label>

                  <button
                    style={{ background: "red" }}
                    onClick={() => {
                      setResumeName(null);
                      setResumeURL(null);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case "jobs":
  return <JobRecommendations />;

       
    case "applications":
      return <Applications />;

    case "interviews":
  return <InterviewStatus />;
      
      case "mockInterview":
      return <AIMockInterview />;

      case "assessment":
  return <SkillAssessment />;   

     case "settings":
  return (
    <CandidateSettings
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  );

      default:
        return (
          <>
            {/* STATS */}

            <div className="stats-grid">
              <div className="card stat-card">
                <h2>12</h2>
                <p>Applications</p>
              </div>

              <div className="card stat-card">
                <h2>5</h2>
                <p>Under Review</p>
              </div>

              <div className="card stat-card">
                <h2>3</h2>
                <p>Shortlisted</p>
              </div>

              <div className="card stat-card">
                <h2>2</h2>
                <p>Interviews</p>
              </div>
            </div>

            {/* AI SCORE + PROFILE COMPLETION */}

            <div className="dashboard-row">
              <div className="card skill-card">
                <h2>AI Skill Score</h2>

                <div className="score-circle">
                  <span>78%</span>
                </div>

                <p>
                  Your profile is stronger than 78% of candidates.
                </p>

                <br />

                <button onClick={() => setPage("ai")}>
  View AI Analysis
</button>
              </div>

              <div className="card completion-card">
                <h2>Profile Completion</h2>

                <h1>80%</h1>

                <ul>
                  <li>✅ Basic Information</li>
                  <li>✅ Education Details</li>
                  <li>✅ Skills Added</li>
                  <li>✅ Resume Uploaded</li>
                  <li>⬜ Work Experience</li>
                </ul>

               <button onClick={() => setPage("profile")}>
  Complete Profile
</button> 
              </div>
            </div>

            {/* RECOMMENDED JOBS */}

            <div className="card jobs-section">
              <h2 className="jobs-title">
                AI RECOMMENDED JOBS
              </h2>

              {generateJobs().map((job, index) => (
                <div className="job-card" key={index}>
                  <div>
                    <h4>{job.role}</h4>
                    <p>{job.company}</p>
                  </div>

                  <div className="job-right">
                    <span>{job.match}</span>
                    <button>Apply</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
    }
  };

  return (
   <div
  className={
    darkMode
      ? "dashboard-container dark-mode"
      : "dashboard-container"
  }
>
      {/* SIDEBAR */}

      <div className="sidebar">
        <div className="logo-section">
          <h1>XTRAGRAD</h1>
          <p>AI HR Recruitment Simulator</p>
        </div>

        <ul className="menu">
          <li
            className={page === "dashboard" ? "active" : ""}
            onClick={() => setPage("dashboard")}
          >
            🏠 Dashboard
          </li>

          <li
            className={page === "profile" ? "active" : ""}
            onClick={() => setPage("profile")}
          >
            👤 Profile
          </li>

          <li
            className={page === "resume" ? "active" : ""}
            onClick={() => setPage("resume")}
          >
            📄 Resume Upload
          </li>

          <li
            className={page === "jobs" ? "active" : ""}
            onClick={() => setPage("jobs")}
          >
            💼 Job Recommendations
          </li>

          <li
            className={page === "ai" ? "active" : ""}
            onClick={() => setPage("ai")}
          >
            🤖 AI Skill Analysis
          </li>

          <li
            className={page === "applications" ? "active" : ""}
            onClick={() => setPage("applications")}
>
            📋 Applications
          </li>

          <li
             className={page === "interviews" ? "active" : ""}
             onClick={() => setPage("interviews")}
>
              🎤 Interview Status
          </li> 

          <li
             className={page === "mockInterview" ? "active" : ""}
             onClick={() =>  {
              console.log("Mock Interview Clicked");
              setPage("mockInterview")}
             }
>
               🤖 AI Mock Interview
          </li>

          <li
            className={page === "assessment" ? "active" : ""}
            onClick={() => setPage("assessment")}
>
             📝 Skill Assessment
          </li>

          <li
            className={page === "settings" ? "active" : ""}
            onClick={() => setPage("settings")}
>
              ⚙️ Settings
          </li>
        </ul>
      </div>

    {/* MAIN CONTENT */}
<div className="main-content">

  {/* HEADER */}
  <div className="header">

    <div className="welcome-section">
      <h1>Welcome, {profileName} 👋</h1>

      <p>
        Track your applications, interviews and AI-powered
        career insights.
      </p>
    </div>

    {/* SEARCH BAR */}
    <div className="search-container">
  <input
    type="text"
    placeholder="Search jobs, companies, skills..."
    value={searchTerm}
     onChange={(e) => {
      const value = e.target.value;

      setSearchTerm(value);

      const results = jobsData.filter(
        (job) =>
          job.role.toLowerCase().includes(value.toLowerCase()) ||
          job.company.toLowerCase().includes(value.toLowerCase()) ||
          job.location.toLowerCase().includes(value.toLowerCase())
      );

      setSearchResults(results);
    }}
    className="search-input"
  />
</div>

    {/* PROFILE SECTION */}
    <div className="profile-section">

      <input
        type="file"
        hidden
        id="profilePic"
        onChange={handleUpload}
      />

      <div className="avatar">
        {profilePic ? (
          <img src={profilePic} alt="Profile" />
        ) : (
          profileName.charAt(0)
        )}
      </div>

      <div>
        <h4>{profileName}</h4>
        <p>Candidate</p>

        <button
          onClick={() =>
            document
              .getElementById("profilePic")
              .click()
          }
        >
          Edit
        </button>
      </div>

    </div>

    <button
  className="logout-btn"
  onClick={handleLogout}
>
  Logout
</button>

  </div>

  {/* SEARCH RESULTS */}
  {searchTerm.trim() !== "" ? (

    <div className="search-results">

      <h3>🔍 Search Results</h3>

      {searchResults.length > 0 ? (

        searchResults.map((job, index) => (

          <div
            key={index}
            className="job-card"
          >
            <div>
              <h4>{job.role}</h4>
              <p>{job.company}</p>
              <p>{job.location}</p>
            </div>

            <div className="job-right">
              <span>{job.match}</span>
              <button>Apply</button>
            </div>
          </div>

        ))

      ) : (

        <div className="card">
          <p>No matching jobs found.</p>
        </div>

      )}

    </div>

  ) : (

    renderPage()

  )}

</div> {/* main-content */}

</div> 

);
}

export default CandidateDashboard;