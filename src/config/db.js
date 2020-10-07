var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : "us-cdbr-east-06.cleardb.net",
    user     : "b335a45fae72d2",
    password : '2c29df74',
    database : 'heroku_a695d4dc29cf1f9'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
