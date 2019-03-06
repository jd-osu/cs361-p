/* Author: Jason DiMedio
 * Date: March 14, 2017
 * CS 340
 * Final Project
 */

var express = require("express");
var mysql = require("./db_login.js");
var request = require('request');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 9436);

app.get('/',function(req,res,next){
	var context = {};
	mysql.pool.query('SELECT * FROM Client', function(err, rows, fields){
		if(err){
			next(err);
		    return;
		}
		else {
			context.results = JSON.stringify(rows);
			res.render('home', context);
		}
	})
});

/*This function retrieves all of the rows of the Client table */
app.get('/show-client',function(req,res,next){
	mysql.pool.query('SELECT id, name FROM Client', function(err, rows, fields){
		if(err){
			next(err);
		    return;
		}
		else		
			res.send(JSON.stringify(rows));
	})
});

/*This function retrieves all of the rows of the Attorney table */
app.get('/show-attorney',function(req,res,next){
	mysql.pool.query('SELECT id, name FROM Attorney', function(err, rows, fields){
		if(err){
			next(err);
		    return;
		}
		else		
			res.send(JSON.stringify(rows));
	})
});

/*This function retrieves all of the rows of the Inventor table */
app.get('/show-inventor',function(req,res,next){
	mysql.pool.query('SELECT id, first_name, last_name, street_address, city, state, zip, citizenship_country FROM Inventor', function(err, rows, fields){
		if(err){
			next(err);
		    return;
		}
		else		
			res.send(JSON.stringify(rows));
	})
});

/*This function retrieves all of the rows of the Invention table */
app.get('/show-invention',function(req,res,next){
	mysql.pool.query('SELECT id, title, DATE_FORMAT(priority_date, "%Y-%m-%d") priority_date, client_id FROM Invention', function(err, rows, fields){
		if(err){
			next(err);
		    return;
		}
		else		
			res.send(JSON.stringify(rows));
	})
});

/*This function retrieves all of the rows of the Attorney_Invention table */
app.get('/show-attorney-invention',function(req,res,next){
	mysql.pool.query('SELECT attorney_id, invention_id FROM Attorney_Invention', function(err, rows, fields){
		if(err){
			next(err);
		    return;
		}
		else		
			res.send(JSON.stringify(rows));
	})
});

/*This function retrieves all of the rows of the Inventor_Invention table */
app.get('/show-inventor-invention',function(req,res,next){
	mysql.pool.query('SELECT inventor_id, invention_id FROM Inventor_Invention', function(err, rows, fields){
		if(err){
			next(err);
		    return;
		}
		else		
			res.send(JSON.stringify(rows));
	})
});

/*This function retrieves all of the rows of the Application table */
app.get('/show-application',function(req,res,next){
	mysql.pool.query('SELECT id, application_number, DATE_FORMAT(filing_date, "%Y-%m-%d") filing_date, patent_number, DATE_FORMAT(granted_date, "%Y-%m-%d") granted_date, invention_id, status_id FROM Application', function(err, rows, fields){
		if(err){
			next(err);
		    return;
		}
		else		
			res.send(JSON.stringify(rows));
	})
});

/*This function retrieves all of the rows of the Action table */
app.get('/show-action',function(req,res,next){
	mysql.pool.query('SELECT id, name, DATE_FORMAT(due_date, "%Y-%m-%d") due_date, DATE_FORMAT(completed_date, "%Y-%m-%d") completed_date, application_id FROM Action', function(err, rows, fields){
		if(err){
			next(err);
		    return;
		}
		else		
			res.send(JSON.stringify(rows));
	})
});

/*This function retrieves all of the rows of the Status table */
app.get('/show-status',function(req,res,next){
	mysql.pool.query('SELECT id, name FROM Status', function(err, rows, fields){
		if(err){
			next(err);
		    return;
		}
		else		
			res.send(JSON.stringify(rows));
	})
});

app.get('/add-client', function(req,res,next){
	var context = {};
	mysql.pool.query("INSERT INTO Client (`name`) VALUES (?)", [req.query.name], function(err, result) {
		if (err) {
			next(err);
			return;
		}
		else {
			mysql.pool.query('SELECT id, name FROM Client', function(err, rows, fields){
				if(err){
					next(err);
				    return;
				}
				
				res.send(JSON.stringify(rows));
			})
		}
	})
});

app.get('/add-attorney', function(req,res,next){
	var context = {};
	mysql.pool.query("INSERT INTO Attorney (`name`) VALUES (?)", [req.query.name], function(err, result) {
		if (err) {
			next(err);
			return;
		}
		else {
			mysql.pool.query('SELECT id, name FROM Attorney', function(err, rows, fields){
				if(err){
					next(err);
				    return;
				}
				
				res.send(JSON.stringify(rows));
			})
		}
	})
});

app.get('/add-inventor', function(req,res,next){
	var context = {};
	mysql.pool.query("INSERT INTO Inventor (`first_name`, `last_name`, `street_address`, `city`, `state`, `zip`, `citizenship_country`) VALUES (?, ?, ?, ?, ?, ?, ?)", [req.query.fname, req.query.lname, req.query.sadress, req.query.city, req.query.state, req.query.zip, req.query.country], function(err, result) {
		if (err) {
			next(err);
			return;
		}
		else {
			mysql.pool.query('SELECT id, first_name, last_name, street_address, city, state, zip, citizenship_country FROM Inventor', function(err, rows, fields){
				if(err){
					next(err);
				    return;
				}
				
				res.send(JSON.stringify(rows));
			})
		}
	})
});

app.get('/add-invention', function(req,res,next){
	var context = {};
	mysql.pool.query("INSERT INTO Invention (`title`, `priority_date`, `client_id`) VALUES (?, ?, ?)", [req.query.title, req.query.pdate, req.query.client], function(err, result) {
		if (err) {
			next(err);
			return;
		}
		else {
			mysql.pool.query('SELECT id, title, DATE_FORMAT(priority_date, "%Y-%m-%d") priority_date, client_id FROM Invention', function(err, rows, fields){
				if(err){
					next(err);
				    return;
				}
				
				res.send(JSON.stringify(rows));
			})
		}
	})
});

app.get('/add-attorney-invention', function(req,res,next){
	var context = {};
	mysql.pool.query("INSERT INTO Attorney_Invention (`attorney_id`, `invention_id`) VALUES (?, ?)", [req.query.attorney, req.query.invention], function(err, result) {
		if (err) {
			next(err);
			return;
		}
		else {
			mysql.pool.query('SELECT attorney_id, invention_id FROM Attorney_Invention', function(err, rows, fields){
				if(err){
					next(err);
				    return;
				}
				
				res.send(JSON.stringify(rows));
			})
		}
	})
});

app.get('/add-inventor-invention', function(req,res,next){
	var context = {};
	mysql.pool.query("INSERT INTO Inventor_Invention (`inventor_id`, `invention_id`) VALUES (?, ?)", [req.query.inventor, req.query.invention], function(err, result) {
		if (err) {
			next(err);
			return;
		}
		else {
			mysql.pool.query('SELECT inventor_id, invention_id FROM Inventor_Invention', function(err, rows, fields){
				if(err){
					next(err);
				    return;
				}
				
				res.send(JSON.stringify(rows));
			})
		}
	})
});

app.get('/add-application', function(req,res,next){
	var context = {};
	mysql.pool.query("INSERT INTO Application (`application_number`, `filing_date`, `patent_number`, `granted_date`, `invention_id`, `status_id`) VALUES (?, ?, ?, ?, ?, ?)", [req.query.appnum, req.query.fdate, req.query.patnum, req.query.gdate, req.query.invention, req.query.status], function(err, result) {
		if (err) {
			next(err);
			return;
		}
		else {
			mysql.pool.query('SELECT id, application_number, DATE_FORMAT(filing_date, "%Y-%m-%d") filing_date, patent_number, DATE_FORMAT(granted_date, "%Y-%m-%d") granted_date, invention_id, status_id FROM Application', function(err, rows, fields){
				if(err){
					next(err);
				    return;
				}
				
				res.send(JSON.stringify(rows));
			})
		}
	})
});

app.get('/add-action', function(req,res,next){
	var context = {};
	mysql.pool.query("INSERT INTO Action (`name`, `due_date`, `completed_date`, `application_id`) VALUES (?, ?, ?, ?)", [req.query.name, req.query.ddate, req.query.cdate, req.query.applid], function(err, result) {
		if (err) {
			next(err);
			return;
		}
		else {
			mysql.pool.query('SELECT id, name, DATE_FORMAT(due_date, "%Y-%m-%d") due_date, DATE_FORMAT(completed_date, "%Y-%m-%d") completed_date, application_id FROM Action', function(err, rows, fields){
				if(err){
					next(err);
				    return;
				}
				
				res.send(JSON.stringify(rows));
			})
		}
	})
});

app.get('/add-status', function(req,res,next){
	var context = {};
	mysql.pool.query("INSERT INTO Status (`name`) VALUES (?)", [req.query.name], function(err, result) {
		if (err) {
			next(err);
			return;
		}
		else {
			mysql.pool.query('SELECT id, name FROM Status', function(err, rows, fields){
				if(err){
					next(err);
				    return;
				}
				
				res.send(JSON.stringify(rows));
			})
		}
	})
});

app.get('/remove-client', function(req,res,next){
	var context = {};
	mysql.pool.query("DELETE FROM Client WHERE id=?", [req.query.id], function(err, result) {
		if (err) {
			next(err);
			return;
		}
		else {
			mysql.pool.query('SELECT id, name FROM Client', function(err, rows, fields){
				if(err){
					next(err);
				    return;
				}
				
				res.send(JSON.stringify(rows));
			})
		}
	})
});


app.get('/select-client', function(req,res,next){
	var context = {};
	mysql.pool.query('SELECT id, name FROM Client WHERE id=?', [req.query.id], function(err, rows, fields) {
		if (err) {
			next(err);
			return;
		}
		
		res.send(JSON.stringify(rows));
	})
});

app.get('/update-client', function(req,res,next){
	var context = {};
	mysql.pool.query('SELECT id, name FROM Client WHERE id=?', [req.query.id], function(err, rows, fields) {
		if (err) {
			next(err);
			return;
		}
		if (rows.length == 1) {
			var toUpdate = rows[0];
			mysql.pool.query("UPDATE Client SET name=? WHERE id=? ",
					[req.query.name || toUpdate.name, req.query.id],
					function (err, rows) {
						if (err) {
							next(err);
							return;
						}
						else {
							mysql.pool.query('SELECT id, name FROM Client', function(err, rows, fields){
								if(err){
									next(err);
								    return;
								}
								
								res.send(JSON.stringify(rows));
							})
						}
					});
		}
	})
});

/*This function retrieves filtered rows of the Application table */
app.get('/filter-application',function(req,res,next){
	mysql.pool.query('SELECT id, application_number, DATE_FORMAT(filing_date, "%Y-%m-%d") filing_date, patent_number, DATE_FORMAT(granted_date, "%Y-%m-%d") granted_date, invention_id, status_id FROM Application WHERE status_id=?', [req.query.status], function(err, rows, fields){
		if(err){
			next(err);
		    return;
		}
		else		
			res.send(JSON.stringify(rows));
	})
});
/*
app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});
*/
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