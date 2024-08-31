const nodemailer = require('nodemailer');
const { mailer } = require('@config/env');

// Configurar el transporte de correo
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: mailer.email,
    pass: mailer.password,
  }
});

module.exports = { transporter };