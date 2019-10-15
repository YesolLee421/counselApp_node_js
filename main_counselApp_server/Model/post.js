const mongoose = require('mongoose');
var postSchema = new mongoose.Schema({
    userid: String,
    title: String,
    content: String,
    date_original: Date,
    date_lastChanged: Date,
    hit: Number,
    comment: Number
    // 추후 사진, keyword, comment 내용 등 추가
});

// userSchema.methods.comparePassword = function(inputPassword, callback){
//     if(inputPassword === this.pw){
//         callback(null, true);
//     }else{
//         callback('error');
//     }
// };
module.exports = mongoose.model('posts',postSchema);