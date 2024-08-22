const express = require("express");
const router = express.Router();
const LoginController = require("./loginController");

router.post("/", LoginController);

module.exports = router;