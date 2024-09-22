const express = require('express')
const { asyncHandler } = require('@middlewares/asyncHandler')
const createLoginModule = require('./login.di')

const router = express.Router()
const LoginController = createLoginModule()

router.post('/', asyncHandler(LoginController.handleLogin))

module.exports = router