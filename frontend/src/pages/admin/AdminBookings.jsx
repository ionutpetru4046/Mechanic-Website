import { useEffect, useMemo, useState, useCallback } from 'react';
import API from '../../api/api';
import { useAuth } from '../../context/authContext';
import styles from './AdminBookings.module.css';

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const ITEMS_PER_PAGE = 8;

const AdminBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = useCallback(async () => {
    if (!user?.token) return;

    try {
      setLoading(true);
      const res = await API.get('/bookings/admin/bookings', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setBookings(res.data.bookings || []);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, [user?.token]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (id, status) => {
    try {
      // optimistic UI update
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b)),
      );

      const res = await API.patch(
        `/bookings/admin/bookings/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );

      const updatedBooking = res.data;
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id
            ? { ...booking, ...updatedBooking, user: booking.user }
            : booking,
        ),
      );
    } catch (err) {
      // revert optimistic update
      fetchBookings();
      const serverMessage =
        err?.response?.data?.message ||
        err.message ||
        'Failed to update status';
      console.error('Update status error:', err, serverMessage);
      if (err?.response?.status === 401) {
        alert('Authentication error. Please login again.');
      } else if (err?.response?.status === 403) {
        alert('Access denied. Admin only.');
      } else {
        alert(serverMessage);
      }
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch = [
        booking.user?.name,
        booking.user?.email,
        booking.service,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesStatus = statusFilter
        ? booking.status?.toLowerCase() === statusFilter.toLowerCase()
        : true;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  const pageCount = Math.max(
    1,
    Math.ceil(filteredBookings.length / ITEMS_PER_PAGE),
  );
  const currentPage = Math.min(page, pageCount);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const statusBadgeClass = (status) => {
    if (!status) return styles.statusPending;
    const normalized = status.toLowerCase();
    if (normalized === 'confirmed') return styles.statusConfirmed;
    if (normalized === 'completed') return styles.statusCompleted;
    if (normalized === 'cancelled' || normalized === 'canceled')
      return styles.statusCancelled;
    return styles.statusPending;
  };

  const formatStatus = (status) => {
    if (!status) return 'Pending';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  if (!user) return <p>Loading user...</p>;
  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className={styles.pageShell}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Admin Bookings</h1>
          <p className={styles.pageSubtitle}>
            Search, filter, and update booking status in a modern responsive
            admin view.
          </p>
        </div>

        <div className={styles.controls}>
          <label className={styles.field}>
            <span className={styles.srOnly}>Search bookings</span>
            <input
              type="search"
              placeholder="Search by user, email, or service"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <label className={styles.field}>
            <span className={styles.srOnly}>Filter by status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{filteredBookings.length}</div>
          <div className={styles.statLabel}>Filtered Bookings</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {
              bookings.filter(
                (booking) => booking.status?.toLowerCase() === 'confirmed',
              ).length
            }
          </div>
          <div className={styles.statLabel}>Confirmed</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {
              bookings.filter(
                (booking) => booking.status?.toLowerCase() === 'completed',
              ).length
            }
          </div>
          <div className={styles.statLabel}>Completed</div>
        </div>
      </div>

      <div className={styles.tableShell}>
        <div className={styles.tableHeader}>
          <div>
            <p className={styles.tableTitle}>Booking requests</p>
            <p className={styles.tableDescription}>
              Manage all customer appointments and update their status with one
              click.
            </p>
          </div>
          <div className={styles.pageInfo}>
            Showing {paginatedBookings.length} of {filteredBookings.length}{' '}
            bookings
          </div>
        </div>

        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Service</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className={styles.emptyState}>
                    No bookings match your search.
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className={styles.userCell}>
                      <span className={styles.userName}>
                        {booking.user?.name || 'Unknown user'}
                      </span>
                      <span className={styles.userEmail}>
                        ID: {booking._id}
                      </span>
                    </td>
                    <td className={styles.userEmail}>
                      {booking.user?.email || 'No email'}
                    </td>
                    <td className={styles.serviceCell}>
                      <span className={styles.userName}>{booking.service}</span>
                      <span className={styles.dateLabel}>
                        {booking.notes || 'No notes'}
                      </span>
                    </td>
                    <td className={styles.dateLabel}>
                      {new Date(booking.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className={styles.statusCell}>
                      <span
                        className={`${styles.statusBadge} ${statusBadgeClass(booking.status)}`}
                      >
                        {formatStatus(booking.status)}
                      </span>
                    </td>
                    <td className={styles.actionsCell}>
                      <button
                        type="button"
                        className={`${styles.actionBtn} ${styles.actionConfirm}`}
                        onClick={() => updateStatus(booking._id, 'confirmed')}
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        className={`${styles.actionBtn} ${styles.actionComplete}`}
                        onClick={() => updateStatus(booking._id, 'completed')}
                      >
                        Complete
                      </button>
                      <button
                        type="button"
                        className={`${styles.actionBtn} ${styles.actionCancel}`}
                        onClick={() => updateStatus(booking._id, 'cancelled')}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.pagination}>
          <div className={styles.pageInfo}>
            Page {currentPage} of {pageCount}
          </div>
          <div className={styles.pageButtons}>
            <button
              type="button"
              className={styles.pageButton}
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <button
              type="button"
              className={styles.pageButton}
              disabled={currentPage === pageCount}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
