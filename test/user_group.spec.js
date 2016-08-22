var expect = require('chai').expect,
    dbCon = require('../lib/db_connection'),
    userGroup = require('../lib/user_group');

describe("UserGroup", function () {
    var tId = 0;
    before(function (done) {
        dbCon.execSql('prepare_user_group_test.sql', function (err) {
            expect(err).to.be.null;
            done();
        }, true);
    });
    it("should return some user groups", function(done){
        userGroup.get(function(err, res){
            expect(err).to.be.null;
            expect(res).to.have.length;
            done();
        }, true);
    });
    it("should create a new user group", function (done) {
        userGroup.post({
            id: 0,
            name: "TestUserGroup"
        }, function (err, res) {
            expect(err).to.be.null;
            // returned object has new id
            expect(res).to.have.a.property("id");
            tId = res.id;
            done();
        }, true);
    });
    it("should return the new user group created", function (done) {
        userGroup.getById(tId, function (err, res) {
            expect(err).to.be.null;
            // have the same name
            expect(res).to.have.length(1);
            var t = res[0];
            var expected = {
                id: tId,
                name: "TestUserGroup"
            }
            expect(t).to.deep.equal(expected);
            done();
        }, true);
    });
    it("should modifiy the user group", function (done) {
        userGroup.put({
            id: tId,
            name: "TestUserGroupChanged"
        }, function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.a.property("name", "TestUserGroupChanged");
            done();
        }, true);
    });
    it("should delete the user group", function (done) {
        userGroup.delete({
            id: tId
        }, function (err, res) {
            expect(err).to.be.null;
            // check that record no loger exists
            userGroup.getById(tId, function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.length(0);
                done();
            }, true)
        }, true);
    });
    // after all delete test records
    after(function (done) {
        dbCon.execSql('delete_test.sql', function (err) {
            expect(err).to.be.null;
            done();
        }, true);
    })
});