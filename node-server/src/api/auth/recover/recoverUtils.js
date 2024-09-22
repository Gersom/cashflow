const { UserModel, RecoveryCodeModel } = require('@models')
const { EmailSendError, ValidationError, ExpirationError } = require('@utils/apiErrors')
const { generateCode } = require('@utils/generateCode')
const { generateHTML } = require('@utils/generateHTML')
const { sendEmail } = require('@utils/emailSend')
const { auth } = require('@config/env')

const expirationTime = () => {
  const time = auth.codeExpiration // minutes to expiration
  return new Date(Date.now() + (time * 60 * 1000))
}

const createAndSaveCode = async (userId) => {
  // Create recovery code
  const code = await generateCode()

  // Save recovery code
  const recoveryCodeData = { userId, code, expiresAt: expirationTime() }
  await RecoveryCodeModel.create(recoveryCodeData)

  return code
}

const sendEmailCode = async (data = { code: null, email: null }) => {
  const html = await generateHTML('emails/recoveryCode', { code: data.code })
  const options = {
    to: data.email,
    subject: 'CashFlow - Recuperación de contraseña',
    text: `Tu código de recuperación es: ${data.code}`,
    html
  }

  const emailResponse = await sendEmail(options)
  if (emailResponse.error) {
    throw new EmailSendError(`Error sending email: ${emailResponse.error?.message}`)
  }

  return {
    from: emailResponse.info?.from,
    to: emailResponse.info?.to[0]
  }
}

const sendEmailPasswordSuccess = async (email) => {
  const html = await generateHTML('emails/recoveryPassword')
  const options = {
    to: email,
    subject: 'CashFlow - Recuperación de Contraseña Exitosa',
    text: 'Nos complace informarte que tu contraseña ha sido recuperada exitosamente, Ahora puedes ingresar a tu cuenta utilizando tu nueva contraseña.',
    html
  }

  const emailResponse = await sendEmail(options)
  if (emailResponse.error) {
    throw new EmailSendError(`Error sending email: ${emailResponse.error?.message}`)
  }

  return {
    from: emailResponse.info?.from,
    to: emailResponse.info?.to[0]
  }
}

const verifyAndGetUser = async (email) => {
  const user = await UserModel.findOneData({ email })
  if (!user) { throw new ValidationError(`The email ${email} does not correspond to any registered user`) }
  return user
}

const verifyRecoveryCode = async ({ code, userId }) => {
  const recoveryCode = await RecoveryCodeModel.findOneData({ code, userId })

  if (!recoveryCode) { throw new ValidationError(`Code ${code} not found, please generate a new one`) }

  if (recoveryCode.expiresAt < new Date()) { throw new ExpirationError(`Code ${code} has expired, please generate a new one`) }
}

module.exports = {
  sendEmailCode,
  sendEmailPasswordSuccess,
  expirationTime,
  createAndSaveCode,
  verifyAndGetUser,
  verifyRecoveryCode
}