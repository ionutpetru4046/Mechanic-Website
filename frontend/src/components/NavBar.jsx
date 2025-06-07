import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg"; // Adjust the path if needed
import "./NavBar.css";

function NavBar({ isDarkMode, toggleTheme }) {
  return (
    <nav className={`navbar ${isDarkMode ? "dark" : ""}`}>
      <div className="navbar-logo">
        <Link to="/">
          <img
            src={logo}
            alt="Expert Automotive Logo"
            style={{ height: "60px", cursor: "pointer" }}
          />
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="about">About</Link>
        </li>
        <li>
          <Link to="services">Services</Link>
        </li>
        <li>
          <Link to="testimonials">Testimonials</Link>
        </li>
        <li>
          <Link to="contact">Contact</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "Light" : "Dark"} Mode
      </button>
    </nav>
  );
}

export default NavBar;