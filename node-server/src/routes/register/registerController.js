const { UserModel } = require("@models");
const { AuthorizationError } = require("@utils/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUserController = async (data) => {
  if (!data.email || !data.password) {
    throw new ValidationError("Email and password are required");
  }
  await UserModel.create(data);
  return {
    success: 'User created successfully'
  };
};

module.exports = {
  registerUserController,
};