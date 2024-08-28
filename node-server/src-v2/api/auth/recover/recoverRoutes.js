const express = require("express");
const RecoverController = require("./recoverController");
const { asyncHandler } = require("@middlewares/asyncHandler");

const router = express.Router();

router.post("/request", asyncHandler(RecoverController.requestCode));
router.post("/verify", asyncHandler(RecoverController.verifyCode));
router.post("/resend", asyncHandler(RecoverController.resendCode));
// router.post("/reset", asyncHandler(RecoverController.resetPassword));

module.exports = router;