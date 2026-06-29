import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_BASE } from "../config/api";

function Navbar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );
    if (!confirmLogout) return;

    const token = localStorage.getItem("token");
    if (token) {
      try {
        await fetch(`${API_BASE}/api/auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (_) {}
    }
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div
      style={{
        height: "70px",
        backgroundColor: "#1e293b",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      {/* Project Name */}

      <h2>XTRAGRAD AI Recruitment Simulator</h2>

      {/* Search Bar */}

      <input
        type="text"
        placeholder="🔍 Search Candidate..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(
              `/candidate-list?search=${search}`
            );
          }
        }}
        style={{
          padding: "8px",
          width: "250px",
          borderRadius: "6px",
          border: "none",
        }}
      />

      {/* Right Side */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Notifications */}

        <button
          onClick={() =>
            alert(
              "🔔 Notifications\n\n• 5 New Resumes Uploaded\n• 3 Interviews Completed\n• 2 Candidates Selected"
            )
          }
          style={iconButton}
        >
          🔔
        </button>

        {/* Admin Profile */}

        <button
          onClick={() => navigate("/admin-profile")}
          style={iconButton}
        >
          👤 Admin
        </button>

        {/* Logout */}

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const iconButton = {
  background: "transparent",
  border: "none",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
};

export default Navbar;