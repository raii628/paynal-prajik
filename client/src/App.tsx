import "./App.css";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useUserContext } from "./contexts/AuthContext";
import ProtectedRoute from "./contexts/ProtectedRoutes";
import useTokenHandler from "./hooks/useTokenHandler";
import NotFound from "./pages/_NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Homepage from "./pages/Homepage";
import OTP from "./pages/OTP";

const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useUserContext();
  useTokenHandler();

  const role = localStorage.getItem("role");

  useEffect(() => {
    const session = localStorage.getItem("access_token");

    if (session) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              role === "admin" ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <Homepage />
            )
          }
        />

        <Route path="/otp" element={<OTP />} />

        {/* Role: Guest Routing (Protected) */}
        <Route element={<ProtectedRoute requiredRole="guest" />}>
          <Route path="/" element={<Homepage />} />
        </Route>

        {/* Role: Admin Routing (Protected) */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
