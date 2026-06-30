import { useState, useEffect } from "react";
import { API_BASE } from "../config/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function JobDescription() {
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");

  const [jobs, setJobs] = useState([]);

  // Fetch Jobs
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE}/api/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setJobs(Array.isArray(data) ? data : (data.items || []));
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Create Job
  const handleSave = async () => {
    if (
      !jobTitle ||
      !skills ||
      !experience ||
      !description
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE}/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: jobTitle,
          description: description,
          required_skills: skills
            .split(",")
            .map((skill) => skill.trim()),
          experience_years: Number(experience),
          weight_resume: 0.3,
          weight_match: 0.3,
          weight_interview: 0.4,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create job");
      }

      const newJob = await response.json();

      setJobs((prev) => [...prev, newJob]);

      setJobTitle("");
      setSkills("");
      setExperience("");
      setDescription("");

      alert("Job created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create job.");
    }
  };

  // Delete Job
  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE}/api/jobs/${jobId}`,
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

      setJobs((prev) =>
        prev.filter((job) => job.id !== jobId)
      );

      alert("Job deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete job.");
    }
  };

  const handleClear = () => {
    setJobTitle("");
    setSkills("");
    setExperience("");
    setDescription("");
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <h1>📝 Job Description</h1>
          <p>Create and manage job requirements.</p>

          {/* Summary Cards */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              marginBottom: "30px",
            }}
          >
            <div style={cardStyle}>
              <h3>Total Jobs</h3>
              <p>{jobs.length}</p>
            </div>

            <div style={cardStyle}>
              <h3>Active Jobs</h3>
              <p>{jobs.length}</p>
            </div>

            <div style={cardStyle}>
              <h3>Closed Jobs</h3>
              <p>0</p>
            </div>
          </div>

          {/* Form */}
          <div style={formContainer}>
            <h2>Add New Job</h2>

            <input
              type="text"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) =>
                setJobTitle(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Required Skills (comma separated)"
              value={skills}
              onChange={(e) =>
                setSkills(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="number"
              placeholder="Experience Required (Years)"
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
              style={inputStyle}
            />

            <textarea
              placeholder="Job Description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows="5"
              style={textareaStyle}
            />

            <div style={{ marginTop: "15px" }}>
              <button
                onClick={handleSave}
                style={saveBtn}
              >
                Save Job
              </button>

              <button
                onClick={handleClear}
                style={clearBtn}
              >
                Clear
              </button>
            </div>
          </div>

          {/* Jobs Table */}
          <div style={{ marginTop: "40px" }}>
            <h2>Saved Jobs</h2>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "white",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#1e293b",
                    color: "white",
                  }}
                >
                  <th style={tableHeader}>ID</th>
                  <th style={tableHeader}>Job Title</th>
                  <th style={tableHeader}>Skills</th>
                  <th style={tableHeader}>
                    Experience
                  </th>
                  <th style={tableHeader}>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td style={tableCell}>
                      {job.id}
                    </td>

                    <td style={tableCell}>
                      {job.title}
                    </td>

                    <td style={tableCell}>
                      {job.required_skills?.join(
                        ", "
                      )}
                    </td>

                    <td style={tableCell}>
                      {job.experience_years} Years
                    </td>

                    <td style={tableCell}>
                      <button
                        style={deleteBtn}
                        onClick={() =>
                          handleDelete(job.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {jobs.length === 0 && (
              <p
                style={{
                  marginTop: "20px",
                  color: "#666",
                }}
              >
                No jobs found.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "15px",
  width: "180px",
  backgroundColor: "white",
  textAlign: "center",
};

const formContainer = {
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

const textareaStyle = {
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

const clearBtn = {
  padding: "10px 20px",
  backgroundColor: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "6px",
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

const tableHeader = {
  padding: "12px",
  border: "1px solid #ddd",
};

const tableCell = {
  padding: "12px",
  border: "1px solid #ddd",
};

export default JobDescription;