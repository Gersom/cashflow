const path = require('path')

const srcPath = path.join(__dirname, '../../src')

const aliases = {
  root: `${srcPath}/../`,
  src: `${srcPath}`,
  api: `${srcPath}/api`,
  config: `${srcPath}/config`,
  data: `${srcPath}/data`,
  middlewares: `${srcPath}/middlewares`,
  models: `${srcPath}/models`,
  storage: `${srcPath}/storage`,
  utils: `${srcPath}/utils`
}

const requireAliases = (path) => {
  const indexAt = path.indexOf('@')
  const indexBar = path.indexOf('/', indexAt)

  if (indexAt === -1 || indexBar === -1) {
    throw new Error('Error en la sintaxis de alias')
  }

  const alias = path.slice(indexAt + 1, indexBar)
  const segundaParte = path.slice(indexBar + 1)

  return require(`${aliases[alias]}/${segundaParte}`)
}

module.exports = { requireAliases }