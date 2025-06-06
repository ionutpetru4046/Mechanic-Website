import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "./Layout.css";
import Footer from "./Footer";
import Testimonials from "./Testimonials";

function Layout({ isDarkMode, toggleTheme }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main style={{ flex: 1, }}>
        <Outlet />
      </main>
      <Testimonials />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}

export default Layout;