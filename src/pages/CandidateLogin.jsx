import { useNavigate } from "react-router-dom";

function CandidateLogin() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #dbeafe, #c7d2fe)",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "15px",
          width: "350px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          👨‍🎓 Candidate Login
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
          }}
        />

        <button
          onClick={() => navigate("/candidate-dashboard")}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default CandidateLogin;