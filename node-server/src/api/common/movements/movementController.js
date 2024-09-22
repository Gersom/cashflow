const MovementService = require('./movementService.js')
const { responseSuccess, dataSuccess } = require('@utils/apiSuccess')

const MovementController = {
  async getAccountMovements (req, res) {
    const { id } = req.user
    const result = await MovementService.getAccountMovements(id)
    res.status(200).json(dataSuccess('Movements retrieved successfully', result))
  },

  async createMovement (req, res) {
    const result = await MovementService.postMovement(req)
    res.status(201).json(dataSuccess('Movement created successfully', result))
  },

  async editMovement (req, res) {
    await MovementService.editMovement(req)
    res.status(200).json(responseSuccess('Movement updated successfully'))
  },

  async deleteMovement (req, res) {
    await MovementService.deleteMovement(req)
    res.status(200).json(responseSuccess('Movement deleted successfully'))
  }
}

module.exports = MovementController