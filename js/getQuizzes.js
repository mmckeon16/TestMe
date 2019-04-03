var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  database: "testdb",
});
var db = connection.database;
var tableName = "surveyList";

module.exports = {

	getAllFiles : function(callback){
		connection.query('SELECT * from '+tableName , function(err, results, fields){
			if(!err && results){
				//there are tests, return the array
				console.log(results);
				callback(null, results);
			}else{
				console.log("Error with data base!");
				callback("Database error!", results);
			}
		});		
	}
};