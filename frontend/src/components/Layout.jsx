import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import "./Layout.css";
import Footer from "./Footer";


function Layout({ isDarkMode, toggleTheme }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main>
        <Outlet />
      </main>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default Layout;