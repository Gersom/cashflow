const { EmailSendError, ValidationError, ExpirationError } = require("@utils/apiErrors");
const { generateHTML } = require("@utils/generateHTML");
const { sendEmail } = require("@utils/emailSend");

const sendVerificationEmail = async (data = { email: null, link: null }) => {
    const html = await generateHTML('emails/verifyEmail', { link: data.link });
    const options = {
      to: data.email,
      subject: 'CashFlow - Verificación de correo electrónico',
      text: `Verifique su correo electrónico para continuar con el proceso de registro ${ data.link }`,
      html
    };
  
    const emailResponse = await sendEmail(options);
    if (emailResponse.error) {
      throw new EmailSendError(`Error sending email: ${emailResponse.error?.message}`);
    }
  
    return {
      from: emailResponse.info?.from,
      to: emailResponse.info?.to[0]
    };
  };
  

module.exports = {
  sendVerificationEmail
};