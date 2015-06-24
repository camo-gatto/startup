var apiRouter= require('express').Router();
var User = require('../models/user');

apiRouter.get('/prova',function(req,res,next){
    console.log("Prova riuscita");
    next();
});

apiRouter.get('/username',function(req,res,next){
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

apiRouter.get('/connectedUser',function(req,res,next){
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

exports.api=apiRouter;