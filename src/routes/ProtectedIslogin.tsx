import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthProvider";
import { Circles } from "react-loader-spinner";


export function ProtectedIslogin() {
    const { loading, isAuthenticated } = useAuth();

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
    

    if (isAuthenticated) {
        return <Navigate to="/chat" state={{ from: location }} replace />;
    }

    return <Outlet />;
}