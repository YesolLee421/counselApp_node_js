const express = require("express");
const User = require("../Model/User");
const loginRouter = express.Router();

// Login : GET
loginRouter.get('/',function(req, res){
    var userid = req.body.id;
    var username = req.body.name;

    User.findOne({id: userid}, function(err, user){
        if(err){
            console.error(err);
            return next(err);
        }
        if(user){
            if(req.body.pw==user.pw){
                res.send(username+" 님, 환영합니다.");
                console.log(userid+" 로그인 성공")
            }else{
                res.send("비밀번호를 다시 확인해 주십시오");
                console.log(userid+" 비밀번호 불일치");
            }

        }else{
            res.send("등록된 이메일이 아닙니다.");
            console.log("미등록 이메일");
        }
    });
});

module.exports = loginRouter;
