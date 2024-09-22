const LoginService = require('./login.service')
const LoginController = require('./login.controller')
const { UserModel, AccountModel } = require('@/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { AuthorizationError, UnauthorizedError } = require('@utils/apiErrors')
const { jwt: envJwt } = require('@config/env')

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

  const loginService = new LoginService(dependencies)
  const loginController = new LoginController(loginService)

  return { loginController, loginService }
}

module.exports = createLoginModule