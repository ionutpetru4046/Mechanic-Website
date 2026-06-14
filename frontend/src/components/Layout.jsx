import { Outlet } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Navbar from './NavBar';
import Footer from './Footer';
import './Layout.css';

function Layout() {
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
