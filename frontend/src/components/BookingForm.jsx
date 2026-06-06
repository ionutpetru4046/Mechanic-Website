/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import styles from './BookingForm.module.css';

function BookingForm() {
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!service || !date || !time) {
      setError('Please fill in service, date, and time.');
      setSuccess('');
      return;
    }

    try {
      const response = await API.post('/bookings', {
        service,
        date,
        time,
        notes,
      });

      setSuccess('Booking successful!');
      setError('');
      setService('');
      setDate('');
      setTime('');
      setNotes('');

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Booking failed');
      setSuccess('');
      console.error('Booking failed:', err);
    }
  };

  return (
    <form className={styles.formCard} onSubmit={handleSubmit}>
      <div className={styles.formTitle}>Book a Service</div>
      {error && (
        <div className={`${styles.message} ${styles.error}`}>{error}</div>
      )}
      {success && (
        <div className={`${styles.message} ${styles.success}`}>{success}</div>
      )}

      <div className={styles.inputGroup}>
        <label htmlFor="service" className={styles.inputLabel}>
          Service
        </label>
        <input
          id="service"
          className={styles.input}
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Service"
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="date" className={styles.inputLabel}>
          Date
        </label>
        <input
          id="date"
          className={styles.input}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="time" className={styles.inputLabel}>
          Time
        </label>
        <input
          id="time"
          className={styles.input}
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="notes" className={styles.inputLabel}>
          Notes
        </label>
        <textarea
          id="notes"
          className={styles.textarea}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
        />
      </div>
      <button className={styles.button} type="submit">
        Book Now
      </button>
    </form>
  );
}

export default BookingForm;
