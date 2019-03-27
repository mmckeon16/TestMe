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
		connection.query('SELECT * from ratingTable' , function(err, results, fields){
			if(!err && results){
				//there are tests, return the array
				callback(null, results);
			}else{
				console.log("Error with data base!");
				callback("Database error!", results);
			}
		});		
	}, 

	sendRating : function(body, callback){
		console.log("body: " + JSON.stringify(body));
		connection.query('SELECT rating, numRating, filename FROM ratingTable WHERE filename = ?', [body.filename], function(err, results, fields){
			if(err){
				callback("There was nothing with that filename: " + err, results);
			} else{
				console.log("success in grabbing old rating");
				console.log("first result: "  + JSON.stringify(results[0]));
				var newRating = parseInt(body.rate);
				console.log("This is the tpye of shit " + typeof newRating);

				results[0].numRating = results[0].numRating + 1;
				console.log("adding " + body.rate + " and " + results[0].rating + " and divide by " + results[0].numRating);
				results[0].rating = Math.round(((results[0].rating*(results[0].numRating-1)+newRating)/results[0].numRating) * 100) / 100;
				//console.log(((results[0].rating*(results[0].numRating-1))+newRating)/results[0].numRating);
				console.log(results[0]);
				callback(null, results[0]);
			}
		});
	},

	postNewRating : function(body, callback) {
		connection.query('UPDATE ratingTable SET rating = ?, numRating = ? WHERE filename = ?', [body.rating, body.numRating, body.filename] , function(err, results, fields){
			if(err){
				console.log("update body: " + JSON.stringify(body));
				callback("There was nothing with that filename: " + err, results);
			} else{
				console.log("success in grabbing old rating");

				results.numRating = results.numRating + 1;

				if(body.like == "0") {  //dislike the file
					results.rating = (results.rating)/results.numRating
				} else { //they likes the file
					results.rating = (results.rating + 5)/results.numRating
				}

				callback(null, results);
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