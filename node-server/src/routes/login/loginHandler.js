const {
  loginController,
} = require("./loginController");

const login = async (req, res) => {
  const result = await loginController(req.body);
  res.status(200).json(result);
};

module.exports = {
  login,
};