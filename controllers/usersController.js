import * as userModel from '../models/user.js';

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Basic non-empty check
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
    // Password length validation
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    const existing = userModel.findByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'User already exists' });
    }
    const user = await userModel.createUser(email, password);
    // Remove password hash from response
    const { passwordHash: _, ...safe } = user;
    res.status(201).json(safe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'No such user' });
    }
    if (!(await userModel.verifyPassword(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    // Remove password hash from response
    const { passwordHash: _, ...safe } = user;
    res.json(safe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
