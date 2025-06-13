import { useEffect, useState } from "react";
import axios from "axios";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.get("http://localhost:5000/api/bookings", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setBookings(res.data);
      setLoading(false);
    })
    .catch(() => {
      setBookings([]);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading bookings...</p>;

  if (bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <ul>
      {bookings.map(booking => (
        <li key={booking._id}>
          {booking.service} on {booking.date} at {booking.time}
          {booking.notes && ` — Notes: ${booking.notes}`}
        </li>
      ))}
    </ul>
  );
}

export default BookingList;