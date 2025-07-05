import express from 'express';
import Lead from '../models/Lead.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  const leads = await Lead.find().sort({ fecha: -1 });
  res.json(leads);
});

router.patch('/:id', verifyToken, async (req, res) => {
  const { estado } = req.body;
  const lead = await Lead.findByIdAndUpdate(req.params.id, { estado }, { new: true });
  res.json(lead);
});

export default router;
