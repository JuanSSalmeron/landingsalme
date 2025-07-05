import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Login recibido:', email, password);
const user = await User.findOne({ email });
console.log('Usuario en DB:', user);
  if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

  const passwordValida = await bcrypt.compare(password, user.password);
console.log('¿Password válida?', passwordValida); // <-- Agrega esta línea

  if (!passwordValida) return res.status(401).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

export default router;
