class RecoverController {
  constructor (dependencies) {
    this.recoverService = dependencies.recoverService
    this.responseSuccess = dependencies.responseSuccess
  }

  requestCode = async (req, res) => {
    const result = await this.recoverService.requestCode(req.body)
    const message = 'Code generated successfully'
    res.status(200).json(this.responseSuccess(message, result))
  }

  verifyCode = async (req, res) => {
    await this.recoverService.verifyCode(req.body)
    res.status(200).json(this.responseSuccess('Code verified successfully'))
  }

  resendCode = async (req, res) => {
    const result = await this.recoverService.resendCode(req.body)
    const message = result.generatedCode
      ? 'Code has been generated and sent correctly'
      : 'Code resend successfully'
    res.status(200).json(this.responseSuccess(message, result))
  }

  resetPassword = async (req, res) => {
    const result = await this.recoverService.resetPassword(req.body)
    const message = 'Password reset successfully'
    res.status(200).json(this.responseSuccess(message, result))
  }
}

module.exports = RecoverController