/**
 * @module databaseConnection
 * @description Configuración y conexión a la base de datos MongoDB.
 */

const mongoose = require("mongoose");

/**
 * @function ConnectToMongoDB
 * @description Establece la conexión con la base de datos MongoDB utilizando la URI proporcionada en las variables de entorno o una URI predeterminada.
 * @async
 * @returns {Promise<void>} Retorna una promesa que resuelve cuando la conexión es exitosa o finaliza el proceso en caso de error.
 * 
 * @example
 * // Ejecutar la función para conectar a MongoDB:
 * const ConnectToMongoDB = require('./path/to/databaseConnection');
 * ConnectToMongoDB();
 */
const ConnectToMongoDB = async () => {
  const mongoURI =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/auth-db";
  try {
    // Conectar a MongoDB
    await mongoose.connect(mongoURI);
    console.log("Conexion exitosa con MongoDB");
  } catch (error) {
    // Manejo de errores en la conexión
    console.log("Error en la conexion con MongoDB: ", error.message);
    process.exit(1);
  }
};

module.exports = ConnectToMongoDB;
