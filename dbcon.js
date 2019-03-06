var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs361_dimedioj',
    password        : '5k&6Ro0hJ7*UmrXUg9&8',
    dateStrings     : true,
    database        : 'cs361_dimedioj'
});
module.exports.pool = pool;
