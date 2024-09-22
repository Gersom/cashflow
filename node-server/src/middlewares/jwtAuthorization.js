const { verify } = require('jsonwebtoken')
const { AuthorizationError } = require('@utils/apiErrors')
const { jwt: envJwt } = require('@config/env')

const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken

  if (!token) {
    throw new AuthorizationError('Missing token')
  }

  if (token) {
    try {
      const decoded = verify(token, envJwt.secret)
      req.user = decoded
      next()
    } catch {
      throw new AuthorizationError('Invalid token')
    }
  } else {
    throw new AuthorizationError('Missing or invalid token')
  }
}

module.exports = authMiddleware