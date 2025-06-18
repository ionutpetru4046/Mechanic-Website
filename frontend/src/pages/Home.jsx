/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import About from '../components/About';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import styles from './Home.module.css';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo === 'top' ? 'top' : location.state.scrollTo, {
        duration: 500,
        smooth: true,
        offset: -70,
      });

      // Clear state so scrolling happens only once
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleBookNow = () => {
    navigate('/book-now');
  };

  return (
    <div>
      {/* Hero Section */}
      <Element name="top" id="top" className={styles.backgroundWrapper}>
        <div className={styles.backgroundImage} />
        <div className={styles.overlay} />
        <div className={styles.content}>
          <h1 className={styles.heading}>Professional Car Repair at Your Fingertips</h1>
          <p className={styles.paragraph}>
            🛠️ Your trusted mechanic, now online. Fast. Reliable. Local. 🛠️
          </p>
          <button className={styles.bookNowButton} onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </Element>

      {/* Scrollable Sections */}
      <Element name="about" id="about"><About /></Element>
      <Element name="services" id="services"><Services /></Element>
      <Element name="testimonials" id="testimonials"><Testimonials /></Element>
      <Element name="contact" id="contact"><Contact /></Element>
    </div>
  );
}

export default Home;
