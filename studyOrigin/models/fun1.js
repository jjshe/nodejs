
module.exports = {

	fun1 : function(res){

		console.log('fun1');
		res.write('hello world,my name is fun1 <br>');

	},
	fun2 : function(res){

		console.log('fun2');
		res.write('hello,my name is fun2 <br>')

	}
};