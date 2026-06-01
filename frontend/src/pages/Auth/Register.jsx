import { useState } from 'react';
import API from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import styles from './AuthForm.module.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/register', form);
      const { token, ...user } = res.data;
      if (token) {
        login(user, token);
        navigate('/dashboard');
      } else {
        navigate('/auth');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Full name
        </label>
        <input
          id="name"
          className={styles.input}
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="reg-email" className={styles.label}>
          Email
        </label>
        <input
          id="reg-email"
          className={styles.input}
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="reg-password" className={styles.label}>
          Password
        </label>
        <input
          id="reg-password"
          className={styles.input}
          type="password"
          name="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
      </div>

      <button type="submit" className={styles.submit}>
        Create account
      </button>
    </form>
  );
};

export default Register;
