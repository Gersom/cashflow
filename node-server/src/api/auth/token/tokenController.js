const tokenService = require("./tokenService");
const { auth, serv } = require("@config/env");
const { responseSuccess } = require("@utils/apiSuccess");


const tokenController = {
  async refresh(req, res) {
    const { refresh_token } = req.cookies;
    const  access_token  = await tokenService.refresh(refresh_token);
    // console.log('access_token', access_token);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: serv.nodeEnv === 'production',
      sameSite: serv.nodeEnv === 'development' ? 'none' : '',
      path: '/',
      domain: req.hostname
    //   maxAge: auth.cookieMaxAge,
    })
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: serv.nodeEnv === 'production',
      sameSite: serv.nodeEnv === 'development' ? 'none' : '',
      path: '/',
      domain: req.hostname
    //   maxAge: auth.cookieMaxAge,
    })
    res.status(200).json(responseSuccess('Token refreshed successfully'));
  },
  async verify(req, res) {
    const { access_token } = req.cookies;
    await tokenService.verify(access_token);
    res.status(200).json(responseSuccess('Token verified successfully'));
  },
};

module.exports = tokenController;