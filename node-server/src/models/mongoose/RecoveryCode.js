const { Schema, model } = require('mongoose');
const addMethods = require('./utils/addStaticMethods');

const recoveryCodeSchema = new Schema({
  userId: { // Referencia al usuario
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, 
  code: { // Código de recuperación
    type: String,
    required: true
  },
  expiresAt: {  // Fecha y hora de expiración
    type: Date,
    required: true
  },
}, { 
  timestamps: true, 
  versionKey: false 
});

// Índices para mejorar el rendimiento de las consultas
recoveryCodeSchema.index({ code: 1 });

// Agregar métodos estáticos
addMethods(recoveryCodeSchema);

module.exports = model('RecoveryCode', recoveryCodeSchema);