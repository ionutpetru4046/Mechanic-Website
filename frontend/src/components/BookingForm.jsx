/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import styles from './BookingForm.module.css';

const SERVICE_OPTIONS = [
  'Oil Change',
  'Brake Repair',
  'Engine Diagnostics',
  'Wheel Alignment',
  'AC Repair',
  'NCT Repair',
  'Tyre Service',
];

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
      setError('Please select a service, date, and time.');
      setSuccess('');
      return;
    }

    try {
      await API.post('/bookings', {
        service,
        date,
        time,
        notes,
      });

      setSuccess('Booking submitted successfully. Redirecting to dashboard...');
      setError('');
      setService('');
      setDate('');
      setTime('');
      setNotes('');

      setTimeout(() => {
        navigate('/dashboard');
      }, 600);
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
        <select
          id="service"
          className={styles.input}
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        >
          <option value="">Choose a service</option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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
          placeholder="Any relevant details or car notes"
        />
      </div>
      <button className={styles.button} type="submit">
        Book Now
      </button>
    </form>
  );
}

export default BookingForm;
