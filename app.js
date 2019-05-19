//jshint esversion:6
//TODO:
// adding page
// finding page with deleting functionality
//    also updating functionality
//
//

const express = require("express");
const app = express();
var mysql = require("mysql");
var cookieParser=require('cookie-parser');
var passport=require('passport');
var session=require('express-session');
app.use(cookieParser());
app.use(session({secret:'pecan-house-data',
                 saveUninitialized: true,
                 resave: true
               }));
require('./src/conf/passport')(app);

require('dotenv').config();

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + 'public'));
app.use(express.static('src/views'));
var con = mysql.createConnection({
  host: process.env.DB_HOST, // ip address of server running mysql
  user: process.env.DB_USER, // user name to your mysql database
  password: process.env.DB_PASS, // corresponding password
  database: process.env.DB_DATABASE
});

con.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }
  console.log('Connected to the MySQL server.');
});

//Added to use routers for authentication.
var loginRouter=require('./src/routes/loginRoute')(con);
app.use('/login',loginRouter);
var findingRouter=require('./src/routes/findingRoute')(con);
app.use('/finding',findingRouter);
var addingRouter = require('./src/routes/addingRoute')(con);
app.use('/adding',addingRouter);

app.set('views','./src/views');
app.set('view engine', 'ejs');

app.get("/", function(req,res){
  res.render('index', {});
});

app.listen(3000, function() {
  console.log("Server started on port:3000");
});
