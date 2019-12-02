const mongoose = require('mongoose');
const { Schema } = mongoose;
const expertSchema = new Schema({
    uid:{
        type: String,
        required: true,
        unique: true,
    },
    name_formal: {
        type: String,
        required: true,
    },
    about: {
        type: String,
    },
    belongTo: {
        type: String,
        default: "소속 없음",
    },
    education: {
        type: String,
    },
    career: {
        type: String,
    },
    certificate: {
        type: String,
    },
    major : {
        type: String,
    },
    isValidated: {
        type: Boolean,
        default: true, //추후 기본값 false로 바꾸고 인증절차
    },
    level: {
        type: Number,
        default: 1,
    },
    portrait:{
        type: String // 프로필 사진 경로
    }
});

module.exports = mongoose.model('experts',expertSchema);
