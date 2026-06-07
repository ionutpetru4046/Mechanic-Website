import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import API from '../api/api';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [status, setStatus] = useState({ message: '', error: '', loading: false });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name || '', email: user.email || '', password: '' });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setStatus({ message: '', error: '', loading: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ message: '', error: '', loading: true });

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
      };

      if (formData.password.trim()) {
        payload.password = formData.password.trim();
      }

      const response = await API.put('/users/profile', payload);
      setUser(response.data);
      setStatus({ message: 'Profile updated successfully.', error: '', loading: false });
      setFormData((prev) => ({ ...prev, password: '' }));
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Unable to update profile';
      setStatus({ message: '', error: errorMessage, loading: false });
      console.error('Profile update failed:', err);
    }
  };

  if (!user) {
    return <div className={styles.pageShell}>Loading profile...</div>;
  }

  return (
    <div className={styles.pageShell}>
      <div className={styles.pageHeader}>
        <p className={styles.sectionEyebrow}>Account</p>
        <h1 className={styles.pageTitle}>My Profile</h1>
        <p className={styles.pageSubtitle}>
          Keep your account information up to date to make booking faster.
        </p>
      </div>

      <form className={styles.profileForm} onSubmit={handleSubmit}>
        {status.error && <div className={styles.toastError}>{status.error}</div>}
        {status.message && <div className={styles.toastSuccess}>{status.message}</div>}

        <label className={styles.fieldLabel} htmlFor="name">
          Full Name
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={styles.inputField}
            placeholder="Your name"
            required
          />
        </label>

        <label className={styles.fieldLabel} htmlFor="email">
          Email Address
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.inputField}
            placeholder="you@example.com"
            required
          />
        </label>

        <label className={styles.fieldLabel} htmlFor="password">
          New Password
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.inputField}
            placeholder="Leave blank to keep current password"
          />
        </label>

        <button className={styles.primaryButton} type="submit" disabled={status.loading}>
          {status.loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
