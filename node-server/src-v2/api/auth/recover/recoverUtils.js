const { EmailSendError } = require("@utils/apiErrors");
const { generateCode } = require("@utils/generateCode");
const { generateHTML } = require("@utils/generateHTML");
const { RecoveryCodeModel } = require("@models");
const { sendEmail } = require("@utils/emailSender");


const expirationTime = () => {
  const time = 30; // minutes to expiration
  return new Date(Date.now() + (time * 60 * 1000));
}

const createAndSaveCode = async (userId) => {
  // Create recovery code
  const code = await generateCode();
  
  // Save recovery code
  const recoveryCodeData = { userId, code, expiresAt: expirationTime() }
  await RecoveryCodeModel.create(recoveryCodeData);
  
  return code
}

const sendEmailCode = async (data = { code: null, email: null }) => {
  const html = await generateHTML('emails/recoveryCode', { code: data.code });
  const options = {
    to: data.email,
    subject: 'CashFlow - Recuperación de contraseña',
    text: `Tu código de recuperación es: ${data.code}`,
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
  sendEmailCode, expirationTime, createAndSaveCode
};