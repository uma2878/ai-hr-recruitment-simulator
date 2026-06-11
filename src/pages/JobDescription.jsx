import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function JobDescription() {
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");

  const [jobs, setJobs] = useState([]);

  const handleSave = () => {
    if (
      !jobTitle ||
      !skills ||
      !experience ||
      !description
    ) {
      alert("Please fill all fields");
      return;
    }

    const newJob = {
      id: jobs.length + 1,
      title: jobTitle,
      skills,
      experience,
      description,
    };

    setJobs([...jobs, newJob]);

    setJobTitle("");
    setSkills("");
    setExperience("");
    setDescription("");

    alert("Job Saved Successfully!");
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
              onChange={(e) => setJobTitle(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Required Skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Experience Required"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              style={inputStyle}
            />

            <textarea
              placeholder="Job Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                  <th style={tableHeader}>Experience</th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td style={tableCell}>{job.id}</td>
                    <td style={tableCell}>{job.title}</td>
                    <td style={tableCell}>{job.skills}</td>
                    <td style={tableCell}>
                      {job.experience}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

const tableHeader = {
  padding: "12px",
  border: "1px solid #ddd",
};

const tableCell = {
  padding: "12px",
  border: "1px solid #ddd",
};

export default JobDescription;