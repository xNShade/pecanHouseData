var express=require('express');
var passport=require('passport');
var addingRouter=express.Router();
var a_router=function(con){
    addingRouter.route("/")
        .post(function(req,res){
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
        })
        .get(function(req,res){
          if(!req.user){
            res.redirect('/login');
          }else{
            res.render('adding',{});
          }
        });
        return addingRouter;
};
module.exports=a_router;
