// Order Management

const express = require('express');
const { Orders, OrderUpdates } = require('./models-mongodb');

const router = express.Router();

router.post('/orders', async (req, res) => {
  const { product_id, customization_details } = req.body;
  const { userId } = req.user; // Assuming user is authenticated
  const order = await Orders.create({
    user_id: userId,
    product_id,
    status: 'pending',
    customization_details,
    total_amount: 0 // Calculate based on product price and customization
  });
  await OrderUpdates.create({
    order_id: order.id,
    status: 'pending',
    message: 'Order received'
  });
  res.json({ message: 'Order placed successfully', orderId: order.id });
});

router.put('/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, message } = req.body;
  await Orders.update({ status }, { where: { id } });
  await OrderUpdates.create({
    order_id: id,
    status,
    message
  });
  res.json({ message: 'Order status updated' });
});

module.exports = router;