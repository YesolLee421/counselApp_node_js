var mongoose = require('mongoose');
var url = "mongodb://127.0.0.1:27017" // default port

mongoose.connect(url); // test db 세팅
var db = mongoose.connection;

db.on('error',function(){
    console.log('db 연결 실패');
});
db.once('open',function(){
    console.log('연결 성공');
});

// schema 생성
var user = mongoose.Schema({
    name: 'string',
    id: 'string',
    pw: 'string',
    type: 'number'
});

// 정의된 스키마를 객체처럼 사용하기 위해 model() 함수로 컴파일
var user_model = mongoose.model('Schema', user);

