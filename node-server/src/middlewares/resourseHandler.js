const { UnauthorizedError } = require("@utils/apiErrors");
const { AccountModel, UserModel } = require("@root/src/models");
const authMiddleware = require("@middlewares/jwtAuthorization");

class ResourceAuthorizer {
  static async authorizeAccount(userId, resourceId) {
    const account = await AccountModel.findOne({ _id: resourceId, userId });
    if (!account) throw new UnauthorizedError('You do not have permission to access this account');
    return account;
  }

  static async authorizeUser(userId) {
    const user = await UserModel.findById(userId);
    if (!user) throw new UnauthorizedError('User not found');
    return user;
  }

  static async preAuthorizeAccount(userId) {
    const user = await UserModel.findDataById(userId);
    if (!user) throw new UnauthorizedError('User not found');
    if (!user.selectedAccount) throw new UnauthorizedError('You do not have permission to access this account');
    return user.selectedAccount;
  }
}

class ResourceIdExtractor {
  static extractId(req, resourceType) {
    const strategies = {
      user: () => req.user.id,
      account: () => req.body.accountId || req.params.id || req.body.id || req.query.id,
      default: () => req.params.id || req.body.id || req.query.id
    };

    return (strategies[resourceType] || strategies.default)();
  }
}

const authorizeResource = (resourceType) => async (req, res, next) => {
  const userId = req.user.id;
  let resourceId = ResourceIdExtractor.extractId(req, resourceType);

  if (resourceType === 'account' && !resourceId) {
    resourceId = await ResourceAuthorizer.preAuthorizeAccount(userId);
  }

  if (!resourceId) {
    return next(new UnauthorizedError('Resource ID is required'));
  }

  try {
    const authorizeMethod = `authorize${resourceType.charAt(0).toUpperCase() + resourceType.slice(1)}`;
    if (!ResourceAuthorizer[authorizeMethod]) {
      return next(new UnauthorizedError('Invalid resource type'));
    }

    const authorizedResource = await ResourceAuthorizer[authorizeMethod](userId, resourceId);
    req[resourceType] = authorizedResource;
    next();
  } catch (error) {
    next(error);
  }
};

const authenticateAndAuthorize = (resourceType) => [
  authMiddleware,
  authorizeResource(resourceType)
];

module.exports = { authenticateAndAuthorize };