const { UserModel } = require("@models");
const { AuthorizationError, UnauthorizedError } = require("@utils/apiErrors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwt: envJwt } = require("@config/env");

const LoginService = async (body = {}) => {

  const { email, password } = body;

  const user = await UserModel.findOne({ email });

  if(!user.verified){
    throw new UnauthorizedError('Email not verified');
  }

  const passwordCorrect = user === null 
    ? false 
    : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    throw new AuthorizationError('Invalid email or password');
  }

  const userForToken = {
    id: user.id
  };

  const token = jwt.sign(userForToken, envJwt.secret, {
    expiresIn: envJwt.expiration,
  });

  const refresh = jwt.sign(userForToken, envJwt.refreshSecret, {
    expiresIn: envJwt.refreshExpiration,
  });

  user.password = undefined;
  delete user.password; // remove password from response  

  return { access_token: token, refresh_token: refresh };
};

module.exports = LoginService;