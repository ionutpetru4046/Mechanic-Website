import "./Testimonials.css";

const testimonials = [
  {
    name: "John D.",
    review: "Excellent service! Got my car fixed in no time. Highly recommend!",
  },
  {
    name: "Sarah M.",
    review: "Professional and friendly team. Very happy with the results.",
  },
  {
    name: "Carlos T.",
    review: "Great prices and even better service. Will return for sure!",
  },
  {
    name: "Stefan Giurgila.",
    review: "Got my own parts(Clutch kit) and just needed to get it fitted. They were happy to get it done and the car now feels much better. Top notch job by Sergiu. Would recommend!",
  },
  {
    name: "Patrick Horan.",
    review: "Very impressed by the work these lads did on my car. They slotted me in at a convenient time and the work was finished when they said it would. Recommend 100%.",
  },
  {
    name: "Donal M.",
    review: "Got new tyres here. Decent price and great service. It was a pleasure to deal with these guys.!",
  },
];

function Testimonials() {
  return (
    <section className="testimonials">
      <h2>What Our Clients Say</h2>
      <div className="testimonial-cards">
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <p className="review">"{item.review}"</p>
            <p className="name">– {item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;