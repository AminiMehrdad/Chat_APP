// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { useEffect, useState } from 'react';

interface Props {
  requiredRole?: 'admin';
}

export function ProtectedRoute({ requiredRole }: Props) {
  const { accessToken, role, tryRefresh, loading } = useAuth();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function verify() {
      if (loading) return;
      if (!accessToken) {
        const refreshed = await tryRefresh();
        if (!mounted) return;
        setAuthorized(refreshed && (!requiredRole || role === requiredRole));
        setChecking(false);
        return;
      }
      setAuthorized(!requiredRole || role === requiredRole);
      setChecking(false);
    }

    verify();
    return () => {
      mounted = false;
    };
  }, [accessToken, role, requiredRole, tryRefresh, loading]);

  if (checking || loading) return <div>Loading...</div>;

  if (!authorized) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
