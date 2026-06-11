import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Settings() {
  const [companyName, setCompanyName] =
    useState("ABC Technologies");

  const [email, setEmail] =
    useState("hr@abctech.com");

  const [phone, setPhone] =
    useState("9876543210");

  const [aiMatching, setAiMatching] =
    useState(true);

  const [aiRecommendations, setAiRecommendations] =
    useState(true);

  const handleSave = () => {
    alert("Settings Saved Successfully!");
  };

  const handleReset = () => {
    setCompanyName("");
    setEmail("");
    setPhone("");
    setAiMatching(false);
    setAiRecommendations(false);
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <h1>⚙️ Settings</h1>
          <p>Manage system settings.</p>

          <div style={container}>
            <h2>Company Information</h2>

            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) =>
                setCompanyName(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="email"
              placeholder="HR Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Contact Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              style={inputStyle}
            />

            <h2 style={{ marginTop: "30px" }}>
              AI Features
            </h2>

            <div style={{ marginTop: "15px" }}>
              <label>
                <input
                  type="checkbox"
                  checked={aiMatching}
                  onChange={() =>
                    setAiMatching(!aiMatching)
                  }
                />
                Enable AI Matching
              </label>
            </div>

            <div style={{ marginTop: "15px" }}>
              <label>
                <input
                  type="checkbox"
                  checked={aiRecommendations}
                  onChange={() =>
                    setAiRecommendations(
                      !aiRecommendations
                    )
                  }
                />
                Enable AI Recommendations
              </label>
            </div>

            <div style={{ marginTop: "30px" }}>
              <button
                onClick={handleSave}
                style={saveBtn}
              >
                Save Settings
              </button>

              <button
                onClick={handleReset}
                style={resetBtn}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const container = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const saveBtn = {
  padding: "10px 20px",
  backgroundColor: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "10px",
};

const resetBtn = {
  padding: "10px 20px",
  backgroundColor: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Settings;