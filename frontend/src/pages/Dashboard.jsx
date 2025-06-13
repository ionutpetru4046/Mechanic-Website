import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchData = async () => {
      try {
        const VITE_API_URL = import.meta.env.VITE_API_URL;

        const userRes = await axios.get(`${VITE_API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        const bookingsRes = await axios.get(`${VITE_API_URL}/api/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(bookingsRes.data.bookings || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard data.");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Loading dashboard...</p>
      </div>
    );

  if (error)
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>{error}</p>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <span className={styles.logoutIcon}>↪</span> Log Out
          </button>
        </div>

        <div className={styles.avatar}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <h2 className={styles.welcomeText}>
          Welcome back, <span className={styles.userName}>{user?.name}</span>!
        </h2>
        <p className={styles.subText}>You are successfully logged in</p>

        {/* ✅ Add action buttons below welcome */}
        <div className={styles.actions}>
          <Link to="/book-now" className={styles.actionBtn}>Book Now</Link>
          <Link to="/my-bookings" className={styles.actionBtn}>View My Bookings</Link>
        </div>

        <div className={styles.bookingsSection}>
          <div className={styles.bookingsTitle}>Your Bookings</div>
          <ul className={styles.bookingList}>
            {bookings.length === 0 ? (
              <li>No bookings found.</li>
            ) : (
              bookings.map((booking) => (
                <li className={styles.bookingCard} key={booking._id || booking.id}>
                  <strong>{booking.service}</strong> on {booking.date} at {booking.time}
                  <br />
                  Notes: {booking.notes || "None"}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;