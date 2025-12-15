import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

interface Props {
  requiredRole?: 'admin';
}

export function ProtectedRoute({ requiredRole }: Props) {
  const { loading, isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;
  
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}
