

var mysql = require('./dbcon.js');

mysql.pool.query('SELECT id, street_id, cross_street_1, cross_street_2 FROM sidewalk', function(err, rows, fields){
	if(err){
		next(err);
		   return;
	}
	else		
		res.send(JSON.stringify(rows));
});

console.log("\n");
