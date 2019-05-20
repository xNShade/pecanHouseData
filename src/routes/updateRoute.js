var express=require('express');
var passport=require('passport');
var updateRouter=express.Router();
var u_router=function(con){
    updateRouter.route("/")
        .post(function(req,res){
          var id = req.body.id;
          var fname = req.body.firstname;
          var lname = req.body.lastname;
          var uphone = req.body.phone;
          var uadd = req.body.address;
          var ucity = req.body.city;
          var ustate = req.body.state;
          var uzip = req.body.zip;
          var sfname = req.body.shipfirstname;
          var slname = req.body.shiplastname;
          var sadd = req.body.shipaddress;
          var scity = req.body.shipcity;
          var sstate = req.body.shipstate;
          var szip = req.body.shipzip;
          var uorderdate = req.body.order_date;
          var utypeoforder = req.body.typeoforder;
          con.query("UPDATE customers SET first_name = '" + fname + "', last_name = '" + lname + "',phone = '" +
        uphone + "',billing_add = '" + uadd + "',billing_city = '" + ucity + "',billing_state = '" + ustate +
      "',billing_zip = '" + uzip + "',ship_to_first = '" + sfname + "',ship_to_last = '" + slname + "',ship_add = '" +
      sadd + "',ship_city = '" + scity + "',ship_state = '" + sstate + "',ship_zip = '" + szip + "',date_ordered = '" +
      uorderdate + "',order_from = '" + utypeoforder + "' WHERE _id = '" + id + "';");
      res.redirect('/finding');
        })
        .get(function(req,res){
          if(!req.user){
            res.redirect('/login');
          } else {
            res.render('update',{});
          }
        });
      return updateRouter;
    };
module.exports=u_router;
