// src/context/authContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch full user profile on app load
      const fetchUser = async () => {
        try {
          const res = await API.get('/users/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const loadedUser = { ...res.data, token };
          setUser(loadedUser); // store user data + token
          // runtime debug: log loaded user for troubleshooting role-based routes
          // (Remove or guard this in production)
          // eslint-disable-next-line no-console
          console.log('AuthProvider: loaded user', loadedUser);
        } catch {
          // invalid token or fetch failed
          localStorage.removeItem('token');
          setUser(null);
          // eslint-disable-next-line no-console
          console.log('AuthProvider: failed to load user (invalid token)');
        } finally {
          setLoadingAuth(false);
        }
      };
      fetchUser();
    } else {
      setLoadingAuth(false);
      // eslint-disable-next-line no-console
      console.log('AuthProvider: no token found');
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setUser({ ...userData, token });
    // eslint-disable-next-line no-console
    console.log('AuthProvider: login', { ...userData, token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/auth';
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, loadingAuth, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
