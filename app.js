// app.js
// [LOAD PACKAGES]

const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const db = require('./db.js');
const logger = require('morgan');
const flash = require('connect-flash');
const multer = require('multer');
require('dotenv').config();

const session = require('express-session'); // 세션
const passport = require('passport'); // passport 미들웨어
const passportConfig = require('./passport'); // passport/index

// file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
    // limits: { //크기 제한
    //     fileSize: 5*1024*1024
    // },
});

//will be using this for uplading
const upload = multer({ storage: storage });

// [CONFIGURE ROUTER]
const indexRouter = require('./routes/'); 
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

// [CONFIGURE APP TO USE bodyParser]
app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));
app.use(bodyParser.json());

app.use(session( // 세션 활성화 + 설정
    {
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    }
));
app.use(passport.initialize()); //passport 구동
app.use(passport.session()); // session 연결
app.use(flash());

// Connect to MongoDB Server
db();

// passport configue
passportConfig(passport);



// routers
app.use('/',indexRouter);
app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);
// app.use('/register',registerRouter);
// app.use('/login',loginRouter);

// [CONFIGURE SERVER PORT]
const port = process.env.PORT || 8080;
app.set('port', port);

// http error handler
// 404 error
app.use((err, req, res, next)=>{
    console.log(`${err}`);
    res.status(400).send(`404 Not Found: ${err}`);
    //next(createError(404));
});
// server error (5**)
app.use((err, req, res, next)=>{
    console.log(`Server Error:${err}`);
    res.status(500).send('Server Error');
})

// [RUN SERVER]
const server = app.listen(port, function(){
 console.log("Express server has started on port " + port);
});

module.exports = app, upload;
