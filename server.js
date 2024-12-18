/**
 * @module serverStart
 * @description Inicia el servidor Express utilizando la configuración definida en `config.js` y `app.js`.
 */

const app = require('./src/app');
const config = require('./src/config/config');

/**
 * Inicia el servidor Express en el puerto configurado en el archivo de configuración.
 * Utiliza la variable de entorno `PORT` o el valor por defecto definido en `config.js`.
 * 
 * @async
 * @returns {void} Retorna `void` una vez que el servidor está en ejecución.
 * @example
 * // El servidor se inicia en el puerto configurado en `config.port`.
 * app.listen(config.port, () => {
 *   console.log(`Servidor corriendo en http://localhost:${config.port}`);
 * });
 */
app.listen(config.port, () => {
    console.log(`Servidor corriendo en http://localhost:${config.port}`);
});
