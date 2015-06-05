module.exports = function(app, passport) {
    app.get('/login', function(req, res) {
        res.render('pages/index', {main: '../partials/login'});
    });
    
    /*
    app.post('/login', function(req, res) {
         /*req.body Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as body-parser and multer
        
        console.log('/login', req.body);
        res.json(req.body);
        
        
        
    });
*/

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/chat', // redirect to the secure profile section
        failureRedirect : '/error' // redirect back to the signup page if there is an error
        //,failureFlash : true // allow flash messages
    }));

    
    
    
}