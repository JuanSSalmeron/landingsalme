import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  password: String // debe ir encriptado
});

export default mongoose.model('User', userSchema);
