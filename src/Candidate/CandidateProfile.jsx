import React, { useState, useEffect } from "react";
import { API_BASE } from "../config/api";
import "./CandidateProfile.css";

function CandidateProfile({ setProfileName }) {
  const [profile, setProfile] = useState({
    full_name: "", title: "", phone: "", location: "", bio: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [exists, setExists] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) { setLoading(false); return; }
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.sub;
      try {
        const res = await fetch(`${API_BASE}/api/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) { localStorage.removeItem("token"); window.location.href = "/"; return; }
        if (res.ok) {
          const data = await res.json();
          setProfile({
            full_name: data.full_name || "",
            title: data.title || "",
            phone: data.phone || "",
            location: data.location || "",
            bio: data.bio || "",
          });
          setExists(true);
          if (setProfileName && data.full_name) setProfileName(data.full_name);
        }
      } catch (e) {}
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    if (name === "full_name" && setProfileName) setProfileName(value);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.sub;
    setSaving(true);
    setMessage("");
    try {
      let res;
      if (exists) {
        res = await fetch(`${API_BASE}/api/profile/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(profile),
        });
      } else {
        res = await fetch(`${API_BASE}/api/profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ ...profile, user_id: userId }),
        });
        if (res.ok) setExists(true);
      }
      if (res.ok) {
        setMessage("✅ Profile saved successfully");
      } else {
        const err = await res.json();
        setMessage("❌ " + (err.detail || "Save failed"));
      }
    } catch (e) {
      setMessage("❌ Server error");
    }
    setSaving(false);
  };

  const completion = Math.round(
    Object.values(profile).filter(v => v && v.trim() !== "").length /
    Object.keys(profile).length * 100
  );

  if (loading) return <div className="profile-container"><p>Loading profile...</p></div>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">👤 My Profile</h2>

      <div className="completion-box">
        <p>Profile Completion: {completion}%</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${completion}%` }} />
        </div>
      </div>

      {profile.full_name && (
        <div className="profile-summary">
          <h3>{profile.full_name}</h3>
          <p>📱 {profile.phone}</p>
          <p>📍 {profile.location}</p>
        </div>
      )}

      <div className="profile-card">
        <h3>Personal Information</h3>
        <input name="full_name" placeholder="Full Name" value={profile.full_name} onChange={handleChange} />
        <input name="title" placeholder="Title / Role (e.g. Software Engineer)" value={profile.title} onChange={handleChange} />
        <input name="phone" placeholder="Phone Number" value={profile.phone} onChange={handleChange} />
        <input name="location" placeholder="Location" value={profile.location} onChange={handleChange} />

        <h3>Bio</h3>
        <textarea name="bio" placeholder="Brief bio about yourself" value={profile.bio} onChange={handleChange} rows={4} />

        {message && <p style={{ color: message.startsWith("✅") ? "green" : "red" }}>{message}</p>}

        <button className="save-btn" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : exists ? "Update Profile" : "Save Profile"}
        </button>
      </div>
    </div>
  );
}

export default CandidateProfile;
