const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const { asyncHandler } = require('@middlewares/asyncHandler');
const { NotFoundError } = require('@utils/errors');

const setupRoutes = async (app) => {
  const router = express.Router();
  const PATH_ROUTES = path.join(__dirname, '..', 'routes');

  const loadRoutes = async () => {
    const files = await fs.readdir(PATH_ROUTES);
    
    for (const file of files) {
      if (file.endsWith('.js')) {
        const routeName = path.parse(file).name;
        const route = require(path.join(PATH_ROUTES, file));
        router.use(`/${routeName}`, route);
      }
    }

    // Define API routes first
    app.use('/api', router);

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