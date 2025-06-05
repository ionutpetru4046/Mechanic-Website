import { NavLink } from "react-router-dom";
import "./Navbar.css"; // create this file

function Navbar({ isDarkMode, toggleTheme }) {
  return (
    <nav className={`navbar ${isDarkMode ? "dark" : ""}`}>
      <div className="navbar-logo">Expert Automotive</div>
      <ul className="navbar-links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "Light" : "Dark"} Mode
      </button>
    </nav>
  );
}

export default Navbar;