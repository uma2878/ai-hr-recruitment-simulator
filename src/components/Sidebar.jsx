import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "220px",
        minHeight: "calc(100vh - 70px)",
        backgroundColor: "#0f172a",
        color: "white",
        paddingTop: "20px",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          padding: "0",
          margin: "0",
        }}
      >
        <li style={itemStyle} onClick={() => navigate("/dashboard")}>
          📊 Dashboard
        </li>

        <li style={itemStyle} onClick={() => navigate("/candidate-list")}>
          📋 Candidate List
        </li>

        <li style={itemStyle} onClick={() => navigate("/view-resumes")}>
          📄 View Resumes
        </li>

        <li style={itemStyle} onClick={() => navigate("/job-description")}>
          📝 Job Description
        </li>

        <li style={itemStyle} onClick={() => navigate("/match-results")}>
          🎯 Match Results
        </li>

        <li style={itemStyle} onClick={() => navigate("/ai-recommendations")}>
          ⭐ AI Recommendations
        </li>

        <li style={itemStyle} onClick={() => navigate("/interview-results")}>
          🎤 Interview Results
        </li>

        <li style={itemStyle} onClick={() => navigate("/analytics")}>
          📈 Analytics
        </li>

        <li style={itemStyle} onClick={() => navigate("/settings")}>
          ⚙️ Settings
        </li>
      </ul>
    </div>
  );
}

const itemStyle = {
  padding: "15px 20px",
  cursor: "pointer",
  borderBottom: "1px solid #1e293b",
};

export default Sidebar;