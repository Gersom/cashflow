const express = require('express')
const { asyncHandler } = require('@middlewares/asyncHandler')
const createLoginModule = require('./login.di')

const router = express.Router()
const { loginController } = createLoginModule()

router.post('/', asyncHandler(loginController.handleLogin))

module.exports = router