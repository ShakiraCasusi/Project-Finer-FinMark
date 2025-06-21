const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendResetEmail = async (email, token) => {
  const resetLink = `http://localhost:3000/reset/${token}`;
  const msg = {
    to: email,
    from: process.env.FROM_EMAIL,
    subject: 'Reset Your FinMark Password',
    html: `
      <h3>Password Reset Request</h3>
      <p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 1 hour.</p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error('❌ SendGrid error:', error.response?.body || error.message);
    
    // NEW: Don't crash the server — instead fail gracefully
    throw new Error('Email sending failed — check your API key or sender address.');
  }
};

module.exports = sendResetEmail;
