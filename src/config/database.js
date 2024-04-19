const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'ngo_mngt',
    user: 'root',
    password: '112103081'
});

module.exports = connection;
