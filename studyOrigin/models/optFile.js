const	fs	= require('fs');

module.exports = {

	readFileSync : function(path) {

		let data = fs.readFileSync(path,'utf-8');
		console.log(data);
		console.log('同步读取执行完毕');
		return data;

	},
	readFile : function(path,callback) {

		fs.readFile(path,function(err,data) {
			if(err) {
				console.log(err);
				callback('文件不存在');
			}else {
				console.log(data.toString());
				callback(data);
			}

		});
		console.log('异步读取执行完毕');
	},
	readImg : function(path,res) {

		fs.readFile(path,'binary',function(err,filedata){

			if(err) {
				console.log(err);
			}else {
				
				res.write(filedata,'binary');
				res.end('end');
			}
		});
		console.log('图片异步读取完毕');
	},
	writeFile : function(path,data,callback) {

		fs.writeFile(path,data,function(err){
			if(err) {
				console.log(err);
			}else {
				console.log('It\'s Saved for aSychonrous');
				callback('存储成功');
			}
		})
	},
	writeFileSync : function(path,data,callback) {

		fs.writeFileSync(path,data);
		console.log('同步存储完毕！')
		callback('存储成功');
	}
}