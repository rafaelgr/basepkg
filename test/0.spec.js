var expect = require('chai').expect,
    dbCon = require('../lib/db_connection');

describe("Verifiy database", function(){
    it("shold have a database and tables", function(done){
        dbCon.verifyDataBase(function(err){
            expect(err).to.be.null;
            done()
        }, true);
    });
})    