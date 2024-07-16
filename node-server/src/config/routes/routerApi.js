const express = require('express');
const router = express.Router();

const path = require('path');
const ROUTES_DIR = path.join(__dirname, '..', '..', 'routes');

const routerApi = async () => {
  const getRouteFolders = require('./utils/getRouteFolders');
  const foldersList = await getRouteFolders(ROUTES_DIR) || [];
  for (const folder of foldersList) {
    const pathFolder = path.join(ROUTES_DIR, folder);
    const routeFilePath = path.join(pathFolder, `${folder}Route.js`);
    const route = require(routeFilePath);
    router.use(`/${folder}`, route);
  }

  return  router;
};

module.exports = routerApi();
