const {
  loginController,
} = require("./loginController");

const getAllUsers = async (req, res) => {
  const result = await loginController(req.body);
  res.status(200).json(result);
};


module.exports = {
  getAllUsers,
};