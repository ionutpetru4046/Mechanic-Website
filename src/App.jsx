import { useState } from "react";
import Navbar from "./NavBar";
import Footer from "./Footer"; // Import Footer

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const appStyle = {
    backgroundColor: isDarkMode ? "#1a1a1a" : "#f2f2f2",
    color: isDarkMode ? "#f2f2f2" : "#1a1a1a",
    height: "100vh",
    margin: 0,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    transition: "all 0.3s ease",
    backgroundImage: 'url("/image5.avif")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 1, // Add this line
  };

  return (
    <div style={appStyle}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main style={{ padding: "2rem", flex: 1 }}>
        
      </main>
      <Footer isDarkMode={isDarkMode} /> {/* Render Footer only once here */}
    </div>
  );
}

export default App;
// the app component is the main component of the application
