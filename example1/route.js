const express = require('express');
const router = express.Router(); // express 라우터 분리
const path = require('path');
const User = require('./user.js');

//app 대신 라우터에 연결, sendfile 대신 render
router.get('/', (request, response)=>{
    response.render('about');
});

router.get('/:name', (request, response)=>{
    User.find({name: request.params.name}, (err, user)=>{
        response.render('main', {user: user});
    });
});

router.post('/user', (req, res)=>{
    User.insertMany({id: req.body.id, pw: req.body.pw,
         salt: salt, name: req.body.name, type: req.body.type},(err, result)=>{
             if(err){
                 return next(err);
             }
             res.json(result);
         });
});
//모듈로 만드는 부분
module.exports = router;