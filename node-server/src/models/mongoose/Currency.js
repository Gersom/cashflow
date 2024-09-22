const { Schema, model } = require('mongoose')
const addMethods = require('./utils/addStaticMethods')

const CurrencySchema = new Schema({
  symbol: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    minlength: 3,
    maxlength: 3
  },
  plural: {
    type: String,
    required: true,
    trim: true
  },
  rate: {
    type: Number,
    required: true,
    default: 1,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  countryCode: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    minlength: 2,
    maxlength: 2
  },
  decimalPlaces: {
    type: Number,
    default: 2,
    min: 0,
    max: 8
  }
}, {
  timestamps: true
})

// Compound index for guarentee uniqueness of code
CurrencySchema.index({ code: 1, countryCode: 1 }, { unique: true })

// Inxed for optimized search operations based on code and symbol
CurrencySchema.index({ symbol: 1, code: 1 })

// Static method for convert amount from one currency to another
CurrencySchema.statics.convert = async function (amount, fromCurrency, toCurrency) {
  const from = await this.findOne({ code: fromCurrency.toUpperCase() })
  const to = await this.findOne({ code: toCurrency.toUpperCase() })
  if (!from || !to) {
    throw new Error('One or both currencies are not found')
  }
  return (amount / from.rate) * to.rate
}

// Agregar métodos estáticos
addMethods(CurrencySchema)

// Middleware presave fo update lastUpdated field automatically
CurrencySchema.pre('save', function (next) {
  this.lastUpdated = new Date()
  next()
})

module.exports = model('Currency', CurrencySchema)