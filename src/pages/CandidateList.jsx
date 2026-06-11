import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function CandidateList() {
  const [searchTerm, setSearchTerm] = useState("");

  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "Rohith Sharma",
      email: "rohith@gmail.com",
      skills: "React, Java",
      score: "85%",
      status: "Shortlisted",
    },
    {
      id: 2,
      name: "Vaishnavi",
      email: "vaishnavi@gmail.com",
      skills: "Python, AI",
      score: "92%",
      status: "Selected",
    },
    {
      id: 3,
      name: "Akshaya",
      email: "akshaya@gmail.com",
      skills: "Node.js, MongoDB",
      score: "75%",
      status: "Pending",
    },
    {
      id: 4,
      name: "Sai Kumar",
      email: "sai@gmail.com",
      skills: "Java, Spring Boot",
      score: "88%",
      status: "Selected",
    },
    {
      id: 5,
      name: "Anil Siva Kumar",
      email: "anil@gmail.com",
      skills: "React, UI/UX",
      score: "81%",
      status: "Shortlisted",
    },
    {
      id: 6,
      name: "Navya",
      email: "navya@gmail.com",
      skills: "Python, Data Science",
      score: "95%",
      status: "Selected",
    },
    {
      id: 7,
      name: "Deekshitha",
      email: "deekshitha@gmail.com",
      skills: "HTML, CSS, JavaScript",
      score: "78%",
      status: "Pending",
    },
    {
      id: 8,
      name: "Praveen",
      email: "praveen@gmail.com",
      skills: "AWS, DevOps",
      score: "89%",
      status: "Shortlisted",
    },
    {
      id: 9,
      name: "Harsha",
      email: "harsha@gmail.com",
      skills: "Machine Learning",
      score: "93%",
      status: "Selected",
    },
    {
      id: 10,
      name: "Mahesh",
      email: "mahesh@gmail.com",
      skills: "SQL, Power BI",
      score: "82%",
      status: "Shortlisted",
    },
  ]);

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (confirmDelete) {
      setCandidates(
        candidates.filter((candidate) => candidate.id !== id)
      );
    }
  };

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <h1>📋 Candidate List</h1>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div style={cardStyle}>
              <h3>Total Candidates</h3>
              <p>{candidates.length}</p>
            </div>

            <div style={cardStyle}>
              <h3>Selected</h3>
              <p>
                {
                  candidates.filter(
                    (candidate) => candidate.status === "Selected"
                  ).length
                }
              </p>
            </div>

            <div style={cardStyle}>
              <h3>Shortlisted</h3>
              <p>
                {
                  candidates.filter(
                    (candidate) => candidate.status === "Shortlisted"
                  ).length
                }
              </p>
            </div>

            <div style={cardStyle}>
              <h3>Pending</h3>
              <p>
                {
                  candidates.filter(
                    (candidate) => candidate.status === "Pending"
                  ).length
                }
              </p>
            </div>
          </div>

          <input
            type="text"
            placeholder="🔍 Search Candidate..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "white",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#1e293b", color: "white" }}>
                <th style={tableHeader}>ID</th>
                <th style={tableHeader}>Name</th>
                <th style={tableHeader}>Email</th>
                <th style={tableHeader}>Skills</th>
                <th style={tableHeader}>Match Score</th>
                <th style={tableHeader}>Status</th>
                <th style={tableHeader}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td style={tableCell}>{candidate.id}</td>
                  <td style={tableCell}>{candidate.name}</td>
                  <td style={tableCell}>{candidate.email}</td>
                  <td style={tableCell}>{candidate.skills}</td>
                  <td style={tableCell}>{candidate.score}</td>

                  <td style={tableCell}>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "15px",
                        color: "white",
                        backgroundColor:
                          candidate.status === "Selected"
                            ? "green"
                            : candidate.status === "Shortlisted"
                            ? "orange"
                            : "blue",
                      }}
                    >
                      {candidate.status}
                    </span>
                  </td>

                  <td style={tableCell}>
                    <button
                      onClick={() =>
                        alert(
                          `Name: ${candidate.name}
Email: ${candidate.email}
Skills: ${candidate.skills}
Match Score: ${candidate.score}
Status: ${candidate.status}`
                        )
                      }
                      style={{
                        padding: "5px 10px",
                        marginRight: "8px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        backgroundColor: "#2563eb",
                        color: "white",
                      }}
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(candidate.id, candidate.name)
                      }
                      style={{
                        padding: "5px 10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        backgroundColor: "#dc2626",
                        color: "white",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const tableHeader = {
  padding: "12px",
  border: "1px solid #ddd",
};

const tableCell = {
  padding: "12px",
  border: "1px solid #ddd",
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "15px",
  width: "180px",
  backgroundColor: "white",
  textAlign: "center",
};

export default CandidateList;