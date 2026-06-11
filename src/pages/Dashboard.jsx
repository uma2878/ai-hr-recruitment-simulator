import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            padding: "30px",
            flex: 1,
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              marginBottom: "10px",
            }}
          >
            Dashboard
          </h1>

          <p
            style={{
              color: "black",
              marginBottom: "30px",
            }}
          >
            Welcome to the AI HR Recruitment Simulator
          </p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "30px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px",
                width: "200px",
              }}
            >
              <h3>Total Resumes</h3>
              <p>120</p>
            </div>

            <div
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px",
                width: "200px",
              }}
            >
              <h3>Matched Candidates</h3>
              <p>45</p>
            </div>

            <div
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px",
                width: "200px",
              }}
            >
              <h3>Interviews</h3>
              <p>20</p>
            </div>

            <div
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px",
                width: "200px",
              }}
            >
              <h3>AI Recommendations</h3>
              <p>15</p>
            </div>
          <h2 style={{ marginTop: "40px" }}>📌 Recent Activity</h2>

<div
  style={{
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    marginTop: "15px",
  }}
>
  <p>✅ Rohith Sharma shortlisted for React Developer</p>
  <p>✅ Vaishnavi selected for AI Engineer</p>
  <p>📄 5 new resumes uploaded today</p>
  <p>🎤 3 interviews completed</p>
</div>  
<h4 style={{ marginTop: "40px" }}>📊 Hiring Progress</h4>

<div
  style={{
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    marginTop: "15px",
  }}
>
  <p>Total Applications: 120</p>

  <div style={{
    width: "100%",
    backgroundColor: "#e5e7eb",
    borderRadius: "10px",
    overflow: "hidden",
    marginTop: "10px",
  }}>
    <div
      style={{
        width: "75%",
        backgroundColor: "#2563eb",
        color: "white",
        padding: "8px",
        textAlign: "center",
      }}
    >
      75% Hiring Progress
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;