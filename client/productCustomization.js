// Product Customization

import React, { useState } from 'react';
import axios from 'axios';

function CustomizeProduct({ product }) {
  const [customization, setCustomization] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/orders', { product_id: product.id, customization_details: customization }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Order placement failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Customize {product.name}</h2>
      <textarea onChange={(e) => setCustomization(e.target.value)} placeholder="Describe your customization" required />
      <button type="submit">Place Order</button>
    </form>
  );
}