const	http	= require('http'),
		url		= require('url'),
		router	= require('./router');

http.createServer(function(request,response) {

	response.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
	if(request.url !== '/favicon.ico'){

		var pathname = url.parse(request.url).pathname.replace(/\//,'');
		console.log(pathname);
		router[pathname](response);

	}
	response.end();
	
}).listen('8000');
console.log('Server runing at http://localhost:8000');