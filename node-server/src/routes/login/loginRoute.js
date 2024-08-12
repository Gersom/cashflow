const express = require("express");
const router = express.Router();
const { asyncHandler } = require("@middlewares/asyncHandler");
const {
  getAllUsers,
} = require("./loginHandler");

router.post("/", asyncHandler(getAllUsers));

module.exports = router;