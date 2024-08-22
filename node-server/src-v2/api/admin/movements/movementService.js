const { MovementModel } = require("@models");
const { NotFoundError, ValidationError } = require("@utils/apiErrors");

const MovementService = {
  async getAllMovements (query = {}) {
    const movements = await MovementModel.findAllData(query);
    return {
      data: movements,
      count: movements.length,
      success: 'Movements retrieved successfully'
    };
  },
  
  async getMovement (id) {
    const movement = await MovementModel.findDataById(id);
    if (!movement) {
      throw new NotFoundError(`Movement with id ${id} not found`);
    }
    return {
      data: movement,
      success: 'Movement retrieved successfully'
    };
  },
  
  async postMovement (data) {
    if (!data.amount || !data.title || !data.type || !data.accountId ) {
      throw new ValidationError("Amount, title, type and accountId are required");
    }
    await MovementModel.create(data);
    return {
      success: 'Movement created successfully'
    };
  },
  
  async updateMovement (id, data) {
    const updatedMovement = await MovementModel.updateData(id, data);
    if (!updatedMovement) {
      throw new NotFoundError(`Movement with id ${id} not found`);
    }
    return {
      success: 'Movement updated successfully'
    };
  },
  
  async deleteMovement (id) {
    const deletedMovement = await MovementModel.removeData(id);
    if (!deletedMovement) {
      throw new NotFoundError(`Movement with id ${id} not found`);
    }
    return {
      success: 'Movement deleted successfully'
    };
  },
}

module.exports = MovementService;