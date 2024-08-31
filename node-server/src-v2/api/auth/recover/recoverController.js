const RecoverService = require("./recoverService");
const { serv } = require("@config/env")
const { responseSuccess } = require("@utils/apiSuccess");

const RecoverController = {
  async requestCode (req, res) {
    const result = await RecoverService.requestCode(req.body);

    const message = 'Code generated successfully'

    res.status(200).json(responseSuccess(message, result))
  },
  
  async verifyCode (req, res) {
    await RecoverService.verifyCode(req.body);
    res
    .status(200)
    .json(responseSuccess('Code verified successfully'));
  },
  
  async resendCode (req, res) {
    const result = await RecoverService.resendCode(req.body);

    const message = result.generatedCode
    ? 'Code has been generated and sent correctly'
    : 'Code resend successfully'

    res.status(200).json(responseSuccess(message, result))
  },
  
  async resetPassword (req, res) {
    const result = await RecoverService.resetPassword(req.body);

    const message = 'Password reset successfully'

    res.status(200).json(responseSuccess(message, result))
  },
}

module.exports = RecoverController;