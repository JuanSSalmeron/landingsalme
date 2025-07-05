import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

import leadRoutes from './routes/leads.js';
import authRoutes from './routes/auth.js';
import Lead from './models/Lead.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

// Modelo de contacto (opcional, puedes usar Lead)
const contactoSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  telefono: String,
  mensaje: String,
  fecha: { type: Date, default: Date.now }
});
const Contacto = mongoose.model('Contacto', contactoSchema);

// Clave secreta reCAPTCHA
const SECRET_KEY = process.env.RECAPTCHA_SECRET;

// Rutas protegidas
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Ruta pública del formulario con reCAPTCHA + notificación
app.post('/api/contacto', async (req, res) => {
  const { nombre, correo, telefono, mensaje, recaptchaToken } = req.body;

  if (!recaptchaToken) {
    return res.status(400).json({ message: 'Token de reCAPTCHA faltante' });
  }

  try {
    // Verificar reCAPTCHA (fetch nativo en Node 18+)
    const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const params = new URLSearchParams({
      secret: SECRET_KEY,
      response: recaptchaToken,
    });

    const recaptchaRes = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    const data = await recaptchaRes.json();

    if (!data.success) {
      return res.status(400).json({ message: 'Falló reCAPTCHA', errorCodes: data['error-codes'] });
    }

    // Guardar en colección contacto
    const contacto = new Contacto({ nombre, correo, telefono, mensaje });
    await contacto.save();

    // Guardar también en leads
    const lead = new Lead({ nombre, correo, telefono, mensaje });
    await lead.save();

    // Enviar correo
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: 'Nuevo Lead recibido',
      html: `<p><strong>${nombre}</strong> ha enviado un nuevo mensaje: ${mensaje}</p>`
    });

    res.status(201).json({ message: 'Contacto guardado y notificado correctamente' });

  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
