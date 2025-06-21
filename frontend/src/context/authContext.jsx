// src/context/authContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch full user profile on app load
      const fetchUser = async () => {
        try {
          const VITE_API_URL = import.meta.env.VITE_API_URL;
          const res = await axios.get(`${VITE_API_URL}/api/users/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser({ ...res.data, token }); // store user data + token
        } catch {
          // invalid token or fetch failed
          localStorage.removeItem('token');
          setUser(null);
        } finally {
          setLoadingAuth(false);
        }
      };
      fetchUser();
    } else {
      setLoadingAuth(false);
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setUser({ ...userData, token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/auth';
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
