var apiRouter= require('express').Router();
var User = require('../models/user');
var cache = require('../arch/abstract/CacheAbstract');

apiRouter.get('/prova',function(req,res,next){
    console.log("Prova riuscita");
    next();
});

apiRouter.get('/me',function(req,res,next){
    User.findOne({_id :  req.session.passport.user },function(err, user) {
        if(err){
            console.log(err);
        }
        var userJson={
            name: user.name,
            surname: user.surname,
            age:user.born_date,
            email:user.local.email
        };


        res.json(userJson);
    });

});


apiRouter.get('/username',function(req,res,next){

    if(req.query.id!=null){

    User.findOne({_id :  req.query.id },function(err, user) {
        if(err){
            console.log(err);
        }
        var userJson={
            name: user.name,
            surname: user.surname,
            age:user.born_date,
            email:user.local.email
        };


        res.json(userJson);
    });
  }else{
    res.json("add an id");
  }


});

apiRouter.get('/userslist',function(req,res,next){
  var CONNECTEDUSER = 'connected-user:';
  cache.keys(function (keys) {
    var chiavi = keys.filter(function(key) {
      return key.match(CONNECTEDUSER);
    });
    if(chiavi.length>0){
      cache.values(chiavi, function(values) {
          values=values.map(function(value){
            return JSON.parse(value);
          });
          res.json(values);
      });
    }else{
      res.json([]);
    }
  });
});
/*apiRouter.get('/logout',function(req,res,next){
  var LOGGEDUSER = 'sess:'+req.sessionID;
  cache.remove(LOGGEDUSER);
  res.redirect("/login");

});*/


apiRouter.get('/connectedUser',function(req,res,next){
    User.findOne({_id :  req.session.passport.user },function(err, user) {
        if(err){
            console.log(err);
            res.status(404).end();
        }
        var userJson={
            name: user.name,
            surname: user.surname,
            age:user.born_date,
            email:user.local.email
        };


        res.json(userJson);
    });

});

exports.api=apiRouter;
