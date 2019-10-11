const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../Model/User");

//model.exports = function(app){}
module.exports = () =>{

    passport.serializeUser((user,done)=>{ // Strategy 성공 시 호출
        console.log("passport.serializeUser.user= "+ user);
        done(null, user); // 유저정보 -> serialize해서 세션에 올림 (user->deserialize 첫번째 인수)
    });

    passport.deserializeUser((user,done)=>{ // 로그인된 상태로 새 url접속(혹은 리다이렉트)할 때마다 세션에서 유저 정보 가져옴
        console.log("passport.deserializeUser.user= "+ user);
        done(null, user); // user = req.user
    });

    passport.use(new LocalStrategy(
        {
            usernameField: 'id',
            passwordField: 'pw',
            session: true, // 세션 저장 여부
            passReqToCallback: false // 바로 뒤 콜백함수 인자가(req, id, pw, done)으로 변경됨
        }, (id, pw, done)=>{
            User.findOne({id:id},(findError, user)=>{
                if(findError) return done(findError); // 서버 에러 처리
                if(!user) return done(null, false,{message:'존재하지 않는 아이디입니다.'}); // 임의 에러
                
                return user.comparePassword(pw, (pwError, isMatch)=>{
                    if(isMatch) return done(null, user); // 검증 성공
                    return done(null, false, {message: '비밀번호가 틀렸습니다.'}); //임의 에러 처리
                });
            });

        }));
};