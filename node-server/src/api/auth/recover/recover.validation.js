class RecoverValidation {
  constructor (dependencies) {
    this.ValidationError = dependencies.ValidationError
  }

  static validateRequest (req, _, next) {
    if (!req.body?.email) { throw new this.ValidationError('Email is required') }

    req.body = {
      email: req.body.email.toLowerCase()
    }

    next()
  }

  static validateVerify (req, _, next) {
    if (!req.body?.email) { throw new this.ValidationError('Email is required') }
    if (!req.body?.code) { throw new this.ValidationError('Code is required') }

    req.body = {
      email: req.body.email.toLowerCase(),
      code: req.body.code.toUpperCase()
    }

    next()
  }

  static validateResend (req, _, next) {
    if (!req.body?.email) { throw new this.ValidationError('Email is required') }

    req.body = {
      email: req.body.email.toLowerCase()
    }

    next()
  }

  static validateReset (req, _, next) {
    if (!req.body?.email) { throw new this.ValidationError('Email is required') }
    if (!req.body?.code) { throw new this.ValidationError('Code is required') }
    if (!req.body?.newPassword) { throw new this.ValidationError('New password is required') }
    if (!req.body?.confirmPassword) { throw new this.ValidationError('Confirm password is required') }
    if (req.body.newPassword !== req.body.confirmPassword) { throw new this.ValidationError('Passwords do not match') }

    req.body = {
      email: req.body.email.toLowerCase(),
      code: req.body.code.toUpperCase(),
      password: req.body.newPassword
    }

    next()
  }
}

module.exports = RecoverValidation