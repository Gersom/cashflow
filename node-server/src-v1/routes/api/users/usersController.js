const { UserModel } = require("@models");
const { NotFoundError, ValidationError } = require("@utils/errors");

const getAllUsersController = async (query = {}) => {
  const users = await UserModel.findAllData(query);
  return {
    data: users,
    count: users.length,
    success: 'Users retrieved successfully'
  };
};

const getUserController = async (id) => {
  const user = await UserModel.findDataById(id);
  if (!user) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  return {
    data: user,
    success: 'User retrieved successfully'
  };
};

const updateUserController = async (id, data) => {
  const updatedUser = await UserModel.updateData(id, data);
  if (!updatedUser) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  return {
    success: 'User updated successfully'
  };
};

const deleteUserController = async (id) => {
  const deletedUser = await UserModel.removeData(id);
  if (!deletedUser) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  return {
    success: 'User deleted successfully'
  };
};

module.exports = {
  getUserController,
  updateUserController,
  deleteUserController,
  getAllUsersController
};