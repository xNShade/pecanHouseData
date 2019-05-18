var mysql = require('mysql');
require('dotenv').config();
var con = mysql.createConnection({
  host: process.env.DB_HOST, // ip address of server running mysql
  user: process.env.DB_USER, // user name to your mysql database
  password: process.env.DB_PASS, // corresponding password
  database: process.env.DB_DATABASE
});

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
module.exports=function(){
    passport.use(new LocalStrategy({
        usernameField:'uname',
        passwordField:'upass'
    }, function(username, password, done) {
      con.query("SELECT * FROM users WHERE username = " + con.escape(username) + "AND user_password = " + con.escape(password), function(err,results,field){
        if(err) console.log(err);
        if(results == ""){
          console.log("Incorrect login");
          done(null,false);
        } else {
          console.log("Login successful");
          var user = results;
          done(null,user);
        }
      });
    }));
  };
