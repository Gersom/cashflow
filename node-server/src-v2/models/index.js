const models = {
  AccountModel: require("./mongoose/Account"),
  CategoryModel: require("./mongoose/Category"),
  MovementModel: require("./mongoose/Movement"),
  RecoveryCodeModel: require("./mongoose/RecoveryCode"),
  UserModel: require("./mongoose/User"),
}

module.exports = models;