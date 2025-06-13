import './Contact.css';

function Contact() {
  return (
    <div className="contact-page">
      <h2 style={{ textAlign: 'center' }}>📞 Contact Us</h2>
      <div className="contact-info">
        <p>
          <strong>Email:</strong> contact@expertautomotive.com
        </p>
        <p>
          <strong>Phone:</strong> 0877113822
        </p>
        <p>
          <strong>Address:</strong> 59B Dorset Street Lower, Phibsborough,
          Dublin 1, D01 C5R3
        </p>
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
