const { NotFoundError } = require('@utils/apiErrors');
const { join } = require('path');
const express = require('express');
const routerApi = require('@api');

const setupRoutes = (app) => {
  // Define API routes
  app.use('/api', routerApi);

  // Static file serving
  app.use('/storage', express.static(join(__dirname, '..', 'storage')));

  // Root route
  app.get('/', (req, res) => res.send('HealtCheck OK'));

  // Not Found Routes
  app.use((req, res, next) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    next(new NotFoundError(`Unconfigured route: ${fullUrl}. Please review the documentation.`));
  });
}

module.exports = setupRoutes;