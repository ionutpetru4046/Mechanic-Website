import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function PrivateRoute() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
