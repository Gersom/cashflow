const { Router } = require("express");
const { asyncHandler } = require("@middlewares/asyncHandler");
const MovementController = require("./movementController.js");

const router = Router();

router.get("/", asyncHandler(MovementController.getAllMovements));
router.get("/:id", asyncHandler(MovementController.getMovement));
router.get("/account/:id", asyncHandler(MovementController.getAccountMovements));
router.post("/", asyncHandler(MovementController.createMovement));
// router.put("/:id", asyncHandler(MovementController.updateMovement));
// router.delete("/:id", asyncHandler(MovementController.deleteMovement));

module.exports = router;