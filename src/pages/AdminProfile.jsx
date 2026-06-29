import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { API_BASE } from "../config/api";

function AdminProfile() {
  const [admin, setAdmin] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    created_at: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { setError("Not logged in."); setLoading(false); return; }
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.sub;

        const response = await fetch(
          `${API_BASE}/api/profile/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 401) { localStorage.removeItem("token"); window.location.href = "/"; return; }

        const data = response.ok ? await response.json() : {};

        setAdmin({
          id: userId,
          name: data.full_name || localStorage.getItem("userName") || "",
          email: localStorage.getItem("userEmail") || "",
          role: localStorage.getItem("role") || "",
          created_at: data.created_at || "",
        });
      } catch (err) {
        console.error(err);
        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ padding: "30px", flex: 1 }}>
            <h2>Loading Profile...</h2>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ padding: "30px", flex: 1 }}>
            <h2>{error}</h2>
          </div>
        </div>
      </>
    );
  }

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
          <h1>👤 Admin Profile</h1>
          <p>Administrator account information.</p>

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "20px",
              marginBottom: "30px",
              flexWrap: "wrap",
            }}
          >
            <div style={cardStyle}>
              <h3>Role</h3>
              <p>{admin.role}</p>
            </div>

            <div style={cardStyle}>
              <h3>Status</h3>
              <p>Active</p>
            </div>

            <div style={cardStyle}>
              <h3>Account</h3>
              <p>Administrator</p>
            </div>
          </div>

          <div style={profileCard}>
            <h2>Profile Details</h2>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
              }}
            >
              <tbody>
                <tr>
                  <td style={labelStyle}>Admin ID</td>
                  <td style={valueStyle}>{admin.id}</td>
                </tr>

                <tr>
                  <td style={labelStyle}>Name</td>
                  <td style={valueStyle}>{admin.name}</td>
                </tr>

                <tr>
                  <td style={labelStyle}>Email</td>
                  <td style={valueStyle}>{admin.email}</td>
                </tr>

                <tr>
                  <td style={labelStyle}>Role</td>
                  <td style={valueStyle}>{admin.role}</td>
                </tr>

                <tr>
                  <td style={labelStyle}>Created At</td>
                  <td style={valueStyle}>
                    {admin.created_at ? new Date(admin.created_at).toLocaleString() : "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

const cardStyle = {
  width: "200px",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const profileCard = {
  backgroundColor: "white",
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "25px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const labelStyle = {
  width: "180px",
  padding: "15px",
  fontWeight: "bold",
  borderBottom: "1px solid #eee",
};

const valueStyle = {
  padding: "15px",
  borderBottom: "1px solid #eee",
};

export default AdminProfile;