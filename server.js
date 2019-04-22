var express = require('express');
var bodyParser = require('body-parser');
var upload = require('express-fileupload');
var app = express();
var path = require('path');
var help = require('./js/getFiles');
var quiz = require('./js/getQuizzes');
var uuid = require('./js/UUIDs');
var questions = require('./js/createQuestions');
var uploader = require('./js/upload');

var nodeMailer = require('nodemailer');

var mysql = require('mysql');


var exphbs = require('express-handlebars');
var hbsHelpers = exphbs.create({
    helpers: {
      iff: function(a, operator, b, opts) {
          switch(operator) {
           case '==':
               bool = a == b;
               break;
           case '>':
               bool = a > b;
               break;
           case '<':
               bool = a < b;
               break;
           default:
               throw "Unknown operator " + operator;
        }
     
        if (bool) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
      }
    },
    setVar: function(varName, varValue, opts) {
      return opts.data.root[varName] = varValue;
    },
    defaultLayout: 'layout'
});

var handlebars = require('handlebars');

handlebars.registerHelper("setVar", function(varName, varValue, opts) {
  opts.data.root[varName] = varValue;
});

// use bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.urlencoded())

app.use("/", express.static(__dirname));
app.use("/", express.static(path.join(__dirname + 'index')));

app.engine('handlebars', hbsHelpers.engine);
app.set('view engine', 'handlebars');

// Create database connection
var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  database: "testdb",
});

// EMAILS
app.post('/send-email', function(req, res) {
  console.log(req.body);
  let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testsurveyssw322@gmail.com',
      pass: 'Stevens1870' //TODO Change this
    }
  });
  let mailOptions = {
    from: req.body.email, // sender address
    to: 'testsurveyssw322@gmail.com', // list of receivers
    subject: 'Mail from website form ' + req.body.firstname, // + " " +
    //req.body.lastname, // Subject line
    text: "FROM " + req.body.email + ":: " + req.body.message // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.sendFile(path.join(__dirname + '/contact.html'));
  });
});

app.get('/post', function(req, res){

    // make db call to get all info for this
    quiz.getAllFiles(function(err, results){
        if(err){
            res.render("resources", {
                layout: 'main',
                results: null
            });
        } else{

             res.render("resources", {
                layout: 'main',
                results: results
            });
         }

    });
   
});

app.get('/options', function(req, res) {
  res.render("takeOrGrade", {
      layout: 'choose',
      results: req
  });
  //res.redirect("/takeOrGrade.html?creationCode="+req.query.creationCode);
});

app.get("/find", function(req, res) {
  if(req.query.action == "take") {
    res.redirect("/quiz?creationCode="+req.query.creationCode);
  }
  if(req.query.action = "submissions") {
    res.redirect("records?creationCode="+req.query.creationCode);
  }

});
  
app.get('/records', function(req, res){

    // make db call to get all info for this
    quiz.getAllRecords(req.query.creationCode, function(err, results){
        if(err){
            res.render("records", {
                layout: 'quiz',
                results: null
            });
        } else{
            res.render("records", {
                layout: 'quiz',
                results: results
            });
         }

    });

});

app.get('/quiz', function(req, res){

  // make db call to get all info for this
  quiz.getQuizFromCode(req.query.creationCode, function(err, results){
      console.log(results);
      if(err){
          res.render("quizInfo", {
              layout: 'quiz',
              results: null
          });
      } else{
          res.render("quizInfo", {
              layout: 'quiz',
              results: results
          });
       }

  });
   
});

app.get('/submissions', function(req, res){

  // make db call to get all info for this
  quiz.getResponsesFromCode(req.query.takerName, req.query.creationCode, function(err, results){
      if(err){
          res.render("submissions", {
              layout: 'quiz',
              results: null
          });
      } else{
          console.log(results);
          res.render("submissions", {
              layout: 'quiz',
              results: results
          });
       }

  });
   
});

//File Uploading
app.get("/", function(req, res) {
  res.redirect("/oldIndex.html");
});

//change this to be plug in access code
// app.get("/index", function(req, res) {
//     help.getTop10Posts(function(err, results){
//         if(err){
//             res.render("resources", {
//                 layout: 'index',
//                 results: null
//             });
//         } else{
//              res.render("resources", {
//                 layout: 'index',
//                 results: results
//             });
//          }

//     });
// });

app.post('/upload', function(req, res) {

  console.log("Body: " + JSON.stringify(req.body));
  var creatorName = req.body.creatorName;
  var creationCode = uuid.makeUUID();
  var testName = req.body.testName;
  var userEmail = req.body.Email;
  var questionList = JSON.stringify(questions.createQuestions(req.body));
  var responseList = null;
  var surveyOption = "SURVEY";//req.body.surveyOption;
  var description = req.body.description;

  var values = [[creatorName, creationCode, testName, surveyOption, questionList, responseList]];
  console.log(values);
  var sql = "INSERT INTO theNewSurveyList (creatorName, creationCode, surveyName, surveyOption, questionList, responseList) VALUES ?";
  //var sql = "INSERT INTO theNewSurveyList (creatorName, creationCode, surveyName, surveyOption, questionList, responseList) VALUES("+creatorName+","+creationCode+", "+testName+", "+surveyOption+", "+(questionList)+", "+responseList+")";


  con.query(sql, [values], function (err, result) {
    if (err) {
      console.log(err.sql);
      throw err;
    }
    console.log("success");
  });

  res.sendFile(path.join(__dirname + '/submit.html'));
});

app.post('/submitRecord', function(req, res) {

  console.log(req.body);
  var takerName = req.body.takerName;
  var creationCode = req.body.creationCode;
  var responseList = JSON.stringify(req.body);
  var surveyName = null;
  var surveyOption = "SURVEY";

  uploader.getSurveyName(creationCode, function(err, results) {
    if(!err){
      surveyName = results;
    }
      console.log(surveyName);

      var values = [[takerName, creationCode, surveyName, surveyOption, responseList]];
      var sql = "INSERT INTO responseList2 (takerName, creationCode, surveyName, surveyOption, responseList) VALUES ?";
      con.query(sql, [values], function (err, result) {
        if (err) {
          console.log(err.sql);
          throw err;
        }
        console.log("success");
      });

    res.redirect("records?creationCode="+creationCode);
  });
  
});

app.get('*', function(req, res) {
    res.redirect("/");
});


var port = 8000;

app.listen(port, function() {
  console.log("Server is listening on port ..." + port);
});
