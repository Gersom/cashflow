const express = require('express')
const { asyncHandler } = require('@middlewares/asyncHandler')
const { validateRequest, validateVerify, validateResend, validateReset } = require('./recover.validation')
const createRecoverModule = require('./recover.di')
const RecoverController = createRecoverModule()

const router = express.Router()

router.post(
  '/request',
  validateRequest,
  asyncHandler(RecoverController.requestCode)
)
router.post(
  '/verify',
  validateVerify,
  asyncHandler(RecoverController.verifyCode)
)
router.post(
  '/resend',
  validateResend,
  asyncHandler(RecoverController.resendCode)
)
router.post(
  '/reset',
  validateReset,
  asyncHandler(RecoverController.resetPassword)
)

module.exports = router