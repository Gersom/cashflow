const { Router } = require('express');

const loginRoutes = require("./login/loginRoutes");
const registerRoutes = require("./register/registerRoutes");
const recoverRoutes = require("./recover/recoverRoutes");

const router = Router();

router.use(`/login`, loginRoutes);
router.use(`/register`, registerRoutes);
router.use(`/recover-password`, recoverRoutes);

module.exports = router;
