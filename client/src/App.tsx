import { Route, Routes } from "react-router-dom"
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/_NotFound'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoute from "./contexts/ProtectedRoutes"
import GuestDashboard from "./pages/guests/GuestDashboard"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App