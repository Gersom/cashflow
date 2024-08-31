const { AccountModel, CategoryModel } = require("@models")
const insertIfAbsent = require("./utils/insertIfAbsent")
const categoriesData = require("@data/categories.json")

const insertUsers = async () => {
  const gersomAccount = await AccountModel.findOneData(
    { name: "Principal" }
  );

  let categories = categoriesData.map(category => ({
    ...category,
    accountId: gersomAccount.id
  }))

  await insertIfAbsent({
    name: 'Categories',
    model: CategoryModel,
    data: categories
  })
}

module.exports = insertUsers