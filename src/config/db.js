var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : "127.0.0.1",
    user     : "root",
    password : 'Yerocp1!',
    database : 'mapshotdatabase'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
