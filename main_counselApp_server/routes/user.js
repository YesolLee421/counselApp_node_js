const express = require('express');
const router = express.Router();
const User = require('../Model/User');

//모든 상담사(expert) 조회
router.get('/experts', function(req, res, next){
    try{
        User.find({type:2}, async(err, users)=>{
            if(err){
                console.error(`err:${err}`);
                return next(err);
            }
            if(users){
                console.log(users);
                return res.json(users);
            }else{
                console.log('상담사 없음');
                return res.json('상담사 없음');
            }
        });
    }catch(error){
        console.error(`catch error: ${error}`);
        return next(error);
    }
});

// 아이디에 해당하는 유저 조회
router.get('/:id', function(req, res, next){
    try{
        User.findOne({_id: req.params.id}, async function(err, user){
            if(err){
                console.error(err);
                return next(err);
            }
            if(user){
                // 추후 조회수 올리는 부분 넣기
                console.log(user);
                return res.json(user);
            }else{
                console.log('유저 없음');
                return res.status(404).json('유저 없음');
            }
        });
    } catch(error){
        console.error(error);
        return next(error);
    }
});

// 유저 정보 입력: 추후 상담사 정보 테이블 확정 후 코딩
router.post('/:id', (req, res, next)=>{
    // const {introduction, } = req.body; // 상담사 정보  관련
    
    // const user = new User();
    // // user.userid = userid;
    // user.commenter = commenter;
    // user.title = title;
    // user.content = content;
    // // date(origin, last), hit, comment는 default값 있음
        
    // user.save(function(err, user){
    //     if(err){
    //         console.error(err);
    //         return next(err);
    //     }
    //     console.log(name+" 생성 성공");
    //     res.status(201).json(user._id);
    //      //res.redirect('/auth/login'); // 성공 시 리다이렉션
    // });
})



module.exports = router;