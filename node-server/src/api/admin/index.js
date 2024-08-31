const { Router } = require('express');

const accountRoutes = require("./accounts/accountRoutes.js");
const categoryRoutes = require("./categories/categoryRoutes.js");
const movementRoutes = require("./movements/movementRoutes.js");
const userRoutes = require("./users/userRoutes.js");

const router = Router();

router.use(`/accounts`, accountRoutes);
router.use(`/categories`, categoryRoutes);
router.use(`/movements`, movementRoutes);
router.use(`/users`, userRoutes);

module.exports = router;
