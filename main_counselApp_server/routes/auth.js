const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../Model/User');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

// local register
router.post('/register', isNotLoggedIn, async (req, res, next)=>{
    const { id, pw, name, type } = req.body;
    try{
        User.findOne({id:id}, async function(err, user){
            if(err){
                console.error(err);
                return next(err);
            }
            const hash = await bcrypt.hash(pw, 12);
            if(user){
                req.flash(id+"는 중복된 id입니다.");
                res.json(id+"는 중복된 id입니다.");
                console.log(id+"는 중복된 id입니다.")
            }else{
                const user = new User();
                user.id = id;
                //password 암호화 필요
                
                user.pw = hash;
                user.salt = "";
                user.name = name;
                user.type = type;
    
                user.save(function(err, user){
                    if(err) return console.error(err);
                    console.log(name+"저장 성공");
                    res.status(201).json(name+"저장 성공")
                    //res.redirect('/auth/login'); // 성공 시 리다이렉션
                    
                });
            }
        });

        // const exUser = User.findOne({id:id});
        // console.log(exUser);
        // if(exUser){
        //     req.flash('registerError', '중복된 이메일입니다.');
        //     return res.redirect('/auth/register');
        // }
        // const hash = await bcrypt.hash(pw, 12);
        // const newUser = new User({ id:id, pw:hash, name:name, type:type });
        // await newUser.save();
        // console.log(name + "register success");
        // return res.redirect('/');
       
        // user.save(function(err, user){
        //     if(err) return console.error(err);
        //     console.log(username+"저장 성공");
        //     res.send(username+"저장 성공")
        //         .redirect('/login'); // 성공 시 리다이렉션
        // });
        
    } catch(error){
        console.error(error);
        return next(error);
    }
});

// local login
router.post('/login', isNotLoggedIn, (req, res, next)=>{
    passport.authenticate('local', (authError, user, info)=>{ //(에러, 성공, 실패)
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){ // 유저 없음
            req.flash('loginError', info.message);
            return res.json(info.message); //res.redirect('/auth/login');
            // 안드로이드에서 json을 받길래 json으로 수정함
        }
        return req.login(user, (loginError)=>{ //req.user에 저장
            if(loginError){ 
                console.error(loginError);
                return next(loginError);
            }
                        
            console.log('login success');
            return res.json(`${user.name} login success`); //res.redirect('/');
            //return res.json(user);
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에 붙임(?)
});

// logout
router.get('/logout', isLoggedIn, (req, res)=>{
    req.logout();
    req.session.destroy();
    console.log('logout success');
    res.json('logout success');
    //res.redirect('/');
});


module.exports = router;



