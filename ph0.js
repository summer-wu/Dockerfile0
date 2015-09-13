var webPage = require('webpage');
var page = webPage.create();

var fs = require('fs');
var data = fs.read("cookie-inspector-mod.json");
phantom.cookies = JSON.parse(data);

function dump(obj){
    return JSON.stringify(obj,null,4);
}
console.log(dump(JSON.parse(data)));
console.log(dump(phantom.cookies));
// page.open('http://www.baidu.com', function(status) {
 //  console.log("------");
 //  if(status!=="success"){
 //  	console.log('unable to load the address!');
 //  	require('utils').dump(phantom.cookies);
	// phantom.exit();
 //  }else{
 //  	page.render('bing.png');
 //  	require('utils').dump(phantom.cookies);
	// phantom.exit();
  	
 //  }
// });
// phantom.addCookie({
//   'name'     : 'Valid-Cookie-Name',   /* required property */
//   'value'    : 'Valid-Cookie-Value',  /* required property */
//   'domain'   : '.baidu.com',
//   'path'     : '/foo',                /* required property */
//   'httponly' : true,
//   'secure'   : false,
//   'expires'  : (new Date()).getTime() + (1000 * 60 * 60)   /* <-- expires in 1 hour */
// });
phantom.exit();