import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import BookNow from './pages/BookNow';
import MyBookings from './pages/MyBookings';
import AuthPage from './pages/Auth/AuthPage';
import './index.css';

function App() {
  const location = useLocation();
  const NO_NAV_FOOTER_ROUTES = ['/dashboard', '/auth', '/login', '/register'];
  const hideNavFooter = NO_NAV_FOOTER_ROUTES.includes(location.pathname);
  return (
    <>
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book-now" element={<BookNow />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
      {!hideNavFooter && <Footer />}
    </>
  );
}

export default App;
