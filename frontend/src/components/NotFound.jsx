import React from 'react';

function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ece9f7 0%, #e8f0fe 100%)',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '24px',
          boxShadow: '0 4px 24px rgba(60,72,100,0.12)',
          padding: '48px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '370px',
        }}
      >
        <div
          style={{
            fontSize: '68px',
            marginBottom: '18px',
            color: '#6d62f8',
          }}
          aria-label="Page Not Found"
        >
          🚧
        </div>
        <h1
          style={{
            fontSize: '2rem',
            color: '#31344b',
            margin: '0 0 10px 0',
            fontWeight: '700',
            textAlign: 'center',
          }}
        >
          404 - Page Not Found
        </h1>
        <p
          style={{
            color: '#656d7a',
            fontSize: '1rem',
            margin: '0 0 28px 0',
            textAlign: 'center',
          }}
        >
          Sorry, we couldn&apos;t find the page you were looking for. It might
          have been removed or is temporarily unavailable.
        </p>
        <a
          href="/"
          style={{
            padding: '10px 28px',
            background: 'linear-gradient(92deg, #746cf8 0%, #5ea9ff 100%)',
            color: 'white',
            borderRadius: '20px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1rem',
            boxShadow: '0 2px 8px rgba(109,98,248,0.09)',
            transition: 'background 0.2s',
          }}
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;
