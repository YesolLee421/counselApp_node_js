const LocalStrategy = require("passport-local").Strategy;
const User = require('../Model/User');
const bcrypt = require('bcrypt');

module.exports = (passport) =>{
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw',
    }, async (id, pw, done)=>{
        try{
            const exUser = await User.findOne({id:id});
            console.log(`exUser=${exUser}`);
            if(exUser){
                const isMatch = await bcrypt.compare(pw, exUser.pw);
                console.log(`isMatch=${isMatch}`);
                if(isMatch){
                    done(null, exUser, {message: '로그인 성공'});
                } else {
                    
                    done(null, false, {message: '비밀번호가 틀렸습니다.'});
                }
            } else {
                done(null, false, {message:'존재하지 않는 아이디입니다.'});
            }

        }catch(error){
            console.error(error);
            done(error);
        }
    }));
    // passport.use(new LocalStrategy(
    //     {
    //         usernameField: 'id',
    //         passwordField: 'pw',
    //         session: true, // 세션 저장 여부
    //         passReqToCallback: false // 바로 뒤 콜백함수 인자가(req, id, pw, done)으로 변경됨
    //     }, (id, pw, done)=>{
    //         User.findOne({id:id},(findError, user)=>{

    //             if(findError) return done(findError); // 서버 에러 처리

    //             if(!user) return done(null, false,{message:'존재하지 않는 아이디입니다.'}); // 임의 에러
                
    //             return user.comparePassword(pw, (pwError, isMatch)=>{
    //                 if(isMatch) return done(null, user); // 검증 성공
    //                 return done(null, false, {message: '비밀번호가 틀렸습니다.'}); //임의 에러 처리
    //             });
    //         });
    //     }));
};