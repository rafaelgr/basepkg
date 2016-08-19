var mysql = require('mysql'),
    dbCon = require('./db_connection');

var userGroupAPI = {
    getById: function (id, done, test) {
        dbCon.getConnection(function(err, res){
            if (err) return done(err);
            var con = res; // mysql connection
            var sql = "SELECT * FROM user_group WHERE userGroupId = ?";
            sql = mysql.format(sql, id);
            con.query(sql, function(err, res){
                if (err) return done(err);
                var groups = [];
                res.forEach(function(gdb){
                    groups.push(fnUserGroupDbToJs(gdb));
                });
                done(null, groups);
            });
        }, true);
    },
    post: function(userGroup, donde, test){
    }
};

var fnUserGroupDbToJs = function(gdb){
    var g = {
        id: gdb.userGroupId,
        name: gdb.name
    }
    return g;
}

module.exports = userGroupAPI;