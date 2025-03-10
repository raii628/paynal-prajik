import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useUserContext } from "./contexts/AuthContext";
import ProtectedRoute from "./contexts/ProtectedRoutes";
import useTokenHandler from "./hooks/useTokenHandler";
import NotFound from "./pages/_NotFound";
import Homepage from "./pages/Homepage";
import OTP from "./pages/OTP";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LoadingHydrate from "./motions/LoadingHydrate";
import { Suspense } from "react";
import Reservation from "./pages/admin/Reservation";
import ManageRooms from "./pages/ManageRooms";
import StaffSection from "./pages/admin/StaffSection";
import AdminLayout from "./layout/admin/AdminLayout";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  const { isAuthenticated, role, loading } = useUserContext();
  useTokenHandler();

  if (loading) return <LoadingHydrate />

  return (
    <Suspense fallback={<LoadingHydrate />}>
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
        <Route path="forgot-password" element={<ForgotPassword />} />

        {/* Protected admin routes */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="reservation" element={<Reservation />} />
            <Route path="rooms" element={<ManageRooms />} />
            <Route path="manager" element={<StaffSection />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
