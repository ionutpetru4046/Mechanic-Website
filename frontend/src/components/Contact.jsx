/* eslint-disable prettier/prettier */
import { Mail, Phone, MapPin } from 'lucide-react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      <h2 className="contact-heading">📞 Contact Us</h2>
      <div className="contact-info">
        <div className="contact-card">
          <Mail className="contact-icon" />
          <div>
            <p className="contact-label">Email</p>
            <p className="contact-text">contact@expertautomotive.com</p>
          </div>
        </div>
        <div className="contact-card">
          <Phone className="contact-icon" />
          <div>
            <p className="contact-label">Phone</p>
            <p className="contact-text">0877113822</p>
          </div>
        </div>
        <div className="contact-card">
          <MapPin className="contact-icon" />
          <div>
            <p className="contact-label">Address</p>
            <p className="contact-text">59B Dorset Street Lower, Phibsborough, Dublin 1, D01 C5R3</p>
          </div>
        </div>
      </div>

      <div className="map-container">
        <iframe
          title="mechanic location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.6908427504144!2d-6.267493084165074!3d53.34410367997859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e9c013e2fb5%3A0xa00c7a9973178d0!2sDublin!5e0!3m2!1sen!2sie!4v1717583644813!5m2!1sen!2sie"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact;