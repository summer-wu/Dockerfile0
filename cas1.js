var casper = require("casper").create();

casper.echo("Casper CLI passed args:");
require("utils").dump(casper.cli);

casper.echo("Casper CLI passed options:");
require("utils").dump(casper.cli);

casper.exit();