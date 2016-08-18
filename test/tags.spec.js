var expect = require('chai').expect,
    tags = require('../lib/tags');

describe("Tags", function () {
    it("should pass long formed tags", function () {
        var args = ["--depth=4", "--hello=world"];
        var results = tags.parse(args);
        //
        expect(results).to.have.a.property("depth", 4);
        expect(results).to.have.a.property("hello", "world");
    });
    
    // Very good example of object comparation
    it("should fallback to defaults", function () {
        var args = ["--depth=4", "--hello=world"];
        var defaults = { depth: 2, foo: "bar" };
        var results = tags.parse(args, defaults);
        // this is the object we expect
        var expected = {
            depth: 4,
            foo: "bar",
            hello: "world"
        };

        expect(results).to.deep.equal(expected);
    });
});
