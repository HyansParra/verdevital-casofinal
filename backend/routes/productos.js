const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { enviarNotificacionPedido } = require('../utils/telegramNotifier');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/pedido', async (req, res) => {
  const itemsComprados = req.body.carrito;
  try {
    let nombresProductos = [];
    for (const item of itemsComprados) {
      const producto = await Product.findByIdAndUpdate(item.id, { $inc: { stock: -1 } });
      if (producto) {
        nombresProductos.push({ nombre: producto.nombre });
      }
    }

    if (nombresProductos.length > 0) {
        enviarNotificacionPedido({ carrito: nombresProductos });
    }
    
    res.json({ message: 'Pedido procesado y stock actualizado' });
  } catch (err) {
    console.error('!!! Error en la ruta /pedido !!!', err);
    res.status(500).json({ message: 'Error al procesar el pedido' });
  }
});

module.exports = router;