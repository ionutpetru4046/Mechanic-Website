import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  if (!token) {
    navigate("/login");
    return;
  }
  const fetchUser = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/users/profile`;
      console.log("Fetching user from", url);
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User data:", res.data);
      setUser(res.data);
    } catch (err) {
      console.error("Fetch user error:", err);
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
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <span className={styles.logoutIcon}>↪</span> Log Out
          </button>
        </div>
        <div className={styles.welcomeCard}>
          {user ? (
            <>
              <div className={styles.avatar}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <h2 className={styles.welcomeText}>
                Welcome back, <span className={styles.userName}>{user.name}</span>!
              </h2>
              <p className={styles.subText}>You are successfully logged in</p>
            </>
          ) : (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p className={styles.loadingText}>Loading user info...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;