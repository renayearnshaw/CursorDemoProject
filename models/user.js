import bcrypt from 'bcryptjs';
import { getDatabase } from '../db.js';

export const createUser = async (email, password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const db = getDatabase();
  const createdAt = new Date().toISOString();
  const stmt = db.prepare(
    'INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)'
  );
  const result = stmt.run(email, passwordHash, createdAt);
  return {
    id: String(result.lastInsertRowid),
    email,
    passwordHash,
    createdAt,
  };
};

export const verifyPassword = (password, hash) =>
  bcrypt.compare(password, hash);

export const findByEmail = (email) => {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  const row = stmt.get(email);
  if (!row) return null;
  return {
    id: String(row.id),
    email: row.email,
    passwordHash: row.password_hash,
    createdAt: row.created_at,
  };
};

export const findById = (id) => {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  const row = stmt.get(id);
  if (!row) return null;
  return {
    id: String(row.id),
    email: row.email,
    passwordHash: row.password_hash,
    createdAt: row.created_at,
  };
};
