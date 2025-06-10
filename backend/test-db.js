// backend/test-db.js

// Este script solo sirve para probar la conexión a la base de datos.
const mongoose = require('mongoose');
require('dotenv').config();

console.log('--- Iniciando prueba de conexión a la base de datos ---');

// Verificamos si la variable de entorno se está leyendo correctamente
if (!process.env.MONGO_URI) {
  console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.error('!!! ERROR: La variable MONGO_URI no se encontró.');
  console.error('!!! Asegúrate de que el archivo .env existe en la carpeta backend y tiene el formato correcto.');
  console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  process.exit(1);
}

console.log('Variable MONGO_URI encontrada. Intentando conectar...');

const conectarPrueba = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('**********************************************');
    console.log('*** ¡ÉXITO! La conexión a MongoDB funcionó. ***');
    console.log('**********************************************');
  } catch (error) {
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.error('!!! FALLÓ LA CONEXIÓN: Se encontró un error. !!!');
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.error('DETALLES DEL ERROR:', error.message);
  } finally {
    // Cerramos la conexión para que el script termine
    await mongoose.connection.close();
  }
};

conectarPrueba();