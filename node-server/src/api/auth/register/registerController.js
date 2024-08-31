const RegisterService = require("./registerService");

const RegisterController = async (req, res) => {
  const result = await RegisterService(req.body);
  res.status(200).json(result);
};

module.exports = RegisterController;