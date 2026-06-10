function Navbar() {
  return (
    <div
      style={{
        height: "70px",
        backgroundColor: "#1e293b",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      {/* Logo & Title */}
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        🤖 AI HR Recruitment Simulator
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search candidates..."
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          border: "none",
          width: "250px",
        }}
      />

      {/* Right Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontSize: "20px",
        }}
      >
        <span style={{ cursor: "pointer" }}>🔔</span>
        <span style={{ cursor: "pointer" }}>👤 Admin</span>
        <span style={{ cursor: "pointer", color: "#f87171" }}>
          🚪 Logout
        </span>
      </div>
    </div>
  );
}

export default Navbar;