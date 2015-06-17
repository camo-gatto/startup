'use strict';
var clc = require('cli-color');
var info = clc.blue;
var infoBold = clc.blue.bold;
var error = clc.red;
var errorBold = clc.red.bold;

var express = require('express');
// get an instance of router
var router = express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {
    // log each request to the console
    console.log(infoBold(req.method), info(req.url));
    // continue doing what we were doing and go to the route
    next(); 
});


// home page route (http://localhost:8080)
router.get('/', function(req, res) {
    res.send('im the home page!');  
});

// about page route (http://localhost:8080/about)
router.get('/about', function(req, res, next) {
    //it must call next() to pass control to the next middleware
    //may invoke next('route') to bypass the remaining route callback(s). 
    next();
},function(req, res) {
    res.send('im the about/next page!');
});
router.get('/chat',isLoggedIn, function(req, res, next) {
    console.log(infoBold('Middleware Router:'), info(req.method + ' ' + req.url));
    next();
});

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
    res.redirect('/login');
}


module.exports = router;
    


