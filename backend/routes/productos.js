const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para procesar un pedido (actualizar stock)
router.post('/pedido', async (req, res) => {
  const itemsComprados = req.body.carrito;
  try {
    for (const item of itemsComprados) {
      await Product.findByIdAndUpdate(item.id, { $inc: { stock: -1 } });
    }
    res.json({ message: 'Pedido procesado y stock actualizado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al procesar el pedido' });
  }
});


module.exports = router;