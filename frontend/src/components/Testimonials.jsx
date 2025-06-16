/* eslint-disable prettier/prettier */
import './Testimonials.css';
import { Star } from 'lucide-react'; // using lucide-react icons for stars

const testimonials = [
  {
    name: 'Hellen Horan.',
    review:
      'The staff in Expert Automotive are always helpful, reliable and straightforward to deal with. Their repairs are reasonably priced and completed on the agreed date.',
    rating: 5,
    photo: '/images/helen.png',
  },
  {
    name: 'William Landale.',
    review:
      'New battery fitted, seemed very nice and professional. Very happy with this experience. Thanks!',
    rating: 5,
    photo: '/images/william.png',
  },
  {
    name: 'Gal Hanukaev.',
    review:
      'The guys at Expert Automotive consistently over deliver with their service. Absolutely brilliant!',
    rating: 5,
    photo: '/images/Gal.png',
  },
  {
    name: 'Stefan Giurgila.',
    review:
      'Got my own parts(Clutch kit) and just needed to get it fitted. They were happy to get it done and the car now feels much better. Top notch job by Sergiu. Would recommend!',
    rating: 5,
    photo: '/images/stefan.png',
  },
  {
    name: 'Patrick Horan.',
    rating: 5,
    review:
      'Very impressed by the work these lads did on my car. They slotted me in at a convenient time and the work was finished when they said it would. Recommend 100%.',
    photo: '/images/patrick.png',
  },
  {
    name: 'Donal M.',
    rating: 5,
    review:
      'Got new tyres here. Decent price and great service. It was a pleasure to deal with these guys.!',
    photo: '/images/Donal.png',
  },
];

function Testimonials() {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={18}
          className={i <= rating ? 'star-filled' : 'star-empty'}
          aria-hidden="true"
        />
      );
    }
    return stars;
  };

  return (
    <section className="testimonials">
      <h2 className="section-title">What Our Clients Say</h2>
      <div className="testimonial-cards">
        {testimonials.map((item, index) => (
          <article className="testimonial-card" key={index}>
            <img
              src={item.photo}
              alt={item.name}
              className="client-photo"
              loading="lazy"
            />
            <p className="review">“{item.review}”</p>
            <div className="stars" aria-label={`${item.rating} out of 5 stars`}>
              {renderStars(item.rating)}
            </div>
            <p className="name">– {item.name}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
