import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `text-sm transition ${isActive ? "text-ink font-medium" : "text-mute hover:text-ink"}`;

  return (
    <header className="border-b border-line bg-panel">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-lg tracking-tight">
          Rundown
        </Link>
        {user ? (
          <nav className="flex items-center gap-6">
            <NavLink to="/calendar" className={linkClass}>Calendar</NavLink>
            <NavLink to="/board" className={linkClass}>Board</NavLink>
            <span className="text-sm text-mute font-mono">{user.name}</span>
            <button onClick={() => { logout(); navigate("/login"); }} className="btn-ghost !px-3 !py-1.5 text-sm">
              Log out
            </button>
          </nav>
        ) : (
          <nav className="flex items-center gap-3">
            <Link to="/login" className="btn-ghost !px-3 !py-1.5 text-sm">Log in</Link>
            <Link to="/register" className="btn-primary !px-3 !py-1.5 text-sm">Sign up</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
