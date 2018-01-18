var User = require('./user').User;

module.exports = {
	Teacher : function(id,name,age){

		User.apply(this,[id,name,age]);
		this.teach = function(res){

			res.write(this.name + '讲课');
		}

	}

};

// var Teacher = function(id,name,age) {
// 	User.apply(this,[id,name,age]);
// 	this.teach = function(res) {
// 		res.write(this.name + '讲课');
// 	}
// }
// module.exports = Teacher;