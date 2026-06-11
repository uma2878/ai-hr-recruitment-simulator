import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Analytics() {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <h1>📈 Analytics Dashboard</h1>
          <p>
            Recruitment performance and hiring insights.
          </p>

          {/* Summary Cards */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              marginBottom: "30px",
            }}
          >
            <div style={cardStyle}>
              <h3>Total Candidates</h3>
              <p>120</p>
            </div>

            <div style={cardStyle}>
              <h3>Selected</h3>
              <p>45</p>
            </div>

            <div style={cardStyle}>
              <h3>Rejected</h3>
              <p>55</p>
            </div>

            <div style={cardStyle}>
              <h3>Pending</h3>
              <p>20</p>
            </div>
          </div>

          {/* Statistics Table */}
          <h2>📊 Recruitment Statistics</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "white",
              marginBottom: "30px",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#1e293b",
                  color: "white",
                }}
              >
                <th style={tableHeader}>Metric</th>
                <th style={tableHeader}>Value</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={tableCell}>Total Resumes</td>
                <td style={tableCell}>120</td>
              </tr>

              <tr>
                <td style={tableCell}>Matched Candidates</td>
                <td style={tableCell}>45</td>
              </tr>

              <tr>
                <td style={tableCell}>Interviews Conducted</td>
                <td style={tableCell}>20</td>
              </tr>

              <tr>
                <td style={tableCell}>Final Selections</td>
                <td style={tableCell}>12</td>
              </tr>
            </tbody>
          </table>

          {/* Performance Section */}
          <h2>🚀 Performance Metrics</h2>

          <div style={{ marginTop: "20px" }}>
            <p><strong>Resume Match Rate</strong></p>
            <div style={progressBackground}>
              <div style={{ ...progressFill, width: "85%" }}>
                85%
              </div>
            </div>

            <p style={{ marginTop: "20px" }}>
              <strong>Interview Pass Rate</strong>
            </p>
            <div style={progressBackground}>
              <div style={{ ...progressFill, width: "70%" }}>
                70%
              </div>
            </div>

            <p style={{ marginTop: "20px" }}>
              <strong>Selection Rate</strong>
            </p>
            <div style={progressBackground}>
              <div style={{ ...progressFill, width: "60%" }}>
                60%
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const cardStyle = {
  width: "180px",
  padding: "15px",
  borderRadius: "10px",
  backgroundColor: "white",
  border: "1px solid #ddd",
  textAlign: "center",
};

const tableHeader = {
  padding: "12px",
  border: "1px solid #ddd",
};

const tableCell = {
  padding: "12px",
  border: "1px solid #ddd",
};

const progressBackground = {
  width: "100%",
  backgroundColor: "#e5e7eb",
  borderRadius: "10px",
  overflow: "hidden",
};

const progressFill = {
  backgroundColor: "#2563eb",
  color: "white",
  textAlign: "center",
  padding: "8px",
};

export default Analytics;