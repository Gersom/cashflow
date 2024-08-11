const { UserModel, AccountModel } = require("@models")
const insertIfAbsent = require("./utils/insertIfAbsent")
const accountData = require("@data/account.json")

const insertUsers = async () => {
  const gersomUser = await UserModel.findOneData(
    { email: 'gersom@cashflow.com' }
  );

  await insertIfAbsent({
    name: 'Accounts',
    model: AccountModel,
    data: [
      {
        ...accountData,
        userId: gersomUser.id
      }
    ],
  })
}

module.exports = insertUsers