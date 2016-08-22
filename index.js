/*
 * index.js:
 * Main entry point 
*/

var userGroup = require('./lib/user_group'),
    user = require('./lib/user');

var app = {
    user: user,
    userGroup: userGroup
}

module.exports = app;