const { serv } = require('@config/env')

const listen = (app) => {
  const message = 'Server running on'
  const fullMessage = `\n${message}:\n=> ${serv.address}\n`

  app.listen(serv.port, () => console.log(fullMessage))
}

module.exports = listen