function CandidateDashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ color: "#0f172a" }}>
        👨‍🎓 Candidate Dashboard
      </h1>

      <p
        style={{
          color: "#475569",
          fontSize: "18px",
          marginBottom: "30px",
        }}
      >
        Welcome to the AI HR Recruitment Simulator
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
            backgroundColor: "#fff",
          }}
        >
          <h3>📄 Resume Status</h3>
          <p>Uploaded</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
            backgroundColor: "#fff",
          }}
        >
          <h3>🎯 Match Score</h3>
          <p>85%</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
            backgroundColor: "#fff",
          }}
        >
          <h3>🎤 Interview Score</h3>
          <p>78%</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
            backgroundColor: "#fff",
          }}
        >
          <h3>⭐ Recommendation</h3>
          <p>Shortlisted</p>
        </div>
      </div>
    </div>
  );
}

export default CandidateDashboard;