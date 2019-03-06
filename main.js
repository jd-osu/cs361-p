var mysql = require('./dbcon.js');

var req;
req.street_name = "NE 7th Ave";
req.cross_street_1_name = "cross street 1";
req.cross_street_2_name = "cross street 2";


function get_street_id(name, mysql) {
	mysql.pool.query('SELECT id FROM street WHERE name=?', name, function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		else		
			console.log(JSON.stringify(result));
	});
}


//get_street_id(street_name, mysql);

console.log(req);