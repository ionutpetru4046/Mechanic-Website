import { useState } from 'react';
import API from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import styles from './AuthForm.module.css';

const Login = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/login', form);
      const { token, ...user } = res.data;

      if (!token) {
        throw new Error('Login succeeded but no token was returned');
      }

      login(user, token);

      const role = user.role?.toLowerCase() || 'user';
      if (role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Login error:', err);
      setError(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          className={styles.input}
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          className={styles.input}
          type="password"
          name="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
      </div>

      <button type="submit" className={styles.submit}>
        Sign in
      </button>
    </form>
  );
};

export default Login;
