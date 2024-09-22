const tokenService = require('./tokenService')
const { serv } = require('@config/env')
const { responseSuccess } = require('@utils/apiSuccess')

const tokenController = {
  async refresh (req, res) {
    const { refreshToken } = req.cookies
    const accessToken = await tokenService.refresh(refreshToken)
    // console.log('accessToken', accessToken);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: serv.nodeEnv === 'production',
      sameSite: serv.nodeEnv === 'production' ? 'none' : '',
      path: '/',
      domain: req.hostname
    //   maxAge: auth.cookieMaxAge,
    })
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: serv.nodeEnv === 'production',
      sameSite: serv.nodeEnv === 'production' ? 'none' : '',
      path: '/',
      domain: req.hostname
    //   maxAge: auth.cookieMaxAge,
    })
    res.status(200).json(responseSuccess('Token refreshed successfully'))
  },
  async verify (req, res) {
    const { refreshToken } = req.cookies
    await tokenService.verify(refreshToken)
    res.status(200).json(responseSuccess('Token verified successfully'))
  }
}

module.exports = tokenController