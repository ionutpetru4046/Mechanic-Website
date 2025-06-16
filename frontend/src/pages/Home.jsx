/* eslint-disable prettier/prettier */
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/book-now');
  };

  return (
    <div className={styles.backgroundWrapper}>
      {/* Background image */}
      <div className={styles.backgroundImage} />
      {/* Overlay */}
      <div className={styles.overlay} />
      {/* Content */}
      <div className={styles.content}>
        <h1 className={styles.heading}>Professional Car Repair at Your Fingertips</h1>
        <p className={styles.paragraph}>
        🛠️ Your trusted mechanic, now online. Fast. Reliable. Local. 🛠️
        </p>
        <div>
          <button className={styles.bookNowButton} onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
