var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema=new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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

var User = mongoose.model('User', userSchema);

module.exports = User;