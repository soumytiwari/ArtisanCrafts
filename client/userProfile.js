// User Profile Page

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    };

    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    };

    fetchUser();
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <p>Name: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.status}</td>
              <td>{order.total_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}