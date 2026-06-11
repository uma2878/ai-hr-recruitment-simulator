import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AIRecommendations() {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <h1>⭐ AI Recommendations</h1>
          <p>AI suggestions will appear here.</p>
        </div>
      </div>
    </>
  );
}

export default AIRecommendations;