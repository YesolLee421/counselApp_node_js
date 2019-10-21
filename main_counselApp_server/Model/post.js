const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: ObjectId } = Schema;
const postSchema = new Schema({
    userid:{
        type: ObjectId,
        required: true,
        unique: true,
    },
    // 추후 mongoose.populate로 유저아이디로 유저 객체.이름 찾아오기
    commenter: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: String,
    
    date_original : {
        type: Date,
        default: Date.now,
    },
    date_lastChanged : {
        type: Date,
        default: Date.now,
    },
    hit: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Number,
        default: 0,
    },
    // 추후 사진, keyword, comment 내용 등 추가
});

module.exports = mongoose.model('posts',postSchema);