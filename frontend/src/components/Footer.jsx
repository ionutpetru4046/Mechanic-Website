/* eslint-disable prettier/prettier */
import './Footer.css';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="modern-footer">
      {/* Main Footer Content */}
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="company-section">
            <div>
              <h3 className="brand-name">Expert Automotive</h3>
              <p className="company-description">
                Always focusing on the customer needs always a good choice
                booking with Expert Automotive.
              </p>
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>
                  59B Dorset Street Lower, Phibsborough, Dublin 1, D01 C5R3
                </span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span> 0877113822</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>contact@expertautomotive.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="nav-section">
            <h4 className="section-title">Quick Links</h4>
            <nav className="nav-list">
              {[
                'Home',
                'About Us',
                'Services',
                'Careers',
                'Testimonials',
                'Contact',
              ].map((link) => (
                <a
                  key={link}
                  href={`/${link.toLowerCase().replace(' ', '-')}`}
                  className="nav-link"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="nav-section">
            <h4 className="section-title">Services</h4>
            <nav className="nav-list">
              {[
                'Oil Change',
                'Brake Repairs',
                'Engine Diagnostics',
                'Wheel Alignment',
                'NCT Repairs',
                'Tyres',
              ].map((service) => (
                <a
                  key={service}
                  href={`/services/${service.toLowerCase().replace(' ', '-')}`}
                  className="nav-link"
                >
                  {service}
                </a>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div className="newsletter-section">
            <h4 className="section-title">Opening Hours</h4>

            <div>
              <div className="newsletter-form">
                <p>
                 Monday	8 a.m. - 5 p.m. <br />
                 Tuesday	8 a.m. - 5 p.m. <br />
                 Wednesday	8 a.m. - 5 p.m. <br />
                 Thursday	8 a.m. - 5 p.m. <br />
                 Friday	9 a.m. - 5 p.m. <br />
                 Saturday	9 a.m. - 1 p.m. <br />
                 Sunday	Closed
                </p>
              </div>

              {/* Social Links */}
              <div className="social-links">
                {[
                  { icon: Facebook, href: 'https://facebook.com' },
                  { icon: Twitter, href: 'https://twitter.com' },
                  { icon: Instagram, href: 'https://instagram.com' },
                  { icon: Linkedin, href: 'https://linkedin.com' },
                  { icon: Github, href: 'https://github.com' },
                ].map(({ icon: Icon, href }, index) => (
                  <a key={index} href={href} className="social-link">
                    <Icon className="social-icon" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="footer-separator" />

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <div className="bottom-content">
          <div className="copyright">
            © 2025 Expert Automotive. All rights reserved.
          </div>

          <div className="legal-links">
            <a href="/privacy-policy" className="legal-link">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="legal-link">
              Terms of Service
            </a>
            <a href="/cookie-policy" className="legal-link">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
