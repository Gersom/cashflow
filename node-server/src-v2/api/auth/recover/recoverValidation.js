const { ValidationError } = require("@utils/apiErrors");

const validateRequest = (req, _, next) => {
  if (!req.body?.email)
    throw new ValidationError("Email is required");

  req.body = {
    email: req.body.email.toLowerCase()
  }

  next();
}

const validateVerify = (req, _, next) => {
  if (!req.body?.email)
    throw new ValidationError("Email is required");
  if (!req.body?.code)
    throw new ValidationError("Code is required");

  req.body = {
    email: req.body.email.toLowerCase(),
    code: req.body.code.toUpperCase()
  }

  next();
}

const validateResend = (req, _, next) => {
  if (!req.body?.email)
    throw new ValidationError("Email is required");

  req.body = {
    email: req.body.email.toLowerCase(),
  }

  next();
}

const validateReset = (req, _, next) => {
  if (!req.body?.email)
    throw new ValidationError("Email is required");
  if (!req.body?.code)
    throw new ValidationError("Code is required");
  if (!req.body?.newPassword)
    throw new ValidationError("New password is required");
  if (!req.body?.confirmPassword)
    throw new ValidationError("Confirm password is required");
  if (req.body.newPassword !== req.body.confirmPassword)
    throw new ValidationError("Passwords do not match");

  req.body = {
    email: req.body.email.toLowerCase(),
    code: req.body.code.toUpperCase(),
    password: req.body.newPassword
  }

  next();
}

module.exports = {
  validateRequest,
  validateVerify,
  validateResend,
  validateReset
}