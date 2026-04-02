import { getDatabase } from '../db.js';

export const createEvent = (name, date, description = '', userId) => {
  const db = getDatabase();
  const stmt = db.prepare(
    'INSERT INTO events (name, date, description, user_id) VALUES (?, ?, ?, ?)'
  );
  const result = stmt.run(name, date, description, userId);
  return {
    id: String(result.lastInsertRowid),
    name,
    date,
    description,
    userId: String(userId),
  };
};

export const findById = (id) => {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM events WHERE id = ?');
  const row = stmt.get(id);
  if (!row) return null;
  return {
    id: String(row.id),
    name: row.name,
    date: row.date,
    description: row.description ?? '',
    userId: String(row.user_id),
  };
};

export const findAll = () => {
  const db = getDatabase();
  const stmt = db.prepare('SELECT * FROM events ORDER BY id');
  const rows = stmt.all();
  return rows.map((row) => ({
    id: String(row.id),
    name: row.name,
    date: row.date,
    description: row.description ?? '',
  }));
};

export const updateEvent = (id, updates) => {
  const db = getDatabase();
  const existing = findById(id);
  if (!existing) return null;
  const { name = existing.name, date = existing.date, description = existing.description } = updates;
  const stmt = db.prepare(
    'UPDATE events SET name = ?, date = ?, description = ? WHERE id = ?'
  );
  stmt.run(name, date, description, id);
  return findById(id);
};

export const deleteEvent = (id) => {
  const db = getDatabase();
  const existing = findById(id);
  if (!existing) return null;
  const stmt = db.prepare('DELETE FROM events WHERE id = ?');
  stmt.run(id);
  return existing;
};

export const registerForEvent = (id, userId) => {
  const db = getDatabase();
  const existing = findById(id);
  if (!existing) return null;
  const stmt = db.prepare('INSERT INTO event_registrations (event_id, user_id) VALUES (?, ?)');
  stmt.run(id, userId);
  return existing;
};

export const unregisterFromEvent = (id, userId) => {
  const db = getDatabase();
  const existing = findById(id);
  if (!existing) return null;
  const stmt = db.prepare('DELETE FROM event_registrations WHERE event_id = ? AND user_id = ?');
  stmt.run(id, userId);
  return existing;
};