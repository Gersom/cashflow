const express = require("express");
const router = express.Router();
const { asyncHandler } = require("@middlewares/asyncHandler");
const {
  register,
} = require("./registerHandler");

router.post("/", asyncHandler(register));

module.exports = router;