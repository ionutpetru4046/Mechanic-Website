import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {

  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/dashboard");
  }

  return (
    <div className={styles.backgroundWrapper}>
      {/* Background image */}
      <div className={styles.backgroundImage} />
      {/* Overlay */}
      <div className={styles.overlay} />
      {/* Content */}
      <div className={styles.content}>
        <h1 className={styles.heading}>
          🏠 Welcome to Expert Automotive! 🏠 <br />
          🛠️ Your Trusted Mechanic in Town! 🛠️
        </h1>
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