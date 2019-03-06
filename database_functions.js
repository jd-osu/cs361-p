/*This function adds a new adoption */
app.get('/add-adoption', function(req,res,next){
	var context = {};
	mysql.pool.query("INSERT INTO user_sidewalk (`user_id`, `sidewalk_id`, `adoption_date`, `status`) VALUES (?, ?, ?, ?)", [req.query.user, req.query.sidewalk, req.query.date, "active"], function(err, result) {
		if (err) {
			next(err);
			return;
		}
		else {
			mysql.pool.query('SELECT user_id, sidewalk_id, adoption_date, status FROM user_sidewalk', function(err, rows, fields){
				if(err){
					next(err);
				    return;
				}
				
				res.send(JSON.stringify(rows));
			})
		}
	})
});


/*This function retrieves all of the rows of the sidewalks table */
app.get('/sidewalks',function(req,res,next){
	mysql.pool.query('SELECT id, street_id, cross_street_1, cross_street_2 FROM sidewalk', function(err, rows, fields){
		if(err){
			next(err);
		    return;
		}
		else		
			res.send(JSON.stringify(rows));
	})
});

/*This function retrieves all of the rows of the streets table */
app.get('/streets',function(req,res,next){
	mysql.pool.query('SELECT id, name FROM street', function(err, rows, fields){
		if(err){
			next(err);
		    return;
		}
		else		
			res.send(JSON.stringify(rows));
	})
});