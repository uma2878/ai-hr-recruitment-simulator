import { useState, useEffect } from "react";
import { API_BASE } from "../config/api";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function CandidateList() {
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchValue = params.get("search") || "";
    setSearchTerm(searchValue);
  }, [location.search]);
  useEffect(() => {
  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE}/api/candidates`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Candidates:", data);

      setCandidates(data.items || []);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  fetchCandidates();
}, []);

  const handleDelete = async (id, name) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete ${name}?`
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE}/api/candidates/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      alert("Candidate deleted successfully.");

      setCandidates((prev) =>
        prev.filter((candidate) => candidate.id !== id)
      );
    } else {
      const error = await response.json();
      alert(error.detail || "Failed to delete candidate.");
    }
  } catch (error) {
    console.error(error);
    alert("Server error.");
  }
};

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      candidate.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );
return (
  <>
    <Navbar />

    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          padding: "30px",
          flex: 1,
          backgroundColor: "#f8fafc",
        }}
      >
        <h1>📋 Candidate List</h1>

        {/* Summary Cards */}

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "25px",
            flexWrap: "wrap",
          }}
        >
          <div style={cardStyle}>
            <h3>Total Candidates</h3>
            <p>{candidates.length}</p>
          </div>

          <div style={cardStyle}>
            <h3>Total Resumes</h3>
            <p>
              {candidates.reduce(
                (sum, c) => sum + (c.resume_count || 0),
                0
              )}
            </p>
          </div>

          <div style={cardStyle}>
            <h3>Total Applications</h3>
            <p>
              {candidates.reduce(
                (sum, c) => sum + (c.application_count || 0),
                0
              )}
            </p>
          </div>

          <div style={cardStyle}>
            <h3>Candidate Users</h3>
            <p>{candidates.length}</p>
          </div>
        </div>
          {/* Search Box */}

          <input
            type="text"
            placeholder="🔍 Search Candidate..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            style={{
              padding: "10px",
              width: "300px",
              marginBottom: "20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          {/* Table */}

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
                <th style={tableHeader}>Name</th>
                <th style={tableHeader}>Email</th>
                <th style={tableHeader}>Role</th>
                <th style={tableHeader}>Resumes</th>
                <th style={tableHeader}>Applications</th>
                <th style={tableHeader}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCandidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td style={tableCell}>
                    {candidate.id}
                  </td>

                  <td style={tableCell}>
                    {candidate.name}
                  </td>

                  <td style={tableCell}>
                    {candidate.email}
                  </td>

                  <td style={tableCell}>
  {candidate.role}
</td>

<td style={tableCell}>
  {candidate.resume_count}
</td>

<td style={tableCell}>
  {candidate.application_count}
</td>

                  <td style={tableCell}>
                    <button
                      onClick={() =>
                        alert(
                          `Name: ${candidate.name}
Email: ${candidate.email}
Role: ${candidate.role}
Resumes: ${candidate.resume_count}
Applications: ${candidate.application_count}`
                        )
                      }
                      style={viewButton}
                    >
                      View
                    </button>

                    <button
  onClick={() =>
    handleDelete(candidate.id, candidate.name)
  }
  style={deleteButton}
>
  Delete
</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCandidates.length === 0 && (
            <p
              style={{
                marginTop: "20px",
                color: "#666",
              }}
            >
              No candidates found.
            </p>
          )}
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

const viewButton = {
  padding: "5px 10px",
  marginRight: "8px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  backgroundColor: "#2563eb",
  color: "white",
};

const deleteButton = {
  padding: "5px 10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  backgroundColor: "#dc2626",
  color: "white",
};

export default CandidateList;