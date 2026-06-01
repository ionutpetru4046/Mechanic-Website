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
      const target =
        location.state.scrollTo === 'top' ? 'top' : location.state.scrollTo;
      scroller.scrollTo(target, {
        duration: 500,
        smooth: true,
        offset: -76,
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <>
      <Element name="top" className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <span className={styles.badge}>Dublin · Trusted since 2004</span>
          <h1 className={styles.heading}>
            Expert car care,{' '}
            <span className={styles.headingAccent}>booked in minutes</span>
          </h1>
          <p className={styles.subheading}>
            Oil changes, brakes, diagnostics, NCT prep and more — honest pricing
            and service you can rely on.
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/book-now')}
            >
              Book a service
            </button>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() =>
                scroller.scrollTo('services', {
                  duration: 500,
                  smooth: true,
                  offset: -76,
                })
              }
            >
              View services
            </button>
          </div>
          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <strong>20+</strong>
              Years experience
            </div>
            <div className={styles.trustItem}>
              <strong>4.9</strong>
              Customer rating
            </div>
            <div className={styles.trustItem}>
              <strong>Same-week</strong>
              Appointments
            </div>
          </div>
        </div>
      </Element>

      <Element name="about">
        <About />
      </Element>
      <Element name="services">
        <Services />
      </Element>
      <Element name="testimonials">
        <Testimonials />
      </Element>
      <Element name="contact">
        <Contact />
      </Element>
    </>
  );
}

export default Home;
