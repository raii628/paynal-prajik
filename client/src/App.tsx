import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/_NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./contexts/ProtectedRoutes";
import GuestDashboard from "./pages/guests/GuestDashboard";
import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import Homepage from "./pages/Homepage";

const App = () => {
  return (
    <>
      <Homepage />
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/guest" element={
          <ProtectedRoute role={localStorage.getItem("role")} requiredRole="guest">
            <Route path="/" element={<GuestDashboard />} />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute role={localStorage.getItem("role")} requiredRole="admin">
            <Route path="/" element={<AdminDashboard />} />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
