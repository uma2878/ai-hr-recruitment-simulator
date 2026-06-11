import CandidateList from "./pages/CandidateList";
import ViewResumes from "./pages/ViewResumes";
import JobDescription from "./pages/JobDescription";
import MatchResults from "./pages/MatchResults";
import AIRecommendations from "./pages/AIRecommendations";
import InterviewResults from "./pages/InterviewResults";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import { Routes, Route } from "react-router-dom";

import RoleSelection from "./pages/RoleSelection";
import AdminLogin from "./pages/AdminLogin";
import CandidateLogin from "./pages/CandidateLogin";
import Dashboard from "./pages/Dashboard";
import CandidateDashboard from "./pages/CandidateDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelection />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/candidate-login" element={<CandidateLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
      <Route path="/candidate-list" element={<CandidateList />} />
      <Route path="/view-resumes" element={<ViewResumes />} />
      <Route path="/job-description" element={<JobDescription />} />
      <Route path="/match-results" element={<MatchResults />} />
      <Route path="/ai-recommendations" element={<AIRecommendations />} />
      <Route path="/interview-results" element={<InterviewResults />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;