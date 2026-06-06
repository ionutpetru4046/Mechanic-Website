import { useEffect, useState } from 'react';
import API from '../api/api';

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get('/bookings')
      .then((res) => {
        setBookings(res.data.bookings || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch bookings:', err);
        setError('Failed to load bookings. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <div className="spinner" />
        <p>Loading bookings...</p>

        <style>{`
        .spinner {
          margin: 0 auto 10px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #007bff;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      </div>
    );

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  if (bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <ul>
      {bookings.map((booking) => {
        const date = new Date(booking.date).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        const time = new Date(`1970-01-01T${booking.time}`).toLocaleTimeString(
          undefined,
          {
            hour: '2-digit',
            minute: '2-digit',
          },
        );
        return (
          <li key={booking._id}>
            {booking.service} on {date} at {time}
            {booking.notes && ` — Notes: ${booking.notes}`}
          </li>
        );
      })}
    </ul>
  );
}

export default BookingList;
