const mongoose = require('mongoose');
const addMethods = require('./utils/addStaticMethods');

const movementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true,
    enum: ['income', 'expense']
  },
  amount: {
    type: Number,
    required: true
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }]
}, {
  timestamps: true,
  versionKey: false
});

// Índices para mejorar el rendimiento de las consultas
movementSchema.index({ account_id: 1 });
movementSchema.index({ date: 1 });
movementSchema.index({ type: 1 });

// Método de instancia para obtener una representación formateada
movementSchema.methods.toJSON = function() {
  const { _id, ...others } = this.toObject();
  return { id: _id, ...others };
};

// Agregar métodos estáticos
addMethods(movementSchema);

module.exports = mongoose.model('Movement', movementSchema);