const	http	= require('http'),
		url		= require('url'),
		router	= require('./router');

http.createServer(function(request,response){

	if(request.url !== '/favicon.ico'){

		try {

			var pathName = url.parse(request.url).pathname.replace(/\//,'');
			router[pathName](request,response);

		}catch(err){

			console.log('====='+err);
		}
		
	}

}).listen(8000);
console.log('Server runing at http://localhost:8000')