var mysql      = require('mysql');

 
 //USE THIS CONNECTION, WHEN CREATING DB ON MYSQL, KNOW USER AND DB NAME. MAY HAVE TO ADD A PASSWORD
var connection = mysql.createConnection({
  host     : 'localhost',
  port     :'3306',
  user     : 'root',
  database : 'testdb'
});

var db = "testdb";
var tableName = "theNewSurveyList";
var creatorName = "creatorName VARCHAR(40) NOT NULL";
var creationCode = "creationCode VARCHAR(100) NOT NULL";
var surveyName = "surveyName VARCHAR(40) NOT NULL";
var surveyOrTest = "surveyOption VARCHAR(10) NOT NULL"
var questions = "questionList VARCHAR(5000) NOT NULL";
var responses = "responseList VARCHAR(10000)";

var tableName2 = "responseList2";
var takerName = "takerName VARCHAR(40) NOT NULL";
//var creationCode = "creationCode VARCHAR(100) NOT NULL";
//var surveyOrTest = "surveyOption VARCHAR(10) NOT NULL"
var responses = "responseList VARCHAR(10000)";

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

/*STEP 1: USE THIS TO CREATE NEW TEST RESOURCE TABle*/
// connection.query('CREATE table '+tableName+'('+creatorName+', '+creationCode+', '+surveyName+', '+surveyOrTest+', '+questions+', '+responses+')', function(err, results, fields){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("success!");
// 	}
// });

/*STEP 2: USE THIS TO CREATE NEW Response TABle*/
connection.query('CREATE table '+tableName2+'('+takerName+', '+creationCode+', '+surveyName +','+surveyOrTest+', '+responses+')', function(err, results, fields){
 if(err){
   console.log(err);
 } else {
   console.log("success!");
 }
});


// connection.query('SELECT * from '+tableName+' where creationCode = "a4c4f4c4-64d7-4c60-8ac5-d058a4280889"', function(err, results, fields) {
//   if(err){
//      console.log(err);
//    } else {
//      console.log(results);
//    }
// })


//THIS CAN BE USED TO DELETE DATA FROM TABLE IF NEEDED
// connection.query('DELETE FROM '+tableName, function(err, results, fields){
//  if(err){
//    console.log(err);
//  } else {
//    console.log("success!");
//  }
// });


// THIS QUERY CAN VIEW ALL THE DATA FROM RATING
// connection.query('SELECT * from '+tableName, function(err, results, fields){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(results);
// 	}
// });

