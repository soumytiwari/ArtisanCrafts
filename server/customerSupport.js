// Example: Customer Support Chat
// Backend (Node.js with Socket.io)

io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('sendMessage', (data) => {
      const { userId, orderId, message } = data;
      io.emit('message', { user: 'customer', message });
  
      // Save message to database
      Messages.create({
        user_id: userId,
        order_id: orderId,
        message,
        role: 'customer'
      });
  
      // Simulate support response
      setTimeout(() => {
        const supportMessage = 'Thank you for your message. We are looking into it.';
        io.emit('message', { user: 'support', message: supportMessage });
  
        // Save support response to database
        Messages.create({
          user_id: null,
          order_id: orderId,
          message: supportMessage,
          role: 'support'
        });
      }, 1000);
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });