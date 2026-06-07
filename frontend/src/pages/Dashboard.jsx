import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/api';
import styles from './Dashboard.module.css';
import { useAuth } from '../context/authContext';
import {
  Calendar,
  Clock,
  User,
  Users,
  Settings,
  LogOut,
  Plus,
  BookOpen,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  CalendarDays,
  Wrench,
  Car,
  Star,
  DollarSign,
  BarChart3,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from 'lucide-react';

function Dashboard() {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const userRes = await API.get('/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        const bookingsEndpoint =
          userRes.data.role === 'admin'
            ? '/bookings/admin/bookings'
            : '/bookings';

        const bookingsRes = await API.get(bookingsEndpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(bookingsRes.data.bookings || []);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('Failed to load dashboard data.');
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const getStatusIcon = (status) => {
    const normalized = status?.toLowerCase();
    switch (normalized) {
      case 'confirmed':
      case 'completed':
        return <CheckCircle size={14} />;
      case 'cancelled':
      case 'canceled':
        return <AlertCircle size={14} />;
      default:
        return <AlertCircle size={14} />;
    }
  };

  const formatStatus = (status) => {
    if (!status) return 'Scheduled';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleLogout = () => {
    logout();
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
    <div className={styles.dashboard}>
      <main className={styles.main}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.title}>Good morning, {user?.name}! 👋</h1>
              <p className={styles.subtitle}>
                Here&apos;s your automotive service overview
              </p>
            </div>
            <div className={styles.headerActions}>
              <Link to="/book-now" className={styles.primaryButton}>
                <Plus size={16} />
                Schedule Service
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className={styles.secondaryButton}>
                  <Users size={16} />
                  Admin Panel
                </Link>
              )}
              <button
                onClick={handleLogout}
                className={styles.secondaryButton}
                type="button"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* Quick Stats */}
        <section className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <CalendarDays size={24} />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>{bookings.length}</h3>
              <p className={styles.statLabel}>Total Bookings</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Clock size={24} />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>
                {bookings.filter((b) => new Date(b.date) > new Date()).length}
              </h3>
              <p className={styles.statLabel}>Upcoming</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <CheckCircle size={24} />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>
                {bookings.filter((b) => b.status?.toLowerCase() === 'completed').length}
              </h3>
              <p className={styles.statLabel}>Completed</p>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Star size={24} />
            </div>
            <div className={styles.statContent}>
              <h3 className={styles.statNumber}>4.9</h3>
              <p className={styles.statLabel}>Rating</p>
            </div>
          </div>
        </section>

        {/* Recent Activity & Quick Actions */}
        <div className={styles.contentGrid}>
          {/* Recent Bookings */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recent Bookings</h2>
              <Link
                to={user?.role === 'admin' ? '/admin/bookings' : '/my-bookings'}
                className={styles.viewAll}
              >
                View All
              </Link>
            </div>

            <div className={styles.bookingList}>
              {bookings.length === 0 ? (
                <div className={styles.emptyState}>
                  <Calendar size={48} />
                  <h3>No bookings yet</h3>
                  <p>Schedule your first service appointment</p>
                  <Link to="/book-now" className={styles.primaryButton}>
                    <Plus size={16} />
                    Book Now
                  </Link>
                </div>
              ) : (
                bookings.slice(0, 3).map((booking) => (
                  <div
                    className={styles.bookingCard}
                    key={booking._id || booking.id}
                  >
                    <div className={styles.bookingHeader}>
                      <div className={styles.serviceInfo}>
                        <h4 className={styles.serviceName}>
                          {booking.service}
                        </h4>
                        <div className={styles.bookingMeta}>
                          <span className={styles.bookingDate}>
                            {new Date(booking.date).toLocaleDateString(
                              'en-US',
                              {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              },
                            )}
                          </span>
                          <span className={styles.bookingTime}>
                            {booking.time}
                          </span>
                        </div>
                      </div>
                      <div className={styles.bookingStatus}>
                        {getStatusIcon(booking.status)}
                        <span>{formatStatus(booking.status)}</span>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className={styles.bookingNotes}>
                        <span className={styles.notesLabel}>Notes:</span>
                        <span className={styles.notesText}>
                          {booking.notes}
                        </span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Quick Actions */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Quick Actions</h2>

            <div className={styles.quickActions}>
              <Link to="/book-now" className={styles.actionCard}>
                <div className={styles.actionIcon}>
                  <Wrench size={24} />
                </div>
                <div className={styles.actionContent}>
                  <h4>Schedule Service</h4>
                  <p>Book a new appointment</p>
                </div>
                <div className={styles.actionArrow}>
                  <Plus size={16} />
                </div>
              </Link>

              <Link
                to={user?.role === 'admin' ? '/admin/bookings' : '/my-bookings'}
                className={styles.actionCard}
              >
                <div className={styles.actionIcon}>
                  <BookOpen size={24} />
                </div>
                <div className={styles.actionContent}>
                  <h4>
                    {user?.role === 'admin'
                      ? 'View All Bookings'
                      : 'View Bookings'}
                  </h4>
                  <p>
                    {user?.role === 'admin'
                      ? 'Manage all customer appointments'
                      : 'Manage your appointments'}
                  </p>
                </div>
                <div className={styles.actionArrow}>
                  <ArrowRight size={16} />
                </div>
              </Link>

              <Link to="/profile" className={styles.actionCard}>
                <div className={styles.actionIcon}>
                  <User size={24} />
                </div>
                <div className={styles.actionContent}>
                  <h4>My Profile</h4>
                  <p>Update your account details</p>
                </div>
                <div className={styles.actionArrow}>
                  <ArrowRight size={16} />
                </div>
              </Link>

              {user?.role === 'admin' && (
                <Link to="/admin" className={styles.actionCard}>
                  <div className={styles.actionIcon}>
                    <Users size={24} />
                  </div>
                  <div className={styles.actionContent}>
                    <h4>Admin Panel</h4>
                    <p>Open the full admin dashboard</p>
                  </div>
                  <div className={styles.actionArrow}>
                    <ArrowRight size={16} />
                  </div>
                </Link>
              )}

              <div className={styles.actionCard}>
                <div className={styles.actionIcon}>
                  <Phone size={24} />
                </div>
                <div className={styles.actionContent}>
                  <h4>Contact Us</h4>
                  <p>Need help? Call us</p>
                </div>
                <div className={styles.actionArrow}>
                  <Phone size={16} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
