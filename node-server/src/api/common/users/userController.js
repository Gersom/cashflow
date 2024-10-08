const UserService = require("./userService");

const UserController = {
  
  async getUser (req, res) {
    const { id } = req.user;
    
    const result = await UserService.getUser(id);
    res.status(200).json(result);
  },
  
  async updateUser (req, res) {
    const { id } = req.user;
    const result = await UserService.updateUser(id, req.body);
    res.status(200).json(result);
  },

  // we can create a new endpoint for update only one field
  // if the user wants to update only one field

  async changeSelectedAccount (req, res) {
    const { id } = req.user;
    const result = await UserService.changeSelectedAccount(id, req.body.id);
    res.status(200).json(result);
  },
  
  async deleteUser (req, res) {
    const { id } = req.params;
    const result = await UserService.deleteUser(id);
    res.status(200).json(result);
  },
}

module.exports = UserController;