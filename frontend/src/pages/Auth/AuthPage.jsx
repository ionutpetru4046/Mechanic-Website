/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Login from '../Auth/Login';       // adjust paths as needed
import Register from '../Auth/Register';
import './AuthPage.css';                              // optional CSS styling

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
              <span onClick={() => setIsLogin(false)}>Register</span>
            </p>
          ) : (
            <p>
              Already registered?{" "}
              <span onClick={() => setIsLogin(true)}>Login</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
