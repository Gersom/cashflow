const mongoose = require('mongoose');
const addMethods = require('./utils/addStaticMethods');

const userSchema = new mongoose.Schema({
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
    unique: true, 
    trim: true 
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
userSchema.methods.toJSON = function() {
  const { _id, password, ...others } = this.toObject();
  return { id: _id, ...others };
};

// Agregar métodos estáticos
addMethods(userSchema);

module.exports = mongoose.model('User', userSchema);