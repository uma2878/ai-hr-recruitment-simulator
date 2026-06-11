import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ViewResumes() {
  const [searchTerm, setSearchTerm] = useState("");

  const resumes = [
    {
      id: 1,
      name: "Rohith Sharma",
      file: "Rohith_Resume.pdf",
      date: "10-Jun-2026",
      status: "Reviewed",
    },
    {
      id: 2,
      name: "Vaishnavi",
      file: "Vaishnavi_Resume.pdf",
      date: "11-Jun-2026",
      status: "Reviewed",
    },
    {
      id: 3,
      name: "Akshaya",
      file: "Akshaya_Resume.pdf",
      date: "11-Jun-2026",
      status: "Pending",
    },
    {
      id: 4,
      name: "Sai Kumar",
      file: "SaiKumar_Resume.pdf",
      date: "12-Jun-2026",
      status: "Reviewed",
    },
    {
      id: 5,
      name: "Anil Siva Kumar",
      file: "Anil_Resume.pdf",
      date: "12-Jun-2026",
      status: "Pending",
    },
    {
      id: 6,
      name: "Navya",
      file: "Navya_Resume.pdf",
      date: "13-Jun-2026",
      status: "Reviewed",
    },
    {
      id: 7,
      name: "Deekshitha",
      file: "Deekshitha_Resume.pdf",
      date: "13-Jun-2026",
      status: "Pending",
    },
    {
      id: 8,
      name: "Praveen",
      file: "Praveen_Resume.pdf",
      date: "14-Jun-2026",
      status: "Reviewed",
    },
    {
      id: 9,
      name: "Harsha",
      file: "Harsha_Resume.pdf",
      date: "14-Jun-2026",
      status: "Reviewed",
    },
    {
      id: 10,
      name: "Mahesh",
      file: "Mahesh_Resume.pdf",
      date: "15-Jun-2026",
      status: "Pending",
    },
  ];

  const filteredResumes = resumes.filter((resume) =>
    resume.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h3>Reviewed</h3>
              <p>
                {
                  resumes.filter(
                    (resume) => resume.status === "Reviewed"
                  ).length
                }
              </p>
            </div>

            <div style={summaryCard}>
              <h3>Pending</h3>
              <p>
                {
                  resumes.filter(
                    (resume) => resume.status === "Pending"
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
                <h2>👤 {resume.name}</h2>

                <p style={{ marginBottom: "10px" }}>
                  <strong>File:</strong> {resume.file}
                </p>

                <p style={{ marginBottom: "10px" }}>
                  <strong>Uploaded:</strong> {resume.date}
                </p>

                <p style={{ marginBottom: "15px" }}>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      backgroundColor:
                        resume.status === "Reviewed"
                          ? "green"
                          : "orange",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "12px",
                    }}
                  >
                    {resume.status}
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
                        `Viewing Resume of ${resume.name}`
                      )
                    }
                  >
                    View
                  </button>

                  <button
                    style={downloadBtn}
                    onClick={() =>
                      alert(
                        `Downloading ${resume.file}`
                      )
                    }
                  >
                    Download
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

export default ViewResumes;