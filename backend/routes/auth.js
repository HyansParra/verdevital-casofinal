const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
        return res.status(400).json({ msg: 'Por favor, ingrese todos los campos' });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'El correo electrónico ya está registrado' });
    }
    user = new User({ email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(201).json({ msg: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
        return res.status(400).json({ msg: 'Por favor, ingrese todos los campos' });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;