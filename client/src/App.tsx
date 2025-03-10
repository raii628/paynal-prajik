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

const App = () => {
  const { isAuthenticated, role } = useUserContext();
  useTokenHandler();

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

        {/* Admin Routes: Protected */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;