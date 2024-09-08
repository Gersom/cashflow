const { Router } = require('express');
const routeAdmin = require("./admin");
const routeAuth = require("./auth");
const routeCommon = require("./common");
const authMiddleware = require("@middlewares/jwtAuthorization");

const router = Router();

router.use(`/admin`, routeAdmin);
router.use(`/common`, routeCommon);
router.use(`/auth`, routeAuth);

module.exports = router;