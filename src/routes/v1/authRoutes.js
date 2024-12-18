/**
 * @module authRoutes
 * @description Rutas para la autenticación de usuarios, incluye registro e inicio de sesión.
 */

const express = require('express');
const { registerUser, loginUser } = require('../../controllers/authController');

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @description Ruta para registrar un nuevo usuario.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} Respuesta con la información del usuario registrado y su token.
 * @example
 * // Solicitud:
 * POST /api/auth/register
 * {
 *   "name": "Juan Perez",
 *   "email": "juan@example.com",
 *   "password": "securepassword"
 * }
 * // Respuesta:
 * {
 *   "id": "123456",
 *   "name": "Juan Perez",
 *   "email": "juan@example.com",
 *   "token": "JWT_TOKEN"
 * }
 */
router.post('/register', registerUser);

/**
 * @route POST /api/auth/login
 * @description Ruta para autenticar un usuario y generar un token JWT.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} Respuesta con la información del usuario autenticado y su token.
 * @example
 * // Solicitud:
 * POST /api/auth/login
 * {
 *   "email": "juan@example.com",
 *   "password": "securepassword"
 * }
 * // Respuesta:
 * {
 *   "id": "123456",
 *   "name": "Juan Perez",
 *   "email": "juan@example.com",
 *   "token": "JWT_TOKEN"
 * }
 */
router.post('/login', loginUser);

module.exports = router;
