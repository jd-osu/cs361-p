var mysql = require('./dbcon.js');
var express = require('express');
var app = express();
app.set('port', 9436);

app.get('/',function(req,res,next){
	res.send('test');
});


/*
* This function is expecting a GET request submitted to "/get-availability".
* Pre-Conditions:
	GET request arguments:	street_name (string) 	Name of the street the sidewalk is ON
							cross_1 (string)		Name of the first cross street bounding the sidewalk
							cross_2 (string)		Name of the second cross street bounding the sidewalk
							
							-The three names MUST correspond to names of existing "streets" in the database.
							-The street_name MUST correspond to a street_name for an existing sidewalk,
								and the two cross street names must correspond to cross streets for the sidewalk, although
								the order of the two cross streets does not matter.
								(In other words, the sidewalk must exist in the database)
								
  Post-Conditions:
		Returns sidewalk (object) with the following attributes
			found (bool)		Indicates whether the sidewalk was found in the database
			id (int)			ID of the sidewalk
			available (bool)	Indicates whether the sidewalk is available
*
*
*/
app.get('/get-availability', function(req,res,next){
	console.log(req);
	
	mysql.pool.query('SELECT id FROM sidewalk WHERE street_name=? AND (((cross_1=?) AND (cross_2=?)) OR ((cross_1=?) AND (cross_2=?)))',
					[req.street_name, req.cross_1, req.cross_2, req.cross_1, req.cross_2], function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		else {
			var sidewalk = {};
			
			// if a sidewalk object is found
			if (rows.length > 0) {
				sidewalk.id = rows[0]["id"];
				
				mysql.pool.query('SELECT id FROM user_sidewalk WHERE sidewalk_id=? AND status="active"',
								[sidewalk.id], function(err, rows2, fields) {
					if(err){
						next(err);
						return;
					}
					else {
						if (rows2 == 0)
							sidewalk.available = true;
						else
							sidewalk.available = false;
						
						res.send(JSON.stringify(sidewalk));
					}
				})
			}
			else {
				sidewalk.found = false;
				res.send(JSON.stringify(sidewalk));
			}
		}
	})
});



/*
* This function is expecting a GET request submitted to "/get-availability".
* Pre-Conditions:
	GET request arguments:	street_name (string) 	Name of the street the sidewalk is ON
							cross_1 (string)		Name of the first cross street bounding the sidewalk
							cross_2 (string)		Name of the second cross street bounding the sidewalk
							
							-The three names MUST correspond to names of existing "streets" in the database.
							-The street_name MUST correspond to a street_name for an existing sidewalk,
								and the two cross street names must correspond to cross streets for the sidewalk, although
								the order of the two cross streets does not matter.
								(In other words, the sidewalk must exist in the database)
								
  Post-Conditions:
		Returns sidewalk (object) with the following attributes
			found (bool)		Indicates whether the sidewalk was found in the database
			id (int)			ID of the sidewalk
			available (bool)	Indicates whether the sidewalk is available
*
*
*/
app.get('/adopt-sidewalk', function(req,res,next){
	req.user_id = 1;
	req.sidewalk_id = 1;
	req.nickname = "Nickname";
	
	var today = new Date();

	mysql.pool.query('INSERT INTO user_sidewalk (user_id, sidewalk_id, adoption_date, status, nickname) VALUES (?, ?, ?, "active", ?)',
					[req.user_id, req.sidewalk_id, today, req.nickname], function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		else
			res.send("Adoption successful!");
	})
});





app.use(function(req,res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

/*
var req = {};
req.street_name = "NE Knott St";
req.cross_street_1_name = "NE 7th Ave";
req.cross_street_2_name = "NE 8th Ave";

var res = {
  send : function(input) {
    console.log(input);
  }
};

var next = function(err){console.log("error:\n", err)};
*/


/*

function get_street_id(req, res, next) {
	mysql.pool.query('SELECT id FROM street WHERE name=?', [req.street_name], function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		else		
			res.send(JSON.stringify(rows));
	});
}

function get_sidewalk(req, res, next) {
	mysql.pool.query('SELECT id, name FROM street WHERE name=? OR name=? OR name=?', [req.street_name, req.cross_street_1_name, req.cross_street_2_name], function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		else
			wait = 0;
		
	while (wait == 1);
	
	
	
	
			
			res.send(JSON.stringify(rows));
	});
	
	
}

function get_streets(street_name, cross_1, cross_2) {
	mysql.pool.query('SELECT id, name FROM street WHERE name=? OR name=? OR name=?', [street_name, cross_1, cross_2], function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		else
			return rows;
	});
}

function get_availability(req, res, next) {
	mysql.pool.query('SELECT id, name FROM street WHERE name=? OR name=? OR name=?', [req.street_name, req.cross_street_1_name, req.cross_street_2_name], function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		else
			wait = 0;
		
	while (wait == 1);
	
	
	
	
			
			res.send(JSON.stringify(rows));
	});
	
	
}



//get_street_id(req, res);
get_availability(req, res);
*/

