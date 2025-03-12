import { FC, ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "./AuthContext";

interface ProtectedRouteProps {
  requiredRole: string;
  children?: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ requiredRole, children }) => {
  const { isAuthenticated, role } = useUserContext();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (role.toLowerCase() !== requiredRole.toLowerCase()) {
    return <Navigate to={role === 'admin' ? '/admin' : '/'} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export default ProtectedRoute;