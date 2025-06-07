import { Link } from "react-scroll";
import logo from "../assets/logo.jpg"; // Adjust the path if needed
import "./NavBar.css";

function NavBar({ isDarkMode, toggleTheme }) {
  return (
    <nav className={`navbar ${isDarkMode ? "dark" : ""}`}>
      <div className="navbar-logo">
        <Link to="home" smooth={true} duration={500} offset={-70}>
          <img
            src={logo}
            alt="Expert Automotive Logo"
            style={{ height: "60px", cursor: "pointer" }}
          />
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="home" smooth={true} duration={500} offset={-70}>Home</Link>
        </li>
        <li>
          <Link to="about" smooth={true} duration={500} offset={-70}>About</Link>
        </li>
        <li>
          <Link to="services" smooth={true} duration={500} offset={-70}>Services</Link>
        </li>
        <li>
          <Link to="testimonials" smooth={true} duration={500} offset={-70}>Testimonials</Link>
        </li>
        <li>
          <Link to="contact" smooth={true} duration={500} offset={-70}>Contact</Link>
        </li>
      </ul>
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDarkMode ? "Light" : "Dark"} Mode
      </button>
    </nav>
  );
}

export default NavBar;