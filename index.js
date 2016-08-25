/*
 * index.js:
 * Main entry point 
 */

var dbCon = require('./lib/db_connection'),
    userGroup = require('./lib/user_group'),
    user = require('./lib/user');

var app = {
	dbCon: dbCon,
    user: user,
    userGroup: userGroup
}

module.exports = app;
