const UserService = require('./userService')
const { responseSuccess, dataSuccess } = require('@utils/apiSuccess')

const UserController = {

  async getUser (req, res) {
    const { id } = req.user

    const user = await UserService.getUser(id)
    res.status(200).json(dataSuccess('User retrieved successfully', user))
  },

  async updateUser (req, res) {
    const { id } = req.user
    await UserService.updateUser(id, req.body)
    res.status(200).json(responseSuccess('User updated successfully'))
  },

  // we can create a new endpoint for update only one field
  // if the user wants to update only one field

  async changeSelectedAccount (req, res) {
    const { id } = req.user
    await UserService.changeSelectedAccount(id, req.body.id)
    res.status(200).json(responseSuccess('Changed selected account successfully'))
  },

  async deleteUser (req, res) {
    const { id } = req.params
    await UserService.deleteUser(id)
    res.status(200).json(responseSuccess('User deleted successfully'))
  }
}

module.exports = UserController