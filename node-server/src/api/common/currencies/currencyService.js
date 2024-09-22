const { CurrencyModel } = require('@root/src/models')
// const { NotFoundError, ValidationError } = require("@utils/apiErrors");

const CurrencyService = {
  async getAllCurrencies () {
    return await CurrencyModel.findAllData()
  }
}

module.exports = CurrencyService