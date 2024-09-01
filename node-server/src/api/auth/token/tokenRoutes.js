const express = require("express");
const tokenController = require("./tokenController");
const { asyncHandler } = require("@middlewares/asyncHandler");

const router = express.Router();

router.post('/refresh', asyncHandler(tokenController.refresh));
router.post('/verify', asyncHandler(tokenController.verify));

module.exports = router;