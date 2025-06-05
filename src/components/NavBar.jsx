import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.jpg"; // Adjust the path if needed

function Navbar({ isDarkMode, toggleTheme }) {
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
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/services">Services</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "Light" : "Dark"} Mode
      </button>
    </nav>
  );
}

export default Navbar;
