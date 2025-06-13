import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useAuth } from "../context/authContext";
import "./NavBar.css";

function NavBar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`navbar`}>
      <div className="navbar-logo">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "90px", cursor: "pointer", borderRadius: "50%" }}
          />
        </Link>
      </div>

      {/* Centered Links */}
      <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/testimonials">Testimonials</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* Right Side Auth Buttons */}
      <div className="navbar-actions">
        {!user ? (
          <>
            <Link to="/dashboard" className="authButton">Dashboard</Link>
            <button onClick={logout} className="authButton">Logout</button>
          </>
        ) : (
          <>
             <Link to="/login" className="authButton">Login</Link>
             <Link to="/register" className="authButton">Register</Link>          </>
        )}
      </div>

      {/* Hamburger Button */}
      <button
        className="hamburger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
    </nav>
  );
}

export default NavBar;