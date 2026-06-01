import './Services.css';

import oilImg from '../assets/oil-change.jpg';
import brakeImg from '../assets/brake-repairs.jpg';
import engineImg from '../assets/engine-diagnostic.jpg';
import wheelImg from '../assets/wheel-alignment.jpg';
import acImg from '../assets/ac-repair.jpg';
import nctImg from '../assets/nct-banner.webp';
import tyresImg from '../assets/tyres.jpg';

const services = [
  {
    title: 'Oil Change',
    description:
      'Premium oil and filters to keep your engine running smoothly.',
    image: oilImg,
  },
  {
    title: 'Brake Repair',
    description: 'Inspection, repair and replacement with quality parts.',
    image: brakeImg,
  },
  {
    title: 'Engine Diagnostics',
    description: 'Advanced tools to find and fix issues accurately.',
    image: engineImg,
  },
  {
    title: 'Wheel Alignment',
    description: 'Precise alignment for safer, smoother driving.',
    image: wheelImg,
  },
  {
    title: 'AC & Heating',
    description: 'Stay comfortable year-round with expert HVAC service.',
    image: acImg,
  },
  {
    title: 'NCT Repairs',
    description: 'Fast fixes so your car passes inspection first time.',
    image: nctImg,
  },
  {
    title: 'Tyres',
    description: 'Supply and fit quality tyres at competitive prices.',
    image: tyresImg,
  },
];

function Services() {
  return (
    <section className="services section">
      <div className="section-inner">
        <p className="section-eyebrow">What we do</p>
        <h2 className="section-title">Services we offer</h2>
        <p className="section-subtitle">
          From routine maintenance to complex repairs — all under one roof.
        </p>

        <div className="services__grid">
          {services.map((service) => (
            <article className="services__card" key={service.title}>
              <div className="services__imageWrap">
                <img
                  src={service.image}
                  alt=""
                  className="services__image"
                  loading="lazy"
                />
              </div>
              <div className="services__body">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
