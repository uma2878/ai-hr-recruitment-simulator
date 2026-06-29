import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config/api";
import React, { useState, useEffect } from "react";
import "./CandidateDashboard.css";
import CandidateProfile from "./CandidateProfile";
import AISkillAnalysis from "./AISkillAnalysis";
import ResumeUpload from "./ResumeUpload";
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

const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState([]);

const [darkMode, setDarkMode] = useState(
  JSON.parse(localStorage.getItem("settings"))?.darkMode || false
);

const [dashboardStats, setDashboardStats] = useState({
  applications: 0,
  underReview: 0,
  shortlisted: 0,
  interviews: 0,
});
const [skillScore, setSkillScore] = useState(0);
const [recommendedJobs, setRecommendedJobs] = useState([]);
  const fetchDashboardStats = async () => {
  try {
    const token = localStorage.getItem("token");

if (!token) return;

// Decode the JWT payload
const payload = JSON.parse(atob(token.split(".")[1]));
const userId = payload.sub;

console.log("Token:", token);
console.log("User ID:", userId);

    const [applicationsRes, interviewsRes] = await Promise.all([
      fetch(`${API_BASE}/api/applications/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      fetch(`${API_BASE}/api/interviews/status/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    const applications = applicationsRes.ok
      ? await applicationsRes.json()
      : [];

    const interviews = interviewsRes.ok
      ? await interviewsRes.json()
      : [];
      console.log("Applications:", applications);
console.log("Interviews:", interviews);

    setDashboardStats({
      applications: applications.length,
      underReview: applications.filter(
  (app) => app.status?.toLowerCase() === "under review"
).length,

shortlisted: applications.filter(
  (app) => app.status?.toLowerCase() === "shortlisted"
).length,
      interviews: interviews.length,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
  }
};
const fetchSkillScore = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.sub;

    const response = await fetch(
      `${API_BASE}/api/ai/skill-analysis/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) return;

    const data = await response.json();

    const total =
      data.strengths.length + data.gaps.length;

    const score =
      total === 0
        ? 0
        : Math.round(
            (data.strengths.length / total) * 100
          );

    setSkillScore(score);

  } catch (error) {
    console.error("Skill Score Error:", error);
  }
};
const fetchRecommendedJobs = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.sub;

    const response = await fetch(
      `${API_BASE}/api/jobs/recommendations/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) return;

    const data = await response.json();

    setRecommendedJobs(data);

  } catch (error) {
    console.error("Recommendation Error:", error);
  }
}; 
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
  fetchDashboardStats();
  fetchSkillScore();
  fetchRecommendedJobs();
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
  const renderPage = () => {
    switch (page) {
      case "profile":
        return <CandidateProfile setProfileName={setProfileName} />;

      case "ai":
        return <AISkillAnalysis />;
        case "resume":
  return <ResumeUpload goBack={() => setPage("dashboard")} />;

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
                <h2>{dashboardStats.applications}</h2>
                <p>Applications</p>
              </div>

              <div className="card stat-card">
                <h2>{dashboardStats.underReview}</h2>
                <p>Under Review</p>
              </div>

              <div className="card stat-card">
                <h2>{dashboardStats.shortlisted}</h2>
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
                  <span>{skillScore}%</span>
                </div>

                <p>
                  Your current AI skill score is {skillScore}%.
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

              {recommendedJobs.length > 0 ? (
  recommendedJobs.map((job) => (
    <div className="job-card" key={job.job_id}>
      <div>
        <h4>{job.title}</h4>

        <p>
          Match Score: <strong>{job.score}%</strong>
        </p>

        <p>
          Missing Skills:{" "}
          {job.missing_skills.length > 0
            ? job.missing_skills.join(", ")
            : "None"}
        </p>

        <p>
          {job.reasons.length > 0
            ? job.reasons[0]
            : ""}
        </p>
      </div>

      <div className="job-right">
        <span>{job.score}%</span>

        <button>Apply</button>
      </div>
    </div>
  ))
) : (
  <div className="card">
    <p>No job recommendations available.</p>
  </div>
)}
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