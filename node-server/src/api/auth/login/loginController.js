const LoginService = require("./loginService");
const { auth, serv } = require("@config/env");
const { responseSuccess, dataSuccess } = require("@utils/apiSuccess");

const LoginController = async (req, res) => {
  const {access_token, refresh_token, data} = await LoginService(req.body);


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
  .json(!data.isNewUser? responseSuccess('Logged in successfully') : dataSuccess('Logged in successfully', data));
};

module.exports = LoginController;