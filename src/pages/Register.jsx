import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config/api";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role: "candidate" }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.detail || "Registration failed");
        return;
      }
      alert("Account created! Please login.");
      navigate("/candidate-login");
    } catch (e) {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #dbeafe, #c7d2fe)" }}>
      <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "15px", width: "350px", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}>

        <button
          onClick={() => navigate("/candidate-login")}
          style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontSize: "14px", marginBottom: "10px", padding: 0 }}
        >
          ← Back to Login
        </button>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>👨‍🎓 Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "20px", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          style={{ width: "100%", padding: "12px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", marginBottom: "12px" }}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p style={{ textAlign: "center", fontSize: "13px", color: "#64748b" }}>
          Already have an account?{" "}
          <span onClick={() => navigate("/candidate-login")} style={{ color: "#2563eb", cursor: "pointer" }}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
