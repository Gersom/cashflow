const LoginService = require('./loginService')
const { serv } = require('@config/env')
const { responseSuccess, dataSuccess } = require('@utils/apiSuccess')

const LoginController = async (req, res) => {
  const { accessToken, refreshToken, data } = await LoginService(req.body)

  res
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: serv.isProduction,
      sameSite: serv.nodeEnv === 'production' ? 'none' : '',
      path: '/',
      domain: req.hostname
    // maxAge: auth.cookieMaxAge,
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: serv.isProduction,
      sameSite: serv.nodeEnv === 'production' ? 'none' : '',
      path: '/',
      domain: req.hostname
    // maxAge: auth.cookieMaxAge,
    })
    .status(200)
    .json(!data.isNewUser ? responseSuccess('Logged in successfully') : dataSuccess('Logged in successfully', data))
}

module.exports = LoginController