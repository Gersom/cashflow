const mongoose = require('mongoose');
const addMethods = require('./utils/addStaticMethods');

const accountSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  currency_type: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// Índices para mejorar el rendimiento de las consultas
accountSchema.index({ user_id: 1 });
accountSchema.index({ name: 1 });

// Método de instancia para obtener una representación formateada
accountSchema.methods.toJSON = function() {
  const { _id, ...others } = this.toObject();
  return { id: _id, ...others };
};

// Método para formatear el saldo con el símbolo de la moneda
accountSchema.methods.getFormattedBalance = function() {
  return `${this.currencySymbol}${this.amount.toFixed(2)}`;
};


// Agregar métodos estáticos
addMethods(accountSchema);

module.exports = mongoose.model('Account', accountSchema);