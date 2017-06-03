var 
express   =    require("express"),
mysql     =    require('mysql'),
bodyParser = require('body-parser');
var app       =    express();

var pool      =    mysql.createPool({
    connectionLimit : 0, 
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'node',
    debug    :  false
});

app.get("/all",function(req,res){
	pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   
        connection.query("SELECT * FROM user LIMIT 100",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }else{
            	res.json(err);
            }           
        });
        connection.on('error', function(err) {      
    		res.json({"code" : 100, "status" : "Error in connection database"});
	      	return;     
        });
  	});
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post("/insert",function(req,res){
	try {
	  crypto = require('crypto');
	} catch (err) {
	  console.log('This is not supported!');
	}
	var password = crypto.createHmac('sha256', "#crypt$auX")
				.update(req.body.password)
                .digest('hex');
    var post  = {user_login: req.body.login, user_name: req.body.name, user_email: req.body.email, user_password: password};
    pool.getConnection(function(err,connection){
		var query = connection.query('INSERT INTO user SET ?', post, function (error, results, fields) {
		  	if (error){
		  		res.json(error);
		  	}else{
		  		res.json(results);
		  	}
	 	});
	});  
});

app.delete("/delete", function(req, res){
	var id = req.body.user_id;
	pool.getConnection(function(err,connection){
		var userExists = connection.query("SELECT user_id FROM user WHERE user_id = " + id, function(error, results, fields){
			if(results.length > 0){
				var query = connection.query("DELETE FROM user WHERE user_id = " + id, function(error, results, fields){
					if(error){
						res.json(error);
					}else{
						res.json(results);
					}
				});		
			}else{
				//console.log("UserId " + id  + " was not found in our database");
				res.json({"code" : 406, "message" : "UserId " + id + " was not found in our database"});
				return;
			}
		});
	});
});

app.listen(3000);
