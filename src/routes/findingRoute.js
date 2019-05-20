var express=require('express');
var passport=require('passport');
var findingRouter=express.Router();
var f_router=function(con){
    findingRouter.route("/")
      .post(function(req,res){
        if(req.body.updatepress != undefined){
          var idToUpdate = req.body.updatepress;
          con.query("SELECT * FROM customers WHERE _id = " + idToUpdate, function(err, results, fields){
            if(err) console.log(err);
            res.render('update',{ recordChange: results});
          });
        } else {
        var namesearch = req.body.searchlast;
        var datesearch = req.body.searchdate;
        if(namesearch != ""){
          con.query("SELECT * FROM customers WHERE last_name = '" + namesearch + "'ORDER BY date_ordered DESC", function(err, results, fields) {
            if (err) console.log(err);
            res.render('finding', {
              searchQuery: results
            });
          });
        }else if(datesearch != ""){
          con.query("SELECT * FROM customers WHERE date_ordered = '" + datesearch + "'ORDER BY date_ordered DESC", function(err, results, fields) {
            if (err) console.log(err);
            res.render('finding', {
              searchQuery: results
            });
          });
        }
      }
      })
      .get(function(req,res){
        if(!req.user){
          res.redirect('/login');
        }else{
          res.render('finding',{searchQuery: null});
        }
      });
    return findingRouter;
};
module.exports=f_router;
