const { MovementModel, AccountModel, UserModel, CategoryModel } = require('@root/src/models')
const { NotFoundError, ValidationError } = require('@utils/apiErrors')
const { default: mongoose } = require('mongoose')

const { MovementDTO } = require('./movementDTOs')

const MovementService = {

  async getAccountMovements (id, year = null, month = null) {
    const { selectedAccountId } = await UserModel.findDataById(id)
    if (!selectedAccountId) throw new NotFoundError(`Account for user ${id} not found`)

    // const movements = await MovementModel.findAllDataQuery({
    //   accountId: selectedAccountId
    // }).populate('categories');

    // Establecer fecha de inicio y fin del mes
    const now = new Date()
    const startDate = new Date(year || now.getFullYear(), (month || now.getMonth()), 1)
    const endDate = new Date(year || now.getFullYear(), (month || now.getMonth() + 1), 0, 23, 59, 59)
    // const startDate = new Date('2024-09-01');
    // const endDate = new Date('2024','09','20');

    // console.log('startDate', startDate);
    // console.log('endDate', endDate);

    const dateFilter = {
      accountId: selectedAccountId,
      createdAt: { $gte: startDate, $lte: endDate }
    }

    const [movements, totals] = await Promise.all([
      MovementModel.find(dateFilter).populate('categories'),
      MovementModel.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: null,
            totalExpenses: {
              $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] }
            },
            totalIncome: {
              $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] }
            }
          }
        }
      ])
    ])

    const { totalExpenses = 0, totalIncome = 0 } = totals[0] || {}

    return {
      data: {
        movements: movements.map(movement => new MovementDTO(movement)),
        totalIncome: totalIncome.toFixed(2),
        totalExpenses: totalExpenses.toFixed(2)
      },
      count: movements.length,
      success: 'Movements retrieved successfully'
    }
  },

  async postMovement (req) {
    const data = req.body
    const user = await UserModel.findDataById(req.user.id)
    console.log(user)

    if (!data.amount || !data.title || !data.type) {
      throw new ValidationError('Amount, title, type  are required')
    }

    const session = await mongoose.startSession()

    try {
      session.startTransaction()
      console.log('transaction', user.selectedAccountId.toString())

      // this can be improved
      let verifiedCategories = []
      if (data.categories && data.categories.length > 0) {
        verifiedCategories = await CategoryModel.find({
          _id: { $in: data.categories },
          accountId: user.selectedAccountId
        }).session(session)

        if (verifiedCategories.length !== data.categories.length) {
          throw new ValidationError('One or more categories are invalid or do not belong to this account')
        }
      }

      const newMovement = new MovementModel({
        title: data.title,
        description: data.description,
        accountId: user.selectedAccountId,
        type: data.type,
        amount: data.amount,
        categories: data.categories
      })

      await newMovement.save({ session })

      const account = await AccountModel.findById(user.selectedAccountId).session(session)
      if (!account) {
        throw new NotFoundError(`Account with id ${user.selectedAccountId} not found`)
      }

      if (data.type === 'income') {
        account.balance += parseInt(data.amount)
      } else if (data.type === 'expense') {
        account.balance -= parseInt(data.amount)
      }

      await account.save({ session })

      await session.commitTransaction()
      return {
        success: 'Movement created successfully',
        data: { id: newMovement._id }
      }
    } catch (err) {
      await session.abortTransaction()
      throw err
    } finally {
      session.endSession()
    }
  },

  async editMovement (req) {
    const { id } = req.params
    const data = req.body
    const user = await UserModel.findDataById(req.user.id)

    if (!data.amount && !data.title && !data.type && !data.categories) {
      throw new ValidationError('At least one field (amount, title, type, or categories) is required for update')
    }

    const session = await mongoose.startSession()
    try {
      session.startTransaction()

      const movement = await MovementModel.findOne({ _id: id, accountId: user.selectedAccountId }).session(session)
      if (!movement) {
        throw new NotFoundError(`Movement with id ${id} not found or doesn't belong to the selected account`)
      }

      let verifiedCategories = []
      if (data.categories && data.categories.length > 0) {
        verifiedCategories = await CategoryModel.find({ _id: { $in: data.categories }, accountId: user.selectedAccountId }).session(session)
        if (verifiedCategories.length !== data.categories.length) {
          throw new ValidationError('One or more categories are invalid or do not belong to this account')
        }
      }

      const account = await AccountModel.findById(user.selectedAccountId).session(session)
      if (!account) {
        throw new NotFoundError(`Account with id ${user.selectedAccountId} not found`)
      }

      // Adjust account balance if amount or type changed
      if (data.amount || data.type) {
        if (movement.type === 'income') {
          account.balance -= parseInt(movement.amount)
        } else if (movement.type === 'expense') {
          account.balance += parseInt(movement.amount)
        }

        const newType = data.type || movement.type
        const newAmount = data.amount || movement.amount

        if (newType === 'income') {
          account.balance += parseInt(newAmount)
        } else if (newType === 'expense') {
          account.balance -= parseInt(newAmount)
        }

        await account.save({ session })
      }

      // Update movement
      Object.assign(movement, {
        title: data.title || movement.title,
        description: data.description || movement.description,
        type: data.type || movement.type,
        amount: data.amount || movement.amount,
        categories: data.categories || movement.categories
      })

      await movement.save({ session })

      await session.commitTransaction()
      return {
        success: 'Movement updated successfully'
        // data: new MovementDTO(movement)
      }
    } catch (err) {
      await session.abortTransaction()
      throw err
    } finally {
      session.endSession()
    }
  },

  async deleteMovement (req) {
    const { id } = req.params
    const user = await UserModel.findDataById(req.user.id)

    const session = await mongoose.startSession()
    try {
      session.startTransaction()

      const movement = await MovementModel.findOne({ _id: id, accountId: user.selectedAccountId }).session(session)
      if (!movement) {
        throw new NotFoundError(`Movement with id ${id} not found or doesn't belong to the selected account`)
      }

      const account = await AccountModel.findById(user.selectedAccountId).session(session)
      if (!account) {
        throw new NotFoundError(`Account with id ${user.selectedAccountId} not found`)
      }

      // Adjust account balance
      if (movement.type === 'income') {
        account.balance -= parseInt(movement.amount)
      } else if (movement.type === 'expense') {
        account.balance += parseInt(movement.amount)
      }

      await account.save({ session })

      // Delete movement
      await MovementModel.deleteOne({ _id: id }).session(session)

      await session.commitTransaction()
      return {
        success: 'Movement deleted successfully'
      }
    } catch (err) {
      await session.abortTransaction()
      throw err
    } finally {
      session.endSession()
    }
  }

}

module.exports = MovementService