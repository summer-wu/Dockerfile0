var casper = require('casper').create();

casper.start('http://www.baidu.com', function() {
    // var v0 = this.evaluate(function(){
    // 	return __utils__;
    // });
    // require('utils').dump(v0);
    require('utils').dump(this.page.cookies);
});


casper.run();