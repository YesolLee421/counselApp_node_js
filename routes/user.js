const express = require('express');
const router = express.Router();
const User = require('../Model/User');
const Expert = require('../Model/expert');
const fs = require('fs'); //이미지 파일 업로드

//모든 상담사(expert) 조회
router.get('/experts', function(req, res, next){
    try{
        Expert.find({isValidated: true}, async(err, experts)=>{
            if(err){
                console.error(`err:${err}`);
                return next(err);
            }
            if(experts){
                console.log(experts);
                return res.json(experts);
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

// 아이디에 해당하는 유저 조회 (마이페이지)
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

// 아이디에 해당하는 상담사 조회 (상담사 프로필)
router.get('/:id/expert', function(req, res, next){
    try{
        Expert.findOne({_id: req.params.id}, async function(err, expert){
            if(err){
                console.error(err);
                return next(err);
            }
            if(expert){
                // 추후 조회수 올리는 부분 넣기
                console.log(expert);
                return res.json(expert);
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
router.put('/:id/expert', (req, res, next)=>{
    const { name_formal, about, belongTo, education, career, certificate, major, portrait } = req.body; // 상담사 정보  관련

    // 여기서 portrait 사진 업로드 및 저장->그 경로를 

    // req.params와 req.body의 차이는 뭘까? 아 왠지 params는 url에 나오는 정보인것 같다. body는 url에 안나오니까.
    try{
        Expert.findOneAndUpdate(
            {_id: req.params.id},
            { name_formal: name_formal, about:about, belongTo: belongTo, education:education, career: career, 
            certificate: certificate, major: major}, {returnNewDocument : true},  async function(err, expert){
            if(err){
                console.error(err);
                return next(err);
            }else{
                console.log(`${name_formal} 수정 완료`);
                return res.json(req.params.id); // 추후 id 전송->성공 시 바로 get으로 게시물 보여주도록
            }
        });
    } catch(error){
        console.error(error);
        return next(error);
    }
});



module.exports = router;