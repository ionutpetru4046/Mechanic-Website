import styles from "./Home.module.css";

function Home() {
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
      </div>
    </div>
  );
}

export default Home;