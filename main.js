var mysql = require('./dbcon.js');

var req = {};
req.street_name = "NE 7th Ave";
req.cross_street_1_name = "cross street 1";
req.cross_street_2_name = "cross street 2";

var res = {
  send : function(input) {
    console.log(input);
  }
};




function get_street_id(req, res) {
	mysql.pool.query('SELECT id FROM street WHERE name=?', [req.street_name], function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		else		
			res.send(JSON.stringify(rows));
	});
}

function get_availability(req, res) {
	mysql.pool.query('SELECT id, name FROM street WHERE name=? OR name=? OR name=?', [req.street_name, req.cross_street_1_name, req.cross_street_2_name], function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		else		
			res.send(JSON.stringify(rows));
	});
}



//get_street_id(req, res);
get_availability(req, res);