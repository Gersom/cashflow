const LoginService = require("./loginService");
const { auth, serv } = require("@config/env");
const { responseSuccess } = require("@utils/apiSuccess");

const LoginController = async (req, res) => {
  const result = await LoginService(req.body);

  res
  .cookie('access_token', result.token, {
    httpOnly: true,
    secure: serv.nodeEnv === 'production',
    sameSite: serv.nodeEnv === 'development' ? 'strict' : '',
    maxAge: auth.cookieMaxAge,
  })
  .status(200)
  .json(responseSuccess('Loged in successfully'));
};

module.exports = LoginController;