const local = require("./localStrategy");
//const kakao = require("./kakaoStrategy");
const User = require('../Model/User');

module.exports = (passport) =>{

    passport.serializeUser((user, done) => {
        console.log("passport.serializeUser.user= "+ user);
        done(null, user.email);  // 유저정보 -> serialize해서 세션에 올림 (user->deserialize 첫번째 인수)
    });

    passport.deserializeUser((email, done)=>{
        console.log("passport.deserializeUser.user= "+ email);
        User.findOne({email}, (findError, user)=>{
            if(findError) return done(findError);
            return done(null, user);
        })
    });

    local(passport);
    // kakao(passport);

};