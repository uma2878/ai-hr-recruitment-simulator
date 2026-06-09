import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <div className="content">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default App;