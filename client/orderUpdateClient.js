// Real-Time Order Updates with Socket.io (Continued)
// Client-Side Subscription to Order Updates

import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

function OrderDetails({ orderId }) {
  const [order, setOrder] = useState(null);
  const [updates, setUpdates] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://your-backend-url');

    const fetchOrder = async () => {
      const response = await axios.get(`/api/orders/${orderId}`);
      setOrder(response.data);
    };

    const fetchUpdates = async () => {
      const response = await axios.get(`/api/orders/${orderId}/updates`);
      setUpdates(response.data);
    };

    socketRef.current.on('orderStatusUpdate', (data) => {
      if (data.orderId === orderId) {
        setOrder(prevOrder => ({ ...prevOrder, status: data.status }));
        setUpdates(prevUpdates => [...prevUpdates, { status: data.status, message: data.message }]);
      }
    });

    fetchOrder();
    fetchUpdates();

    return () => {
      socketRef.current.disconnect();
    };
  }, [orderId]);

  return (
    <div>
      <h1>Order Details</h1>
      {order && (
        <div>
          <p>Order ID: {order.id}</p>
          <p>User ID: {order.user_id}</p>
          <p>Product ID: {order.product_id}</p>
          <p>Status: {order.status}</p>
          <p>Customization Details: {order.customization_details}</p>
          <p>Total Amount: {order.total_amount}</p>
        </div>
      )}
      <h2>Order Updates</h2>
      <ul>
        {updates.map(update => (
          <li key={update.id}>
            <strong>{update.status}</strong>: {update.message}
          </li>
        ))}
      </ul>
    </div>
  );
}