var expect = require('chai').expect,
    dbCon = require('../lib/db_connection'),
    user = require('../lib/user');

describe("User", function () {
    var uId = 0;
    before(function (done) {
        // create the user group used for the test
        dbCon.execSql('prepare_user_test.sql', function (err) {
            expect(err).to.be.null;
            done();
        }, true);
    });
    it("should return some users", function (done) {
        user.get(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.length;
            done();
        }, true);
    });
    it("should create a user", function (done) {
        user.post({
            id: 0,
            name: "TestUser",
            login: "login",
            password: "password",
            userGroup: {
                id: 2,
                name: "TestUserGroup"
            }
        }, function (err, res) {
            expect(err).to.be.null;
            // returned object has new id
            expect(res).to.have.a.property("id");
            uId = res.id;
            done();
        }, true);
    });
    it("should return the new created user", function (done) {
        user.getById(uId, function (err, res) {
            expect(err).to.be.null;
            // have the same name
            expect(res).to.have.length(1);
            var u = res[0];
            var expected = {
                id: uId,
                name: "TestUser",
                login: "login",
                password: "password",
                userGroup: {
                    id: 2,
                    name: "TestUserGroup"
                }
            }
            expect(u).to.deep.equal(expected);
            done();
        }, true);
    });
    it("should modify new created user correctly", function (done) {
        user.put({
            id: uId,
            name: "TestUserChanged",
            login: "login",
            password: "password",
            userGroup: {
                id: 2,
                name: "TestUserGroup"
            }
        }, function (err, res) {
            expect(err).to.be.null;
            var expected = {
                id: uId,
                name: "TestUserChanged",
                login: "login",
                password: "password",
                userGroup: {
                    id: 2,
                    name: "TestUserGroup"
                }
            };
            expect(res).to.deep.equal(expected);
            done();
        }, true);
    });
    it("should delete new create user", function (done) {
        user.delete({
            id: uId
        }, function (err, res) {
            expect(err).to.be.null;
            // check that record no loger exists
            user.getById(uId, function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.length(0);
                done();
            }, true)
        }, true);
    })
    it("should not create user without all properties needed", function (done) {
        user.post({
            id: 0,
            name: "TestUser"
        }, function (err, res) {
            expect(err).to.be.not.null;
            done();
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