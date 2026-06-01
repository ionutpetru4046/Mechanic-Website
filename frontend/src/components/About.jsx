import { FiTarget, FiStar, FiUsers } from 'react-icons/fi';
import './About.css';

function About() {
  return (
    <section className="about section">
      <div className="section-inner">
        <p className="section-eyebrow">About us</p>
        <h2 className="section-title about__title">
          Your local garage, done right
        </h2>
        <p className="section-subtitle about__intro">
          With over <strong>20 years</strong> in Dublin, we deliver honest
          repairs, clear quotes, and work you can trust.
        </p>

        <div className="about__grid">
          <article className="about__card">
            <h3>
              <FiTarget className="about__icon" aria-hidden />
              Our mission
            </h3>
            <p>
              Keep every vehicle safe and reliable. We put{' '}
              <strong>quality workmanship</strong> and{' '}
              <strong>customer satisfaction</strong> first.
            </p>
          </article>

          <article className="about__card">
            <h3>
              <FiStar className="about__icon" aria-hidden />
              Why choose us
            </h3>
            <ul className="about__list">
              <li>Certified, experienced mechanics</li>
              <li>Fast turnaround & fair pricing</li>
              <li>Quality parts & modern diagnostics</li>
              <li>Friendly, transparent communication</li>
            </ul>
          </article>
        </div>

        <article className="about__team">
          <h3>
            <FiUsers className="about__icon" aria-hidden />
            Our team
          </h3>
          <p>
            A skilled crew passionate about cars — committed to the best service
            for every customer who walks through our door.
          </p>
        </article>
      </div>
    </section>
  );
}

export default About;
