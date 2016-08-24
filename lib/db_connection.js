/* ----------------------------------------------------
 * db_connection
 * Manages database connection (MySQL)
 * Uses the root config_db file wich carries all the connection parameters
 * Multi is a special case that allows multiple sql statments in one (mainly
 * for test purposes)
-------------------------------------------------------*/

var mysql = require('mysql'),
    dbConfig = require('../config_db.json'),
    sprintf = require("sprintf-js").sprintf,
    cmd = require('child_process');

var dbConnectionAPI = {
    // getConnection:
    // returns a mysql connection based on config file
    getConnection: function (done, test) {
        var cfg = dbConfig.prod;
        if (test) {
            cfg = dbConfig.test;
        }
        var connection = mysql.createConnection(cfg);
        connection.connect(function (err) {
            if (err) return done(err);
            done(null, connection);
        });
    },
    // getConnectionMulti:
    // return a mysql connection capable of multi sql
    getConnectionMulti: function (done, test) {
        var cfg = dbConfig.prod;
        if (test) {
            cfg = dbConfig.test;
        }
        cfg.multipleStatements = true;
        var connection = mysql.createConnection(cfg);
        connection.connect(function (err) {
            if (err) return done(err);
            done(null, connection);
        });
    },
    // closeConnection:
    // closes the connection passed
    closeConnection: function (connection) {
        connection.end(function (err) {
            if (err) throw err;
            return;
        });
    },
    // execSql
    // executes an script stored in a sql file in \sql
    execSql: function (sql, done, test) {
        var cfg = dbConfig.prod;
        if (test) {
            cfg = dbConfig.test;
        }
        var isWin = /^win/.test(process.platform);
        var fsql = "./sql/" + sql;
        if (isWin) {
            fsql = ".\\sql\\" + sql;
        }
        var command = sprintf("mysql -h%s -u%s -p%s %s < %s", cfg.host, cfg.user, cfg.password, cfg.database, fsql);
        if (cfg.password == "") {
            command = sprintf("mysql -h%s -u%s %s < %s", cfg.host, cfg.user, cfg.database, fsql);
        }
        cmd.exec(command, function (err, stdout, stderr) {
            if (err) return done(err);
            done(null);
        });
    },
    verifyDataBase: function (done, test) {
        var cfg = dbConfig.prod;
        var sql = "baseapi.sql";
        if (test) {
            cfg = dbConfig.test;
            sql = "baseapi_test.sql"
        }
        module.exports.getConnection(function (err, con) {
            if (err) return done(err);
            con.query("SHOW TABLES", function (err, res) {
                if (res.length === 0) {
                    // if there aren't any tables we create all needed
                    module.exports.execSql(sql, function (err, res) {
                        if (err) return done(err);
                        done(null);
                    }, test);
                } else {
                    done(null);
                }
            })
        }, test);
    }
};

module.exports = dbConnectionAPI;