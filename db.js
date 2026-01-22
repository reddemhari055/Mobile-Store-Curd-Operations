const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Rhari@2003055', 
    database: 'mobile_store'
});

module.exports = pool.promise();