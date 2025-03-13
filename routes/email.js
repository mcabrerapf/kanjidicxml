require('dotenv').config();
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.get('/', (req, res) => {
  res.send('this is email route');
});

router.post('/send', async (req, res) => {
  const { email, subject = 'Subject of the email', message = "Message stuff" } = req.body || {};
  
  if (!email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: subject,
      text: `From: ${email} ${message}`,
    });

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;