// Admin Dashboard Enhancements
// Search and Filter Orders

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('/api/orders', {
        params: { search, status: statusFilter }
      });
      setOrders(response.data);
    };
    fetchOrders();
  }, [search, statusFilter]);

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
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order ID or user ID"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
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