import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Contact from "./components/Contact";



function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <BrowserRouter>
    <div className={isDarkMode ? "dark" : "light"}>
      <Routes>
        <Route element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme} />}>
          <Route index element={<Home />} />          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />

          {/* Optional: 404 page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;