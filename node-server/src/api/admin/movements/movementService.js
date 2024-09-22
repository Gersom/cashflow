const { MovementModel } = require('@root/src/models')
const { AccountModel } = require('@root/src/models')
const { NotFoundError, ValidationError } = require('@utils/apiErrors')
const { default: mongoose } = require('mongoose')

const MovementService = {
  async getAllMovements (query = {}) {
    const movements = await MovementModel.findAllData(query)
    return {
      data: movements,
      count: movements.length,
      success: 'Movements retrieved successfully'
    }
  },

  async getMovement (id) {
    const movement = await MovementModel.findDataById(id)
    if (!movement) {
      throw new NotFoundError(`Movement with id ${id} not found`)
    }
    return {
      data: movement,
      success: 'Movement retrieved successfully'
    }
  },

  async getAccountMovements (id) {
    const account = await AccountModel.findDataById(id)
    if (!account) {
      throw new NotFoundError(`Account with id ${id} not found`)
    }

    const movements = await MovementModel.findAllData({
      accountId: id
    })

    return {
      data: movements,
      count: movements.length,
      success: 'Movements retrieved successfully'
    }
  },

  async postMovement (data) {
    if (!data.amount || !data.title || !data.type || !data.accountId) {
      throw new ValidationError('Amount, title, type and accountId are required')
    }

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      const newMovement = new MovementModel({
        title: data.title,
        description: data.description,
        accountId: data.accountId,
        type: data.type,
        amount: data.amount,
        categories: data.categories
      })

      await newMovement.save()

      const account = await AccountModel.findById(data.accountId).session(session)
      if (!account) {
        throw new NotFoundError(`Account with id ${data.accountId} not found`)
      }

      if (data.type === 'income') {
        account.balance += data.amount
      } else if (data.type === 'expense') {
        account.balance -= data.amount
      }
      await account.save()
      session.commitTransaction()

      return { success: 'Movement created successfully' }
    } catch (err) {
      session.abortTransaction()
      throw err
    } finally {
      session.endSession()
    }
  },

  async updateMovement (id, data) {
    const updatedMovement = await MovementModel.updateData(id, data)
    if (!updatedMovement) {
      throw new NotFoundError(`Movement with id ${id} not found`)
    }
    return {
      success: 'Movement updated successfully'
    }
  },

  async deleteMovement (id) {
    const deletedMovement = await MovementModel.removeData(id)
    if (!deletedMovement) {
      throw new NotFoundError(`Movement with id ${id} not found`)
    }
    return {
      success: 'Movement deleted successfully'
    }
  }
}

module.exports = MovementService