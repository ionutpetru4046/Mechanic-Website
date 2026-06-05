import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

function PrivateRoute() {
  const { user, loadingAuth } = useAuth();

  if (loadingAuth) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/auth" replace />;
}

export default PrivateRoute;
