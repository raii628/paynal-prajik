import { FC, ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "./AuthContext";

interface ProtectedRouteProps {
  requiredRole: string;
  children?: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ requiredRole, children }) => {
  const { isAuthenticated } = useUserContext();
  const role = localStorage.getItem("role");

  if (!isAuthenticated || role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

export default ProtectedRoute;