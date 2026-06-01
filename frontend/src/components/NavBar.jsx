import { useState, useEffect } from 'react';
import { Link as ScrollLink, animateScroll, scroller } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { useAuth } from '../context/authContext';
import './NavBar.css';

function NavBar() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (section, event) => {
    event.preventDefault();
    setIsMenuOpen(false);

    const scrollToSection = () => {
      if (section === 'home') {
        animateScroll.scrollToTop({ duration: 500, smooth: true });
        return;
      }
      scroller.scrollTo(section, { duration: 500, smooth: true, offset: -76 });
    };

    if (!isHome) {
      navigate('/');
      setTimeout(scrollToSection, 350);
    } else {
      scrollToSection();
    }
  };

  const navLinkProps = {
    spy: true,
    smooth: true,
    duration: 500,
    offset: -76,
    onClick: () => setIsMenuOpen(false),
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__inner" aria-label="Main">
        <RouterLink
          to="/"
          className="navbar__brand"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={logo} alt="Expert Automotive" className="navbar__logo" />
        </RouterLink>

        <ul
          className={`navbar__links ${isMenuOpen ? 'navbar__links--open' : ''}`}
        >
          {isHome ? (
            <>
              <li>
                <RouterLink
                  to="/"
                  className="navbar__link"
                  onClick={() => {
                    animateScroll.scrollToTop({ duration: 500, smooth: true });
                    setIsMenuOpen(false);
                  }}
                >
                  Home
                </RouterLink>
              </li>
              <li>
                <ScrollLink
                  to="about"
                  className="navbar__link"
                  {...navLinkProps}
                >
                  About
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="services"
                  className="navbar__link"
                  {...navLinkProps}
                >
                  Services
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="testimonials"
                  className="navbar__link"
                  {...navLinkProps}
                >
                  Reviews
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="contact"
                  className="navbar__link"
                  {...navLinkProps}
                >
                  Contact
                </ScrollLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <RouterLink
                  to="/"
                  className="navbar__link"
                  onClick={(e) => handleNavClick('home', e)}
                >
                  Home
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/"
                  className="navbar__link"
                  onClick={(e) => handleNavClick('about', e)}
                >
                  About
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/"
                  className="navbar__link"
                  onClick={(e) => handleNavClick('services', e)}
                >
                  Services
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/"
                  className="navbar__link"
                  onClick={(e) => handleNavClick('testimonials', e)}
                >
                  Reviews
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/"
                  className="navbar__link"
                  onClick={(e) => handleNavClick('contact', e)}
                >
                  Contact
                </RouterLink>
              </li>
            </>
          )}
        </ul>

        <div className="navbar__actions">
          {user ? (
            <RouterLink
              to="/dashboard"
              className="navbar__cta"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </RouterLink>
          ) : (
            <RouterLink
              to="/auth"
              className="navbar__cta"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign in
            </RouterLink>
          )}
        </div>

        <button
          type="button"
          className={`navbar__toggle ${isMenuOpen ? 'navbar__toggle--open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}

export default NavBar;
