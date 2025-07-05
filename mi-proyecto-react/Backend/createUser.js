import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js'; // Asegúrate que esta ruta sea correcta

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const user = new User({
    email: 'admin@email.com',
    password: hashedPassword,
  });

  await user.save();
  console.log('✅ Usuario creado con éxito');
  await mongoose.disconnect();
};

run().catch(console.error);
