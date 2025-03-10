<<<<<<< HEAD
import './App.css'
import { Route, Routes } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/_NotFound'
import AdminDashboard from './pages/admin/AdminDashboard'
import Homepage from './pages/Homepage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
=======
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useUserContext } from "./contexts/AuthContext";
import ProtectedRoute from "./contexts/ProtectedRoutes";
import useTokenHandler from "./hooks/useTokenHandler";
import NotFound from "./pages/_NotFound";
import Homepage from "./pages/Homepage";
import OTP from "./pages/OTP";
const App = () => {
  const { isAuthenticated, role } = useUserContext();
  useTokenHandler();
>>>>>>> cfd57781b070b61d17debfe719e07048d67c7f17

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
        Role: Admin Routing (Protected)
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;