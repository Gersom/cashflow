const mongoose = require('mongoose');
const addMethods = require('./utils/addStaticMethods');

const movementSchema = new mongoose.Schema({
  amount: { 
    type: Number,
    required: true
  },
  description: { 
    type: String,
    required: false,
    trim: true
  },
  image: { 
    type: String,
    required: false,
    trim: true
  },
  title: { 
    type: String,
    required: true,
    trim: true
  },
  type: { 
    type: String,
    required: true,
    enum: ['entry', 'exit'],
    lowercase: true,
    trim: true
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

// Índices para mejorar el rendimiento de las consultas
movementSchema.index({ type: 1 });
movementSchema.index({ title: 1 });

// Método de instancia para obtener una representación formateada
movementSchema.methods.toJSON = function() {
  const { _id, ...others } = this.toObject();
  return { id: _id, ...others };
};

// Agregar métodos estáticos
addMethods(movementSchema);

module.exports = mongoose.model('Movement', movementSchema);