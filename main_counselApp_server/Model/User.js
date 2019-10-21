const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    id:{
        type: String,
        required: true,
        unique: true,
    },
    pw: {
        type: String,
        required: true,
    },
    salt: String,
    name: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required:true,
    },
    createdAt : {
        type: Date,
        default: Date.now,
    },
});

userSchema.methods.comparePassword = function(inputPassword, callback){
    if(inputPassword === this.pw){
        callback(null, true);
    }else{
        callback('error');
    }
};
module.exports = mongoose.model('users',userSchema);