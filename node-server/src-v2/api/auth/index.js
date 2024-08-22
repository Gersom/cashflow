const { Router } = require('express');

const loginRoutes = require("./login/loginRoutes");
const registerRoutes = require("./register/registerRoutes");

const router = Router();

router.use(`/login`, loginRoutes);
router.use(`/register`, registerRoutes);

module.exports = router;
