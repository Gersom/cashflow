class AbstractError extends Error {
  constructor (message, status, code) {
    super(message)
    this.name = this.constructor.name
    this.code = code
    this.status = status
  }
}

class ValidationError extends AbstractError {
  constructor (messsage = 'Validation error', code = 'AUTH_000') {
    super(messsage, 400, code)
  }
}

class AuthorizationError extends AbstractError {
  constructor (message = 'Unauthorized', code = 'AUTH_001') {
    super(message, 401, 'AUTH_001')
  }
}

class UnauthorizedError extends AbstractError {
  constructor (message = 'Unauthorized', code = 'AUTH_002') {
    super(message, 403, code)
  }
}

class NotFoundError extends AbstractError {
  constructor (message = 'Not found', code = 'NOT_FOUND') {
    super(message, 404, code)
  }
}

class ExpirationError extends AbstractError {
  constructor (message = 'Expired', code = 'EXPIRED') {
    super(message, 410, code)
  }
}

class EmailSendError extends AbstractError {
  constructor (message = 'Error sending email', code = 'EMAIL_SEND') {
    super(message, 500, code)
  }
}

module.exports = {
  NotFoundError,
  ValidationError,
  ExpirationError,
  AuthorizationError,
  UnauthorizedError,
  EmailSendError
}
