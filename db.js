import Database from "better-sqlite3";

let db = null;

export function initializeDatabase() {
  db = new Database("app.db");

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      date TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      user_id INTEGER NOT NULL,
      image TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS event_registrations (
      id INTEGER PRIMARY KEY,
      event_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      FOREIGN KEY (event_id) REFERENCES events (id),
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  console.log("Database initialised successfully");

  return db;
}

export function getDatabase() {
  if (!db) {
    throw new Error(
      "Database has not been initialised. Call initializeDatabase() first.",
    );
  }
  return db;
}
