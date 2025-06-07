import { Element } from "react-scroll";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import About from "../components/About";
import Contact from "../components/Contact";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

function Home() {
  return (
    <>
    <Element name="home">      
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          margin: 0,
          padding: 0,
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url('/background-image.avif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
          }}
        />
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)", // Adjust opacity as needed
            zIndex: 2,
          }}
        />
        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              lineHeight: "70px",
              textAlign: "center",
              color: "#fff",
              textShadow: "2px 2px 8px #000",
            }}
          >
            🏠 Welcome to Expert Automotive! 🏠 <br />
            🛠️ Your Trusted Mechanic in Town! 🛠️
          </h1>
        </div>
      </div>
      </Element>

       <Element name="about">
          <About />
      </Element>

      <Element name="services">
        <Services />
      </Element>

      <Element name="testimonials">
        <Testimonials />
      </Element>

      <Element name="contact">
        <Contact />  
       </Element>
       <Element name="Login">
        <Login />  
       </Element>
       <Element name="Register">
        <Register />  
       </Element>
    </>
  );
}

export default Home;