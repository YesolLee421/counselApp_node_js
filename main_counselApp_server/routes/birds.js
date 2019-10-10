var express = require('express');
var router = express.Router();
var User = require('../Model/User.js');

//모든 유저 조회
router.get('/users', function(req, res, next){
    next();
})
// 아이디에 해당하는 유저 조회
router.get('/users/:id', function(req, res){
    console.log(req.params.name);
});

router.get('/login', function(req, res, next){
    next();
});

// 회원가입
router.post('/register', function(req, res, next){
    // req err처리 필요 + req id 검사해서 중복안되게 처리 필요
    var userid = req.body.id;
    var password = req.body.pw;

    User.find({id: req.body.id}, function(err, user){
        if(err){
            console.error(err);
            return next(err);
        }
        if(user){
            res.json(req.body.id+"는 중복된 id입니다.");
            console.log(req.body.id+"는 중복된 id입니다.")
        }else{
            var user = new User();
            user.id = req.body.id;
            //password 암호화 필요
            user.password = req.body.pw;
            user.salt = "";
            user.name = req.body.name;
            user.type = req.body.type;

            user.save(function(err, user){
                if(err) return console.error(err);
                console.dir(user);
                console.log(req.body.name+"저장 성공")
            });
        }
    })

    next();
});

module.exports = router;