var mysql = require('./dbcon.js');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));

app.set('port', 9436);

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

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
app.get('/submit-reg', function(req,res,next){
	mysql.pool.query('INSERT INTO user_tbl (user_id, sidewalk_id, adoption_date, status, nickname) VALUES (?, ?, ?, "active", ?)',
					[req.query.user_id, req.query.sidewalk_id, today, req.query.nickname], function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		else
			res.send("User added!");
	})
});

/*
* This function is expecting a POST request submitted to "/auth".
* Pre-Conditions:
	POST request arguments:	username (string) 	
							password (string)

  Post-Conditions:
		-Session is created and set to "logged in" status, with username specified
		-User is redirected to the home page
*
*	NOTE: This function was adapted from: https://codeshack.io/basic-login-system-nodejs-express-mysql/
*/
app.post('/auth', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	console.log("username=",username);
	console.log("password=",password);
	
	if (username && password) {
		mysql.pool.query('SELECT * FROM user_tbl WHERE username = ? AND password = ?', [username, password], function(err, rows, fields) {
			if(err){
				next(err);
				return;
			}
			else {
				if (rows.length > 0) {
					req.session.loggedin = true;
					req.session.username = username;
					res.send('Login successful!');
				} else {
					res.send('Incorrect Username and/or Password!');
				}			
				res.end();
			}
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
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

