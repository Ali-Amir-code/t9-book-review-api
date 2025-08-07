import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => 
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export async function register(req, res) {
  const { username, email, password } = req.body;
  const user = await User.create({ username, email, password });
  res.status(201).json({ token: generateToken(user._id) });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await user.matchPassword(password)) {
    return res.json({ token: generateToken(user._id) });
  }
  res.status(401).json({ message: 'Invalid credentials' });
}