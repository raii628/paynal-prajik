import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  role: string | null;
  requiredRole: string;
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ role, requiredRole, children }) => {
  if (!localStorage.getItem('access_token') || role !== requiredRole) {
    return <Navigate to="/" />
  }
  
  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute;