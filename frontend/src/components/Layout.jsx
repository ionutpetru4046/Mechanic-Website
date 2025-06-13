import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";
import "./Layout.css";
import Footer from "./Footer";


function Layout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
       <Navbar />  
        <main>
          <Outlet />
        </main>
       <Footer />
    </div>
  );
}

export default Layout;