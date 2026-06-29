import React, { useEffect, useState } from "react";
import { API_BASE } from "../config/api";
function ResumeUpload({ goBack }) {
  console.log("ResumeUpload component rendered");
  const [file, setFile] = useState(null);
const [preview, setPreview] = useState("");
const [resume, setResume] = useState(null);
const [loading, setLoading] = useState(false);
const [uploading, setUploading] = useState(false);
const [message, setMessage] = useState("");
const fetchResume = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.sub;

    const response = await fetch(
      `${API_BASE}/api/resume/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Resume:", data);

    if (!response.ok) {
      setResume(null);
      setLoading(false);
      return;
    }

    // Handles both object and array responses
    if (Array.isArray(data)) {
      setResume(data.length ? data[0] : null);
    } else {
      setResume(data);
    }

    setLoading(false);

  } catch (err) {
    console.error(err);
    setLoading(false);
  }
};
useEffect(() => {
  fetchResume();
}, []);
  const handleUpload = async (e) => {
  const selectedFile = e.target.files[0];
  if (!selectedFile) return;
  setFile(selectedFile);
  if (selectedFile.type === "application/pdf") {
    setPreview(URL.createObjectURL(selectedFile));
  }
  try {
    setUploading(true);
    setMessage("");
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", selectedFile);
    const response = await fetch(
      `${API_BASE}/api/resume/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.detail || "Upload failed");
      setUploading(false);
      return;
    }
    setMessage(data.message);
    // Wait for backend parser
    setTimeout(fetchResume, 3000);
  } catch (err) {
    console.error(err);
    setMessage("Upload failed");
  }
  setUploading(false);
};
  const remove = async () => {
  if (!resume) return;

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE}/api/resume/${resume.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      alert("Delete failed");
      return;
    }

    setResume(null);
    setFile(null);
    setPreview("");
    setMessage("Resume deleted successfully");

  } catch (err) {
    console.error(err);
  }
};
  return (
    <div className="card">
      <h2>Resume Upload</h2>

      <input
  type="file"
  accept=".pdf,.doc,.docx"
  onChange={handleUpload}
  disabled={uploading}
/>
      {loading && <p>Loading resume...</p>}
      {uploading && <p>Uploading resume...</p>}
{message && (
  <p style={{ color: "green" }}>
    {message}
  </p>
)}
      {resume && (
  <div
    style={{
      marginTop: 20,
      padding: 15,
      border: "1px solid #ddd",
      borderRadius: 10,
    }}
  >
    <h3>{resume.original_filename}</h3>
    <p>
      Status:
      <b> {resume.parse_status}</b>
    </p>
    <p>
      Resume Score:
      <b> {resume.resume_score}%</b>
    </p>
    <p>
  Skills:
  <b>
    {" "}
    {resume.parsed_data?.skills?.length
      ? resume.parsed_data.skills.join(", ")
      : "No skills found"}
  </b>
</p>
    <button onClick={remove}>
      Delete
    </button>
  </div>
)}
      {preview && (
        <iframe
  src={preview}
  title="Resume Preview"
  width="100%"
  height="500"
  style={{
    border: "1px solid #ddd",
    borderRadius: "10px",
    marginTop: "20px",
  }}
/>
      )}

      <button onClick={goBack}>Back</button>
    </div>
  );
}
export default ResumeUpload;