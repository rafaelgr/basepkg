var expect = require('chai').expect,
    dbCon = require('../lib/db_connection'),
    tObjects = require('./test_objects.json'),
    userGroup = require('../lib/user_group');

describe("UserGroup", function () {
    it("should return the Admin default group", function (done) {
        userGroup.getById(1, function (err, res) {
            expect(err).to.be.null;
            // the only thing we can test is group id 1 existence
            expect(res).to.have.length(1);
            var g = res[0];
            expect(g).to.have.property("id", 1);
            done();
        });
    });
    it("should return a user group previously created", function (done) {
        before(dbCon.execSql('create_one_user_group.sql', function (err) {
            expect(err).to.be.null;
        }, true));
        userGroup.getById(2, function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.length(1);
            var g = res[0];
            expect(g).to.deep.equal(tObjects.tUserGroup);
            done();
        }, true);
    });
    it("should create a new user group correctly", function (done) {
        var ug = tObjects.tUserGroup;
        ug.id = 0;
        userGroup.post(ug, function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.length(1);
            var g = res[0];
            expect(g).to.have.a.property("id");
            expect(g).to.have.a.property("name", ug.name);
        }, true);
    });
});