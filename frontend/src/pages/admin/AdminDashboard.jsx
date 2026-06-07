import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, BookOpen, CheckCircle, Clock, AlertCircle, Wrench, BarChart3, Users } from 'lucide-react';
import { useAuth } from '../../context/authContext';
import API from '../../api/api';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    todayBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await API.get('/bookings/admin/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const bookings = response.data.bookings || [];
        const today = new Date().toDateString();

        const todayBookings = bookings.filter(
          (b) => new Date(b.date).toDateString() === today
        );
        const pendingBookings = bookings.filter((b) => b.status === 'pending');
        const completedBookings = bookings.filter((b) => b.status === 'completed');

        setStats({
          totalBookings: bookings.length,
          todayBookings: todayBookings.length,
          pendingBookings: pendingBookings.length,
          completedBookings: completedBookings.length,
        });

        setRecentBookings(bookings.slice(0, 8));
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleLogout = () => {
    logout();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
      case 'canceled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    return timeString.substring(0, 5);
  };

  if (loading) {
    return (
      <div className={styles.adminDashboard}>
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            animation: 'spin 2s linear infinite',
          }}>
            ⚙️
          </div>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminDashboard}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Admin Dashboard</h1>
          <p className={styles.headerSubtitle}>
            Welcome back, {user?.name}! Here's your service overview
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            onClick={handleLogout}
            className={styles.logoutButton}
            type="button"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <BookOpen size={28} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statNumber}>{stats.totalBookings}</h3>
            <p className={styles.statLabel}>Total Bookings</p>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.pending}`}>
          <div className={styles.statIcon}>
            <Clock size={28} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statNumber}>{stats.todayBookings}</h3>
            <p className={styles.statLabel}>Today's Jobs</p>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.warning}`}>
          <div className={styles.statIcon}>
            <AlertCircle size={28} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statNumber}>{stats.pendingBookings}</h3>
            <p className={styles.statLabel}>Pending</p>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.success}`}>
          <div className={styles.statIcon}>
            <CheckCircle size={28} />
          </div>
          <div className={styles.statContent}>
            <h3 className={styles.statNumber}>{stats.completedBookings}</h3>
            <p className={styles.statLabel}>Completed</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className={styles.contentGrid}>
        {/* Recent Bookings */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Bookings</h2>
            <Link to="/admin/bookings" className={styles.viewAllLink}>
              View All →
            </Link>
          </div>

          {recentBookings.length > 0 ? (
            <div>
              <div className={styles.tableHeader}>
                <div>Customer Name</div>
                <div>Service</div>
                <div>Date</div>
                <div>Time</div>
                <div>Status</div>
              </div>
              {recentBookings.map((booking) => {
                const bookingStatus = booking.status || 'Pending';
                const normalizedStatus = bookingStatus.toLowerCase();

                return (
                  <div key={booking._id} className={styles.tableRow}>
                    <div className={styles.tableCell}>
                      <span className={styles.customerName}>
                        {booking.user?.name || booking.user?.email || 'N/A'}
                      </span>
                    </div>
                    <div className={styles.tableCell}>
                      <span className={styles.service}>{booking.service || 'General'}</span>
                    </div>
                    <div className={styles.tableCell}>
                      {formatDate(booking.date)}
                    </div>
                    <div className={styles.tableCell}>
                      {formatTime(booking.time)}
                    </div>
                    <div className={styles.tableCell}>
                      <span className={`${styles.statusBadge} ${styles[getStatusColor(normalizedStatus)]}`}>
                        {bookingStatus}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>📋</div>
              <p>No bookings yet</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Quick Actions</h2>
          </div>

          <div className={styles.quickActionsGrid}>
            <Link to="/admin/bookings" className={styles.actionButton}>
              <span className={styles.actionIcon}>📅</span>
              <span>All Bookings</span>
            </Link>

            <Link to="/book-now" className={styles.actionButton}>
              <span className={styles.actionIcon}>➕</span>
              <span>New Booking</span>
            </Link>

            <button className={styles.actionButton} type="button">
              <span className={styles.actionIcon}>👥</span>
              <span>Customers</span>
            </button>

            <button className={styles.actionButton} type="button">
              <span className={styles.actionIcon}>📊</span>
              <span>Reports</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className={styles.actionButtonsRow}>
        <Link to="/admin/bookings" className={styles.primaryActionButton}>
          <BarChart3 size={20} />
          Manage All Bookings
        </Link>
        <Link to="/book-now" className={styles.secondaryActionButton}>
          <Wrench size={20} />
          Create New Booking
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
