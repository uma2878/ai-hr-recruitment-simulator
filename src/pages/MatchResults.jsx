import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MatchResults() {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <h1>🎯 Match Results</h1>
          <p>Candidate matching results will appear here.</p>
        </div>
      </div>
    </>
  );
}

export default MatchResults;