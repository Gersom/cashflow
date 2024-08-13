const {
  loginController,
} = require("./loginController");

const login = async (req, res) => {
  const result = await loginController(req.body);
  res
  .cookie('access_token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? '' : 'strict',
    maxAge: parseInt(process.env.COOKIE_MAX_AGE),
  })
  .status(200).json(result);
};

module.exports = {
  login,
};