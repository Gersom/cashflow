const { UnauthorizedError } = require('@utils/apiErrors')
const { AccountModel, UserModel } = require('@root/src/models')
const authMiddleware = require('@middlewares/jwtAuthorization')

const authorizeResource = (resourceType) => async (req, res, next) => {
  try {
    const userId = req.user.id
    let resourceId = getResourceId(req, resourceType)

    if (!resourceId && ['account', 'movement'].includes(resourceType)) {
      const user = await UserModel.findDataById(userId)
      if (!user) {
        throw new UnauthorizedError('User not found')
      }
      resourceId = user.selectedAccountId
    }

    if (!resourceId) {
      throw new UnauthorizedError('Resource ID is required')
    }

    const resource = await authorizeResourceAccess(userId, resourceId, resourceType)
    req[resourceType] = resource
    next()
  } catch (error) {
    next(error)
  }
}

function getResourceId (req, resourceType) {
  const idSources = {
    user: () => req.user.id,
    account: () => req.body.accountId || req.body.id || req.query.id,
    default: () => req.params.id || req.body.id || req.query.id
  }
  return (idSources[resourceType] || idSources.default)()
}

async function authorizeResourceAccess (userId, resourceId, resourceType) {
  switch (resourceType) {
    case 'account': {
      const account = await AccountModel.findOne({ _id: resourceId, userId })
      if (!account) throw new UnauthorizedError('You do not have permission to access this account')
      return account
    }
    case 'user': {
      const user = await UserModel.findById(userId)
      if (!user) throw new UnauthorizedError('User not found')
      return user
    }
    default:
      throw new UnauthorizedError('Invalid resource type')
  }
}

const authenticateAndAuthorize = (resourceType) => [
  authMiddleware,
  authorizeResource(resourceType)
]

module.exports = { authenticateAndAuthorize }