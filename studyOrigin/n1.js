var http	= require('http'),
	fs		= require('fs'),
	path	= require('path');
var otherFuns	= require('./models/fun1.js');
http.createServer(function(request,response){

	response.writeHead(200,{'Content-Type':'text/html;charset=utf-8','Access-Control-Allow-Origin':'*'});

	if(request.url !== '/favicon.ico'){
		// var fileUrl = path.resolve(__dirname,'./models/fun1.js');
		// var fun1 = fs(fileUrl);

		otherFuns['fun1'](response);
		otherFuns['fun2'](response);
		response.end('<br><br><br> the end...');
	}

}).listen(8000)

console.log('Server running at http://127.0.0.1:8000');
