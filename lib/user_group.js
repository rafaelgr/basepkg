var mysql = require('mysql'),
    dbCon = require('./db_connection');

var userGroupAPI = {
    getById: function (id, done, test) {
        dbCon.getConnection(function (err, res) {
            if (err) return done(err);
            var con = res; // mysql connection
            var sql = "SELECT * FROM user_group WHERE userGroupId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function (err, res) {
                dbCon.closeConnection(con);
                if (err) return done(err);
                var groups = [];
                res.forEach(function (gdb) {
                    groups.push(fnUserGroupDbToJs(gdb));
                });
                done(null, groups);
            });
        }, true);
    },
    post: function (userGroup, done, test) {
        // obtain db record
        var gdb = fnUserGroupJsToDb(userGroup);
        dbCon.getConnection(function (err, res) {
            if (err) return done(err);
            var con = res; // mysql connection
            var sql = "INSERT INTO user_group SET ?";
            sql = mysql.format(sql, gdb);
            con.query(sql, function (err, res) {
                dbCon.closeConnection(con);
                if (err) return done(err);
                userGroup.userGroupId = res.insertId;
                done(null, fnUserGroupDbToJs(userGroup));
            });
        }, true);
    },
    put: function (userGroup, done, test) {
        var gdb = fnUserGroupJsToDb(userGroup);
        dbCon.getConnection(function (err, res) {
            if (err) return done(err);
            var con = res; // mysql connection
            var sql = "UPDATE user_group SET ? WHERE userGroupId = ?";
            sql = mysql.format(sql, [gdb, gdb.userGroupId]);
            con.query(sql, function (err, res) {
                dbCon.closeConnection(con);
                if (err) return done(err);
                done(null, fnUserGroupDbToJs(userGroup));
            });
        }, true);
    },
    delete: function (userGroup, done, test) {
        var gdb = fnUserGroupJsToDb(userGroup);
        dbCon.getConnection(function (err, res) {
            if (err) return done(err);
            var con = res; // mysql connection
            var sql = "DELETE FROM user_group WHERE userGroupId = ?";
            sql = mysql.format(sql, gdb.userGroupId);
            con.query(sql, function (err, res) {
                dbCon.closeConnection(con);
                if (err) return done(err);
                done(null);
            });
        }, true);
    }
};

// fnUserGroupDbToJs:
// transfors a db record into a js object
var fnUserGroupDbToJs = function (gdb) {
    var g = {
        id: gdb.userGroupId,
        name: gdb.name
    }
    return g;
}

// fnUserGroupJsToDb
// transforms a js object into a db record
var fnUserGroupJsToDb = function (g) {
    // add db id
    g.userGroupId = g.id;
    // delete some properties
    delete g.id;
    return g;
}


module.exports = userGroupAPI;