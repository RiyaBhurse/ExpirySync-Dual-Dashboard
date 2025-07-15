import React, { useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handleAddItem = async () => {
  if (!item.trim() || !quantity || !expiryDate) {
    alert('Please fill all fields');
    return;
  }
  const parsedQuantity = parseInt(quantity);
  if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
    alert('Quantity must be a positive number');
    return;
  }
  const payload = { item: item.trim(), quantity: parsedQuantity, expiry_date: expiryDate };
  console.log('Token:', localStorage.getItem('token')); // Debug log
  try {
    const response = await axios.post(
      'http://localhost:5000/admin/inventory',
      payload,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    alert('Item added: ' + response.data.message);
    setItem(''); setQuantity(''); setExpiryDate('');
  } catch (error) {
    console.error('Error adding item:', error.response?.data || error);
    alert(`Failed to add item: ${error.response?.data?.error || 'Network error'}`);
  }
};

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #6B7280, #1E293B)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: '#FFFFFF', padding: '30px', borderRadius: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)', maxWidth: '450px', width: '100%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E293B', marginBottom: '25px' }}>Admin Dashboard</h2>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Item name"
          style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '2px solid #D1D5DB', borderRadius: '8px', outline: 'none', fontSize: '16px' }}
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '2px solid #D1D5DB', borderRadius: '8px', outline: 'none', fontSize: '16px' }}
        />
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '2px solid #D1D5DB', borderRadius: '8px', outline: 'none', fontSize: '16px' }}
        />
        <button onClick={handleAddItem} style={{ width: '100%', padding: '12px', background: '#3B82F6', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', transition: 'background 0.3s' }}>
          Add Item
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;