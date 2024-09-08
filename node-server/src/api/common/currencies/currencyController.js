const CurrencyService = require("./currencyService.js");

const CurrencyController = {
  async getAllCurrencies (req, res) {
    const result = await CurrencyService.getAllCurrencies();
    res.status(200).json(result);
  }
}

module.exports = CurrencyController;