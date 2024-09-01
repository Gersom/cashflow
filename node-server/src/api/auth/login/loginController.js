const LoginService = require("./loginService");
const { auth, serv } = require("@config/env");
const { responseSuccess } = require("@utils/apiSuccess");

const LoginController = async (req, res) => {
  const {access_token, refresh_token} = await LoginService(req.body);

  res
  .cookie('access_token', access_token, {
    httpOnly: true,
    secure: serv.nodeEnv === 'production',
    sameSite: serv.nodeEnv === 'development' ? 'strict' : '',
    // maxAge: auth.cookieMaxAge,
  })
  .cookie('refresh_token', refresh_token, {
    httpOnly: true,
    secure: serv.nodeEnv === 'production',
    sameSite: serv.nodeEnv === 'development' ? 'strict' : '',
    // maxAge: auth.cookieMaxAge,
  })
  .status(200)
  .json(responseSuccess('Loged in successfully'));
};

module.exports = LoginController;