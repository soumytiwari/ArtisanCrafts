// Email Notification (SendGrid Example)

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendOrderStatusUpdate = async (email, order, status, message) => {
  const msg = {
    to: email,
    from: 'no-reply@yourdomain.com',
    subject: `Order #${order.id} - Status Update`,
    text: `Your order status has been updated to ${status}. ${message}`,
    html: `<p>Your order status has been updated to <strong>${status}</strong>. ${message}</p>`,
  };
  await sgMail.send(msg);
};

// Call this function after updating the order status
sendOrderStatusUpdate(user.email, order, status, message);


// NOTE: usesendGrid