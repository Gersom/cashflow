const { serv } = require('@config/env')
const { responseSuccess, dataSuccess } = require('@utils/apiSuccess')

class LoginController {
  /**
   * @param {import('./login.types').ILoginService} loginService
   */
  constructor (loginService) {
    this.loginService = loginService
  }

  handleLogin = async (req, res) => {
    const { email, password } = req.body
    const { accessToken, refreshToken, data } = await this.loginService.login(email, password)

    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: serv.isProduction,
        sameSite: serv.nodeEnv === 'production' ? 'none' : '',
        path: '/',
        domain: req.hostname
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: serv.isProduction,
        sameSite: serv.nodeEnv === 'production' ? 'none' : '',
        path: '/',
        domain: req.hostname
      })
      .status(200)
      .json(!data.isNewUser ? responseSuccess('Logged in successfully') : dataSuccess('Logged in successfully', data))
  }
}

module.exports = LoginController