import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function InterviewResults() {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <h1>🎤 Interview Results</h1>
          <p>Interview results will appear here.</p>
        </div>
      </div>
    </>
  );
}

export default InterviewResults;