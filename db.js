const mysql = require('mysql'); 

const db = mysql.createPool({
    connectionLimit : 10,
    host            : 'sql3.freesqldatabase.com',
    user            : 'sql3681993',
    password        : '1UnRECwMcM',
    database        : 'sql3681993'
});

module.exports = db

