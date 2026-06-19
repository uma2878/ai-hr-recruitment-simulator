import React, { useState, useEffect } from "react";
import "./CandidateProfile.css";

function CandidateProfile({ setProfileName }) {
  const initialState = {
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    location: "",
    college: "",
    degree: "",
    branch: "",
    cgpa: "",
    graduationYear: "",
    skills: "",
    experience: "",
    projects: "",
    resume: ""
  };

  const [profile, setProfile] = useState(initialState);
  const [resumeName, setResumeName] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedProfile = localStorage.getItem("profileData");

    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);

      setProfile({
        ...initialState,
        ...parsedProfile
      });

      setResumeName(parsedProfile.resume || "");

      if (setProfileName) {
        setProfileName(parsedProfile.fullName || "Candidate");
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === "fullName" && setProfileName) {
      setProfileName(value);
    }

    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setResumeName(file.name);

    setProfile((prev) => ({
      ...prev,
      resume: file.name
    }));
  };

  const completion = Math.round(
    (Object.values(profile).filter(
      (v) => v && v.toString().trim() !== ""
    ).length /
      Object.keys(profile).length) *
      100
  );

  const handleSave = () => {
    localStorage.setItem(
      "profileData",
      JSON.stringify(profile)
    );

    localStorage.setItem(
      "username",
      profile.fullName
    );

    if (setProfileName) {
      setProfileName(profile.fullName);
    }

    alert("✅ Profile Saved Successfully");
  };

  return (
    <div className="profile-container">

      <h2 className="profile-title">
        👤 My Profile
      </h2>

      <div className="completion-box">
        <p>Profile Completion: {completion}%</p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
  width: `${completion}%`
}}
          />
        </div>
      </div>

      {profile.fullName && (
        <div className="profile-summary">
          <h3>{profile.fullName}</h3>
          <p>📧 {profile.email}</p>
          <p>📱 {profile.phone}</p>
          <p>📍 {profile.location}</p>
        </div>
      )}

      <div className="profile-card">

        <h3>Personal Information</h3>

        <input
          name="fullName"
          placeholder="Full Name"
          value={profile.fullName}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={profile.phone}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dob"
          value={profile.dob}
          onChange={handleChange}
        />

        <select
          name="gender"
          value={profile.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          name="location"
          placeholder="Location"
          value={profile.location}
          onChange={handleChange}
        />

        <h3>Education</h3>

        <input
          name="college"
          placeholder="College"
          value={profile.college}
          onChange={handleChange}
        />

        <input
          name="degree"
          placeholder="Degree"
          value={profile.degree}
          onChange={handleChange}
        />

        <input
          name="branch"
          placeholder="Branch"
          value={profile.branch}
          onChange={handleChange}
        />

        <input
          name="cgpa"
          placeholder="CGPA"
          value={profile.cgpa}
          onChange={handleChange}
        />

        <input
          name="graduationYear"
          placeholder="Graduation Year"
          value={profile.graduationYear}
          onChange={handleChange}
        />

        <h3>Skills</h3>

        <textarea
          name="skills"
          placeholder="Enter your skills"
          value={profile.skills}
          onChange={handleChange}
        />

        <h3>Experience</h3>

        <textarea
          name="experience"
          placeholder="Enter experience"
          value={profile.experience}
          onChange={handleChange}
        />

        <h3>Projects</h3>

        <textarea
          name="projects"
          placeholder="Enter projects"
          value={profile.projects}
          onChange={handleChange}
        />

        

        <button
          className="save-btn"
          onClick={handleSave}
        >
          {localStorage.getItem("profileData")
            ? "Update Profile"
            : "Save Profile"}
        </button>

      </div>
    </div>
  );
}

export default CandidateProfile;