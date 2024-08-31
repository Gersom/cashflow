const express = require('express');
const middlewares = require('@config/middlewares');
const setupRoutes = require('@config/routes/setupRoutes');
const errorHandler = require('@middlewares/errorHandler');
const listen = require('@config/listen');

async  function createServer() {
  const app = express();
  middlewares(app);
  await setupRoutes(app);
  app.use(errorHandler);
  listen(app);
}

module.exports = createServer;