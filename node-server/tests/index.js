const { requireAliases } = require('utils/aliases')

const controllers = requireAliases(
  '@api/common/users/userController')

module.exports = controllers