// backend/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const productos = [
  {
    nombre: "Té Verde Detox",
    descripcion: "Infusión antioxidante para limpiar tu cuerpo.",
    precio: 4990,
    stock: 12,
    categoria: "Infusiones",
    imagen: "https://images.unsplash.com/photo-1597318181409-940150493784?q=80&w=870&auto=format&fit=crop"
  },
  {
    nombre: "Maca Andina",
    descripcion: "Suplemento energizante para mejorar tu vitalidad.",
    precio: 7500,
    stock: 8,
    categoria: "Suplementos",
    imagen: "https://images.unsplash.com/photo-1627931389489-421f57469733?q=80&w=870&auto=format&fit=crop"
  },
  {
    nombre: "Mix Semillas",
    descripcion: "Snack saludable y nutritivo para cualquier momento.",
    precio: 3200,
    stock: 20,
    categoria: "Snacks",
    imagen: "https://images.unsplash.com/photo-1615485324328-99175347b4a2?q=80&w=870&auto=format&fit=crop"
  }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado para el seeder...');

    await Product.deleteMany();
    console.log('Productos existentes eliminados...');

    await Product.insertMany(productos);
    console.log('¡Productos con imágenes verificadas importados exitosamente!');
    
    process.exit();
  } catch (error) {
    console.error('Error durante la importación:', error);
    process.exit(1);
  }
};

importData();