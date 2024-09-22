const { Router } = require('express')
const { asyncHandler } = require('@middlewares/asyncHandler')
const authMiddleware = require('@middlewares/jwtAuthorization')
const CurrencyController = require('./currencyController.js')

const router = Router()
router.get('/', authMiddleware, asyncHandler(CurrencyController.getAllCurrencies))

module.exports = router