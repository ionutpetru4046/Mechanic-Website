import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-page__panel">
        <div className="auth-page__brand">
          <span className="auth-page__logo">Expert Automotive</span>
          <p className="auth-page__tagline">
            Book services, track appointments, manage your account.
          </p>
        </div>
      </div>

      <div className="auth-page__formWrap">
        <div className="auth-card">
          <h1>{isLogin ? 'Welcome back' : 'Create account'}</h1>
          <p className="auth-card__sub">
            {isLogin
              ? 'Sign in to your account'
              : 'Join Expert Automotive today'}
          </p>

          {isLogin ? <Login /> : <Register />}

          <p className="auth-card__toggle">
            {isLogin ? (
              <>
                No account?{' '}
                <button type="button" onClick={() => setIsLogin(false)}>
                  Register
                </button>
              </>
            ) : (
              <>
                Already registered?{' '}
                <button type="button" onClick={() => setIsLogin(true)}>
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
