'use strict';
var clc = require('cli-color');
var info = clc.blue;
var infoBold = clc.blue.bold;
var error = clc.red;
var errorBold = clc.red.bold;
var router = require('express').Router();

router.use(function(req, res, next) {
    console.log(infoBold(req.method), info(req.url));
    next(); 
});


router.get('/', function(req, res) {
    res.send('im the home page!');  
});

router.get('/private/*', isLoggedIn, function(req,res,next){
    console.log(console.log("Is Logged"));
    next();
});

/*
router.get('/private/chat', function(req, res, next) {
    console.log(infoBold('Middleware Router:'), info(req.method + ' ' + req.url));
    next();
});
*/

router.get('/error', function(req, res, next) {
    next(new Error('Errore!'));
});

router.use(function(err, req, res, next) {
    console.log(errorBold('Error Handler'), error(req.method + ' ' + req.url));
//    res.status(500).send({ error: 'Something blew up!' });
    res.status(500).render('pages/index', {main: '../partials/error500'});
});

function isLoggedIn(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }
    console.log("Isn't logged");
    res.redirect('/login');
}


module.exports = router;
    


