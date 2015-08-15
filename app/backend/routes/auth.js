module.exports = function(app, passport) {
    app.get('/login', function(req, res) {
        console.log("On login route");
        res.render('pages/index', {main: '../partials/login'});
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/postlogin', // redirect to the secure profile section
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

    app.get('/logout', function(req, res) {
        console.log("/logout");
        req.logout();
        res.redirect('/login');
        //res.status(200).json();
    });
}
