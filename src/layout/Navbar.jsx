// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/Authcontext";
import "./Navbar.css";

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/books" className="nav-logo">
          📚 Book Buddy
        </Link>
      </div>

      <nav className="nav-right">
        <Link to="/books" className="nav-link">
          Books
        </Link>

        {token ? (
          <>
            <Link to="/profile" className="nav-link">
              Account
            </Link>
            <button onClick={handleLogout} className="nav-button">
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="nav-link">
              Register
            </Link>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
