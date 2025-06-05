function Navbar({ isDarkMode, toggleTheme }) {
  const navbarStyle = {
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: isDarkMode ? "#333" : "#e2e2e2",
    color: isDarkMode ? "#f2f2f2" : "#1a1a1a",
  };

  return (
    <nav style={navbarStyle}>
      <img
        src="/expert automotive.jpg"
        alt="MechanicPro Logo"
        style={{ height: "80px", cursor: "pointer", borderRadius: "60%", hover: { transform: "scale(1.8)" } }}
        />
        <button style={{ padding: "10px", cursor: "pointer" }} onClick={toggleTheme}>
        Switch to {isDarkMode ? "Light" : "Dark"} Mode
      </button>
    </nav>
  );
}

export default Navbar;