// Example: Customer Support Chat
// Frontend (React with Socket.io)

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

function ChatWidget({ userId, orderId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://your-backend-url');

    socketRef.current.on('message', (msg) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    socketRef.current.emit('sendMessage', { userId, orderId, message });

    setMessages(prevMessages => [...prevMessages, { user: 'customer', message }]);
    setMessage('');
  };

  return (
    <div>
      <h2>Chat Support</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index} style={{ textAlign: msg.user === 'customer' ? 'right' : 'left' }}>
            <strong>{msg.user === 'customer' ? 'You' : 'Support'}:</strong> {msg.message}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}