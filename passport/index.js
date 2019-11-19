const local = require("./localStrategy");
//const kakao = require("./kakaoStrategy");
const User = require('../Model/User');



//model.exports = function(app){}

module.exports = (passport) =>{

    passport.serializeUser((user, done) => {
        console.log("passport.serializeUser.user= "+ user);
        done(null, user._id);  // 유저정보 -> serialize해서 세션에 올림 (user->deserialize 첫번째 인수)
    });


    // passport.serializeUser((user,done)=>{ // Strategy 성공 시 호출
    //     console.log("passport.serializeUser.user= "+ user);
    //     done(null, user._id); // 유저정보 -> serialize해서 세션에 올림 (user->deserialize 첫번째 인수)
    // });

    passport.deserializeUser((_id, done)=>{
        console.log("passport.deserializeUser.user= "+ _id);
        User.findOne({_id:_id}, (findError, user)=>{
            if(findError) return done(findError);
            return done(null, user);
        })
    });

    local(passport);
    // kakao(passport);

};