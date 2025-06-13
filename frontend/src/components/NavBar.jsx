import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import "./NavBar.css";

function NavBar({ isDarkMode, }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={`navbar ${isDarkMode ? "dark" : ""}`}>
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
        <li><Link to="about">About</Link></li>
        <li><Link to="services">Services</Link></li>
        <li><Link to="testimonials">Testimonials</Link></li>
        <li><Link to="contact">Contact</Link></li>
      </ul>

      {/* Right Side Actions */}
      <div className="navbar-actions">
        <Link to="/login" className="authButton">Login</Link>
        <Link to="/register" className="authButton">Register</Link>
        <Link to="/book-now" className="authButton">Book Now</Link>
        <Link to="/my-bookings" className="nav-button">
          View My Bookings
        </Link>
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