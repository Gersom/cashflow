const express = require("express");
const router = express.Router();
const RegisterController = require("./registerController");

router.post("/", RegisterController);

module.exports = router;