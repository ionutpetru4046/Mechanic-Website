/* eslint-disable react/no-unescaped-entities *//* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-modern-wrapper">
      <div className="auth-modern-glass">
        <h2>{isLogin ? "Welcome Back 👋" : "Join Us Today 🚀"}</h2>
        <p>{isLogin ? "Login to your account" : "Create a new account"}</p>

        <div className="auth-modern-form">
          {isLogin ? <Login /> : <Register />}
        </div>

        <div className="auth-modern-toggle">
          {isLogin ? (
            <p>
              Don't have an account?{" "}
              <span
                role="button"
                tabIndex={0}
                onClick={() => setIsLogin(false)}
                onKeyDown={(e) => { if (e.key === 'Enter') setIsLogin(false); }}
                style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
              >
                Register
              </span>
            </p>
          ) : (
            <p>
              Already registered?{" "}
              <span
                role="button"
                tabIndex={0}
                onClick={() => setIsLogin(true)}
                onKeyDown={(e) => { if (e.key === 'Enter') setIsLogin(true); }}
                style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
              >
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
