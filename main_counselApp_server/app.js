// app.js

// [LOAD PACKAGES]
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
var db = require('./db.js');



// [CONFIGURE ROUTER]
//var router = require('./routes')(app, User)
//var router = require('./routes/index')(app, User);
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/register',registerRouter);
app.use('/login',loginRouter);

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});

// Connect to MongoDB Server
db();

// User Model define
var User = require('./Model/User.js');
