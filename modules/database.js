const Database = require('better-sqlite3');
const database = new Database('hbotdatabase.db');

database.prepare('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT, hoints INTEGER)').run();
database.prepare('CREATE TABLE IF NOT EXISTS submittedhfacts (hfact TEXT PRIMARY KEY, userid TEXT, username TEXT)').run();
//database.prepare('CREATE TABLE IF NOT EXISTS servers (id TEXT PRIMARY KEY, lyntrenabled INTEGER, lyntrchannelid INTEGER)').run();

module.exports = database;