import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config/api";

function CandidateLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Login Response:", data);

      if (!response.ok) {
        alert(data.detail || "Login Failed");
        return;
      }

      // Save backend response data
      localStorage.setItem(
        "token",
        data.access_token
      );

      localStorage.setItem(
        "role",
        data.user.role
      );

      localStorage.setItem(
        "userName",
        data.user.name
      );

      localStorage.setItem(
        "userEmail",
        data.user.email
      );

      alert("Login Successful!");

      if (data.user.role === "candidate") {
        navigate("/candidate-dashboard");
      } else {
        alert("This account is not a candidate account.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Server Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #dbeafe, #c7d2fe)",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "15px",
          width: "350px",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            color: "#2563eb",
            cursor: "pointer",
            fontSize: "14px",
            marginBottom: "10px",
            padding: 0,
          }}
        >
          ← Back
        </button>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          👨‍🎓 Candidate Login
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
          }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
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
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
      </div>
    </div>
  );
}

export default CandidateLogin;