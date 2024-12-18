/**
 * @module authController
 * @description Controlador para la autenticación de usuarios, incluye registro, inicio de sesión y generación de tokens JWT.
 */

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * @function registerUser
 * @description Registra un nuevo usuario en la base de datos.
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos del usuario: nombre, correo electrónico y contraseña.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Retorna un estado HTTP y un objeto JSON con la información del usuario registrado o un mensaje de error.
 * 
 * @example
 * POST /api/auth/register
 * {
 *   "name": "Juan Perez",
 *   "email": "juan@example.com",
 *   "password": "securepassword"
 * }
 */
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verifica si el usuario ya está registrado
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Usuario ya registrado' });
    }

    // Crea un nuevo usuario
    const user = await User.create({ name, email, password });

    // Genera un token JWT
    const token = generateToken(user._id);

    // Retorna la respuesta con el usuario registrado y el token
    res.status(201).json({ id: user._id, name: user.name, email: user.email, token });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

/**
 * @function loginUser
 * @description Autentica a un usuario existente mediante correo electrónico y contraseña.
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Contiene los datos de inicio de sesión: correo electrónico y contraseña.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Retorna un estado HTTP y un objeto JSON con la información del usuario autenticado o un mensaje de error.
 * 
 * @example
 * POST /api/auth/login
 * {
 *   "email": "juan@example.com",
 *   "password": "securepassword"
 * }
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca al usuario por correo electrónico
    const user = await User.findOne({ email });

    // Verifica la contraseña
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);

      // Retorna la respuesta con el usuario autenticado y el token
      res.status(200).json({ id: user._id, name: user.name, email: user.email, token });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

/**
 * @function generateToken
 * @description Genera un token JWT para la autenticación de usuarios.
 * @param {string} id - ID del usuario.
 * @returns {string} Token JWT generado.
 * 
 * @example
 * const token = generateToken("userId123");
 * console.log(token); // Token JWT
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
