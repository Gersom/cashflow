// service dependencies
const LoginService = require('./login.service')
const LoginController = require('./login.controller')
const { UserModel, AccountModel } = require('@models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { AuthorizationError, UnauthorizedError } = require('@utils/apiErrors')
const { jwt: envJwt } = require('@config/env')
// controller dependencies
const { serv } = require('@config/env')
const { responseSuccess, dataSuccess } = require('@utils/apiSuccess')

const createLoginModule = () => {
  const dependencies = {
    UserModel,
    AccountModel,
    bcrypt,
    jwt,
    AuthorizationError,
    UnauthorizedError,
    envJwt
  }

  const controllerDependecies = {
    serv,
    responseSuccess,
    dataSuccess,
    loginService: new LoginService(dependencies)
  }

  return new LoginController(controllerDependecies)
}

module.exports = createLoginModule