const { UserModel } = require('@models')
const { UserDTO } = require('./userDTOs')
const { NotFoundError } = require('@utils/apiErrors')

const UserService = {
  async getUser (id) {
    const user = await UserModel.findDataById(id)
      .populate({
        path: 'selectedAccountId',
        populate: {
          path: 'selectedCurrencyId'
        }
      })

    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`)
    }

    return new UserDTO(user)
  },

  async changeSelectedAccount (id, accountId) {
    const user = await UserModel.findDataById(id)
    if (!user) {
      throw new NotFoundError(`User with id ${id} not found`)
    }

    await UserModel.updateData(id, { selectedAccountId: accountId })

    return true
  },

  async updateUser (id, data) {
    // Not allow to update sensitive data
    delete data.id
    delete data.verified
    delete data.selectedAccountId

    const updatedUser = await UserModel.updateData(id, data)

    if (!updatedUser) {
      throw new NotFoundError(`User with id ${id} not found`)
    }
    return true
  },

  async deleteUser (id) {
    const deletedUser = await UserModel.removeData(id)
    if (!deletedUser) {
      throw new NotFoundError(`User with id ${id} not found`)
    }
    return true
  }
}

module.exports = UserService
