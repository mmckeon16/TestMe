var mysql      = require('mysql');

 
 //USE THIS CONNECTION, WHEN CREATING DB ON MYSQL, KNOW USER AND DB NAME. MAY HAVE TO ADD A PASSWORD
var connection = mysql.createConnection({
  host     : 'localhost',
  port     :'3306',
  user     : 'root',
  database : 'testdb'
});

var db = "testdb";
var tableName = "surveyList";
var creatorName = "creatorName VARCHAR(40) NOT NULL";
var creationCode = "creationCode VARCHAR(100) NOT NULL";
var surveyName = "surveyName VARCHAR(40) NOT NULL";
var surveyOrTest = "surveyOption VARCHAR(10) NOT NULL"
var questions = "questionList JSON NOT NULL";
var responses = "responseList JSON NOT NULL";

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

/*STEP 1: USE THIS TO CREATE NEW TEST RESOURCE TABEL*/
connection.query('CREATE table '+tableName+'('+creatorName+', '+creationCode+', '+surveyName+', '+surveyOrTest+', '+questions+', '+responses+')', function(err, results, fields){
	if(err){
		console.log(err);
	} else {
		console.log("success!");
	}
});


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

