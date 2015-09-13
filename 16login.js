var casper = require('casper').create();

casper.start('http://16lao.com', function() {
    this.echo(this.getTitle());
    this.echo(this.getCurrentUrl());
    
});


casper.run();