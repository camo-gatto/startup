
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');
var User = require('./models/user');
var gatto = new User ({
    name: 'Chris',
    username: 'Chris',
    password: 'password'
});

gatto.commaName(function(err,name){
    console.log("Your new is ");
    gatto.print();
});
 gatto.print();
/*
gatto.save(function(err){
    if(err) throw err;
    console.log("User is saved");
});
*/