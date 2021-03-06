/*eslint strict:0*/
/*global CasperError, console, phantom, require*/

var casper = require("casper").create({
    loadImages: false,
    logLevel:   "debug",
    verbose:    true
});

var links = {
    "http://baidu.com/": 0,
    "http://www.bing.com/": 0,
    "http://www.360.com/": 0
};

var fantomas = Object.create(casper);

fantomas.countLinks = function() {
    return this.evaluate(function() {
        return __utils__.findAll("a[href]").length;
    });
};

fantomas.renderJSON = function(what) {
    this.echo(JSON.stringify(what, null, "  "));
};

fantomas.start();

Object.keys(links).forEach(function(url) {
    fantomas.thenOpen(url, function() {
        links[url] = this.countLinks();
    });
});

fantomas.run(function() {
    this.renderJSON(links);
    this.exit();
});
