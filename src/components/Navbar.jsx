import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

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

      <h2>AI HR Recruitment Simulator</h2>

      {/* Search Bar */}

      <input
        type="text"
        placeholder="🔍 Search candidate..."
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
        {/* Notification */}

        <button
          onClick={() =>
            alert(
              "🔔 Notifications\n\n• 5 New Resumes Uploaded\n• 3 Interviews Completed\n• 2 Candidates Selected"
            )
          }
          style={iconBtn}
        >
          🔔
        </button>

        {/* Admin */}

        <button
          onClick={() =>
            alert(
              "👤 Admin Profile\n\nName: Admin\nRole: HR Manager"
            )
          }
          style={iconBtn}
        >
          👤 Admin
        </button>

        {/* Logout */}

        <button
          onClick={() => navigate("/admin-login")}
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

const iconBtn = {
  background: "transparent",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
};

export default Navbar;