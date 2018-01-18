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