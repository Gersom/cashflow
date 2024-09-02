const RegisterService = require("./registerService");
const { responseSuccess } = require("@utils/apiSuccess");



const RegisterController = {
   register : async (req, res) => {
    await RegisterService.register(req.body);
    res.status(200).json(responseSuccess("User created successfully"));
  },
  verify : async (req, res) => {
    const result = await RegisterService.verify(req.body);
    res.status(200).json(result);
  }
};

module.exports = RegisterController;