import BookingForm from '../components/BookingForm';
import styles from './BookNow.module.css';

const BookNow = () => {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <p className="section-eyebrow">Appointments</p>
        <h1 className={styles.title}>Book a service</h1>
        <p className={styles.subtitle}>
          Pick a date and time — we will confirm your booking shortly.
        </p>
        <BookingForm />
      </div>
    </div>
  );
};

export default BookNow;
