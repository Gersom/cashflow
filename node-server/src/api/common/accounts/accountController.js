const AccountService = require('./accountService')

const AccountController = {
  async getAllAccounts (req, res) {
    const result = await AccountService.getAllAccounts(req.user.id)
    res.status(200).json(result)
  },

  async changeCurrecy (req, res) {
    const { id } = req.user
    const result = await AccountService.changeCurrecy(id, req.body.currencyId)
    res.status(200).json(result)
  }
  //   async getAccount (req, res) {
  //     const { id } = req.params;
  //     const result = await AccountService.getAccount(id);
  //     res.status(200).json(result);
  //   },

  //   async createAccount (req, res) {
  //     const result = await AccountService.postAccount(req.body);
  //     res.status(201).json(result);
  //   },

  //   async updateAccount (req, res) {
  //     const { id } = req.params;
  //     const result = await AccountService.updateAccount(id, req.body);
  //     res.status(200).json(result);
  //   },

//   async deleteAccount (req, res) {
//     const { id } = req.params;
//     const result = await AccountService.deleteAccount(id);
//     res.status(200).json(result);
//   },
}

module.exports = AccountController