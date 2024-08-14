const sqlite3db = require('better-sqlite3');
const database = new sqlite3db('hbotdatabase.db');

database.prepare('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, username TEXT, hoints INTEGER)').run();
database.prepare('CREATE TABLE IF NOT EXISTS submittedhfacts (hfact TEXT PRIMARY KEY, userid TEXT, username TEXT)').run();
database.prepare('CREATE TABLE IF NOT EXISTS hbotinfo (commandsran INTEGER PRIMARY KEY DEFAULT 0)').run();
//database.prepare('CREATE TABLE IF NOT EXISTS servers (id TEXT PRIMARY KEY, lyntrenabled INTEGER, lyntrchannelid INTEGER)').run();

const hbotinforecord = database.prepare('SELECT commandsran FROM hbotinfo LIMIT 1').get();

if (!hbotinforecord) {
    database.prepare('INSERT INTO hbotinfo (commandsran) VALUES (0)').run();
}

module.exports = database;