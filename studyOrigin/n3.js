const	http	= require('http');
		
let 	User   	= require('./models/user').User,
		Teacher = require('./models/teacher').Teacher;

http.createServer(function(request,response){

	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	if(request.url !== '/favicon.ico'){

		// var user = new User(1,'tom',18);
		// user.enter();
		var teacher = new Teacher(2,'flower',29);
		teacher.enter();
		teacher.teach(response);
	}
	response.end();

}).listen(8000);
console.log('Server runing at http://localhost:8000');