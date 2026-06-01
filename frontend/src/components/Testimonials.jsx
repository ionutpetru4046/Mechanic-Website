import { Star } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Hellen Horan',
    review:
      'Always helpful, reliable and straightforward. Repairs are fairly priced and done on the agreed date.',
    rating: 5,
    photo: '/images/helen.png',
  },
  {
    name: 'William Landale',
    review:
      'New battery fitted — very professional. Very happy with the experience.',
    rating: 5,
    photo: '/images/william.png',
  },
  {
    name: 'Gal Hanukaev',
    review: 'They consistently over-deliver. Absolutely brilliant service.',
    rating: 5,
    photo: '/images/Gal.png',
  },
  {
    name: 'Stefan Giurgila',
    review:
      'Got my own clutch kit fitted — the car feels much better. Top notch job. Would recommend.',
    rating: 5,
    photo: '/images/stefan.png',
  },
  {
    name: 'Patrick Horan',
    rating: 5,
    review:
      'Very impressed. Slotted me in at a convenient time and finished when promised. Recommend 100%.',
    photo: '/images/patrick.png',
  },
  {
    name: 'Donal M.',
    rating: 5,
    review:
      'New tyres at a decent price and great service. A pleasure to deal with.',
    photo: '/images/Donal.png',
  },
];

function Testimonials() {
  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < rating ? 'testimonials__star--filled' : 'testimonials__star'
        }
        aria-hidden
      />
    ));

  return (
    <section className="testimonials section">
      <div className="section-inner">
        <p className="section-eyebrow">Reviews</p>
        <h2 className="section-title">What our clients say</h2>
        <p className="section-subtitle">
          Real feedback from drivers across Dublin.
        </p>

        <div className="testimonials__grid">
          {testimonials.map((item) => (
            <article className="testimonials__card" key={item.name}>
              <img
                src={item.photo}
                alt=""
                className="testimonials__photo"
                loading="lazy"
              />
              <div
                className="testimonials__stars"
                aria-label={`${item.rating} out of 5 stars`}
              >
                {renderStars(item.rating)}
              </div>
              <blockquote className="testimonials__quote">
                &ldquo;{item.review}&rdquo;
              </blockquote>
              <cite className="testimonials__name">{item.name}</cite>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
