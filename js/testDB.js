var mysql      = require('mysql');

 
 //USE THIS CONNECTION, WHEN CREATING DB ON MYSQL, KNOW USER AND DB NAME. MAY HAVE TO ADD A PASSWORD
var connection = mysql.createConnection({
  host     : 'localhost',
  port     :'3306',
  user     : 'root',
  database : 'testdb'
});

var db = "testdb";

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

/*STEP 1: USE THIS TO CREATE NEW TEST RESOURCE TABEL*/
connection.query('CREATE table ratingTable(className VARCHAR(40) NOT NULL, description VARCHAR(40) NOT NULL, semester VARCHAR(40) NOT NULL, profName VARCHAR(40) NOT NULL, notes VARCHAR(225) NOT NULL, filename  VARCHAR(100) NOT NULL, rating DOUBLE NOT NULL, numRating INT NOT NULL)', function(err, results, fields){
	if(err){
		console.log(err);
	} else {
		console.log("success!");
	}
});


connection.query('ALTER TABLE ratingTable ALTER COLUMN rating SET DEFAULT 0', function(err, results, fields){
 if(err){
   console.log(err);
 } else {
   console.log("success!");
 }
});

connection.query('ALTER TABLE ratingTable MODIFY COLUMN rating DOUBLE NOT NULL;', function(err, results, fields){
 if(err){
   console.log(err);
 } else {
   console.log("success!");
 }


//THIS CAN BE USED TO DELETE DATA FROM TABLE IF NEEDED
// connection.query('DELETE FROM ratingTable', function(err, results, fields){
//  if(err){
//    console.log(err);
//  } else {
//    console.log("success!");
//  }
// });


// THIS QUERY CAN VIEW ALL THE DATA FROM RATING
// connection.query('SELECT * from ratingTable', function(err, results, fields){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(results);
// 	}
// });

