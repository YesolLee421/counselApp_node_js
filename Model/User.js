const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongooseParanoidPlugin = require('mongoose-paranoid-plugin');
mongoose.plugin(mongooseParanoidPlugin, { field: 'deleted_at' })

const userSchema = new Schema({
        email:{
            type: String,
            required: true,
            unique: true,
        },
        pw: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: Number,
            required:true,
        }
    }, {
        paranoid: true, // deletedAt
        timestamps: true // createdAt, updatedAt
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