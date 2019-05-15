//jshint esversion:6
//TODO:
// adding page
// finding page with deleting functionality
//    also updating functionality
//
//

const express = require("express");
var mysql = require("mysql");
require('dotenv').config();

const app = express();

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/css'));

app.set('view engine', 'ejs');
//----------- Ryan - section to connect to DB
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
//---------------------------
var login = false;
app.get("/", function(req,res){
  res.render('index', {loggedin:login});
});

app.post("/",function(req,res){
  var qusername = req.body.username;
  var qpassword = req.body.password;
  con.query("SELECT * FROM users WHERE username = " + con.escape(qusername) + "AND user_password = " + con.escape(qpassword), function(err,results,field){
    if(err) console.log(err);
    if(results == ""){
      console.log("Incorrect Login");
      res.redirect('/');
    } else{
      console.log("Successful Login");
      login = true;
      res.redirect('/');
    }
  });
});

app.get("/adding",function(req,res){
  res.render('adding', {loggedin: login});
});

app.post("/addData", function(req,res){
  var sql = "INSERT INTO customers VALUES (?)";
  var needmore = req.body.yesnobutton;
  var fname = req.body.firstname;
  var lname = req.body.lastname;
  var uphone = req.body.phone;
  var uadd = req.body.address;
  var ucity = req.body.city;
  var ustate = req.body.state;
  var uzip = req.body.zip;
  var uorderdate = req.body.order_date;
  var utypeoforder = req.body.typeoforder;
  if(needmore == "no"){
    var sfname = req.body.shipfirstname;
    var slname = req.body.shiplastname;
    var sadd = req.body.shipaddress;
    var scity = req.body.shipcity;
    var sstate = req.body.shipstate;
    var szip = req.body.shipzip;
    var values1 = [null,fname, lname, uphone, uadd, ucity, ustate, uzip, sfname, slname, sadd, scity, sstate, szip, uorderdate,utypeoforder];
    con.query(sql, [values1], function (err, result) {
      if (err) console.log(err);
      console.log("Number of records inserted: " + result.affectedRows);
    });
  }else{
    var values2 = [null,fname, lname, uphone, uadd, ucity, ustate, uzip, fname, lname, uadd, ucity, ustate, uzip, uorderdate,utypeoforder];
    con.query(sql, [values2], function (err, result) {
      if (err) console.log(err);
      console.log("Number of records inserted: " + result.affectedRows);
    });
  }
  res.redirect('adding');
});

app.get("/finding",function(req,res){
  res.render('finding',{searchQuery: null, loggedin: login});
});

app.post("/found",function(req,res){
  var namesearch = req.body.searchlast;
  var datesearch = req.body.searchdate;
  if(namesearch != ""){
    con.query("SELECT * FROM customers WHERE last_name = '" + namesearch + "'ORDER BY date_ordered DESC", function(err, results, fields) {
      if (err) console.log(err);
      res.render('finding', {
        searchQuery: results,
        loggedin: login
      });
    });
  }else if(datesearch != ""){
    con.query("SELECT * FROM customers WHERE date_ordered = '" + datesearch + "'ORDER BY date_ordered DESC", function(err, results, fields) {
      if (err) console.log(err);
      res.render('finding', {
        searchQuery: results,
        loggedin: login
      });
    });
  }
});

app.listen(3000, function() {
  console.log("Server started on port:3000");
});
