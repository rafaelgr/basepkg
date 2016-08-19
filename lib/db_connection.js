/* ----------------------------------------------------
 * db_connection
 * Manages database connection (MySQL)
 * Uses the config_db file in root wich carries all the connection parameters
 * Multi is a special case that allows multiple sql statments in one (mainly
 * for test purposes)
-------------------------------------------------------*/

var mysql = require('mysql'),
    dbConfig = require('../config_db.json');

var dbConnectionAPI = {
    getConnection: function (done, test) {
        var cfg = dbConfig.prod;
        if (test) {
            cfg = dbConfig.test;
        }
        var connection =  mysql.createConnection(cfg);
        connection.connect(function(err){
            if (err) return done(err);
            done(null, connection);
        });
    },
    getConnectionMulti: function(done, test){
        var cfg = dbConfig.prod;
        if (test) {
            cfg = dbConfig.test;
        }
        cfg.multipleStatements = true;
        var connection =  mysql.createConnection(cfg);
        connection.connect(function(err){
            if (err) return done(err);
            done(null, connection);
        });
    },
    closeConnection: function(connection, done){
        connection.end(function(err){
            if (err) return done(err);
            done()
        });
    }
};

module.exports = dbConnectionAPI;