var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  database: "testdb",
});
var db = connection.database;
var tableName = "theNewSurveyList";

module.exports = {

	getAllFiles : function(callback){
		connection.query('SELECT * from '+tableName , function(err, results, fields){
			if(!err && results){
				//there are tests, return the array
				callback(null, results);
			}else{
				console.log("Error with data base!");
				callback("Database error!", results);
			}
		});		
	}, 

	getAllRecords : function(creationCode, callback){
		connection.query('SELECT * from responseList2 where creationCode = "'+creationCode+'"' , function(err, results, fields){
			if(!err && results){
				//there are tests, return the array
				callback(null, results);
			}else{
				console.log("Error with data base!");
				callback("Database error!", results);
			}
		});		
	}, 


	getQuizFromCode : function(creationCode, callback) {
		connection.query('SELECT * from '+tableName+' where creationCode = "'+creationCode+'"' , function(err, results, fields){
			if(!err && results){
				//there are tests, return the array
				if(results[0].questionList != null){
					results[0].questionList = JSON.parse(results[0].questionList);
				}

				results = results[0];
				//console.log(results);
				callback(null, results);
			}else{
				console.log("Error with data base!");
				callback("Database error!", results);
			}
		});		
	},


	getResponsesFromCode : function(takerName,creationCode, callback) {
		connection.query('SELECT * from responseList2 where takerName = "'+takerName+'" and creationCode = "'+creationCode+'"' , function(err, results, fields){
			if(!err && results){
				//there are tests, return the array
				console.log(results.length);
				if(results[0].responseList != null){
					results[0].responseList = JSON.parse(results[0].responseList);
				}

				results = results[0];
				//console.log("results from db: "+JSON.stringify(results));
				callback(null, results);
			}else{
				console.log("Error with data base!");
				callback("Database error!", results);
			}
		});		
	}
};