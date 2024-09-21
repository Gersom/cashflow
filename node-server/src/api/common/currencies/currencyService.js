const { CurrencyModel } = require("@root/src/models");
// const { NotFoundError, ValidationError } = require("@utils/apiErrors");

const CurrencyService = {
  async getAllCurrencies() {
    const currencies = await CurrencyModel.findAllData();

    return {
      data: currencies,//add dto if we want the data formated in an specific way
      count: currencies.length,
      success: 'Currencies retrieved successfully'
    };
  },
}

module.exports = CurrencyService;