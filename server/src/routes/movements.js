const express = require("express");
const router = express.Router();
const { asyncHandler } = require("@middlewares/asyncHandler");
const {
  getAllMovements,
  getMovement,
  createMovement,
  updateMovement,
  deleteMovement
} = require("@handlers/movements");

router.get("/", asyncHandler(getAllMovements));
router.get("/:id", asyncHandler(getMovement));
router.post("/", asyncHandler(createMovement));
router.put("/:id", asyncHandler(updateMovement));
router.delete("/:id", asyncHandler(deleteMovement));

module.exports = router;