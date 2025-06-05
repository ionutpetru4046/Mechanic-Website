import "./Services.css";

import oilImg from "../assets/oil-change.jpg";
import brakeImg from "../assets/brake-repairs.jpg";
import engineImg from "../assets/engine-diagnostic.jpg";
import wheelImg from "../assets/wheel-alignment.jpg";
import acImg from "../assets/ac-repair.jpg";

const services = [
  {
    title: "Oil Change",
    description: "High-quality oil and filter replacements to keep your engine running smoothly.",
    image: oilImg,
  },
  {
    title: "Brake Repair",
    description: "We inspect, repair, and replace brakes with guaranteed performance parts.",
    image: brakeImg,
  },
  {
    title: "Engine Diagnostics",
    description: "Advanced diagnostic tools to detect and fix engine problems accurately.",
    image: engineImg,
  },
  {
    title: "Wheel Alignment",
    description: "Ensure your wheels are aligned properly for smooth and safe driving.",
    image: wheelImg,
  },
  {
    title: "AC & Heating Repair",
    description: "We maintain and repair air conditioning systems for year-round comfort.",
    image: acImg,
  },
];

function Services() {
  return (
    <div className="services-page">
      <h2>Our Services</h2>
      <div className="services-list">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.image} alt={service.title} className="service-img" />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
