import './Footer.css';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
];

const SERVICE_LINKS = [
  'Oil Change',
  'Brake Repairs',
  'Engine Diagnostics',
  'Wheel Alignment',
  'NCT Repairs',
  'Tyres',
];

const OPENING_HOURS = [
  { day: 'Monday', hours: '8 a.m. – 5 p.m.' },
  { day: 'Tuesday', hours: '8 a.m. – 5 p.m.' },
  { day: 'Wednesday', hours: '8 a.m. – 5 p.m.' },
  { day: 'Thursday', hours: '8 a.m. – 5 p.m.' },
  { day: 'Friday', hours: '9 a.m. – 5 p.m.' },
  { day: 'Saturday', hours: '9 a.m. – 1 p.m.' },
  { day: 'Sunday', hours: 'Closed', closed: true },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service', to: '/terms-of-service' },
  { label: 'Cookie Policy', to: '/cookie-policy' },
];

function serviceHref(service) {
  return `/services/${service.toLowerCase().replace(' ', '-')}`;
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__accent" aria-hidden="true" />

      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__brand">
            <h2 className="footer__title">Expert Automotive</h2>
            <p className="footer__tagline">
              Always focusing on the customer needs always a good choice booking
              with Expert Automotive.
            </p>

            <ul className="footer__contact">
              <li>
                <MapPin className="footer__contact-icon" aria-hidden="true" />
                <address>
                  59B Dorset Street Lower, Phibsborough, Dublin 1, D01 C5R3
                </address>
              </li>
              <li>
                <Phone className="footer__contact-icon" aria-hidden="true" />
                <a href="tel:+353877113822">0877113822</a>
              </li>
              <li>
                <Mail className="footer__contact-icon" aria-hidden="true" />
                <a href="mailto:contact@expertautomotive.com">
                  contact@expertautomotive.com
                </a>
              </li>
            </ul>
          </div>

          <nav className="footer__nav" aria-label="Quick links">
            <h3 className="footer__heading">Quick Links</h3>
            <ul className="footer__link-list">
              {QUICK_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="footer__link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__nav" aria-label="Services">
            <h3 className="footer__heading">Services</h3>
            <ul className="footer__link-list">
              {SERVICE_LINKS.map((service) => (
                <li key={service}>
                  <a href={serviceHref(service)} className="footer__link">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__hours-block">
            <h3 className="footer__heading">Opening Hours</h3>
            <div className="footer__hours-card">
              <ul className="footer__hours-list">
                {OPENING_HOURS.map(({ day, hours, closed }) => (
                  <li
                    key={day}
                    className={`footer__hours-row${closed ? ' footer__hours-row--closed' : ''}`}
                  >
                    <span className="footer__hours-day">{day}</span>
                    <span className="footer__hours-time">{hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__social">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="footer__social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit us on ${label}`}
                >
                  <Icon className="footer__social-icon" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p className="footer__copyright">
            © {year} Expert Automotive. All rights reserved.
          </p>
          <nav className="footer__legal" aria-label="Legal">
            {LEGAL_LINKS.map(({ label, to }) => (
              <Link key={to} to={to} className="footer__legal-link">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
