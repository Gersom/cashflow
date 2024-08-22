const { UserModel } = require("@models");
const { ValidationError } = require("@utils/apiErrors");
const bcrypt = require("bcrypt");

const RegisterService = async (data) => {
  if (!data.email || !data.password || !data.name) {
    return new ValidationError('Missing required fields');
  }
  data.password = await bcrypt.hash(data.password, parseInt(process.env.SALT_ROUNDS));
  await UserModel.create(data);
  return {
    success: 'User created successfully'
  };
};

module.exports = RegisterService;