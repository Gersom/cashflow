const { UserModel } = require('@models')
const { AuthorizationError } = require('@utils/errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const loginController = async (body = {}) => {
  const { email, password } = body

  const user = await UserModel.findOne({ email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    throw new AuthorizationError('Invalid email or password')
  }

  const userForToken = {
    id: user.id,
    email: user.email
  }

  const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })

  user.password = undefined
  delete user.password // remove password from response

  return {
    token
  }
}

module.exports = {
  loginController
}