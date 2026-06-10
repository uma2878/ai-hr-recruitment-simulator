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
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;