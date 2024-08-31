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

// Método de instancia para obtener una representación formateada
recoveryCodeSchema.set('toJSON', {
  transform: function(doc, ret) {
    if (ret.userId && typeof ret.userId === 'object') {
      const { _id, userId, ...others } = ret;
      const { _id: userIdId, ...userIdOthers } = userId;
      return { id: _id, user: { id: userIdId, ...userIdOthers }, ...others };
    }
    else {
      const { _id, ...others } = ret;
      return { id: _id, ...others };
    }
  }
});

// Agregar métodos estáticos
addMethods(recoveryCodeSchema);

module.exports = model('RecoveryCode', recoveryCodeSchema);