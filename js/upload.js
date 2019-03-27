var mysql      = require('mysql');
var AWS = require('aws-sdk');
// var awsmod = require('./awsmodule.js');

var connection = mysql.createConnection({
  host     : 'localhost',
  port     :'8000',
  user     : 'mmckeon',
  password : 'ssw215',
  database : 'tests'
});

var db = "tests";
 
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
 
//   console.log('connected as id ' + connection.threadId);
// });

connection.query('CREATE table tests(testname VARCHAR(40) NOT NULL, profname VARCHAR(40) NOT NULL,coursename VARCHAR(40) NOT NULL, year INT NOT NULL)', function(err, results, fields){
  if(err){
    console.log(err);
  } else {
    console.log("success!");
  }
});

module.exports = {

  uploadFile :function(courseName, testName, profName, year, file){
  	if(!file && !testName && !courseName && !year && !profName){
  		console.log("not all fields are filled out");
  		return false;
  	} else {

  		connection.query('INSERT into ' + db + '(courseName, testName, profName, year, file) VALUES(?,?,?,?,?)', [courseName, testName, profName, year, file], function(err, results, fields){
			if(err){
				console.log(err);
			} else {
				console.log(results + "course uploaded successfully!");
			}
		});


  		//got all the info add to db now
  		return true;
  	}
  }

}