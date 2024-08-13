const express = require("express");
const router = express.Router();
const { asyncHandler } = require("@middlewares/asyncHandler");
const {
  login,
} = require("./loginHandler");

router.post("/", asyncHandler(login));

module.exports = router;