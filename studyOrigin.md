## node 异步控制流程

### npm install async --save-dev

```js

function oneFun(){

	let ii = 0;
	setInterval(function(){

		console.log('aaa='+new Date());
		ii++;
		if(ii===3){

			clearInterval(this);
		}
	},2000);
	console.log('oneFun');
}

function twoFun(){

	let jj = 0;
	setInterval(function(){

		console.log('bbb='+new Date());
		jj++;
		if(jj===3){

			clearInterval(this);
		}
	},2000);
	console.log('twoFun');
}


function exec(){

	// 串行无关联方式
	async.series(
		{
			one:function(done) {

				let ii = 0;
				setInterval(function(){

					console.log('aaa='+new Date());
					ii++;
					if(ii===3){

						clearInterval(this);
						done(null,'one完毕')
					}
				},2000);
				
			},
			two:function(done) {

				let jj = 0;
				setInterval(function(){

					console.log('bbb='+new Date());
					jj++;
					if(jj===3){

						clearInterval(this);
						done(null,'two完毕')
					}
				},2000);
				
			}
		},function(err,data){

			console.log(err);
			console.log(data);
		}

	)

	//串行有关联
	async.waterfall([ //注意跟series的{}不一样，这里是数组形式

		function(callback){

			callback(null,'one')
		},
		function(callback){

			callback(null,'two')
		}
	],function(err,result){
		
		console.log(result)
	})
}

exec();
console.log('主进程执行完毕');
```


### node 直连mysql (创建，连接，插入，编辑，断开)

```js

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
connection.query('UPDATE user SET uname=?,pwd=? WHERE uid=?',['bbb111','456',2],function(err,result){

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
});

```

### node 链接池连mysql (创建，连接，插入，编辑)

```js

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


```


### node 时间处理机制

```text 
Events    
        events.EventEmitter    
            emitter.addListener(event, listener)==on //添加监听    
            emitter.on(event, listener)    
            emitter.once(event, listener)//一次性的监听器    
            emitter.removeListener(event, listener) //删除指定监听    
            emitter.removeAllListeners([event]) //删除所有监听    
            emitter.setMaxListeners(n) //默认情况下当一个事件的监听超过10个时，EventEmitter 将打印警告信息，0表无限制    
            emitter.listeners(event) //返回特定事件的事件监听器集合    
            emitter.emit(event, [arg1], [arg2], [...])  //用提供的参数按顺序执行每个事件监听器。    
   
 
emitter.on('someEvent', function(arg1, arg2) {   
    console.log('listener2', arg1, arg2);   
});   
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); //抛出事件  
 
```
***
```js
//-------------n16_event.js---------------------------------
const		userBean	= require('./models/userBean'),
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


//-------------userBean.js---------------------------------

const		events		= require('events');

function UserBean(){

	this.eventEmit = new events.EventEmitter();
	this.signUp = function(req,res){

		console.log('注册');
		req['uname'] = '111';		//适用于表单提交时 获取表单字段
		req['pwd'] = '222';		//适用于表单提交时 获取表单字段
		this.eventEmit.emit('signInSuccess','111','222');
	},
	this.signIn = function(req,res){

		res.write('用户名：'+req['uname']);
		res.write('密码:'+ req['pwd']);
		res.write(' 登录');
	}
}

module.exports = UserBean;

```