const {
  registerUserController,
} = require("./registerController");

const register = async (req, res) => {
  const result = await registerUserController(req.body);
  res.status(200).json(result);
};

module.exports = {
  register,
};