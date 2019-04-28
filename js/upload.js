var mysql      = require('mysql');

 
 //USE THIS CONNECTION, WHEN CREATING DB ON MYSQL, KNOW USER AND DB NAME. MAY HAVE TO ADD A PASSWORD
var connection = mysql.createConnection({
  host     : 'localhost',
  port     :'3306',
  user     : 'root',
  database : 'testdb'
});

var db = "tests";
 
// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }
 
//   console.log('connected as id ' + connection.threadId);
// });

// connection.query('CREATE table tests(testname VARCHAR(40) NOT NULL, profname VARCHAR(40) NOT NULL,coursename VARCHAR(40) NOT NULL, year INT NOT NULL)', function(err, results, fields){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("success!");
//   }
// });

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
  },

  getSurveyNameAndStatus: function(creationCode, callback) {
    connection.query('SELECT surveyName, surveyOption from theNewSurveyList where creationCode = "'+creationCode+'"' , function(err, results, fields){
        if(!err && results){
          //there are tests, return the array
          if(results[0] != null){
            results = results[0];
          }    
          console.log(results);
          callback(null, results);
        }else{
          console.log("Error with data base!");
          callback("Database error!", results);
        }
      }); 
  },

  getSurveyStatus: function(creationCode, callback) {
    console.log("getting status");
    connection.query('SELECT surveyOption from theNewSurveyList where creationCode = "'+creationCode+'"' , function(err, results, fields){
        if(!err && results){
          //there are tests, return the array
          if(results[0] != null){
            results = results[0].surveyOption;
          }    
          console.log(results);
          callback(null, results);
        }else{
          console.log("Error with data base!");
          callback("Database error!", results);
        }
      }); 
  }

}