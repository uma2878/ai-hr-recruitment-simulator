import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("Current Path:", location.pathname);

  const menuItems = [
    { name: "📊 Dashboard", path: "/dashboard" },
    { name: "📋 Candidate List", path: "/candidate-list" },
    { name: "📄 View Resumes", path: "/view-resumes" },
    { name: "📝 Job Description", path: "/job-description" },
    { name: "🎯 Match Results", path: "/match-results" },
    { name: "⭐ AI Recommendations", path: "/ai-recommendations" },
    { name: "🎤 Interview Results", path: "/interview-results" },
    { name: "📈 Analytics", path: "/analytics" },
    { name: "⚙️ Settings", path: "/settings" },
  ];

  return (
    <div
      style={{
        width: "250px",
        minHeight: "calc(100vh - 70px)",
        backgroundColor: "#0f172a",
        color: "white",
        paddingTop: "20px",
      }}
    >
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {menuItems.map((item) => (
          <li
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              padding: "15px 20px",
              cursor: "pointer",
              borderBottom: "1px solid #1e293b",

              backgroundColor:
                location.pathname === item.path
                  ? "teal"
                  : "transparent",

              borderLeft:
                location.pathname === item.path
                  ? "8px solid navy blue"
                  : "8px solid transparent",

              fontWeight:
                location.pathname === item.path
                  ? "bold"
                  : "normal",

              transition: "0.3s",
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;