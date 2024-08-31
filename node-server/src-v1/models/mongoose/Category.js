const mongoose = require('mongoose');
const addMethods = require('./utils/addStaticMethods');

const categorySchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    trim: true,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
}, {
  timestamps: false,
  versionKey: false
});

// Índices únicos para mejorar el rendimiento y garantizar la unicidad
categorySchema.index({ name: 1 });

// Método de instancia para obtener una representación formateada
categorySchema.methods.toJSON = function() {
  const { _id, ...others } = this.toObject();
  return { id: _id, ...others };
};

// Agregar métodos estáticos
addMethods(categorySchema);

module.exports = mongoose.model('Category', categorySchema);