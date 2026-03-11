import crypto from 'crypto';
import * as userModel from '../models/user.js';

export const signup = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const existing = userModel.findByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'User already exists' });
    }
    const passwordHash = hashPassword(password);
    const user = userModel.createUser(email, passwordHash);
    const { passwordHash: _, ...safe } = user;
    res.status(201).json(safe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const signin = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (!verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const { passwordHash: _, ...safe } = user;
    res.json(safe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const hashPassword = (password) =>
  crypto.pbkdf2Sync(password, 'salt', 100000, 64, 'sha512').toString('hex');

const verifyPassword = (password, hash) =>
  hashPassword(password) === hash;

