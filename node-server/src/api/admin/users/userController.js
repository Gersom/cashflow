const UserService = require('./userService')

const UserController = {
  async getAllUsers (req, res) {
    const result = await UserService.getAllUsers(req.query)
    res.status(200).json(result)
  },

  async getUser (req, res) {
    const { id } = req.params
    const result = await UserService.getUser(id)
    res.status(200).json(result)
  },

  async createUser (req, res) {
    const result = await UserService.postUser(req.body)
    res.status(201).json(result)
  },

  async updateUser (req, res) {
    const { id } = req.params
    const result = await UserService.updateUser(id, req.body)
    res.status(200).json(result)
  },

  async deleteUser (req, res) {
    const { id } = req.params
    const result = await UserService.deleteUser(id)
    res.status(200).json(result)
  }
}

module.exports = UserController