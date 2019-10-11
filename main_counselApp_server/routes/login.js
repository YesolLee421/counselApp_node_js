const express = require("express");
const User = require("../Model/User");
const loginRouter = express.Router();
const passport = require('passport');

loginRouter.post('/',passport.authenticate('local',{
    failureRedirect: '/' // 실패 시 리다이렉션
}), (req, res)=>{
    res.redirect('../'); // 성공 시 리다이렉션
});

module.exports = loginRouter;
