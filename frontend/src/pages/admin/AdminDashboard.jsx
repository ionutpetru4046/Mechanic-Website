import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>

      <div style={{ marginTop: '20px' }}>
        <Link to="/admin/bookings">
          <button>View Bookings</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
