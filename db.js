const sqlite3 = require('sqlite3').verbose();
// 請確保有 database 資料夾
const db = new sqlite3.Database('./database/health.db'); 
module.exports = db;