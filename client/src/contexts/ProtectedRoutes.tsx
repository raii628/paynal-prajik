import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";

const ProtectedRoute = () => {
  const [user] = useState<null | boolean>(null);

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;