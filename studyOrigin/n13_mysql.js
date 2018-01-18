const		mysql		= require('mysql');

//创建一个connection
let connection = mysql.createConnection({

	host:'localhost',	//主机
	user:'root',		//MySQL认证用户名
	password:'123456',	//MySQL认证用户密码
	database:'node_test',
	port:'3306'			//端口号
});

//开始connection
connection.connect(function(err){

	if(err){

		console.log('[query] - :'+err);
		return;
	}
	console.log('[connection connect] succeed!');
});

//执行插入
let userAddSql = 'insert into users (uname,pwd) values(?,?)',
	param = ['ccc','789'];

connection.query(userAddSql,param,function(err,data){

	if(err){
		console.log('[insert err]:' + err);
		return;
	}
	console.log('insert success');
});

//执行更新
connection.query('UPDATE user SET uname=?,pwd=? WHERE uid=?',['bbb','456',2],function(err,result){

	if(err){

		console.log('[update err]:'+err);
	}
	console.log('update success!');
})

//执行查询
connection.query('SELECT * from user where uid=?',[2],function(err,data){

	if(err){

		console.log('[query] - :'+err);
		return;
	}
	for(let i = 0; i<data.length; i++){

		console.log('The solution is:',data[i].uname);
	}
});

//关闭connection
connection.end(function(err){

	if(err){

		console.log('[query] - :'+err);
		return;
	}
	console.log('[connection end] succeed!');
})