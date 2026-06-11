import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Settings() {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <h1>⚙️ Settings</h1>
          <p>Application settings will appear here.</p>
        </div>
      </div>
    </>
  );
}

export default Settings;