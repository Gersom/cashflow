const { Router } = require('express');
const routeAdmin = require("./admin");
const routeAuth = require("./auth");

const router = Router();

router.use(`/admin`, routeAdmin);
router.use(`/auth`, routeAuth);

module.exports = router;