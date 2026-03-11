import Database from 'better-sqlite3';

let db = null;

export function initializeDatabase() {
  db = new Database('app.db');

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  return db;
}

export function getDatabase() {
  if (!db) {
    throw new Error('Database has not been initialised. Call initializeDatabase() first.');
  }
  return db;
}
