import { useState } from "react";
import styles from "./BookingForm.module.css";

function BookingForm() {
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!service || !date || !time) {
      setError("Please fill in service, date, and time.");
      setSuccess("");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ service, date, time, notes }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Booking failed");
      }

      const data = await response.json();
      setSuccess("Booking successful!");
      setError("");
      setService("");
      setDate("");
      setTime("");
      setNotes("");
      console.log("Booking response:", data);
    } catch (err) {
      setError(err.message);
      setSuccess("");
      console.error("Booking failed:", err);
    }
  };

  return (
    <form className={styles.formCard} onSubmit={handleSubmit}>
      <div className={styles.formTitle}>Book a Service</div>
      {error && <div className={`${styles.message} ${styles.error}`}>{error}</div>}
      {success && <div className={`${styles.message} ${styles.success}`}>{success}</div>}

      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Service</label>
        <input
          className={styles.input}
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Service"
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Date</label>
        <input
          className={styles.input}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Time</label>
        <input
          className={styles.input}
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>Notes</label>
        <textarea
          className={styles.textarea}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
        />
      </div>
      <button className={styles.button} type="submit">Book</button>
    </form>
  );
}

export default BookingForm;