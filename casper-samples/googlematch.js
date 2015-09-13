/*eslint strict:0*/
/*global CasperError, console, phantom, require*/

/**
 * Takes provided terms passed as arguments and query google for the number of
 * estimated results each have.
 *
 * Usage:
 *     $ casperjs googlematch.js nicolas chuck borris
 *     nicolas: 69600000
 *     chuck:   49500000
 *     borris:  2370000
 *     winner is "nicolas" with 69600000 results
 */

var casper = require("casper").create({
    loadImages: false,
    logLevel:   "debug",
    verbose:    true
});

casper.fetchScore = function() {
    this.echo("fetchScore ing");
    
    

var start = Date.now();
var result =  this.evaluate(function() {
        var v0 = __utils__.findOne('#resultStats').innerText;
        return parseInt(/找到约 ([0-9\s]{1,}).*/.exec(v0)[1].replace(/\s/g, ''), 10);
    });
var end = Date.now();
var elapsed = end - start;

    console.log("this.evaluate cost time:" + elapsed);
    return result;
};

var terms = casper.cli.args;

if (terms.length < 2) {
    casper
        .echo("Usage: $ casperjs googlematch.js term1 term2 [term3]...")
        .exit(1)
    ;
}

var scores = [];

casper.echo("Let the match begin between \"" + (terms.join('", "')) + "\"!");

casper.start("http://google.com/");

casper.each(terms, function(casper, term, i) {
    this.echo('Fetching score for ' + term);
    this.then(function() {
        var start = Date.now();
        this.fill('form[action="/search"]', {q: '"' + term + '"'}, true);
        var end = Date.now();
        var elapsed = end - start; // elapsed time in milliseconds
        this.echo("fill form cost time " + elapsed);
    });
    this.then(function() {
        this.echo("will exec this.fetchScroe");
        var score = this.fetchScore();
        scores.push({
            term: term,
            score: score
        });
        this.echo(term + ': ' + score);
    });
});

casper.run(function() {
    if (scores.length === 0) {
        this.echo("No result found");
    } else {
        scores.sort(function(a, b) {
            return b.score - a.score;
        });
        var winner = scores[0];
        this.echo("Winner is \"" + winner.term + "\" with " + winner.score + " results");
    }
    this.exit();
});
