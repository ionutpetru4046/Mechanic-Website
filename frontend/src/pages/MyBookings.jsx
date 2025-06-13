import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editForm, setEditForm] = useState({ date: "", time: "", service: "", notes: "" });
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(res.data)) {
          setBookings(res.data);
        } else if (Array.isArray(res.data.bookings)) {
          setBookings(res.data.bookings);
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
      console.error("Failed to delete booking:", err);
      alert("Could not delete booking");
    }
  };

  const handleEdit = (booking) => {
    setEditingBookingId(booking._id);
    setEditForm({
      date: booking.date?.split("T")[0] || "",
      time: booking.time || "",
      service: booking.service || "",
      notes: booking.notes || "",
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/bookings/${editingBookingId}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBookings(
        bookings.map((b) =>
          b._id === editingBookingId ? res.data : b
        )
      );
      setEditingBookingId(null);
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update booking");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>My Bookings</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {Array.isArray(bookings) && bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <div key={booking._id} style={{ marginBottom: "1.5rem", borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
              {editingBookingId === booking._id ? (
                <>
                  <label>
                    <strong>Service:</strong>
                    <input
                      type="text"
                      name="service"
                      value={editForm.service}
                      onChange={handleEditChange}
                      style={{ marginLeft: "10px" }}
                    />
                  </label><br />
                  <label>
                    <strong>Date:</strong>
                    <input
                      type="date"
                      name="date"
                      value={editForm.date}
                      onChange={handleEditChange}
                      style={{ marginLeft: "10px" }}
                    />
                  </label><br />
                  <label>
                    <strong>Time:</strong>
                    <input
                      type="text"
                      name="time"
                      value={editForm.time}
                      onChange={handleEditChange}
                      style={{ marginLeft: "10px" }}
                    />
                  </label><br />
                  <label>
                    <strong>Notes:</strong>
                    <input
                      type="text"
                      name="notes"
                      value={editForm.notes}
                      onChange={handleEditChange}
                      style={{ marginLeft: "10px", width: "80%" }}
                    />
                  </label><br />
                  <button onClick={handleUpdate} style={{ marginRight: "10px" }}>Save</button>
                  <button onClick={() => setEditingBookingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <p><strong>Service:</strong> {booking.service}</p>
                  <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {booking.time}</p>
                  {booking.notes && <p><strong>Notes:</strong> {booking.notes}</p>}
                  <button onClick={() => handleEdit(booking)} style={{ marginRight: "10px" }}>Edit</button>
                  <button onClick={() => handleDelete(booking._id)}>Cancel</button>
                </>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
