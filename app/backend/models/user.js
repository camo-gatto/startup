var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema=new Schema({
    name: String,
    surname: String,
    born_date:Date,
    local: {
        email: String, password: String
    },
    admin: Boolean,
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

userSchema.methods.matchPassoword = function(password, confirmPassword){
    return password == confirmPassword;
}
userSchema.methods.matchEmail = function(email, confirmEmail){
    return email == confirmEmail;
}



userSchema.methods.validPassword = function(password){
    return password == this.local.password;
}

var User = mongoose.model('User', userSchema);

module.exports = User;