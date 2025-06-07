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
      <h2>Dashboard</h2>
      {user ? (
        <p>Welcome, {user.name}! You are logged in.</p>
        
      ) : (
        <p>Loading user info...</p>
        
      )}
        <button onClick={handleLogout} style={styles.button}>Log Out</button>

    </div>
  );
}

const styles = {
  container: { maxWidth: "100%", height: "60vh", background: "lightgray", margin: "auto", paddingTop: "100px", textAlign: "center" },
};

export default Dashboard;