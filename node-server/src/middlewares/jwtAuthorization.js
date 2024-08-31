const { verify } = require('jsonwebtoken');
const { AuthorizationError } = require("@utils/apiErrors");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  
  if (token) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      throw new AuthorizationError('Token inválido');
    }
  } else {
    throw new AuthorizationError('Token faltante o inválido');
  }
};

module.exports = authMiddleware;