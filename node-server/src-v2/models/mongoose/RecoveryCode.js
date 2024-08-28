const { Schema, model } = require('mongoose');
const addMethods = require('./utils/addStaticMethods');

const userSchema = new Schema({
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
userSchema.index({ code: 1 });

// Método de instancia para obtener una representación formateada
userSchema.methods.toJSON = function() {
  const { _id, ...others } = this.toObject();
  return { id: _id, ...others };
};

// Agregar métodos estáticos
addMethods(userSchema);

module.exports = model('RecoveryCode', userSchema);