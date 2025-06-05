function Footer({ isDarkMode }) {
  const footerStyle = {
    padding: "1rem",
    textAlign: "center",
    background: isDarkMode ? "#222" : "#eee",
    color: isDarkMode ? "#fff" : "#000",
  };

  return (
    <footer style={footerStyle}>
      <p>&copy; {new Date().getFullYear()} Expert Automotive. All rights reserved.</p>
    </footer>
  );
}

export default Footer;