const	http	= require('http'),
		url		= require('url'),
		router	= require('./router'),
		except	= require('./models/exception');

http.createServer(function(request,response) {

	if(request.url !== '/favicon.ico') {

		let pathName = url.parse(request.url).pathname.replace(/\//,'');

		try{

			//router[pathName](response);
			let data = except.expFun(0);
			response.write(data);
			response.end();
		}catch(err){

			console.log('!!!' + err);
			response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
			response.write(err.toString());
			response.end();
		}
		

	}
}).listen(8000);
console.log('Server runing at http://localhost:8000');