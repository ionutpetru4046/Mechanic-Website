import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/authContext';

const AdminDashboard = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
          type="button"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Link to="/admin/bookings">
          <button>View Bookings</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
