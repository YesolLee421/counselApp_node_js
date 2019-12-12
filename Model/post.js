const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types: ObjectId } = Schema;
const postSchema = new Schema({
    userid:{
        type: ObjectId,
        ref: 'users'
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
    hit: { //조회수
        type: Number,
        default: 0,
    },
    like: { // 격려
        type: Number,
        default: 0,
    },
    comments: { //댓글 수
        type: Number,
        default: 0,
    },
    files: {
        type: String
    }
    // 추후 사진, keyword, comment 내용 등 추가
    // 만약 사진 여러 장 추가하려면 사진 객체를 배열로 넣어야 할 듯
});


module.exports = mongoose.model('posts',postSchema);