// backend/server.js --- VERSIÓN DE DIAGNÓSTICO

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// --- Nueva función para conectar a la BD ---
const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('>>> Conexión a MongoDB exitosa <<<');

    // Si la conexión es exitosa, iniciamos el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });

  } catch (error) {
    // Si hay un error, lo mostramos en la consola y detenemos todo
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.error('!!! ERROR AL CONECTAR A LA BASE DE DATOS !!!');
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.error(error); // <-- ESTO NOS DARÁ LA PISTA EXACTA
    process.exit(1); // Detiene la aplicación
  }
};

// Rutas de la API (las definimos antes de usarlas)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/productos', require('./routes/productos'));

// --- Iniciar la conexión ---
conectarDB();