const express = require('express');
const path = require('path');
const app = express();
const db = require('./db.js'); //db 불러오기
const route = require('./route.js'); // db 사용하는 곳
const path = require('path');

// 웹사이트 레이아웃 만드는 부분
//app.set('view engine','pug');
//app.set('views', path.join(__dirname, 'html'));

db(); // db 실행

//app.use(express.static(path.join(__dirname, 'html')));
app.use('/',route);

// 에러처리 부분, 8080 웹서버 포트
app.listen(8080, () =>{
    console.log('Express App on webserver port 8080.');
});



// var mongoose = require('mongoose');
// var url = "mongodb://127.0.0.1:27017" // default port

// mongoose.connect(url); // test db 세팅
// var db = mongoose.connection;

// db.on('error',function(){
//     console.log('db 연결 실패');
// });
// db.once('open',function(){
//     console.log('연결 성공');
// });

// // schema 생성
// var user = mongoose.Schema({
//     name: 'string',
//     id: 'string',
//     pw: 'string',
//     type: 'number'
// });

// // 정의된 스키마를 객체처럼 사용하기 위해 model() 함수로 컴파일
// var user_model = mongoose.model('Schema', user);

