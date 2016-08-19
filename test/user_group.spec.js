var expect = require('chai').expect,
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
    it ("should return a user group previously created", function(done){
        
    });
});