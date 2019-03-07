
/* These function assume that at least the following declarations have been made by server-side script:
var mysql = require('./dbcon.js');
var express = require('express');
var app = express();
*/

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
	mysql.pool.query('SELECT id FROM sidewalk WHERE street_name=? AND (((cross_1=?) AND (cross_2=?)) OR ((cross_1=?) AND (cross_2=?)))',
					[req.query.street_name, req.query.cross_1, req.query.cross_2, req.query.cross_1, req.query.cross_2], function(err, rows, fields){
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
* This function is expecting a GET request submitted to "/adopt-sidewalk".
* Pre-Conditions:
	GET request arguments:	user_id (int) 	
							sidewalk_id (int)
							nickname (string)		Nickname that user wants to assign to sidwalk
							
							-The sidewalk MUST be available
							-The nickname MUST be a string (but can be the empty string "")
								
  Post-Conditions:
		-Adoption record added to user-sidewalk table with today's date and "active" status
		-Request message sent back saying "Adoption Successful!"
*
*
*/
app.get('/adopt-sidewalk', function(req,res,next){
	var today = new Date();

	mysql.pool.query('INSERT INTO user_sidewalk (user_id, sidewalk_id, adoption_date, status, nickname) VALUES (?, ?, ?, "active", ?)',
					[req.query.user_id, req.query.sidewalk_id, today, req.query.nickname], function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		else
			res.send("Adoption successful!");
	})
});

