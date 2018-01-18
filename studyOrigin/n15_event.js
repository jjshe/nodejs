const		events		= require('events'),
			userBean	= require('./models/userBean'),
			http		= require('http');

http.createServer(function(request,response) {

	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8','Access-Control-Allow-Origin':'*'});
	if(request.url !== '/favicon.ico') {

		let User = new userBean();
		User.eventEmit.once('signInSuccess',function(uname,pwd) {

			response.write('注册成功 ');
			console.log('传来uname:'+uname);
			console.log('传来pwd:'+pwd);
			User.signIn(request,response);
			response.end();
		});
		console.log('还未异步');
		User.signUp(request,response);
		console.log('已经异步');
	}

}).listen(8000);
console.log('Server runing at http://localhost:8000');