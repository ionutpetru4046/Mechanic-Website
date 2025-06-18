/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { Link as scroll } from 'react-scroll';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { useAuth } from '../context/authContext';
import './NavBar.css';

function NavBar() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu and scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Helper to handle click on scroll links when NOT on homepage
  const handleNavClick = (section) => {
    if (location.pathname !== '/') {
      // navigate to homepage first, then scroll after small delay
      navigate('/');
      setTimeout(() => {
        scroll.scrollTo(document.getElementById(section).offsetTop - 70); // adjust offset if needed
      }, 300);
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav id='/' className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo">
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: '90px', cursor: 'pointer', borderRadius: '18%' }}
          />
        </Link>
      </div>

      {/* Centered Links */}
      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        {location.pathname === '/' ? (
          <>
            <li>
              <Link
                to=""
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="about"
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="services"
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="testimonials"
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                offset={-70}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/" onClick={() => handleNavClick('home')}>Home</Link></li>
            <li><Link to="/about" onClick={() => handleNavClick('about')}>About</Link></li>
            <li><Link to="/services" onClick={() => handleNavClick('services')}>Services</Link></li>
            <li><Link to="/testimonials" onClick={() => handleNavClick('testimonials')}>Testimonials</Link></li>
            <li><Link to="/contact" onClick={() => handleNavClick('contact')}>Contact</Link></li>
          </>
        )}
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
