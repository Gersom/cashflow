const path = require('path');
const express = require('express');
const { asyncHandler } = require('@middlewares/asyncHandler');
const { NotFoundError } = require('@utils/errors');

const setupRoutes = async (app) => {
  const loadRoutes = async () => {
    const routerApi = await require('./routerApi');

    // Define Login/register route
    app.use('/login', require('@routes/login/loginRoute.js'));
    app.use('/register', require('@routes/register/registerRoute.js'));

    // Define API routes
    app.use('/api', routerApi);

    // Static file serving
    app.use('/storage', express.static(path.join(__dirname, '..', 'storage')));
    
    // Root route
    app.get('/', (req, res) => res.send('Hello'));

    // Not Found Routes
    app.use((req, res, next) => {
      const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      next(new NotFoundError(`Unconfigured route: ${fullUrl}. Please review the documentation.`));
    });
  };

  await asyncHandler(loadRoutes)(null, null, (err) => {
    if (err) {
      console.error('\nError setting up routes:\n', err);
      throw err;  // This will be caught by the error handler middleware
    }
  });
};

module.exports = setupRoutes;
