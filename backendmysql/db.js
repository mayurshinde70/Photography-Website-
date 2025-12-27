const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "0000",
    database: "admin_panel",
});

module.exports = db;