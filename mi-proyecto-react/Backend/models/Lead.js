import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  telefono: String,
  mensaje: String,
  estado: { type: String, default: 'nuevo' },
  fecha: { type: Date, default: Date.now }
});

export default mongoose.model('Lead', leadSchema);
