const { AuthorizationError } = require('@utils/apiErrors')
const { jwt: envJwt } = require('@config/env')
const { UserModel, AccountModel } = require('@models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const LoginService = async (body = {}) => {
  const { email, password } = body

  const user = await UserModel.findOne({ email })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    throw new AuthorizationError('Invalid email or password')
  }

  if (!user?.isEmailVerified) {
    throw new AuthorizationError('Email not verified')
  }

  const userForToken = {
    id: user._id
  }

  const token = jwt.sign(userForToken, envJwt.secret, {
    expiresIn: envJwt.expiration
  })

  const refresh = jwt.sign(userForToken, envJwt.refreshSecret, {
    expiresIn: envJwt.refreshExpiration
  })

  user.password = undefined
  delete user.password // remove password from response

  const account = await AccountModel.findOneData({ _id: user.selectedAccountId })

  const data = { isNewUser: !account.selectedCurrencyId }

  return { accessToken: token, refreshToken: refresh, data: data || null }
}

module.exports = LoginService