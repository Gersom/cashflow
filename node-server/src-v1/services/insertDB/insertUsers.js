const { UserModel } = require('@models/index')
const userData = require('@data/user.json')
const insertIfAbsent = require('./utils/insertIfAbsent')

const insertUsers = async () => {
  const usersData = [userData]
  await insertIfAbsent({
    name: 'Users',
    model: UserModel,
    data: usersData
  })
}

module.exports = insertUsers