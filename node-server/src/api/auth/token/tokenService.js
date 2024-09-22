const jwt = require('jsonwebtoken')
const { AuthorizationError } = require('@utils/apiErrors')
const { jwt: envJwt } = require('@config/env')

const tokenService = {

  refresh: async (refreshToken) => {
    try {
      const payload = jwt.verify(refreshToken, envJwt.refreshSecret)

      const accessToken = jwt.sign(
        { id: payload.id },
        envJwt.secret,
        { expiresIn: envJwt.expiration }
      )

      return accessToken
    } catch (error) {
      console.error('JWT Verification Error:', error)
      throw new AuthorizationError('Invalid refresh token')
    }
  },
  verify: async (refreshToken) => {
    try {
      const payload = jwt.verify(refreshToken, envJwt.refreshSecret)
      return payload
    } catch {
      throw new AuthorizationError('Invalid access token')
    }
  }
}

module.exports = tokenService