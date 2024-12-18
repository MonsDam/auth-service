/**
 * @module server
 * @description Configuración del servidor Express, incluyendo middleware, rutas y conexión a la base de datos MongoDB.
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToMongoDB = require('./db/connection-mongodb');
const authRoutes = require('./routes/v1/authRoutes');

// Cargar variables de entorno
dotenv.config();

const app = express();

// Middleware
/**
 * Middleware que habilita CORS para permitir solicitudes de diferentes orígenes.
 */
app.use(cors());

/**
 * Middleware que convierte el cuerpo de la solicitud a formato JSON.
 */
app.use(express.json());

// Conectar a la base de datos MongoDB
/**
 * Conecta el servidor a la base de datos MongoDB utilizando la función definida en `connection-mongodb.js`.
 */
connectToMongoDB();

// Ruta principal
/**
 * Ruta principal que responde con un mensaje simple de saludo.
 * @route GET /
 * @returns {string} Mensaje de saludo al acceder a la ruta raíz.
 */
app.get('/', (req, res) => {
    res.send('¡Hola, Express!');
});

// Rutas de autenticación
/**
 * Rutas relacionadas con la autenticación de usuarios, definidas en `authRoutes.js`.
 * @route /api/v1/auth
 */
app.use('/api/v1/auth', authRoutes);

// Manejo de errores - Ruta no encontrada
/**
 * Middleware para manejar rutas no encontradas (404).
 * Responde con un mensaje de error si la ruta solicitada no existe.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función para pasar al siguiente middleware.
 * @returns {void}
 */
app.use((req, res, next) => {
    const error = new Error('Not Found');
    res.status(404).json({ message: error.message });
});

module.exports = app;
