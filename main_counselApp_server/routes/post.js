const express = require('express')
const router = express.Router();
const User = require('../Model/User');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Post = require("../Model/post");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// 개별 게시물 확인
router.get('/:id', (req, res, next)=>{

    const id_obj = ObjectId(req.params.id);
        try{
            Post.findById(id_obj, async function(err, post){
                if(err){
                    console.error(err);
                    return next(err);
                }
                if(post){
                    const { title } = post;
                    console.log(`${title} 클릭`)
                    req.flash(`${title} 클릭`);
                    return res.json({success:true, data: post});
                    
                }else{
                    console.log('게시물 없음');
                    return res.json({success:false, message:'게시물 없음'});
                }
                
            });
            
        } catch(error){
            console.error(error);
            return next(error);
        }
});


// 게시물 작성
router.post('/',  (req, res, next)=>{
    const {commenter, title, content} = req.body;
    
    const post = new Post();
    // post.userid = userid;
    post.commenter = commenter;
    post.title = title;
    post.content = content;
    // date(origin, last), hit, comment는 default값 있음
        
    post.save(function(err, post){
        if(err){
            console.error(err);
            return next(err);
        }
        console.log(title+" 생성 성공");
        res.status(201).json(title+" 생성 성공");
         //res.redirect('/auth/login'); // 성공 시 리다이렉션
    });
});

// 게시물 수정
router.put('/:postid', (req, res, next)=>{
    const id_obj = ObjectId(req.params.id);
});

// 게시물 삭제
router.delete('/:postid', (req, res, next)=>{

    const id_obj = ObjectId(req.params.id);

});

module.exports = router;