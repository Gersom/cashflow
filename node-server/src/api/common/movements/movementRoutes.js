const { Router } = require('express')
const { asyncHandler } = require('@middlewares/asyncHandler')
const { authenticateAndAuthorize } = require('@middlewares/resourseHandler')
const MovementController = require('./movementController.js')

const router = Router()
router.get('/', authenticateAndAuthorize('account'), asyncHandler(MovementController.getAccountMovements))
router.post('/', authenticateAndAuthorize('account'), asyncHandler(MovementController.createMovement))
router.put('/:id', authenticateAndAuthorize('account'), asyncHandler(MovementController.editMovement))
router.delete('/:id', authenticateAndAuthorize('account'), asyncHandler(MovementController.deleteMovement))

module.exports = router