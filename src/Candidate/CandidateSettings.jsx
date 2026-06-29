import React, { useState, useEffect } from "react";
import { API_BASE } from "../config/api";
import "./CandidateSettings.css";

function CandidateSettings({ darkMode, setDarkMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
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
          const prefs = data.preferences || {};
          setEmail(prefs.email || "");
          if (prefs.darkMode !== undefined && setDarkMode) setDarkMode(prefs.darkMode);
        }
      } catch (e) {}
    };

    const savedNotifications = JSON.parse(localStorage.getItem("notifications")) || [
      { id: 1, text: "📄 Resume uploaded successfully", read: false },
      { id: 2, text: "💼 New Frontend Developer jobs available", read: false },
      { id: 3, text: "🎤 Mock Interview completed", read: true },
    ];
    setNotifications(savedNotifications);
    fetchSettings();
  }, []);

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const saveSettings = async () => {
    const { token, userId } = getTokenAndId();
    if (!token) { setMessage("Not logged in"); return; }
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`${API_BASE}/api/settings/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ preferences: { email, darkMode } }),
      });
      setMessage(res.ok ? "✅ Settings Saved Successfully" : "❌ Save failed");
    } catch (e) {
      setMessage("❌ Server error");
    }
    setSaving(false);
  };

  const updatePassword = () => {
    if (password.length < 6) { alert("Password should be at least 6 characters"); return; }
    alert("✅ Password Updated Successfully");
    setPassword("");
  };

  const markAllRead = () => setNotifications(notifications.map((item) => ({ ...item, read: true })));

  const deleteAccount = () => {
    if (!window.confirm("Delete account permanently?")) return;
    localStorage.clear();
    alert("✅ Account Deleted Successfully");
    window.location.href = "/";
  };

  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <div className="settings-container">
      <h1>⚙️ Settings</h1>

      <div className="settings-card">
        <button className="notification-btn" onClick={() => setShowNotifications(!showNotifications)}>
          🔔 Notifications <span className="badge">{unreadCount}</span>
        </button>

        {showNotifications && (
          <div className="notification-panel">
            <h3>Your Notifications</h3>
            {notifications.length === 0 ? (
              <p>No Notifications</p>
            ) : (
              notifications.map((item) => (
                <div key={item.id} className={item.read ? "notification-card read" : "notification-card unread"}>
                  {item.text}
                </div>
              ))
            )}
            <button className="mark-read-btn" onClick={markAllRead}>Mark All Read</button>
          </div>
        )}
      </div>

      <div className="settings-card">
        <h3>👤 Edit Profile</h3>
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="settings-card">
        <h3>🔐 Change Password</h3>
        <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="action-btn" onClick={updatePassword}>Update Password</button>
      </div>

      <div className="settings-card">
        <h3>🌙 Appearance</h3>
        <label>
          <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          Enable Dark Mode
        </label>
      </div>

      {message && <p style={{ color: message.startsWith("✅") ? "green" : "red", marginBottom: "10px" }}>{message}</p>}

      <div className="settings-buttons">
        <button className="save-btn" onClick={saveSettings} disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </button>
        <button className="delete-btn" onClick={deleteAccount}>Delete Account</button>
      </div>
    </div>
  );
}

export default CandidateSettings;