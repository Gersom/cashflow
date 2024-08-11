const { UserModel } = require("@models");
const { NotFoundError, ValidationError } = require("@utils/errors");
const bcrypt = require("bcrypt");

const loginController = async (body = {}) => {

  const {email, password} = body;

  const user = await UserModel.findOne({ email });
  const passwordCorrect = user === null 
    ? false 
    : await bcrypt.compare(password, user.password);

    
  return {
    data: users,
    count: users.length,
    success: 'Users retrieved successfully'
  };
};


module.exports = {
  loginController,
};