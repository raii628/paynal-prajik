import { FC, ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "./AuthContext";

interface ProtectedRouteProps {
  requiredRole: string;
  children?: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ requiredRole, children }) => {
  const { isAuthenticated, role } = useUserContext();

  // If the user is not authenticated, redirect to homepage
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If the user's role does not match, redirect them to their dashboard
  if (role.toLowerCase() !== requiredRole.toLowerCase()) {
    return <Navigate to={role === 'admin' ? '/admin' : '/'} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export default ProtectedRoute;