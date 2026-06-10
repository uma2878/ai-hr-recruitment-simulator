function Sidebar() {
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
        <li style={itemStyle}>📊 Dashboard</li>
        <li style={itemStyle}>📋 Candidate List</li>
        <li style={itemStyle}>📄 View Resumes</li>
        <li style={itemStyle}>📝 Job Description</li>
        <li style={itemStyle}>🎯 Match Results</li>
        <li style={itemStyle}>⭐ AI Recommendations</li>
        <li style={itemStyle}>🎤 Interview Results</li>
        <li style={itemStyle}>📈 Analytics</li>
        <li style={itemStyle}>⚙️ Settings</li>
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