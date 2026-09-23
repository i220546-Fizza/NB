import express from 'express';
import { upload } from '../middleware/upload.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, admin, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No image uploaded' });
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
});

export default router;
