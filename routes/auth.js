const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../Model/User');
const Expert = require('../Model/expert');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

// local register
router.post('/register', isNotLoggedIn, async (req, res, next)=>{
    const { email, pw, name, type } = req.body;

    try{
        User.findOne({email:email}, async function(err, user){
            if(err){
                console.error(err);
                return next(err);
            }
            const hash = await bcrypt.hash(pw, 12);
            if(user){
                req.flash(email+"는 중복된 id입니다.");
                res.json(email+"는 중복된 id입니다.");
                console.log(email+"는 중복된 id입니다.")
            }else{
                const user = new User();
                user.email = email;
                user.pw = hash;
                user.name = name;
                user.type = type;
    
                user.save(async function(err, user){
                    if(err) return console.error(err);
                    console.log("일반 사용자 저장 성공");

                    if(type==2){
                        const expert = new Expert();
                        expert.uid = user._id;
                        expert.name_formal = "실명 입력";
                        expert.about = "";
                        expert.belongTo = "";
                        expert.education = "";
                        expert.career = "";
                        expert.certificate = "";
                        expert.major = "";
    
                        expert.save(function(err, expert){
                            if(err){
                                console.error(err);
                                return next(err);
                            }
                            console.log("전문가 생성 성공");
                            return res.status(201).json(expert._id);
                             //res.redirect('/auth/login'); // 성공 시 리다이렉션
                        });
                    }else{
                        return res.status(201).json(user._id);
                    }
                });
            }
        });    
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
            console.error('loginError', `${info.message}: 해당 유저 없음`);
            return res.status(403).json(info.message); //res.redirect('/auth/login');
            // 안드로이드에서 json을 받길래 json으로 수정함
        }
        return req.login(user, (loginError)=>{ //req.user에 저장
            if(loginError){ 
                console.error(loginError);
                return next(loginError);
            }
            console.log('로그인??',req.isAuthenticated());                        
            console.log(`login success: ${req.isAuthenticated()}`);

            return res.status(200).json(`${user.name} login success`); //res.redirect('/');
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



