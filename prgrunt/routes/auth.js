module.exports = function(app, passport) {
    app.get('/login', function(req, res) {
        res.render('pages/index', {main: '../partials/login'});
    });
    
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/chat', // redirect to the secure profile section
        failureRedirect : '/error' // redirect back to the signup page if there is an error
        //,failureFlash : true // allow flash messages
    }));
    
    app.get('/register',function(req, res) {
        res.render('pages/index', {main: '../partials/register'});
    });
    
    app.post('/register', passport.authenticate('local-register', {
        successRedirect : '/login', // redirect to the secure profile section
        failureRedirect : '/error' // redirect back to the signup page if there is an error
        //,failureFlash : true // allow flash messages
    }));
}
    
