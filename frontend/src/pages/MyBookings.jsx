import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router"

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchBookings = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/my`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBookings(res.data);
            } catch (err) {
                console.error("Error fetching bookings", err);
                navigate("/login");
            }
        };

        fetchBookings();
    }, [navigate]);


  return (
    <div style={{ padding: "20px" }}>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              Service: {booking.service} <br />
              Date: {new Date(booking.date).toLocaleDateString()} <br />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
