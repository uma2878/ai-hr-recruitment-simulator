import { API_BASE } from "./config/api";

console.log("Backend URL:", API_BASE);
import { Routes, Route } from "react-router-dom";

// Login Pages
import RoleSelection from "./pages/RoleSelection";
import AdminLogin from "./pages/AdminLogin";
import CandidateLogin from "./pages/CandidateLogin";

// Admin Pages
import Dashboard from "./pages/Dashboard";
import CandidateList from "./pages/CandidateList";
import ViewResumes from "./pages/ViewResumes";
import JobDescription from "./pages/JobDescription";
import MatchResults from "./pages/MatchResults";
import AIRecommendations from "./pages/AIRecommendations";
import InterviewResults from "./pages/InterviewResults";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import AdminProfile from "./pages/AdminProfile";

// Candidate Pages
import CandidateDashboard from "./Candidate/CandidateDashboard";
import CandidateProfile from "./Candidate/CandidateProfile";
import ResumeUpload from "./Candidate/ResumeUpload";
import AISkillAnalysis from "./Candidate/AISkillAnalysis";
import AIMockInterview from "./Candidate/AIMockInterview";
import SkillAssessment from "./Candidate/SkillAssessment";
import JobRecommendations from "./Candidate/JobRecommendations";
import InterviewStatus from "./Candidate/InterviewStatus";
import Applications from "./Candidate/Applications";
import CandidateSettings from "./Candidate/CandidateSettings";

function App() {
  return (
    <Routes>
      {/* Role Selection */}
      <Route path="/" element={<RoleSelection />} />

      {/* Login Routes */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/candidate-login" element={<CandidateLogin />} />

      {/* Admin Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/candidate-list" element={<CandidateList />} />
      <Route path="/view-resumes" element={<ViewResumes />} />
      <Route path="/job-description" element={<JobDescription />} />
      <Route path="/match-results" element={<MatchResults />} />
      <Route path="/ai-recommendations" element={<AIRecommendations />} />
      <Route path="/interview-results" element={<InterviewResults />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/admin-profile" element={<AdminProfile />} />

      {/* Candidate Dashboard */}
      <Route path="/candidate-dashboard" element={<CandidateDashboard />}/>
      <Route path="/candidate-profile" element={<CandidateProfile />} />
      <Route path="/resume-upload" element={<ResumeUpload />} />
      <Route path="/skill-analysis" element={<AISkillAnalysis />} />
      <Route path="/mock-interview" element={<AIMockInterview />} />
      <Route path="/skill-assessment" element={<SkillAssessment />} />
      <Route path="/job-recommendations" element={<JobRecommendations />}/>
      <Route path="/interview-status" element={<InterviewStatus />}/>
      <Route path="/applications" element={<Applications />} />
      <Route path="/candidate-settings" element={<CandidateSettings />} />
    </Routes>
  );
}

export default App;