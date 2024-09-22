const { UserModel, RecoveryCodeModel } = require('@models')
const {
  sendEmailCode,
  sendEmailPasswordSuccess,
  expirationTime,
  createAndSaveCode,
  verifyAndGetUser,
  verifyRecoveryCode
} = require('./recoverUtils')

const RecoverService = {
  async requestCode (data) {
    const user = await verifyAndGetUser(data.email)

    // Delete previous codes
    await RecoveryCodeModel.deleteMany({ userId: user._id })

    const code = await createAndSaveCode(user._id)

    const emailResponse = await sendEmailCode({ code, email: data.email })

    return {
      emailFrom: emailResponse.from,
      emailTo: emailResponse.to
    }
  },

  async verifyCode (data) {
    const user = await verifyAndGetUser(data.email)

    await verifyRecoveryCode({ code: data.code, userId: user._id })

    return true
  },

  async resendCode (data) {
    const user = await verifyAndGetUser(data.email)

    const recoveryCode = await RecoveryCodeModel.findOneData({ userId: user._id })

    // If the code exists
    if (recoveryCode) {
      // update its expiration date and send an email
      await RecoveryCodeModel.updateData(recoveryCode._id, { expiresAt: expirationTime() })
      const emailResponse = await sendEmailCode({
        code: recoveryCode.code, email: data.email
      })
      return {
        emailFrom: emailResponse.from,
        emailTo: emailResponse.to,
        generatedCode: false
      }
    } else {
      // create a new one and send an email
      const code = await createAndSaveCode(user._id)
      const emailResponse = await sendEmailCode({
        code, email: data.email
      })
      return {
        emailFrom: emailResponse.from,
        emailTo: emailResponse.to,
        generatedCode: true
      }
    }
  },

  async resetPassword (data) {
    const user = await verifyAndGetUser(data.email)

    await verifyRecoveryCode({ code: data.code, userId: user._id })

    const bcrypt = require('bcrypt')
    const { auth } = require('@config/env')

    const passwordHashed = await bcrypt.hash(data.password, auth.saltRounds)

    // Update the user's password
    await UserModel.updateData(user._id, { password: passwordHashed })

    // Delete the recovery code
    await RecoveryCodeModel.deleteMany({ userId: user._id })

    const emailResponse = await sendEmailPasswordSuccess(user.email)

    return {
      emailFrom: emailResponse.from,
      emailTo: emailResponse.to
    }
  }
}

module.exports = RecoverService