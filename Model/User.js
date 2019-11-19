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

// ```OverwriteModelError: Cannot overwrite `users` model once compiled.``` -> 모듈화할 때 새로 model.~ 안하고 그냥 userSchema 넣어줌
module.exports =  mongoose.models.users || mongoose.model('users',userSchema);
// module.exports =userSchema;