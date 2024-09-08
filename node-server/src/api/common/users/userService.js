const { UserModel } = require("@models");
const { UserDTO } = require("./usersDTOs");
const { NotFoundError } = require("@utils/apiErrors");

const UserService = {
  async getUser(id) {
    const user = await UserModel.findDataById(id);
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    return {
      data: new UserDTO(user),
      success: 'User retrieved successfully'
    };
  },

  async changeSelectedAccount(id, accountId) {
    const user = await UserModel.findDataById(id);
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`);
    }

    await UserModel.updateData(id, { selectedAccount: accountId });
    
    return {
      success: 'User updated successfully'
    };
  },

  async updateUser(id, data) {
    // Not allow to update sensitive data
    delete data.id;
    delete data.verified;
    delete data.selectedAccount;

    const updatedUser = await UserModel.updateData(id, data);

    if (!updatedUser) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    return {
      success: 'User updated successfully'
    };
  },

  async deleteUser(id) {
    const deletedUser = await UserModel.removeData(id);
    if (!deletedUser) {
      throw new NotFoundError(`User with id ${id} not found`);
    }
    return {
      success: 'User deleted successfully'
    };
  }
};

module.exports = UserService;
