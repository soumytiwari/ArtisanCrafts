// Stripe Payment Handling

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/payments', async (req, res) => {
  const { paymentMethodId, orderId, amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects the amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    if (paymentIntent.status === 'succeeded') {
      await Orders.update({ status: 'processing' }, { where: { id: orderId } });
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: 'Payment failed' });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});