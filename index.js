/*
 * index.js:
 * Main entry point 
*/

var tags = require('./lib/tags.js'),
    search = require('./lib/search.js');

var defaults = {
    path: ".",
    query: "",
    depth: 2
};

// we don't have replacements
var _tags = tags.parse(process.argv, defaults);

if (_tags.help){
    console.log("Usage: ---------");
}else{
    search.scan(_tags.path, _tags.depth, function(err, files){
        search.match(_tags.query, files).forEach(
            function(file){
                console.log(file);
            }
        );
    });
}
