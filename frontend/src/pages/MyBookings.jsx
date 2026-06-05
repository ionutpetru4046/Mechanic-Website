import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // fixed import here
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    notes: '',
  });
  const [actionLoading, setActionLoading] = useState(false); // for delete/update button loading

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/bookings`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (Array.isArray(res.data.bookings)) {
          setBookings(res.data.bookings);
          setError('');
        } else {
          setError('Unexpected response from server.');
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate('/login');
        } else {
          setError('Failed to load bookings. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate, token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?'))
      return;

    setActionLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setBookings((prev) => prev.filter((b) => b._id !== id));
      setError('');
    } catch (err) {
      console.error('Error deleting booking:', err);
      setError('Failed to cancel booking. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setFormData({
      service: booking.service,
      date: booking.date.slice(0, 10),
      time: booking.time || '',
      notes: booking.notes || '',
    });
    setError('');
  };

  const cancelEdit = () => {
    setEditingBooking(null);
    setFormData({ service: '', date: '', time: '', notes: '' });
    setError('');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/${editingBooking._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setBookings((prev) =>
        prev.map((b) => (b._id === editingBooking._id ? res.data : b)),
      );
      cancelEdit();
    } catch (err) {
      console.error('Error updating booking:', err);
      setError('Failed to update booking. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="bookings-container">
      <button
        className="btn btn-back"
        onClick={() => navigate('/dashboard')}
        disabled={loading || actionLoading}
      >
        Back to Dashboard
      </button>

      <h2 className="heading">My Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : editingBooking ? (
        <form onSubmit={handleUpdate} className="edit-form">
          <h3>Edit Booking</h3>
          <label className="form-label">
            Service:
            <input
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="form-input"
              disabled={actionLoading}
            />
          </label>
          <label className="form-label">
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="form-input"
              disabled={actionLoading}
            />
          </label>
          <label className="form-label">
            Time:
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="form-input"
              disabled={actionLoading}
            />
          </label>
          <label className="form-label">
            Notes:
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="form-textarea"
              disabled={actionLoading}
            />
          </label>
          <div className="form-buttons">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={actionLoading}
            >
              {actionLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="btn btn-secondary"
              disabled={actionLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : bookings.length === 0 ? (
        <p className="no-bookings">You have no bookings yet.</p>
      ) : (
        <ul className="bookings-list">
          {bookings.map((booking) => (
            <li key={booking._id} className="booking-card">
              <div className="booking-info">
                <p>
                  <strong>Service:</strong> {booking.service}
                </p>
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(booking.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {booking.time || 'N/A'}
                </p>
                {booking.notes && (
                  <p>
                    <strong>Notes:</strong> {booking.notes}
                  </p>
                )}
              </div>
              <div className="booking-actions">
                <button
                  className="btn btn-edit"
                  onClick={() => handleEdit(booking)}
                  disabled={actionLoading}
                >
                  Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(booking._id)}
                  disabled={actionLoading}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
