const { UserModel } = require('@models')
const { NotFoundError, ValidationError } = require('@utils/apiErrors')

const UserService = {
  async getAllUsers (query = {}) {
    const users = await UserModel.findAllData(query)
    return {
      data: users,
      count: users.length,
      success: 'Users retrieved successfully'
    }
  },

  async getUser (id) {
    const user = await UserModel.findDataById(id)
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`)
    }
    return {
      data: user,
      success: 'User retrieved successfully'
    }
  },

  async postUser (data) {
    if (!data.email || !data.password) {
      throw new ValidationError('Email and password are required')
    }
    await UserModel.create(data)
    return {
      success: 'User created successfully'
    }
  },

  async updateUser (id, data) {
    const updatedUser = await UserModel.updateData(id, data)
    if (!updatedUser) {
      throw new NotFoundError(`User with id ${id} not found`)
    }
    return {
      success: 'User updated successfully'
    }
  },

  async deleteUser (id) {
    const deletedUser = await UserModel.removeData(id)
    if (!deletedUser) {
      throw new NotFoundError(`User with id ${id} not found`)
    }
    return {
      success: 'User deleted successfully'
    }
  }
}

module.exports = UserService
