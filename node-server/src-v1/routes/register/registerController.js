const { UserModel } = require('@models')
const { ValidationError } = require('@utils/errors')
const bcrypt = require('bcrypt')

const registerUserController = async (data) => {
  if (!data.email || !data.password) {
    throw new ValidationError('Email and password are required')
  }
  data.password = await bcrypt.hash(data.password, parseInt(process.env.SALT_ROUNDS))
  await UserModel.create(data)
  return {
    success: 'User created successfully'
  }
}

module.exports = {
  registerUserController
}