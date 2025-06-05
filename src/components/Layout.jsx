import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Layout.css";

function Layout({ isDarkMode, toggleTheme }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main style={{ flex: 1, padding: "2rem" }}>
        <Outlet />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default Layout;