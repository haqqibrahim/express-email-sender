const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(cors({ origin: ['https://rida-black.vercel.app','http://localhost:5173', 'https://ami-shop.vercel.app', 'https://ami-shop-git-contactform-agencyits-projects.vercel.app'] }));

// Setup Nodemailer transporter
const transporter_amishop = nodemailer.createTransport({
  service: "gmail", // or your preferred email service
  auth: {
    user: process.env.AMI_SHOP_EMAIL_USER,
    pass: process.env.AMI_SHOP_EMAIL_PASS,
  },
});

const transporter_rida = nodemailer.createTransport({
  service: "gmail", // or your preferred email service
  auth: {
    user: process.env.RIDA_EMAIL_USER,
    pass: process.env.RIDA_EMAIL_PASS,
  },
});


// Endpoint to receive text and send email
// Ami Shop
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required!' }); 
  }

  const mailOptions = {
    from: process.env.AMI_SHOP_EMAIL_USER,
    to: process.env.AMI_SHOP_RECEIVER_EMAIL, // receiver's email address
    subject: `New Message from ${name}`,
    text: `You have received a new message from ${name} (${email}):\n\n${message}`,
  };

  try {
    await transporter_amishop.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

// Endpoint to receive text and send email
//Rida
app.post('/rida/send-email', async (req, res) => {
  const { name, email,subject, message } = req.body;

  if (!name || !email || !message || !subject) {
    return res.status(400).json({ message: 'Name, email, subject and message are required!' });
  }

  const mailOptions = {
    from: process.env.RIDA_EMAIL_USER,
    to: process.env.RIDA_RECEIVER_EMAIL, // receiver's email address
    subject: `New Message from ${name} - ${subject}`,
    text: `You have received a new message from ${name} (${email}):\n\n${message}`,
  };

  try {
    await transporter_rida.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
