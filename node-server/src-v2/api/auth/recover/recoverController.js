const RecoverService = require("./recoverService");
const { serv } = require("@config/env")
const { responseSuccess } = require("@utils/apiSuccess");

const RecoverController = {
  async requestCode (req, res) {
    const result = await RecoverService.requestCode(req.body);

    const statusCode = 200;
    const message = 'Code generated successfully'

    if (serv.nodeEnv === 'development')
      res.status(statusCode).json(responseSuccess(message, result))
    else
      res.status(statusCode).json(responseSuccess(message))
  },
  
  async verifyCode (req, res) {
    await RecoverService.verifyCode(req.body);
    res
    .status(200)
    .json(responseSuccess('Code verified successfully'));
  },
  
  async resendCode (req, res) {
    const result = await RecoverService.resendCode(req.body);

    const statusCode = 200;
    const message = result.generatedCode
    ? 'Code has been generated and sent correctly'
    : 'Code resend successfully'

    if (serv.nodeEnv === 'development')
      res.status(statusCode).json(responseSuccess(message, result))
    else
      res.status(statusCode).json(responseSuccess(message))
  },
  
  async resetPassword (req, res) {
    const result = await RecoverService.resetPassword(req.body);

    const statusCode = 200;
    const message = 'Password reset successfully'

    if (serv.nodeEnv === 'development')
      res.status(statusCode).json(responseSuccess(message, result))
    else
      res.status(statusCode).json(responseSuccess(message))
  },
}

module.exports = RecoverController;