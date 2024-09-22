const RegisterService = require('./registerService')
const { responseSuccess } = require('@utils/apiSuccess')

const RegisterController = {
  register: async (req, res) => {
    await RegisterService.register(req.body)
    res.status(200).json(responseSuccess('User created successfully'))
  },
  verify: async (req, res) => {
    await RegisterService.verify(req.body)
    res.status(200).json(responseSuccess('User has been verified successfully'))
  }
}

module.exports = RegisterController