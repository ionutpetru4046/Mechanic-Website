import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./MyBookings.css"; // import CSS file

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    notes: "",
  });
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(res.data.bookings)) {
          setBookings(res.data.bookings);
          setError("");
        } else {
          setError("Unexpected response from server.");
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate("/login");
        } else {
          setError("Failed to load bookings. Please try again.");
        }
      }
    };

    fetchBookings();
  }, [navigate, token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err);
      setError("Failed to cancel booking. Please try again.");
    }
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setFormData({
      service: booking.service,
      date: booking.date.slice(0, 10),
      time: booking.time || "",
      notes: booking.notes || "",
    });
  };

  const cancelEdit = () => {
    setEditingBooking(null);
    setFormData({ service: "", date: "", time: "", notes: "" });
    setError("");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/bookings/${editingBooking._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBookings((prev) =>
        prev.map((b) => (b._id === editingBooking._id ? res.data : b))
      );
      cancelEdit();
    } catch (err) {
      console.error("Error updating booking:", err);
      setError("Failed to update booking. Please try again.");
    }
  };

  return (
    <div className="bookings-container">
      <h2 className="heading">My Bookings</h2>

      {error && <p className="error-message">{error}</p>}

      {editingBooking ? (
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
            />
          </label>
          <label className="form-label">
            Notes:
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="form-textarea"
            />
          </label>
          <div className="form-buttons">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="btn btn-secondary"
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
                  <strong>Date:</strong>{" "}
                  {new Date(booking.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {booking.time || "N/A"}
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
                >
                  Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(booking._id)}
                >
                  Cancel
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
