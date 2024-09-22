class LoginController {
  constructor (dependecies) {
    this.loginService = dependecies.loginService
    this.serv = dependecies.serv
    this.responseSuccess = dependecies.responseSuccess
    this.dataSuccess = dependecies.dataSuccess
  }

  handleLogin = async (req, res) => {
    const { email, password } = req.body
    const { accessToken, refreshToken, data } = await this.loginService.login(email, password)

    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: this.serv.isProduction,
        sameSite: this.serv.nodeEnv === 'production' ? 'none' : '',
        path: '/',
        domain: req.hostname
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: this.serv.isProduction,
        sameSite: this.serv.nodeEnv === 'production' ? 'none' : '',
        path: '/',
        domain: req.hostname
      })
      .status(200)
      .json(!data.isNewUser ? this.responseSuccess('Logged in successfully') : this.dataSuccess('Logged in successfully', data))
  }
}

module.exports = LoginController