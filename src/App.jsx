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
    </Routes>
  );
}

export default App;