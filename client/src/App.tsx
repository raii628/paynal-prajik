import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useUserContext } from "./contexts/AuthContext";
import ProtectedRoute from "./contexts/ProtectedRoutes";
import useTokenHandler from "./hooks/useTokenHandler";
import NotFound from "./pages/_NotFound";
import Homepage from "./pages/Homepage";
import OTP from "./pages/OTP";
import AdminDashboard from "./pages/admin/AdminDashboard";
const App = () => {
  const { isAuthenticated, role } = useUserContext();
  useTokenHandler();

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
                <Homepage />
              )
            ) : (
              <Homepage />
            )
          }
        />
        <Route path="/otp" element={<OTP />} />
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
