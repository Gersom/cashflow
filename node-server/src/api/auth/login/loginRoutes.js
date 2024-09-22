const express = require('express')
const LoginController = require('./loginController')
const { asyncHandler } = require('@middlewares/asyncHandler')

const router = express.Router()

router.post('/', asyncHandler(LoginController))

module.exports = router