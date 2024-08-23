const RecoverService = require("./recoverService");

const RecoverController = {
  async requestCode (req, res) {
    const result = await RecoverService.requestCode(req.body);
    res.status(200).json(result);
  },
  
  async verifyCode (req, res) {
    const result = await RecoverService.verifyCode(req.body);
    res.status(200).json(result);
  },
  
  async resendCode (req, res) {
    const result = await RecoverService.resendCode(req.body);
    res.status(200).json(result);
  },
  
  async resetPassword (req, res) {
    const result = await RecoverService.resetPassword(req.body);
    res.status(200).json(result);
  },
}

module.exports = RecoverController;