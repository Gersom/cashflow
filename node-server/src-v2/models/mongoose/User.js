const { Schema, model } = require('mongoose');
const addMethods = require('./utils/addStaticMethods');

const userSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  whatsapp: {
    type: String,
    required: false,
    trim: true,
  },
  password: {
    type: String,
    required: true
  },
  name: { 
    type: String,
    required: true, 
    trim: true 
  },
  profile_pic: { 
    type: String, 
    required: false, 
    trim: true 
  }
}, { 
  timestamps: true, 
  versionKey: false 
});

// Índices para mejorar el rendimiento de las consultas
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ name: 1 });

// Método de instancia para obtener una representación formateada
userSchema.set('toJSON', {
  transform: function(doc, ret) {
    const { _id, ...others } = ret;
    return { id: _id, ...others };
  }
});

// Agregar métodos estáticos
addMethods(userSchema);

module.exports = model('User', userSchema);