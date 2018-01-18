const	http	= require('http'),
		url		= require('url');
const 	router	= require('./router');

http.createServer(function(request,response) {

	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8','Access-Control-Allow-Origin':'*'});
	if(request.url !== '/favicon.ico'){
		
		let pathName = url.parse(request.url).pathname.replace(/\//,'');
		router[pathName](response);
		console.log('Server done');
	}
	

}).listen('8000');
console.log('Server runing at http://localhost:8000');