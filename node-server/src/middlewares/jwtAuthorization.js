const jwt = require('jsonwebtoken');
const { AuthorizationError } = require("@utils/errors");


const authMiddleware = (req, res, next) => {
    const authorization = req.get('Authorization');
    
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      const token = authorization.split(' ')[1];
      
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(decoded);
        next();
      } catch (error) {
        throw new AuthorizationError('Invalid token');
      }
    } else {
      throw new AuthorizationError('Token missing or invalid');
    }
};

module.exports = authMiddleware;