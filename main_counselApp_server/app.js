// app.js

// [LOAD PACKAGES]
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
var db = require('./db.js');

const session = require('express-session'); // 세션
const passport = require('passport'); // passport 미들웨어
const passportConfig = require('./lib/passport'); // 직접 만든 passport미들웨어

// [CONFIGURE ROUTER]
//var router = require('./routes')(app, User)
//var router = require('./routes/index')(app, User);
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session( // 세션 활성화 + 설정
    {
        secret: 'dajfiadfa',
        resave: true,
        saveUninitialized: false
    }
));
app.use(passport.initialize()); //passport 구동
app.use(passport.session()); // session 연결

// Connect to MongoDB Server
db();

passportConfig();

app.use('/register',registerRouter);
app.use('/login',loginRouter);

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;



// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});


// User Model define
// var User = require('./Model/User.js');
