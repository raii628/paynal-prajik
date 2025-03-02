/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";
import { ReactNode, useState } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  [key: string]: any;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [user] = useState<null | any>(null);

  return !user ? <Navigate to="/login" /> : children;
}

export default ProtectedRoute;