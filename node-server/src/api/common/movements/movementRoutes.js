const { Router } = require("express");
const { asyncHandler } = require("@middlewares/asyncHandler");
const { authenticateAndAuthorize } = require("@middlewares/resourseHandler");
const MovementController = require("./movementController.js");

const router = Router();

router.get("/account/:id", authenticateAndAuthorize('account') ,asyncHandler(MovementController.getAccountMovements));
router.post("/",authenticateAndAuthorize('account'), asyncHandler(MovementController.createMovement));

module.exports = router;