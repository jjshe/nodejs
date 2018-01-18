const		optPool		= require('./models/optPool');

let OptPool = new optPool(),
	pool = OptPool.getPool();

//从链接池中获取一个链接
pool.getConnection(function(err,conn){

//插入操作
let userAddSql = 'INSERT INTO users (uname,pwd) values(?,?)',
	param = ['ccc-pool','ccc'];

conn.query(userAddSql,param,function(err,rs){

	if(err){

		console.log('Insert err:'+err);
		return;
	}
	console.log('Insert success');
	conn.release();//释放池连接
});

//更新操作
conn.query('UPDATE user SET uname=?,pwd=? WHERE uid=?',['ddd-pool','ddd',4],function(err,rs){

	if(err){

		console.log('Update err:'+err);
		return;
	}
	console.log('Update success');
	//conn.release();//释放链接池，一般这步放到 最后的操作结尾；
});

//查询
conn.query('SELECT * FROM user',function(err,data){

	if(err){

		console.log('[query] - :'+err);
		return;
	}
	for(let i=0; i<data.length; i++){

		console.log('The solution is :'+data[i].uname);
	}
	conn.release();//释放池连接
});

});