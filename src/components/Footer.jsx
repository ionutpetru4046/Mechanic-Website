import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer({ isDarkMode }) {
  const footerStyle = {
    padding: "1rem",
    textAlign: "center",
    background: isDarkMode ? "#222" : "#eee",
    color: isDarkMode ? "#fff" : "#000",
  };

  
  return (
    <footer className="footer" style={footerStyle}>
      <div className="footer-content">

        {/* Logo + Description */}
        <div className="footer-section">
          <h3 className="footer-logo">Expert Automotive</h3>
          <p>Your trusted mechanic in Town</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/booking">Booking</Link></li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div className="footer-section">
          <h4>Opening Hours</h4>
          <ul className="schedule">
            <li><strong>Monday:</strong> 8am - 5pm</li>
            <li><strong>Tuesday:</strong> 8am - 5pm</li>
            <li><strong>Wednesday:</strong> 8am - 5pm</li>
            <li><strong>Thursday:</strong> 8am - 5pm</li>
            <li><strong>Friday:</strong> 9am - 5pm</li>
            <li><strong>Saturday:</strong> 9am - 1pm</li>
            <li><strong>Sunday:</strong> Closed</li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Expert Automotive. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;