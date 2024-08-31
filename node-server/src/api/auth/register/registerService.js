const { UserModel } = require("@models");
const { ValidationError } = require("@utils/apiErrors");
const bcrypt = require("bcrypt");
const { auth } = require("@config/env");

const RegisterService = async (data) => {
  if (!data.email || !data.password || !data.name) {
    return new ValidationError('Missing required fields');
  }
  data.password = await bcrypt.hash(data.password, auth.saltRounds);
  await UserModel.create(data);
  return {
    success: 'User created successfully'
  };
};

module.exports = RegisterService;