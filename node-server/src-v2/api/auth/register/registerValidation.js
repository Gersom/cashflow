const { ValidationError } = require("@utils/apiErrors");

const validateRegister = (req, _, next) => {
  if (!req.body?.email)
    throw new ValidationError("Email is required");
  if (!req.body?.password)
    throw new ValidationError("Password is required");
  if (!req.body?.name)
    throw new ValidationError("Name is required");

  req.body = {
    email: req.body.email.toLowerCase(),
    password: req.body.password,
    name: req.body.name,
    whatsapp: req.body.whatsapp,
    profilePic: req.body.profilePic
  }

  next();
}

module.exports = { validateRegister }