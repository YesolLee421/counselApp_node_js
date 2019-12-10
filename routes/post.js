const express = require('express')
const router = express.Router();
const User = require('../Model/User');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Post = require("../Model/post");
const path = require('path');
const upload = require('./uploads');

// 이미지 하나 올리는 라우터 실험
router.post('/testUpload', upload.single('file'), async (req, res, next)=>{
    try{
        console.log(req.file);
        return res.status(201).json(`storage location is  ${req.hostname} ${req.file.path}`);

    }catch(e){
        console.log(e);
        return next(e);
    }
});

// 전체 게시물 확인
router.get('/', (req, res, next)=>{
    try{
        Post.find(async (err, posts)=>{
            if(err){
                console.error(err);
                return next(err);
            }
            if(posts){
                return res.status(200).res.json(posts);
            }else{
                console.log('게시물 없음');
                return res.json('게시물 없음');
            }
        });

    }catch(error){
        console.error(error);
        return next(error);
    }
});


// 개별 게시물 확인
router.get('/:id', (req, res, next)=>{
// const id_obj = ObjectId(req.params.id); //findById 대신 findOne을 쓰니 ObjectId로 변환 안해도 됨
    try{
        Post.findOne({_id: req.params.id}, async function(err, post){
            if(err){
                console.error(err);
                return next(err);
            }
            if(post){
                // 추후 조회수 올리는 부분 넣기
                const { title } = post;
                console.log(`${title} 클릭`)
                req.flash(`${title} 클릭`);
                return res.status(200).res.json(post);
                
            }else{
                console.log('게시물 없음');
                return res.json('게시물 없음');
            }
            
        });
        
    } catch(error){
        console.error(error);
        return next(error);
    }
});


// 게시물 작성
router.post('/',isLoggedIn,  (req, res, next)=>{
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
        res.status(201).json(post._id);
         //res.redirect('/auth/login'); // 성공 시 리다이렉션
    });
});



// 게시물 수정
router.put('/:id',isLoggedIn, (req, res, next)=>{
    // req.params와 req.body의 차이는 뭘까? 아 왠지 params는 url에 나오는 정보인것 같다. body는 url에 안나오니까.
    try{
        Post.findOneAndUpdate(
            {_id: req.params.id},
            { title: req.body.title, content:req.body.content, date_lastChanged: Date.now()}, {returnNewDocument : true},  async function(err, post){
            if(err){
                console.error(err);
                return next(err);
            }else{
                console.log(`${req.body.title} 수정 완료`);
                return res.status(203).res.json(req.params.id); // 추후 id 전송->성공 시 바로 get으로 게시물 보여주도록
            }
        });
    } catch(error){
        console.error(error);
        return next(error);
    }
});

// 게시물 삭제
router.delete('/:id', isLoggedIn, (req, res, next)=>{
    try{
        Post.findOneAndDelete(
            {_id: req.params.id},
            async function(err){
            if(err){
                console.error(err);
                return next(err);
            }else{
                console.log('게시물 삭제 완료');
                return res.status(200).res.json("게시물 삭제 완료"); // 추후 id 전송->성공 시 바로 get으로 게시물 보여주도록
            } 
        });
    } catch(error){
        console.error(error);
        return next(error);
    }
});

module.exports = router;