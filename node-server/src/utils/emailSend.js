const { transporter } = require('@config/mailer')
const { mailer } = require('@config/env')

const sendEmail = (options) => {
  return new Promise((resolve) => {
    const mailOptions = {
      from: `"CashFlow" <${mailer.email}>`,
      ...options
    }

    // Using transporter to send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        // If there's an error, reject the promise
        resolve({ error, info: null })
      } else {
        // If the email is sent successfully, resolve the promise
        resolve({
          error: null,
          info: info.envelope
        })
      }
    })
  })
}

module.exports = { sendEmail }

// const mailOptions = {
//   from: `"CashFlow" <${mailer.email}>`,
//   to: 'destinatario@ejemplo.com',
//   subject: 'Asunto del correo',
//   text: 'Contenido del correo en texto plano',
//   html: '<p>Contenido del correo en HTML</p>'
// };