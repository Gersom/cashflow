class RecoverService {
  constructor (dependencies) {
    console.log('service', dependencies)
    this.UserModel = dependencies.UserModel
    this.RecoveryCodeModel = dependencies.RecoveryCodeModel
    // password
    this.bcrypt = dependencies.bcrypt
    this.auth = dependencies.auth
    // utils
    this.sendEmailCode = dependencies.sendEmailCode
    this.sendEmailPasswordSuccess = dependencies.sendEmailPasswordSuccess
    this.expirationTime = dependencies.expirationTime
    this.createAndSaveCode = dependencies.createAndSaveCode
    this.verifyAndGetUser = dependencies.verifyAndGetUser
    this.verifyRecoveryCode = dependencies.verifyRecoveryCode
  }

  async requestCode (data) {
    const user = await this.verifyAndGetUser(data.email)
    await this.RecoveryCodeModel.deleteMany({ userId: user._id })
    const code = await this.createAndSaveCode(user._id)
    const emailResponse = await this.sendEmailCode({ code, email: data.email })
    return {
      emailFrom: emailResponse.from,
      emailTo: emailResponse.to
    }
  }

  async verifyCode (data) {
    const user = await this.verifyAndGetUser(data.email)
    await this.verifyRecoveryCode({ code: data.code, userId: user._id })
    return true
  }

  async resendCode (data) {
    const user = await this.verifyAndGetUser(data.email)
    const recoveryCode = await this.RecoveryCodeModel.findOneData({ userId: user._id })

    if (recoveryCode) {
      await this.RecoveryCodeModel.updateData(recoveryCode._id, { expiresAt: this.expirationTime() })
      const emailResponse = await this.sendEmailCode({
        code: recoveryCode.code, email: data.email
      })
      return {
        emailFrom: emailResponse.from,
        emailTo: emailResponse.to,
        generatedCode: false
      }
    } else {
      const code = await this.createAndSaveCode(user._id)
      const emailResponse = await this.sendEmailCode({
        code, email: data.email
      })
      return {
        emailFrom: emailResponse.from,
        emailTo: emailResponse.to,
        generatedCode: true
      }
    }
  }

  async resetPassword (data) {
    const user = await this.verifyAndGetUser(data.email)
    await this.verifyRecoveryCode({ code: data.code, userId: user._id })
    const passwordHashed = await this.bcrypt.hash(data.password, this.auth.saltRounds)
    await this.UserModel.updateData(user._id, { password: passwordHashed })
    await this.RecoveryCodeModel.deleteMany({ userId: user._id })
    const emailResponse = await this.sendEmailPasswordSuccess(user.email)
    return {
      emailFrom: emailResponse.from,
      emailTo: emailResponse.to
    }
  }
}

module.exports = RecoverService

// const { UserModel, RecoveryCodeModel } = require('@models')
// const {
//   sendEmailCode,
//   sendEmailPasswordSuccess,
//   expirationTime,
//   createAndSaveCode,
//   verifyAndGetUser,
//   verifyRecoveryCode
// } = require('./recoverUtils')

// const RecoverService = {
//   async requestCode (data) {
//     const user = await verifyAndGetUser(data.email)

//     // Delete previous codes
//     await RecoveryCodeModel.deleteMany({ userId: user._id })

//     const code = await createAndSaveCode(user._id)

//     const emailResponse = await sendEmailCode({ code, email: data.email })

//     return {
//       emailFrom: emailResponse.from,
//       emailTo: emailResponse.to
//     }
//   },

//   async verifyCode (data) {
//     const user = await verifyAndGetUser(data.email)

//     await verifyRecoveryCode({ code: data.code, userId: user._id })

//     return true
//   },

//   async resendCode (data) {
//     const user = await verifyAndGetUser(data.email)

//     const recoveryCode = await RecoveryCodeModel.findOneData({ userId: user._id })

//     // If the code exists
//     if (recoveryCode) {
//       // update its expiration date and send an email
//       await RecoveryCodeModel.updateData(recoveryCode._id, { expiresAt: expirationTime() })
//       const emailResponse = await sendEmailCode({
//         code: recoveryCode.code, email: data.email
//       })
//       return {
//         emailFrom: emailResponse.from,
//         emailTo: emailResponse.to,
//         generatedCode: false
//       }
//     } else {
//       // create a new one and send an email
//       const code = await createAndSaveCode(user._id)
//       const emailResponse = await sendEmailCode({
//         code, email: data.email
//       })
//       return {
//         emailFrom: emailResponse.from,
//         emailTo: emailResponse.to,
//         generatedCode: true
//       }
//     }
//   },

//   async resetPassword (data) {
//     const user = await verifyAndGetUser(data.email)

//     await verifyRecoveryCode({ code: data.code, userId: user._id })

//     const bcrypt = require('bcrypt')
//     const { auth } = require('@config/env')

//     const passwordHashed = await bcrypt.hash(data.password, auth.saltRounds)

//     // Update the user's password
//     await UserModel.updateData(user._id, { password: passwordHashed })

//     // Delete the recovery code
//     await RecoveryCodeModel.deleteMany({ userId: user._id })

//     const emailResponse = await sendEmailPasswordSuccess(user.email)

//     return {
//       emailFrom: emailResponse.from,
//       emailTo: emailResponse.to
//     }
//   }
// }

// module.exports = RecoverService