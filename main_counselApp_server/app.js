// app.js

// [LOAD PACKAGES]
const createError = require('http-errors');
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const db = require('./db.js');

const session = require('express-session'); // 세션
const passport = require('passport'); // passport 미들웨어
const passportConfig = require('./lib/passport'); // 직접 만든 passport미들웨어

// [CONFIGURE ROUTER]
//var router = require('./routes')(app, User)
var homeRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session( // 세션 활성화 + 설정
    {
        secret: 'dsa09feow9f2if0dif29',
        resave: true,
        saveUninitialized: false
    }
));
app.use(passport.initialize()); //passport 구동
app.use(passport.session()); // session 연결

// Connect to MongoDB Server
db();

passportConfig();

app.use('/',homeRouter);
app.use('/register',registerRouter);
app.use('/login',loginRouter);

//http error handler
// 404 error
app.use((req, res, next)=>{
    res.status(400).send('404 Not Found');
    //next(createError(404));
});
// server error (5**)
app.use((err, req, res, next)=>{
    console.log(`Server Error:${err}`);
    res.status(500).send('Server Error');
})



// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;



// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});


// User Model define
// var User = require('./Model/User.js');
