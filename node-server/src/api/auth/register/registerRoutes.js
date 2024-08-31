const express = require("express");
const RegisterController = require("./registerController");
const { asyncHandler } = require("@middlewares/asyncHandler");
const { validateRegister } = require("./registerValidation");

const router = express.Router();

router.post(
  "/",
  validateRegister,
  asyncHandler(RegisterController)
);

module.exports = router;