const { UserModel, AccountModel } = require("@models")
const insertIfAbsent = require("./utils/insertIfAbsent")
const accountData = require("@data/account.json")
const getProperty = require("@utils/dbEngineProperties")

const insertUsers = async () => {
  const annyUser = await UserModel.findOneData(
    { email: 'anny@cashflow.com' }
  );
  const gersomUser = await UserModel.findOneData(
    { email: 'gersom@cashflow.com' }
  );

  await insertIfAbsent({
    name: 'Accounts',
    model: AccountModel,
    data: [
      {
        ...accountData,
        user: annyUser[getProperty().id]
      },
      {
        ...accountData,
        user: gersomUser[getProperty().id]
      }
    
      
    ],
  })
}

module.exports = insertUsers