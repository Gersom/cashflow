const {
  loginController,
} = require("./loginController");

const login = async (req, res) => {
  const result = await loginController(req.body);
  res
  .cookie('access_token', result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: parseInt(process.env.JWT_EXPIRES_IN) * 1000,
  })
  .status(200).json(result);
};

module.exports = {
  login,
};