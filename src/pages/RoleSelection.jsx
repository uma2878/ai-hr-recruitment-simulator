import "./RoleSelection.css";
function RoleSelection() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #dbeafe, #c7d2fe)",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          color: "#0f172a",
          marginBottom: "10px",
        }}
      >
        🤖 AI HR Recruitment Simulator
      </h1>

      <h2
        style={{
          color: "#475569",
          marginBottom: "40px",
        }}
      >
        Select Your Role
      </h2>
       <p
        style={{
        color: "#64748b",
        marginTop: "-10px",
        marginBottom: "30px",
        fontSize: "18px",
        }}
        >
  Choose how you want to access the platform
      </p>
      <div
        style={{
          display: "flex",
          gap: "30px",
        }}
      >
        <button
  className="role-btn"
  style={{ backgroundColor: "#1e293b" }}
>
  <div style={{ fontSize: "40px" }}>👨‍💼</div>
  <div>Admin</div>
</button>

<button
  className="role-btn"
  style={{ backgroundColor: "#2563eb" }}
>
  <div style={{ fontSize: "40px" }}>👨‍🎓</div>
  <div>Candidate</div>
</button>
      </div>
    </div>
  );
}

export default RoleSelection;