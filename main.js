var mysql = require('./dbcon.js');

var street_name = "NE 7th Ave";
var cross_street_1_name = "cross street 1";
var cross_street_2_name = "cross street 2";

function get_street_id(name, mysql) {
	mysql.pool.query('SELECT id FROM street WHERE name=?', name, function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		else		
			return rows;
	});
}

var result = get_street_id(name,mysql);

console.log(JSON.stringify(result));