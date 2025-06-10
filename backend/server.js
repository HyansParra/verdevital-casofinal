const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('>>> Conexión a MongoDB exitosa <<<'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas de la API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/productos', require('./routes/productos'));


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});