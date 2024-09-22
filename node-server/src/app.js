require('./config/aliases');
const express = require('express');

const connectDB = require('@config/database');
const errorHandler = require('@middlewares/errorHandler');
const listen = require('@config/listen');
const middlewares = require('@config/middlewares');
const setupRoutes = require('@config/setupRoutes');
const { initEnv } = require('@config/env');

const pepe = ''

const startServer = async () => {
  await initEnv();

  
  await connectDB();
  const app = express();
  middlewares(app);
  await setupRoutes(app);
  app.use(errorHandler);
  listen(app);
};

startServer();