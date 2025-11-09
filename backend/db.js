const Database = require('better-sqlite3');
const path = require('path');

// Create database file in the parent directory
const db = new Database(path.join(__dirname, '..', 'database.db'));


// Enable foreign keys (important for relational data)
db.pragma('foreign_keys = ON');

/**
 * Initialize database tables
 * This creates the tables if they don't exist
 */
function initDB() {
  // Users table - stores account information
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Game stats table - stores player progress
  db.exec(`
    CREATE TABLE IF NOT EXISTS game_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      game_type TEXT NOT NULL,  -- 'wordle' or 'connections'
      level INTEGER DEFAULT 1,
      wins INTEGER DEFAULT 0,
      losses INTEGER DEFAULT 0,
      current_streak INTEGER DEFAULT 0,
      best_streak INTEGER DEFAULT 0,
      last_played DATETIME,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Game sessions table - stores individual game plays
  db.exec(`
    CREATE TABLE IF NOT EXISTS game_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      game_type TEXT NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      won BOOLEAN DEFAULT FALSE,
      attempts INTEGER DEFAULT 0,
      time_taken INTEGER,  -- in seconds
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  console.log('✅ Database initialized successfully');
}

initDB();
module.exports = db;