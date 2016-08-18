var expect = require('chai').expect,
    tags = require('../lib/tags');

describe("Tags", function(){
    it("should pass long formed tags", function(){
        var args = ["--depth=4","--hello=world"];
        var results = tags.parse(args);
        //
        expect(results).to.have.a.property("depth",4);
        expect(results).to.have.a.property("hello", "world");
    });
});
