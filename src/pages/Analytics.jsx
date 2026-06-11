import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Analytics() {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <h1>📈 Analytics</h1>
          <p>Analytics data will appear here.</p>
        </div>
      </div>
    </>
  );
}

export default Analytics;