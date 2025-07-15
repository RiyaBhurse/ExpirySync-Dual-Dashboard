import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function CustomerDashboard() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('/customer/recommendations', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log('Recommendations response:', response.data); // Debug log
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations', error);
        alert('Failed to load recommendations');
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #6B7280, #1E293B)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)', maxWidth: '450px', width: '100%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E293B', marginBottom: '25px' }}>Customer Dashboard</h2>
        <h3 style={{ fontSize: '20px', color: '#374151', marginBottom: '15px' }}>Near-Expiry Deals</h3>
        <ul style={{ paddingLeft: '20px', listStyleType: 'disc', textAlign: 'left' }}>
          {recommendations.map((rec) => (
            <li key={rec.item} style={{ marginBottom: '15px', fontSize: '16px', color: '#1F2937' }}>
              {rec.item} - {rec.discount > 0 ? `${rec.discount * 100}% off` : 'Donation'} (Action: {rec.action})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CustomerDashboard;