const RecoverService = require('./recover.service')
const RecoverController = require('./recover.controller')
const RecoverUtils = require('./recover.utils')
const { UserModel, RecoveryCodeModel } = require('@models')
const bcrypt = require('bcrypt')
const { auth } = require('@config/env')
const { responseSuccess } = require('@utils/apiSuccess')
const { EmailSendError, ValidationError, ExpirationError } = require('@utils/apiErrors')
const { generateCode } = require('@utils/generateCode')
const { generateHTML } = require('@utils/generateHTML')
const { sendEmail } = require('@utils/emailSend')

const createRecoverModule = () => {
  const utilsDependencies = {
    UserModel,
    RecoveryCodeModel,
    auth,
    sendEmail,
    generateCode,
    generateHTML,
    ValidationError,
    ExpirationError,
    EmailSendError
  }

  const recoverUtils = new RecoverUtils(utilsDependencies)

  const serviceDependencies = {
    UserModel,
    RecoveryCodeModel,
    bcrypt,
    auth,
    // TODO: move the utils inside the service
    expirationTime: () => recoverUtils.expirationTime(),
    createAndSaveCode: (userId) => recoverUtils.createAndSaveCode(userId),
    sendEmailCode: (data) => recoverUtils.sendEmailCode(data),
    sendEmailPasswordSuccess: (email) => recoverUtils.sendEmailPasswordSuccess(email),
    verifyAndGetUser: (email) => recoverUtils.verifyAndGetUser(email),
    verifyRecoveryCode: (data) => recoverUtils.verifyRecoveryCode(data)
  }

  const controllerDependencies = {
    recoverService: new RecoverService(serviceDependencies),
    responseSuccess
  }

  return new RecoverController(controllerDependencies)
}

module.exports = createRecoverModule