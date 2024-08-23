const express = require("express");
const RegisterController = require("./registerController");
const { asyncHandler } = require("@middlewares/asyncHandler");

const router = express.Router();

router.post("/", asyncHandler(RegisterController));

module.exports = router;