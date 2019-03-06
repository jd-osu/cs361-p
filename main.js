var mysql = require('./dbcon.js');
var express = require('express');
var app = express();
app.set('port', 9436);

app.get('/',function(req,res,next){
	res.send('test');
});

app.get('/get-availability', function(req,res,next){
	req.street_name = "NE Knott St";
	req.cross_1 = "NE 7th Ave";
	//req.cross_2 = "NE 8th Ave";
	req.cross_2 = "lol";

	var context = {};
	mysql.pool.query('SELECT id FROM sidewalk WHERE street_name=? AND (((cross_1=?) AND (cross_2=?)) OR ((cross_1=?) AND (cross_2=?)))',
					[req.street_name, req.cross_1, req.cross_2, req.cross_1, req.cross_2], function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		else {
			/*
			var street_id, cross_1_id, cross_2_id;
			
			// make sure all were found
			if (rows.length >= 3) {
				
				//
				for (i in rows) {
					if (rows[i]["name"] == req.street_name)
						street_id = rows[i]["id"];
				}
			}
			console.log("length=",rows.length);
			*/
			res.send(JSON.stringify(rows)==undefined);
		}
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

