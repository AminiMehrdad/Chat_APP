import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { Circles  } from 'react-loader-spinner';

interface Props {
  requiredRole?: 'admin';
}


export function ProtectedRoute({ requiredRole }: Props) {
  const { loading, isAuthenticated, role } = useAuth();
  // console.log(role);
  
  const location = useLocation();

  

  if (loading) return <Circles
        height="80"
        width="80"
        color="#4d8fa9ff"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
    />;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace/>;
  }


  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}
