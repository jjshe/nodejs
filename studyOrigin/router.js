let		optfile		= require('./models/optfile'),
		url			= require('url'),
		querystring	= require('querystring');


function getCallback(res) {

	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	return	function (data) {
				res.write(data);
				res.end('end');
			}

};

module.exports = {
	
	sign_in : function(req,res) {

		//get方式提交 
		// let rdata = url.parse(req.url,true).query;
		// console.log(rdata);
		// if(rdata['email'] !== undefined){
		// 	console.log(rdata['email']);
		// 	console.log(rdata['pwd']);
		// }

		//post 提交方式
		let post = '';
		req.on('data',function(chunk){

			post += chunk;
		});
		req.on('end',function(){
			
			post = querystring.parse(post);
			console.log('email:' + post['email']+'\n');
			console.log('pwd:' + post['pwd']+'\n');
			arr = ['email','pwd'];

			let callback = function (data){
				
				let	dataStr = data.toString();
				console.log(dataStr+'=================');
				for(i=0;i<arr.length;i++){

					let re = new RegExp('{'+ arr[i] +'}','g');
					dataStr = dataStr.replace(re,post[arr[i]]);
				}
				res.write(dataStr);
				res.end();
			};
			optfile.readFile('./views/sign_in.html',callback);

		});

		
	},
	sign_up : function(req,res) {

		let callback = getCallback(res);
		optfile.readFile('./views/sign_up.html',callback);
	},
	writeFile : function(req,res) {

		let callback = getCallback(res);
		optfile.writeFileSync('./views/one.json','{"id":"1","name":"tom"}',callback);
	},
	showImg : function(req,res) {

		res.writeHead(200,{'Content-Type':'image/jpeg'});		
		optfile.readImg('./img/logo.png',res);
	}
}