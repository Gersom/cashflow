const MovementService = require("./movementService.js");

const MovementController = {
  async getAccountMovements (req, res) {
    const { id } = req.params;
    const result = await MovementService.getAccountMovements(id);
    res.status(200).json(result);
  },
  
  async createMovement (req, res) {
    const result = await MovementService.postMovement(req.body);
    res.status(201).json(result);
  },
}

module.exports = MovementController;