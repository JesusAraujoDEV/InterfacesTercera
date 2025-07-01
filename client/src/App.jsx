import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Config from "./pages/config/Index"
import Colors from "./pages/config/Colors"
import Fonts from "./pages/config/Fonts"
import { ColorProvider } from "./contexts/ColorContext"
import { FontProvider } from "./contexts/FontContext"

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />
  }
  return children
}

export default function App() {
  return (
    <FontProvider>
      <ColorProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/config" element={<AdminRoute><Config /></AdminRoute>} />
          <Route path="/config/colors" element={<AdminRoute><Colors /></AdminRoute>} />
          <Route path="/config/fonts" element={<AdminRoute><Fonts /></AdminRoute>} />
        </Routes>
      </ColorProvider>
    </FontProvider>
  )
}
