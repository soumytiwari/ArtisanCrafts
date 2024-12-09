// Real-Time Order Updates with Socket.io

const io = require('socket.io')(server, {
    cors: {
      origin: 'http://your-frontend-url',
    },
  });
  
  const sendOrderStatusUpdate = async (socket, order, status, message) => {
    socket.emit('orderStatusUpdate', { orderId: order.id, status, message });
    await OrderUpdates.create({
      order_id: order.id,
      status,
      message,
    });
  };
  
  io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('subscribeToOrder', (orderId) => {
      console.log(`User subscribed to order ${orderId}`);
      socket.join(`order_${orderId}`);
    });
  
    socket.on('updateOrderStatus', async (data) => {
      const { orderId, status, message } = data;
      const order = await Orders.findByPk(orderId);
      if (order) {
        await Orders.update({ status }, { where: { id: orderId } });
        io.to(`order_${orderId}`).emit('orderStatusUpdate', { orderId, status, message });
      }
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });