const { UnauthorizedError } = require("@utils/apiErrors");
const { AccountModel, UserModel } = require("@root/src/models");
const authMiddleware = require("@middlewares/jwtAuthorization");

const resourceAuthorization = {
    async account(userId, resourceId) {
        const account = await AccountModel.findOne({ _id: resourceId, userId });
        if (!account) throw new UnauthorizedError('You do not have permission to access this account');
        return account;
    },

    async user(userId, resourceId) {
        const user = await UserModel.findById(userId);
        if (userId !== resourceId) throw new UnauthorizedError('You do not have permission to access this user data');
        if (!user) throw new UnauthorizedError('User not found');
        return user;
    },

};

const authorizeResource = (resourceType) => async (req, res, next) => {
    const userId = req.user.id;
    const resourceId = req.params.id || req.body.id || req.query.id;

    if (!resourceId) {
        return next(new UnauthorizedError('Resource ID is required'));
    }

    if (!resourceAuthorization[resourceType]) {
        return next(new UnauthorizedError('Invalid resource type'));
    }

    try {
        const authorizedResource = await resourceAuthorization[resourceType](userId, resourceId);
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