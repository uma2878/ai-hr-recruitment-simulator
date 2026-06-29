import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { API_BASE } from "../config/api";

function Settings() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aiMatching, setAiMatching] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const getTokenAndId = () => {
    const token = localStorage.getItem("token");
    if (!token) return {};
    const payload = JSON.parse(atob(token.split(".")[1]));
    return { token, userId: payload.sub };
  };

  useEffect(() => {
    const fetchSettings = async () => {
      const { token, userId } = getTokenAndId();
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/api/settings/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          const p = data.preferences || {};
          setCompanyName(p.company_name || "XTRAGRAD Technologies Private Limited");
          setEmail(p.hr_email || "hr@xtragrad.com");
          setPhone(p.phone || "9876543210");
          setAiMatching(p.ai_matching !== undefined ? p.ai_matching : true);
          setAiRecommendations(p.ai_recommendations !== undefined ? p.ai_recommendations : true);
        }
      } catch (e) {}
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    const { token, userId } = getTokenAndId();
    if (!token) { alert("Not logged in"); return; }
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/api/settings/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          preferences: { company_name: companyName, hr_email: email, phone, ai_matching: aiMatching, ai_recommendations: aiRecommendations },
        }),
      });
      setMessage(res.ok ? "✅ Settings Saved Successfully!" : "❌ Save failed");
    } catch (e) {
      setMessage("❌ Server error");
    }
    setSaving(false);
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

            {message && <p style={{ marginTop: "10px", color: message.startsWith("✅") ? "green" : "red" }}>{message}</p>}

            <div style={{ marginTop: "30px" }}>
              <button onClick={handleSave} style={saveBtn} disabled={saving}>
                {saving ? "Saving..." : "Save Settings"}
              </button>

              <button onClick={handleReset} style={resetBtn}>
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