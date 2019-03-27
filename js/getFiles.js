var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  database: "testdb",
});
var db = connection.database;


module.exports = {

	getAllFiles : function(callback){
		connection.query('SELECT * from surveyTable' , function(err, results, fields){
			if(!err && results){
				//there are tests, return the array
				callback(null, results);
			}else{
				console.log("Error with data base!");
				callback("Database error!", results);
			}
		});		
	}, 

	getTop10Posts : function(callback){
		connection.query('SELECT * FROM ratingTable ORDER BY rating DESC LIMIT 10' , function(err, results, fields){
			if(!err && results){
				//there are tests, return the array
				callback(null, results);
			}else{
				console.log("Error with data base!: " + err);
				callback("Database error!", results);
			}
		});	
	}
};