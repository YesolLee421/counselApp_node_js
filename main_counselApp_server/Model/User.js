const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    id: String,
    pw: String,
    salt: String,
    name: String,
    type: Number
});

userSchema.methods.comparePassword = function(inputPassword, callback){
    if(inputPassword === this.pw){
        callback(null, true);
    }else{
        callback('error');
    }
};
module.exports = mongoose.model('users',userSchema);