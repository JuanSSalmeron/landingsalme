const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = 'mongodb+srv://juansalmeron:SALMERONBACHO123@cluster0.n3f5k9h.mongodb.net/landingdb?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error(err));

const contactoSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  telefono: String,
  mensaje: String,
  fecha: { type: Date, default: Date.now }
});

const Contacto = mongoose.model('Contacto', contactoSchema);

app.post('/api/contacto', async (req, res) => {
  try {
    const contacto = new Contacto(req.body);
    await contacto.save();
    res.status(201).json({ message: 'Contacto guardado' });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
