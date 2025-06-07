import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Unauthorized:", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Dashboard</h1>
          <button onClick={handleLogout} style={styles.logoutButton}>
            <span style={styles.logoutIcon}>↪</span> Log Out
          </button>
        </div>

        <div style={styles.welcomeCard}>
          {user ? (
            <>
              <div style={styles.avatar}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <h2 style={styles.welcomeText}>
                Welcome back, <span style={styles.userName}>{user.name}</span>!
              </h2>
              <p style={styles.subText}>You are successfully logged in</p>
            </>
          ) : (
            <div style={styles.loadingContainer}>
              <div style={styles.loadingSpinner}></div>
              <p style={styles.loadingText}>Loading user info...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f5f7fa",
    padding: "2rem",
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "2rem",
    color: "#1a1a1a",
    fontWeight: "600",
  },
  logoutButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    color: "#64748b",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    "&:hover": {
      backgroundColor: "#f8fafc",
      color: "#1a1a1a",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderColor: "#cbd5e1",
    },
  },
  logoutIcon: {
    fontSize: "1.25rem",
  },
  welcomeCard: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    textAlign: "center",
    height: "65vh",
  },
  avatar: {
    width: "80px",
    height: "80px",
    backgroundColor: "#3b82f6",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    color: "#fff",
    margin: "0 auto 1.5rem",
  },
  welcomeText: {
    fontSize: "1.5rem",
    color: "#1a1a1a",
    marginBottom: "0.5rem",
  },
  userName: {
    color: "#3b82f6",
    fontWeight: "600",
  },
  subText: {
    color: "#64748b",
    fontSize: "0.875rem",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  loadingSpinner: {
    width: "40px",
    height: "40px",
    border: "3px solid #f3f3f3",
    borderTop: "3px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    color: "#64748b",
    fontSize: "0.875rem",
  },
};

export default Dashboard;