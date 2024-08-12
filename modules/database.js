const Database = require('better-sqlite3');
const database = new Database('hbotdatabase.db');

database.prepare('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, points INTEGER)').run();

module.exports = database;