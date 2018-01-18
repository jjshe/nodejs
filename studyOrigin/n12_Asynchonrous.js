const		async = require('async');

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

// oneFun();
// twoFun();


//串行无关联
function exec(){

	async.waterfall(
		[
			function(done) {

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
			function(previousVal,done) {

				let jj = 0;
				setInterval(function(){

					console.log('bbb='+new Date());
					jj++;
					if(jj===3){

						clearInterval(this);
						done(null,previousVal+',two完毕')
					}
				},2000);
				console.log('twoFun');
				
			}
		],function(err,data){

			console.log(err);
			console.log(data);
		}

	)
}


//串行无关联
exec();
console.log('主进程执行完毕');