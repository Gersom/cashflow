const insertUsers = require("./insertUsers")
const insertAccounts = require("./insertAccounts")
const insertCategories = require("./insertCategories")
const insertMovements = require("./insertMovements")

const insertData = async () => {
  await insertUsers()
  await insertAccounts()
  await insertCategories()
  await insertMovements()
}

module.exports = insertData