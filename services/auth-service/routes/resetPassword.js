const express = require('express');
const crypto = require('crypto');
const moment = require('moment');
const bcrypt = require('bcrypt');
const ResetToken = require('../models/ResetToken');
const User = require('../models/User');
const sendResetEmail = require('../utils/sendEmail');

const router = express.Router();

// STEP 1: Request password reset
router.post('/request-password-reset', async (req, res) => {
  try {
    const { email } = req.body;

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = moment().add(1, 'hour').toDate();

    await ResetToken.create({ email, token, expiresAt });

    // Always print token for manual use
    console.log(`📌 Generated token for ${email}: ${token}`);

    // Try sending email (fallback to logs if failed)
    try {
      await sendResetEmail(email, token);
      console.log(`Email sent to ${email}`);
    } catch (err) {
      console.warn(`SendGrid error: ${err.message}`);
      console.warn(`Use this token manually: ${token}`);
    }

    res.status(200).json({
      message: 'Reset token generated. Check logs or email.',
    });
  } catch (error) {
    console.error('Error in /request-password-reset:', error.message);
    res.status(500).json({ error: 'Something went wrong in /request-password-reset.' });
  }
});

// STEP 2: Confirm password reset using token
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const resetToken = await ResetToken.findOne({ where: { token } });

    if (!resetToken) {
      return res.status(404).json({ error: 'Invalid or expired token.' });
    }

    if (new Date() > resetToken.expiresAt) {
      return res.status(410).json({ error: 'Token has expired.' });
    }

    const user = await User.findOne({ where: { email: resetToken.email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    await resetToken.destroy();

    console.log(`Password reset for: ${user.email}`);
    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    console.error('Error in /reset-password:', error.message);
    res.status(500).json({ error: 'Something went wrong in /reset-password.' });
  }
});

module.exports = router;
