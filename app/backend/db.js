var cnf= require('./config/conf.js');
var mongoose = require('mongoose');
mongoose.connect(cnf.mongo.dbname);
var User = require('./models/user');
var gatto = new User ({
  name: 'Michele',
  local: {
    email: 'michelevale@gmail.com', password: '2222'
  },
});

/*gatto.commaName(function(err,name){
    console.log("Your new is ");
    gatto.print();
});
 gatto.print();*/
gatto.save(function(err){
    if(err) throw err;
    console.log("User is saved");
});
