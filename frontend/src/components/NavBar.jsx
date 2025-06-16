/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { useAuth } from '../context/authContext';
import './NavBar.css';

function NavBar() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            style={{ height: '90px', cursor: 'pointer', borderRadius: '18%' }}
          />
        </Link>
      </div>

      {/* Centered Links */}
      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
        <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
        <li><Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link></li>
        <li><Link to="/testimonials" onClick={() => setIsMenuOpen(false)}>Testimonials</Link></li>
        <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
      </ul>

      {/* Right Side Auth Buttons */}
      <div className="navbar-actions">
        {user ? (
          <>
            <Link to="/dashboard" className="authButton" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            <Link to="/register" className="authButton" onClick={() => setIsMenuOpen(false)}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="authButton" onClick={() => setIsMenuOpen(false)}>Login</Link>
            <Link to="/register" className="authButton" onClick={() => setIsMenuOpen(false)}>Register</Link>
          </>
        )}
      </div>

      {/* Hamburger Button */}
      <button
        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle Menu"
        aria-expanded={isMenuOpen}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
    </nav>
  );
}

export default NavBar;
