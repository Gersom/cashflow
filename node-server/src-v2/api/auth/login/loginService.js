const { UserModel } = require("@models");
const { AuthorizationError } = require("@utils/apiErrors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwt: envJwt } = require("@config/env");

const LoginService = async (body = {}) => {

  const { email, password } = body;

  const user = await UserModel.findOne({ email });
  const passwordCorrect = user === null 
    ? false 
    : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    throw new AuthorizationError('Invalid email or password');
  }

  const userForToken = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(userForToken, envJwt.secret, {
    expiresIn: envJwt.expiration,
  });

  user.password = undefined;
  delete user.password; // remove password from response  

  return {
   token: token,
  };
};

module.exports = LoginService;