import { useState, useEffect } from "react";
import { API_BASE } from "../config/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ViewResumes() {
  const [searchTerm, setSearchTerm] = useState("");

  const [resumes, setResumes] = useState([]);

  useEffect(() => {
  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE}/api/resumes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Resumes:", data);

      setResumes(data.items || data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchResumes();
}, []);
const handleDelete = async (resumeId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this resume?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE}/api/resumes/${resumeId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    setResumes((prev) =>
      prev.filter((resume) => resume.id !== resumeId)
    );

    alert("Resume deleted successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to delete resume.");
  }
};

  const filteredResumes = resumes.filter((resume) =>
  (resume.parsed_data?.name ?? "")
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
);
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <h1>📄 View Resumes</h1>
          <p>Manage uploaded candidate resumes.</p>

          {/* Summary Cards */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <div style={summaryCard}>
              <h3>Total Resumes</h3>
              <p>{resumes.length}</p>
            </div>

            <div style={summaryCard}>
              <h3>Completed</h3>
<p>
{
resumes.filter(
(resume)=>resume.parse_status==="done"
).length
}
</p>
            </div>

            <div style={summaryCard}>
              <h3>Pending</h3>
<p>
{
resumes.filter(
(resume)=>resume.parse_status==="pending"
).length
}
</p>
            </div>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search Resume..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "300px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "25px",
            }}
          />

          {/* Resume Cards */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {filteredResumes.map((resume) => (
              <div key={resume.id} style={resumeCard}>
                <h2>
  👤 {resume.parsed_data?.name ||
      resume.parsed_data?.candidate_name ||
      "Unknown Candidate"}
</h2>

                <p style={{ marginBottom: "10px" }}>
                  <strong>Resume Score:</strong> {resume.resume_score}
                </p>
                <p>
  <strong>Email:</strong>{" "}
  {resume.parsed_data?.email || "N/A"}
</p>

<p>
  <strong>Resume Score:</strong>{" "}
  {resume.resume_score}
</p>

<p>
  <strong>Skills:</strong>{" "}
  {resume.parsed_data?.skills?.join(", ") || "N/A"}
</p>

                <p style={{ marginBottom: "10px" }}>
                  <strong>Uploaded:</strong> {new Date(resume.uploaded_at).toLocaleDateString()}
                </p>

                <p style={{ marginBottom: "15px" }}>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      backgroundColor:
resume.parse_status === "done"
? "green"
: "orange",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "12px",
                    }}
                  >
                    {resume.parse_status}
                  </span>
                </p>
                <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  }}
>
  <button
    style={viewBtn}
    onClick={() =>
      alert(
        JSON.stringify(
          resume.parsed_data,
          null,
          2
        )
      )
    }
  >
    View
  </button>

  <button
    style={downloadBtn}
    onClick={() =>
      window.open(
        `${API_BASE}/api/resumes/download/${resume.id}`,
        "_blank"
      )
    }
  >
    Download
  </button>

  <button
    style={deleteBtn}
    onClick={() => handleDelete(resume.id)}
  >
    Delete
  </button>
</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
  }

const summaryCard = {
  width: "180px",
  padding: "15px",
  borderRadius: "10px",
  backgroundColor: "white",
  border: "1px solid #ddd",
  textAlign: "center",
};

const resumeCard = {
  width: "320px",
  backgroundColor: "white",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "25px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  lineHeight: "1.8",
};

const viewBtn = {
  padding: "8px 15px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#2563eb",
  color: "white",
  cursor: "pointer",
};

const downloadBtn = {
  padding: "8px 15px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#16a34a",
  color: "white",
  cursor: "pointer",
};

const deleteBtn = {
  padding: "8px 15px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#dc2626",
  color: "white",
  cursor: "pointer",
};

export default ViewResumes;