const { Schema, model } = require('mongoose')
const addMethods = require('./utils/addStaticMethods')

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  accountId: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  }
}, {
  timestamps: false,
  versionKey: false
})

// Índices únicos para mejorar el rendimiento y garantizar la unicidad
categorySchema.index({ name: 1 })

// Agregar métodos estáticos
addMethods(categorySchema)

module.exports = model('Category', categorySchema)