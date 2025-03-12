import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
=======
import { Suspense } from "react";
>>>>>>> upstream/main
import { useUserContext } from "./contexts/AuthContext";
import ProtectedRoute from "./contexts/ProtectedRoutes";
import useTokenHandler from "./hooks/useTokenHandler";
import NotFound from "./pages/_NotFound";
import Homepage from "./pages/Homepage";
<<<<<<< HEAD
import OTP from "./pages/OTP";
import AdminDashboard from "./pages/admin/AdminDashboard";
import LoadingHydrate from "./motions/LoadingHydrate";
import { Suspense } from "react";
import Reservation from "./pages/admin/Reservation";
import ManageRooms from "./pages/ManageRooms";
import StaffSection from "./pages/admin/StaffSection";
import AdminLayout from "./layout/admin/AdminLayout";
import ForgotPassword from "./pages/ForgotPassword";
=======
import AdminDashboard from "./pages/admin/AdminDashboard";
import LoadingHydrate from "./motions/LoadingHydrate";
import Reservation from "./pages/admin/Reservation";
import ManageRooms from "./pages/ManageRooms";
import AdminLayout from "./layout/admin/AdminLayout";
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/About";
import Rooms from "./pages/Rooms";
import ManageUsers from "./pages/admin/ManageUsers";
import UserStats from "./pages/admin/UserStats";
import AreaReservations from "./pages/admin/AreaReservations";
import ManageAmenities from "./pages/admin/ManageAmenities";
import Comments from "./pages/admin/Comments";
import Reports from "./pages/admin/Reports";
import Suites from "./pages/Suites";
import RegistrationFlow from "./pages/RegistrationFlow";
import GuestProfile from "./pages/guests/GuestProfile";
>>>>>>> upstream/main

const App = () => {
  const { isAuthenticated, role, loading } = useUserContext();
  useTokenHandler();

  if (loading) return <LoadingHydrate />;

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

<<<<<<< HEAD
        <Route path="/otp" element={<OTP />} />
=======
        <Route path="/guest/:id" element={<GuestProfile />} />
        <Route path="/registration" element={<RegistrationFlow />} />
        <Route path="/about" element={<About />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/suites" element={<Suites />} />
>>>>>>> upstream/main
        <Route path="forgot-password" element={<ForgotPassword />} />

        {/* Protected admin routes */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
<<<<<<< HEAD
            <Route path="reservation" element={<Reservation />} />
            <Route path="rooms" element={<ManageRooms />} />
            <Route path="manager" element={<StaffSection />} />
=======
            <Route path="reservations" element={<Reservation />} />
            <Route path="rooms" element={<ManageRooms />} />
            <Route path="areas" element={<AreaReservations />} />
            <Route path="amenities" element={<ManageAmenities />} />
            <Route path="comments" element={<Comments />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<ManageUsers />}>
              <Route path=":id" element={<UserStats />} />
            </Route>
>>>>>>> upstream/main
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> upstream/main
