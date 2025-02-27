import './App.css'
import { Route, Routes } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/_NotFound'
import AdminDashboard from './pages/admin/AdminDashboard'

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
