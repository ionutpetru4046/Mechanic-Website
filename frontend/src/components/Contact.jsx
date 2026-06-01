import { Mail, Phone, MapPin } from 'lucide-react';
import './Contact.css';

function Contact() {
  return (
    <section className="contact section">
      <div className="section-inner contact-page">
        <p className="section-eyebrow">Get in touch</p>
        <h2 className="section-title contact-heading">Contact us</h2>
        <p className="section-subtitle">
          Visit us in Phibsborough or reach out — we are happy to help.
        </p>

        <div className="contact-info">
          <a
            href="mailto:contact@expertautomotive.com"
            className="contact-card"
          >
            <Mail className="contact-icon" aria-hidden />
            <div>
              <p className="contact-label">Email</p>
              <p className="contact-text">contact@expertautomotive.com</p>
            </div>
          </a>
          <a href="tel:+353877113822" className="contact-card">
            <Phone className="contact-icon" aria-hidden />
            <div>
              <p className="contact-label">Phone</p>
              <p className="contact-text">087 711 3822</p>
            </div>
          </a>
          <div className="contact-card contact-card--static">
            <MapPin className="contact-icon" aria-hidden />
            <div>
              <p className="contact-label">Address</p>
              <p className="contact-text">
                59B Dorset Street Lower, Phibsborough, Dublin 1, D01 C5R3
              </p>
            </div>
          </div>
        </div>

        <div className="map-container">
          <iframe
            title="Expert Automotive location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.6908427504144!2d-6.267493084165074!3d53.34410367997859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e9c013e2fb5%3A0xa00c7a9973178d0!2sDublin!5e0!3m2!1sen!2sie!4v1717583644813!5m2!1sen!2sie"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

export default Contact;
