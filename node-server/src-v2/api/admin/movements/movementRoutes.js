const { Router } = require("express");
const MovementController = require("./movementController.js");

const router = Router();

router.get("/", MovementController.getAllMovements);
router.get("/:id", MovementController.getMovement);
// router.post("/", MovementController.createMovement);
// router.put("/:id", MovementController.updateMovement);
// router.delete("/:id", MovementController.deleteMovement);

module.exports = router;