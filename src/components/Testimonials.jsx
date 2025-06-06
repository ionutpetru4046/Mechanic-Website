import "./Testimonials.css";

const testimonials = [
  {
    name: "Hellen Horan.",
    review: "The staff in Expert Automotive are always helpful, reliable and straightforward to deal with. Their repairs are reasonably priced and completed on the agreed date.",
    rating: "5",
    photo: "/public/images/helen.png",
  },
  {
    name: "William Landale.",
    review: "new battery fitted, seemed very nice and professional. very happy with this experience. thanks!",
    rating: "5",
    photo: "/public/images/william.png",
  },
  {
    name: "Gal Hanukaev.",
    review: "The guys at Expert Automotive consistently over deliver with their service. Absolutely brilliant!",
    rating: "5",
    photo: "/public/images/Gal.png",
  },
  {
    name: "Stefan Giurgila.",
    review: "Got my own parts(Clutch kit) and just needed to get it fitted. They were happy to get it done and the car now feels much better. Top notch job by Sergiu. Would recommend!",
    rating: "5",
    photo: "/public/images/stefan.png",
  },
  {
    name: "Patrick Horan.",
    rating: "5",
    photo: "/public/images/patrick.png",
    review: "Very impressed by the work these lads did on my car. They slotted me in at a convenient time and the work was finished when they said it would. Recommend 100%.",
  },
  {
    name: "Donal M.",
    rating: "5",
    photo: "/public/images/Donal.png",
    review: "Got new tyres here. Decent price and great service. It was a pleasure to deal with these guys.!",
  },
];

function Testimonials() {
  const renderStars = (rating) => {
    return "★".repeat(rating) + "★".repeat(5 - rating);
  };

  return (
    <section className="testimonials">
      <h2>What Our Clients Say</h2>
      <div className="testimonial-cards">
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <img src={item.photo} alt={item.name} className="client-photo" />
            <p className="review">"{item.review}"</p>
            <p className="stars">{renderStars(item.rating)}</p>
            <p className="name">– {item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;