var express = require('express');
var bodyParser = require('body-parser');
var upload = require('express-fileupload');
const exphbs = require("express-handlebars");
var app = express();
var path = require('path');
var help = require('./js/getFiles');

var nodeMailer = require('nodemailer');

var mysql = require('mysql');


// use bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use("/", express.static(__dirname));
app.use("/", express.static(path.join(__dirname + 'index')));

app.use(upload({
    limits: { fileSize: 5242880 }
}));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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
  console.log("here");
  let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'testresourcestevens@gmail.com',
      pass: 'Stevens1870' //TODO Change this
    }
  });
  let mailOptions = {
    from: req.body.email, // sender address
    to: 'testresourcestevens@gmail.com', // list of receivers
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
    help.getAllFiles(function(err, results){
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

//File Uploading
app.get("/", function(req, res) {
  res.redirect("/index");
});

//change this to be plug in access code
app.get("/index", function(req, res) {
    help.getTop10Posts(function(err, results){
        if(err){
            res.render("resources", {
                layout: 'index',
                results: null
            });
        } else{
             res.render("resources", {
                layout: 'index',
                results: results
            });
         }

    });
});

app.post('/upload', function(req, res) {

  console.log("Body: " + JSON.stringify(req.body));
  if (req.files.upfile) {
    var date = Date.now()
    var file = req.files.upfile;
    var name = "/resource/" + date + ".pdf";
    var type = file.mimetype;
    var class_name = req.body.class_name;
    var description = req.body.description;
    var semester = req.body.semester;
    var professor_name = req.body.professor_name;
    var notes = req.body.notes;

    var uploadpath = __dirname + name;
    var values = [[class_name, description, semester, professor_name, notes, name]];
    var sql = "INSERT INTO surveyList (creatorName, creationCode, surveyName, surveyOption, questionList, responseList) VALUES ? ";


  }
});

app.get('*', function(req, res) {
    res.redirect("/");
});


var port = 8000;

app.listen(port, function() {
  console.log("Server is listening on port ..." + port);
});
