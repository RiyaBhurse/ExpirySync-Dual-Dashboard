import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email });
      console.log('Login response:', response.data); // Debug log
      localStorage.clear(); // Clear existing storage
      localStorage.setItem('token', response.data.token);
      if (response.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/customer');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #6B7280, #1E293B)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)', maxWidth: '450px', width: '100%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E293B', marginBottom: '25px' }}>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '2px solid #D1D5DB', borderRadius: '8px', outline: 'none', fontSize: '16px' }}
        />
        <button onClick={handleLogin} style={{ width: '100%', padding: '12px', background: '#3B82F6', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', transition: 'background 0.3s' }}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;