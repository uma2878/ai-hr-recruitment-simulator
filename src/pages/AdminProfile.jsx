import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function AdminProfile() {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            padding: "30px",
            flex: 1,
          }}
        >
          <h1>👤 Admin Profile</h1>

          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              marginTop: "20px",
              maxWidth: "600px",
            }}
          >
            <p><strong>Name:</strong> HR Admin</p>
            <p><strong>Email:</strong> admin@xtragrad.com</p>
            <p><strong>Role:</strong> HR Manager</p>
            <p><strong>Company:</strong> XTRAGRAD</p>
            <p><strong>Department:</strong> Recruitment</p>
            <p><strong>Last Login:</strong> Today 10:30 AM</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminProfile;