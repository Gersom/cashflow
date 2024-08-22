const LoginService = require("./loginService");

const LoginController = async (req, res) => {
  const result = await LoginService(req.body);

  res
  .cookie('access_token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? '' : 'strict',
    maxAge: parseInt(process.env.COOKIE_MAX_AGE),
  })
  .status(200).json({ success: 'Loged in successfully' });
};

module.exports = LoginController;