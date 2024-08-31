const MovementService = require("./movementService.js");

const MovementController = {
  async getAllMovements (req, res) {
    const result = await MovementService.getAllMovements(req.query);
    res.status(200).json(result);
  },
  
  async getMovement (req, res) {
    const { id } = req.params;
    const result = await MovementService.getMovement(id);
    res.status(200).json(result);
  },
  
  async createMovement (req, res) {
    const result = await MovementService.postMovement(req.body);
    res.status(201).json(result);
  },
  
  async updateMovement (req, res) {
    const { id } = req.params;
    const result = await MovementService.updateMovement(id, req.body);
    res.status(200).json(result);
  },
  
  async deleteMovement (req, res) {
    const { id } = req.params;
    const result = await MovementService.deleteMovement(id);
    res.status(200).json(result);
  },
}

module.exports = MovementController;