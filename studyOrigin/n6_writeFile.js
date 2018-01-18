const	http	= require('http'),
		url		= require('url'),
		router	= require('./router');

http.createServer(function(request,response) {

	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	if(request.url !== '/favicon.ico'){

		let pathName = url.parse(request.url).pathname.replace(/\//,'');
		router[pathName](response);

	}

}).listen('8000');
console.log('Server runing at http://localhost:8000');