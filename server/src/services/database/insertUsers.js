const { UserModel } = require("@models/index")
const usersData = require("@data/users.json")
const insertIfAbsent = require("./utils/insertIfAbsent")

const insertUsers = async () => {
  await insertIfAbsent({
    name: 'Users',
    model: UserModel,
    data: usersData,
  })
}

module.exports = insertUsers