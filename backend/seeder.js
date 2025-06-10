// backend/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const productos = [
  { id_original: 1, nombre: "Té Verde Detox", descripcion: "Infusión antioxidante para limpiar tu cuerpo.", precio: 4990, stock: 12, categoria: "Infusiones", imagen: "https://via.placeholder.com/300x200?text=Te+Verde" },
  { id_original: 2, nombre: "Maca Andina", descripcion: "Suplemento energizante para mejorar tu vitalidad.", precio: 7500, stock: 8, categoria: "Suplementos", imagen: "https://via.placeholder.com/300x200?text=Maca+Andina" },
  { id_original: 3, nombre: "Mix Semillas", descripcion: "Snack saludable y nutritivo para cualquier momento.", precio: 3200, stock: 20, categoria: "Snacks", imagen: "https://via.placeholder.com/300x200?text=Mix+Semillas" }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado para el seeder...');

    await Product.deleteMany();
    console.log('Productos existentes eliminados...');

    await Product.insertMany(productos);
    console.log('¡Productos importados exitosamente!');

    process.exit();
  } catch (error) {
    console.error('Error durante la importación:', error);
    process.exit(1);
  }
};

importData();