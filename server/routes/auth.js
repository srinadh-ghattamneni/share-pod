import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  console.log('➡️ Signup endpoint hit');
  const { username, email, password } = req.body;
  console.log('📩 Signup payload:', { username, email });

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      console.log('⚠️ User already exists');
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log('✅ Signup success, sending token');
    res.json({ token });

  } catch (err) {
    console.error('❌ Signup Error:', err);
    res.status(500).json({ msg: 'Server error during signup' });
  }
});

router.post('/login', async (req, res) => {
  console.log('➡️ Login endpoint hit');
  const { email, password } = req.body;
  console.log('📩 Login payload:', { email });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Password mismatch');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log('✅ Login success, sending token');
    res.json({ token });

  } catch (err) {
    console.error('❌ Login Error:', err);
    res.status(500).json({ msg: 'Server error during login' });
  }
});

export default router;
