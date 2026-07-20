import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CalendarView from "./pages/CalendarView";
import BoardView from "./pages/BoardView";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calendar" element={<ProtectedRoute><CalendarView /></ProtectedRoute>} />
        <Route path="/board" element={<ProtectedRoute><BoardView /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}
