/* eslint-disable prettier/prettier */
import { FiTarget, FiStar, FiUsers } from 'react-icons/fi';
import './About.css';

function About() {
  return (
    <section className="about-section">
      <h1 className="about-title">ℹ️ About Our Garage</h1>

      <p className="about-intro">
        Welcome to our mechanic shop! With over <strong>20 years of experience</strong>, we provide top-notch car repair and maintenance services.
      </p>
  
      <div className="about-content">
        <div className="about-mission animated-fade">
          <h2><FiTarget className="about-icon" /> Our Mission</h2>
          <p>
            Our mission is to ensure your vehicle runs safely and smoothly. We prioritize <strong>customer satisfaction</strong> and <strong>quality workmanship</strong> above all.
          </p>
        </div>

        <div className="about-why animated-fade delay-1">
          <h2><FiStar className="about-icon" /> Why Choose Us?</h2>
          <ul className="about-list">
            <li>Experienced and certified mechanics</li>
            <li>Fast and reliable service</li>
            <li>Affordable prices</li>
            <li>Use of quality parts and tools</li>
            <li>Friendly customer support</li>
          </ul>
        </div>
      </div>

      <div className="about-team animated-fade delay-2">
        <h2><FiUsers className="about-icon" /> Our Team</h2>
        <p>
          Our skilled team of mechanics is passionate about cars and committed to delivering the best service to every customer.
        </p>
      </div>
    </section>
  );
}

export default About;