const { Schema, model } = require('mongoose');
const addMethods = require('./utils/addStaticMethods');

const accountSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  currencyId: {
    type: Schema.Types.ObjectId,
    ref: 'Currency',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true,
  versionKey: false
});

// Índices para mejorar el rendimiento de las consultas
accountSchema.index({ user_id: 1 });
accountSchema.index({ name: 1 });

// Método de instancia para obtener una representación formateada
accountSchema.set('toJSON', {
  transform: function(doc, ret) {
    const { _id, ...others } = ret;
    return { id: _id, ...others };
  }
});

// Método para formatear el saldo con el símbolo de la moneda
accountSchema.methods.getFormattedBalance = function() {
  return `${this.currencySymbol}${this.amount.toFixed(2)}`;
};

// Agregar métodos estáticos
addMethods(accountSchema);

module.exports = model('Account', accountSchema);