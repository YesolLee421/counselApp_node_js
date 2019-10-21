const express = require("express");
const User = require("../Model/User");
const loginRouter = express.Router();
const passport = require('passport');

loginRouter.post('/',passport.authenticate('local',{
    failureRedirect: '/' // 실패 시 리다이렉션
}), (req, res)=>{
    res.redirect('/'); // 성공 시 리다이렉션
});

loginRouter.get('/', passport.authenticate('local',{
    failureRedirect: '/' //
}), (req, res)=>{
    res.send(`Welcome, ${req.body.id}`);
    res.redirect('/');
});

// 로그아웃 추후 구현


module.exports = loginRouter;
