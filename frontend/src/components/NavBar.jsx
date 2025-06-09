import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import "./NavBar.css";

function NavBar({ isDarkMode, toggleTheme }) {
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

      {/* Hamburger Button */}
      <button
        className="hamburger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="about">About</Link></li>
        <li><Link to="services">Services</Link></li>
        <li><Link to="testimonials">Testimonials</Link></li>
        <li><Link to="contact">Contact</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>

      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "Light" : "Dark"} Mode
      </button>
    </nav>
  );
}

export default NavBar;