const { UserModel, AccountModel, CategoryModel } = require("@models")
const insertIfAbsent = require("./utils/insertIfAbsent")
const categoryData = require("@data/category.json")
const getProperty = require("@utils/dbEngineProperties")

const insertUsers = async () => {
  const annyUser = await UserModel.findOneData(
    { email: 'anny@cashflow.com' }
  );
  const gersomUser = await UserModel.findOneData(
    { email: 'gersom@cashflow.com' }
  );

  const annyAccountUser = await AccountModel.findOneData(
    { user: annyUser[getProperty().id], name: "principal" }
  );
  const gersomAccountUser = await AccountModel.findOneData(
    { user: gersomUser[getProperty().id], name: "principal" }
  );

  await insertIfAbsent({
    name: 'Categories',
    model: CategoryModel,
    data: [
      {
        ...categoryData,
        account: annyAccountUser[getProperty().id]
      },
      {
        ...categoryData,
        account: gersomAccountUser[getProperty().id]
      }
    ],
  })
}

module.exports = insertUsers