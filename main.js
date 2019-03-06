var mysql = require('./dbcon.js');

var street_name = "main street";
var cross_street_1_name = "cross street 1";
var cross_street_2_name = "cross street 2";


mysql.pool.query('SELECT id FROM street WHERE name=?', street_name, function(err, rows, fields){
	if(err){
		next(err);
		   return;
	}
	else		
		console.log(JSON.stringify(rows));
});

console.log("\n");
