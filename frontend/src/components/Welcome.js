import React from 'react';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #6B7280, #1E293B)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial, sans-serif', color: '#FFFFFF', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', padding: '40px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '15px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Welcome to ExpirySync</h1>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>A dual-dashboard system to manage and recommend near-expiry inventory.</p>
        <ol style={{ textAlign: 'left', marginBottom: '30px' }}>
          <li style={{ fontSize: '16px', marginBottom: '10px' }}> Log in with your email (admin@walmartadmin.com for admin, user@example.com for customer).</li>
          <li style={{ fontSize: '16px', marginBottom: '10px' }}> Admins can add items with quantity and expiry date.</li>
          <li style={{ fontSize: '16px', marginBottom: '10px' }}> Customers see near-expiry deals (50% off if expiring today).</li>
          <li style={{ fontSize: '16px' }}> Enjoy managing inventory efficiently!</li>
        </ol>
        <button onClick={goToLogin} style={{ padding: '12px 30px', background: '#3B82F6', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', transition: 'background 0.3s' }}>
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default Welcome;