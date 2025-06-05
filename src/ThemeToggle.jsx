function ThemeToggle({ isDarkMode, toggleTheme }) {
  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "20px",
    backgroundColor: isDarkMode ? "#444" : "#e0e0e0",
    color: isDarkMode ? "#f2f2f2" : "#1a1a1a",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "background 0.3s, color 0.3s",
  };

  return (
    <button style={buttonStyle} onClick={toggleTheme}>
      {isDarkMode ? "Light" : "Dark"} Mode
    </button>
  );
}

export default ThemeToggle;
