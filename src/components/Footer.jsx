import "./Footer.css";

function Footer({ isDarkMode }) {
  const footerStyle = {
    padding: "1rem",
    textAlign: "center",
    background: isDarkMode ? "#222" : "#eee",
    color: isDarkMode ? "#fff" : "#000",
  };

  return (
    <footer style={footerStyle}>
      <div className="footer-content">
        <h3>Our Program</h3>
        <ul className="schedule">
          <li><strong>Monday:</strong> 8am - 5pm </li>
          <li><strong>Tuesday:</strong> 8am - 5pm </li>
          <li><strong>Wednesday:</strong> 8am - 5pm </li>
          <li><strong>Thursday:</strong> 8 am - 5pm </li>
          <li><strong>Friday:</strong> 9am - 5pm </li>
          <li><strong>Saturday:</strong> 9am - 1pm </li>
          <li><strong>Sunday:</strong> Closed</li>
        </ul>
        <p>&copy; {new Date().getFullYear()} Expert Automotive. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;