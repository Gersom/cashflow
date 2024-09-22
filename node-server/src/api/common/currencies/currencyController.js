const CurrencyService = require('./currencyService.js')
const { dataSuccess } = require('@utils/apiSuccess')

const CurrencyController = {
  async getAllCurrencies (req, res) {
    const currencies = await CurrencyService.getAllCurrencies()
    res.status(200).json(dataSuccess('Currencies retrieved successfully', currencies))
  }
}

module.exports = CurrencyController