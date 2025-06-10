const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  categoria: { type: String, required: true },
  imagen: { type: String, required: true }
});

module.exports = mongoose.model('Product', ProductSchema);