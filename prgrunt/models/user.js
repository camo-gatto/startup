var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema=new Schema({
  name: String,
  local: {
    email: String, password: String
  },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});
                          
userSchema.methods.commaName= function(){
    this.name ="'"+this.name+"'";
    return this.name;
}

userSchema.methods.print=function(){
    console.log("ciaoooo");
}
userSchema.methods.validPassword = function(password){
    return password == this.local.password;
}

var User = mongoose.model('User', userSchema);

module.exports = User;