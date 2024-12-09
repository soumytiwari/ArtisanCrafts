// Payment Integration

import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_stripe_public_key');

const CheckoutForm = ({ orderId, totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    try {
      const response = await axios.post('/api/payments', { paymentMethodId: paymentMethod.id, orderId, amount: totalAmount });
      if (response.data.success) {
        alert('Payment successful!');
        // Redirect to order confirmation page
      } else {
        setError('Payment failed');
      }
    } catch (error) {
      setError('Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || processing}>
        Pay
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

const Payment = ({ orderId, totalAmount }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm orderId={orderId} totalAmount={totalAmount} />
    </Elements>
  );
};