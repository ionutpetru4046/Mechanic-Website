import { useEffect, useState, useCallback } from 'react';
import API from '../../api/api';
import { useAuth } from '../../context/authContext';

const AdminBookings = () => {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ stable function (avoids re-creation issues)
  const fetchBookings = useCallback(async () => {
    if (!user?.token) return;

    try {
      setLoading(true);

      const res = await API.get('/bookings/admin/bookings', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setBookings(res.data.bookings);
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
      await API.patch(
          `/bookings/admin/bookings/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      fetchBookings(); // refresh
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (!user) return <p>Loading user...</p>;
  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Bookings</h1>

      <table border="1" cellPadding="10">
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
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="6">No bookings found</td>
            </tr>
          ) : (
            bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.user?.name || 'N/A'}</td>
                <td>{b.user?.email || 'N/A'}</td>
                <td>{b.service}</td>
                <td>{new Date(b.date).toLocaleDateString()}</td>
                <td>{b.status}</td>

                <td>
                  <button onClick={() => updateStatus(b._id, 'Confirmed')}>
                    Confirm
                  </button>

                  <button onClick={() => updateStatus(b._id, 'Completed')}>
                    Complete
                  </button>

                  <button onClick={() => updateStatus(b._id, 'Cancelled')}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookings;
