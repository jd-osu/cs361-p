

var mysql = require('./dbcon.js');

mysql.pool.query('SELECT * FROM street', function(err, rows, fields){
	if(err){
		next(err);
		   return;
	}
	else		
		console.log(JSON.stringify(rows));
});

console.log("\n");
