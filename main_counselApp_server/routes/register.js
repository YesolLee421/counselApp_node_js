const express = require("express");
const User = require("../Model/User");
const registerRouter = express.Router();

// Register : POST
registerRouter.post('/', function(req, res){
            // req err처리 필요 + req id 검사해서 중복안되게 처리 필요

            var userid = req.body.id;
            var username = req.body.name;
    
            User.findOne({id: userid}, function(err, user){
                if(err){
                    console.error(err);
                    return next(err);
                }
                if(user){
                    res.send(userid+"는 중복된 id입니다.");
                    console.log(userid+"는 중복된 id입니다.")
                }else{
                    var user = new User();
                    user.id = userid;
                    //password 암호화 필요
                    user.pw = req.body.pw;
                    user.salt = "";
                    user.name = username;
                    user.type = req.body.type;
        
                    user.save(function(err, user){
                        if(err) return console.error(err);
                        console.log(username+"저장 성공");
                        res.send(username+"저장 성공")
                            .redirect('/login'); // 성공 시 리다이렉션
                        
                    });
                }
            });
});

// 회원탈퇴 추후 구현


module.exports = registerRouter;