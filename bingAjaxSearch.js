var links = [];
var casper = require('casper').create();
// casper.options.waitTimeout=1000;

function getLinks(){
	var links = document.querySelectorAll('h2 a');
	return Array.prototype.map.call(links,function(e){
		return e.getAttribute('href');
	});
}

//执行顺序
// casper加载cn.bing.com网址。等待2秒。//casper.start
// 截图casper0.png。fill form 321。等待2秒。//f1
// 截图casper1.png。保存Links数据。fill form phantomjs,等待2秒。//f2
// 截图casper2.png。保存links数据。退出。//f3

function f1_captureBingComAndFillForm321(){
	casper.echo("f1_captureBingCom");
	casper.echo(casper.getTitle());
	casper.echo(casper.getCurrentUrl());

	casper.capture('casper0.png');
	casper.fill('form[action="/search"]',{q:'321'},true);
	casper.wait(2000,f2_capture321AndFillFormPhantomjs);
}

function f2_capture321AndFillFormPhantomjs(){
	casper.capture('casper1.png');
	links = casper.evaluate(getLinks);
	casper.fill('form[action="/search"]',{q:'phantomjs'},true);
	casper.wait(2000,f3_capturePhantomjsAndExit);
}

function f3_capturePhantomjsAndExit(){
	casper.capture('casper2.png');
	links = links.concat(casper.evaluate(getLinks));
	casper.exit();
}


casper.start('http://cn.bing.com/',function(){
	this.wait(2000,f1_captureBingComAndFillForm321);
	this.echo("casper start ");
});

casper.run(function(){
	//exec after casper.exit()
	this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - ')).exit();
});
