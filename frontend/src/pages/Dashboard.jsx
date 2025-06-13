import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Dashboard.module.css";
import { useAuth } from "../context/authContext";

function Dashboard() {
  const { logout } = useAuth();
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
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles["dashboard-container"]}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2>Dashboard</h2>
        <ul>
          <li>
            <Link to="/book-now">Book Now</Link>
          </li>
          <li>
            <Link to="/my-bookings">My Bookings</Link>
          </li>
          <li onClick={handleLogout}>Log Out</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className={styles["main-content"]}>
        <header className={styles["dashboard-header"]}>
          <h1>Welcome back, {user?.name}!</h1>
          <p>You are successfully logged in.</p>
        </header>

        {/* Cards or Info */}
        <section className={styles["dashboard-cards"]}>
          <div className={styles.card}>
            <h3>Total Bookings</h3>
            <p>{bookings.length}</p>
          </div>
          <div className={styles.card}>
            <h3>Account</h3>
            <p>{user?.email}</p>
          </div>
        </section>

        {/* Bookings List */}
        <section className={styles.bookingsSection}>
          <h2>Your Bookings</h2>
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
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
