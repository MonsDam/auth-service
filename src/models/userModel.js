/**
 * @module userModel
 * @description Modelo de usuario para la base de datos MongoDB, incluye esquemas y middleware para la gestión de contraseñas.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * @typedef {Object} User
 * @property {string} name - Nombre del usuario.
 * @property {string} email - Correo electrónico del usuario, único en la base de datos.
 * @property {string} password - Contraseña del usuario, almacenada de forma segura.
 */

/**
 * Esquema de usuario que define los campos y sus restricciones.
 * @type {mongoose.Schema<User>}
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Obligatorio
  },
  email: {
    type: String,
    required: true, // Obligatorio
    unique: true,   // Debe ser único
  },
  password: {
    type: String,
    required: true, // Obligatorio
  },
});

/**
 * Middleware de pre-guardado para el esquema de usuario.
 * Hashea la contraseña antes de guardar un usuario en la base de datos.
 * Solo aplica si el campo "password" ha sido modificado.
 * 
 * @param {Function} next - Llamada para continuar con el flujo de ejecución.
 */
userSchema.pre('save', async function (next) {
  // Si la contraseña no fue modificada, salta el hash
  if (!this.isModified('password')) {
    return next();
  }
  
  // Genera el salt y hashea la contraseña
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
