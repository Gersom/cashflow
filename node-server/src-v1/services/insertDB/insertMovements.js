const { CategoryModel, AccountModel, MovementModel } = require('@models')
const insertIfAbsent = require('./utils/insertIfAbsent')
const movementData = require('@data/movement.json')

const insertMovements = async () => {
  const accountId = await AccountModel.findOneData(
    { name: 'Principal' }
  )
  const gersomCategory = await CategoryModel.findOneData(
    { name: 'Inicial' }
  )

  await insertIfAbsent({
    name: 'Movements',
    model: MovementModel,
    data: [
      {
        ...movementData,
        accountId: accountId.id,
        categories: [gersomCategory.id]
      }
    ]
  })
}

module.exports = insertMovements