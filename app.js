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
//----------- Ryan - section to connect to DB
// var con = mysql.createConnection({
//   host: process.env.DB_HOST, // ip address of server running mysql
//   user: process.env.DB_USER, // user name to your mysql database
//   password: process.env.DB_PASS, // corresponding password
//   database: process.env.DB_DATABASE
// });
//
// con.connect(function(err) {
//   if (err) {
//     return console.error('error: ' + err.message);
//   }
//   console.log('Connected to the MySQL server.');
// });
//---------------------------

app.get("/", function(req,res){
  res.render('index', {});
});

// app.get("/adding",function(req,res){
//   res.render('adding', {loggedin: login});
// });

// app.post("/addData", function(req,res){
//   var sql = "INSERT INTO customers VALUES (?)";
//   var needmore = req.body.yesnobutton;
//   var fname = req.body.firstname;
//   var lname = req.body.lastname;
//   var uphone = req.body.phone;
//   var uadd = req.body.address;
//   var ucity = req.body.city;
//   var ustate = req.body.state;
//   var uzip = req.body.zip;
//   var uorderdate = req.body.order_date;
//   var utypeoforder = req.body.typeoforder;
//   if(needmore == "no"){
//     var sfname = req.body.shipfirstname;
//     var slname = req.body.shiplastname;
//     var sadd = req.body.shipaddress;
//     var scity = req.body.shipcity;
//     var sstate = req.body.shipstate;
//     var szip = req.body.shipzip;
//     var values1 = [null,fname, lname, uphone, uadd, ucity, ustate, uzip, sfname, slname, sadd, scity, sstate, szip, uorderdate,utypeoforder];
//     con.query(sql, [values1], function (err, result) {
//       if (err) console.log(err);
//       console.log("Number of records inserted: " + result.affectedRows);
//     });
//   }else{
//     var values2 = [null,fname, lname, uphone, uadd, ucity, ustate, uzip, fname, lname, uadd, ucity, ustate, uzip, uorderdate,utypeoforder];
//     con.query(sql, [values2], function (err, result) {
//       if (err) console.log(err);
//       console.log("Number of records inserted: " + result.affectedRows);
//     });
//   }
//   res.redirect('adding');
// });

// app.get("/finding",function(req,res){
//   res.render('finding',{searchQuery: null});
// });

app.listen(3000, function() {
  console.log("Server started on port:3000");
});
