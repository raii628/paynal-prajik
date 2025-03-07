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
import './App.css'
import { Route, Routes } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/_NotFound'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoute from "./contexts/ProtectedRoutes"
import GuestDashboard from "./pages/guests/GuestDashboard"
import Homepage from "./pages/Homepage"
import { useUserContext } from "./contexts/AuthContext"
import { useEffect } from "react"
import useTokenHandler from './hooks/useTokenHandler'

const App = () => {
  const { setIsAuthenticated } = useUserContext();
  useTokenHandler();

  useEffect(() => {
    const session = localStorage.getItem("access_token");

    if (session) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]);


  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route element={<ProtectedRoute requiredRole="guest" />}>
          <Route path="/guest" element={<GuestDashboard />} />
        </Route>
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
