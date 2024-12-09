// Email Notification (SendGrid Example)

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    };
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, status, message) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status, message });
      setOrders(orders.map(order => order.id === orderId ? { ...order, status } : order));
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Product ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user_id}</td>
              <td>{order.product_id}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => handleStatusUpdate(order.id, 'processing', 'Order is being processed')}>Processing</button>
                <button onClick={() => handleStatusUpdate(order.id, 'shipped', 'Order has been shipped')}>Shipped</button>
                <button onClick={() => handleStatusUpdate(order.id, 'delivered', 'Order delivered successfully')}>Delivered</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}